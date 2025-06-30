import { useState } from 'react';

interface SingleImageResult {
  prompt: string;
  modelId: string;
  modelName: string;
  generatedImage: {
    image: string;
    mimeType: string;
  } | null;
}

export function useSingleImageGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSingleImage = async (prompt: string, modelId: string, modelName: string): Promise<SingleImageResult | null> => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return null;
    }

    if (!modelId) {
      setError('Please select a model');
      return null;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch(`/api/generate-single?prompt=${encodeURIComponent(prompt)}&modelId=${encodeURIComponent(modelId)}`);
      
      if (!response.ok) {
        const errorData = await response.json() as { error?: string };
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json() as {
        prompt: string;
        modelId: string;
        generatedImage: {
          image: string;
          mimeType: string;
        } | null;
      };
      
      return {
        prompt: data.prompt,
        modelId: data.modelId,
        modelName,
        generatedImage: data.generatedImage
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const clearError = () => setError(null);

  return {
    generateSingleImage,
    isGenerating,
    error,
    clearError
  };
}
