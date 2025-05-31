import { UrlMetadata } from '../entities/Url';

export interface MetadataService {
  fetchMetadata(url: string): Promise<UrlMetadata>;
} 