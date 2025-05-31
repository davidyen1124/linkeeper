import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import './App.css'

type UrlSource = 'facebook' | 'instagram' | 'threads' | 'youtube';
type LayoutMode = 'compact' | 'comfortable' | 'spacious' | 'list';

interface UrlData {
  _id: string;
  url: string;
  title?: string;
  description?: string;
  image?: string;
  source?: UrlSource;
  tags?: string[];
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
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('comfortable');

  const API_BASE_URL = 'http://localhost:4000/api';

  // Load layout preference from localStorage
  useEffect(() => {
    const savedLayout = localStorage.getItem('urlSaverLayout') as LayoutMode;
    if (savedLayout && ['compact', 'comfortable', 'spacious', 'list'].includes(savedLayout)) {
      setLayoutMode(savedLayout);
    }
  }, []);

  // Save layout preference to localStorage
  const handleLayoutChange = (newLayout: LayoutMode) => {
    setLayoutMode(newLayout);
    localStorage.setItem('urlSaverLayout', newLayout);
  };

  // Get layout configuration
  const getLayoutConfig = (mode: LayoutMode) => {
    const configs = {
      compact: {
        name: 'Compact',
        icon: '▣',
        columns: 'repeat(auto-fill, minmax(240px, 1fr))',
        description: 'Show more URLs'
      },
      comfortable: {
        name: 'Comfortable',
        icon: '⊞',
        columns: 'repeat(auto-fill, minmax(350px, 1fr))',
        description: 'Balanced view'
      },
      spacious: {
        name: 'Spacious',
        icon: '☐',
        columns: 'repeat(auto-fill, minmax(450px, 1fr))',
        description: 'Larger cards'
      },
      list: {
        name: 'List',
        icon: '☰',
        columns: '1fr',
        description: 'Single column'
      }
    };
    return configs[mode];
  };

  // Get source icon and display name
  const getSourceInfo = (source?: UrlSource) => {
    const sourceMap = {
      facebook: { icon: '📘', name: 'Facebook', color: '#1877F2' },
      instagram: { icon: '📷', name: 'Instagram', color: '#E4405F' },
      threads: { icon: '🧵', name: 'Threads', color: '#000000' },
      youtube: { icon: '📹', name: 'YouTube', color: '#FF0000' }
    };
    return source ? sourceMap[source] : null;
  };

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
  const fetchUrls = useCallback(async (isRefresh = false) => {
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
  }, [showToast]);

  useEffect(() => {
    fetchUrls();
    // Refresh every 30 seconds
    const interval = setInterval(() => fetchUrls(true), 30000);
    return () => clearInterval(interval);
  }, [fetchUrls]);

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

  const currentLayoutConfig = getLayoutConfig(layoutMode);

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
            <div className="layout-controls">
              <div className="layout-buttons">
                {(['compact', 'comfortable', 'spacious', 'list'] as LayoutMode[]).map((mode) => {
                  const config = getLayoutConfig(mode);
                  return (
                    <button
                      key={mode}
                      className={`layout-btn ${layoutMode === mode ? 'active' : ''}`}
                      onClick={() => handleLayoutChange(mode)}
                      title={`${config.name} - ${config.description}`}
                    >
                      <span className="layout-icon">{config.icon}</span>
                      <span className="layout-name">{config.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div 
              className={`url-grid layout-${layoutMode}`}
              style={{ 
                gridTemplateColumns: currentLayoutConfig.columns 
              }}
            >
              {urls.map((urlData, index) => {
                const sourceInfo = getSourceInfo(urlData.source);
                return (
                  <div 
                    key={urlData._id} 
                    className={`url-card layout-${layoutMode}`}
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
                      
                      {/* Source badge */}
                      {sourceInfo && (
                        <div className="source-badge" style={{ backgroundColor: sourceInfo.color }}>
                          <span className="source-icon">{sourceInfo.icon}</span>
                          <span className="source-name">{sourceInfo.name}</span>
                        </div>
                      )}
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
                      
                      {/* Tags */}
                      {urlData.tags && urlData.tags.length > 0 && (
                        <div className="url-tags">
                          {urlData.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="tag">
                              #{tag}
                            </span>
                          ))}
                        </div>
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
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default App
