import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { DependencyContainer } from '@server/infrastructure/config/DependencyContainer';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/url-saver';

let isConnected = false;
async function connect() {
  if (!isConnected) {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
  }
}

const container = DependencyContainer.getInstance();

export async function GET() {
  await connect();
  const result = await container.getUrlsUseCase.execute();
  const urls = result.urls.map(url => ({
    id: url.id,
    url: url.url,
    title: url.metadata.title,
    description: url.metadata.description,
    image: url.metadata.image,
    source: url.metadata.source,
    tags: url.metadata.tags || [],
    createdAt: url.createdAt
  }));
  return NextResponse.json(urls);
}

export async function POST(req: NextRequest) {
  await connect();
  const { url, tags } = await req.json();

  if (!url) {
    return NextResponse.json({
      error: 'URL is required',
      message: 'Please provide a valid URL in the request body'
    }, { status: 400 });
  }

  if (tags && !Array.isArray(tags)) {
    return NextResponse.json({
      error: 'Invalid tags format',
      message: 'Tags must be an array of strings'
    }, { status: 400 });
  }

  const result = await container.addUrlUseCase.execute({ url, tags });
  const status = result.isNew ? 201 : 200;
  return NextResponse.json({
    id: result.url.id,
    url: result.url.url,
    title: result.url.metadata.title,
    description: result.url.metadata.description,
    image: result.url.metadata.image,
    source: result.url.metadata.source,
    tags: result.url.metadata.tags || [],
    createdAt: result.url.createdAt,
    isNew: result.isNew
  }, { status });
}
