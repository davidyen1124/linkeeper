export type UrlSource = 'facebook' | 'instagram' | 'threads' | 'youtube';

export interface UrlAnalysisResult {
  source?: UrlSource;
  detectedType?: string; // 'post', 'reel', 'story', 'video', 'short', etc.
}

export interface UrlAnalysisService {
  analyzeUrl(url: string): Promise<UrlAnalysisResult>;
} 