export interface GeneratedImage {
  image: string;
  mimeType: string;
}

export interface GenerationResponse {
  prompt: string;
  modelAImage: GeneratedImage | null;
  modelBImage: GeneratedImage | null;
}

export interface GenerationHistory {
  id: string;
  prompt: string;
  timestamp: number;
  modelAImage: GeneratedImage | null;
  modelBImage: GeneratedImage | null;
}

export interface SamplePrompt {
  id: string;
  title: string;
  prompt: string;
  category: 'fantasy' | 'nature' | 'portrait' | 'abstract' | 'animals' | 'sci-fi';
}
