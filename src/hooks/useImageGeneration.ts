'use client';

import { useState, useCallback } from 'react';
import { GenerationResponse } from '@/types';

export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImages = useCallback(async (prompt: string): Promise<GenerationResponse | null> => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return null;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch(`/api/generate?prompt=${encodeURIComponent(prompt)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GenerationResponse = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate images';
      setError(errorMessage);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    generateImages,
    isGenerating,
    error,
    clearError: () => setError(null)
  };
};
