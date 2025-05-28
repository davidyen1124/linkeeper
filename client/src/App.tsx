import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import './App.css'

interface UrlData {
  _id: string;
  url: string;
  title?: string;
  description?: string;
  image?: string;
  createdAt: string;
}

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error';
}

function App() {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const API_BASE_URL = 'http://localhost:4000/api';

  // Toast notification system
  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now().toString();
    const newToast: ToastMessage = { id, message, type };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  }, []);

  // Copy to clipboard function
  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      showToast('URL copied to clipboard! 📋', 'success');
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast('URL copied to clipboard! 📋', 'success');
    }
  };

  // Fetch URLs from API
  const fetchUrls = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      const response = await axios.get(`${API_BASE_URL}/urls`);
      setUrls(response.data);
      setError(null);
      
      if (isRefresh) {
        showToast('URLs refreshed! ✨', 'success');
      }
    } catch (err) {
      const errorMessage = 'Failed to fetch URLs. Make sure the server is running.';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      console.error('Error fetching URLs:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUrls();
    // Refresh every 30 seconds
    const interval = setInterval(() => fetchUrls(true), 30000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes} minutes ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleRefresh = () => {
    fetchUrls(true);
  };

  if (loading && !refreshing) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading your saved URLs...</p>
        </div>
      </div>
    );
  }

  if (error && !refreshing) {
    return (
      <div className="app">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => fetchUrls()} className="retry-btn">
            <span>🔄</span>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Toast notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>

      <header className="header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="header-title">
              <span className="header-icon">📎</span>
              URL Saver
            </h1>
            <p className="header-subtitle">Your personal URL collection from Telegram</p>
          </div>
          <button 
            onClick={handleRefresh} 
            className={`refresh-btn ${refreshing ? 'refreshing' : ''}`}
            disabled={refreshing}
          >
            <span className="refresh-icon">🔄</span>
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </header>

      <main className="main">
        {urls.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h2>No URLs saved yet</h2>
            <p>Send a URL to your Telegram bot to see it appear here!</p>
            <div className="empty-steps">
              <div className="step">
                <span className="step-number">1</span>
                <span>Open Telegram</span>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <span>Find your bot</span>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <span>Send any URL</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="stats-bar">
              <span className="stats-text">
                {urls.length} URL{urls.length !== 1 ? 's' : ''} saved
              </span>
            </div>
            <div className="url-grid">
              {urls.map((urlData, index) => (
                <div 
                  key={urlData._id} 
                  className="url-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="url-image">
                    {urlData.image ? (
                      <img 
                        src={urlData.image} 
                        alt={urlData.title || 'URL preview'} 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const placeholder = target.parentElement?.querySelector('.image-placeholder');
                          if (placeholder) {
                            (placeholder as HTMLElement).style.display = 'flex';
                          }
                        }}
                        loading="lazy"
                      />
                    ) : null}
                    <div className="image-placeholder" style={{ display: urlData.image ? 'none' : 'flex' }}>
                      <span className="placeholder-icon">🔗</span>
                      <span className="placeholder-text">No Preview</span>
                    </div>
                  </div>
                  
                  <div className="url-content">
                    <h3 className="url-title">
                      {urlData.title || 'No title available'}
                    </h3>
                    
                    {urlData.description && (
                      <p className="url-description">
                        {urlData.description}
                      </p>
                    )}
                    
                    <div className="url-actions">
                      <a 
                        href={urlData.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="url-link"
                      >
                        <span className="link-icon">🔗</span>
                        Visit Link
                      </a>
                      
                      <button 
                        onClick={() => copyToClipboard(urlData.url)}
                        className="share-btn"
                        title="Copy URL to clipboard"
                      >
                        <span className="share-icon">📋</span>
                        Share
                      </button>
                    </div>
                    
                    <div className="url-meta">
                      <span className="url-date">
                        <span className="date-icon">🕒</span>
                        {formatDate(urlData.createdAt)}
                      </span>
                      <span className="url-domain">
                        {new URL(urlData.url).hostname}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default App
