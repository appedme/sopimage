'use client';

import { useState, useEffect } from 'react';
import { GenerationHistory } from '@/types';

export const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export const useGenerationHistory = () => {
  const [history, setHistory] = useLocalStorage('generation-history', []);

  const addToHistory = (item: Omit<GenerationHistory, 'id' | 'timestamp'>) => {
    const newItem: GenerationHistory = {
      ...item,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    setHistory([newItem, ...history].slice(0, 50)); // Keep only last 50 generations
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return { history, addToHistory, clearHistory };
};
