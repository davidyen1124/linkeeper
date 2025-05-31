import { Url } from '../../domain/entities/Url';
import { UrlRepository } from '../../domain/repositories/UrlRepository';

export interface GetUrlsResponse {
  urls: Url[];
}

export class GetUrlsUseCase {
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute(): Promise<GetUrlsResponse> {
    const urls = await this.urlRepository.findAll();
    
    return {
      urls
    };
  }
} 