'use client';

import { useState } from 'react';
import { models } from '@/data/modelsdata';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Check, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreateModelSelectorProps {
  selectedModel: string;
  onModelSelect: (modelId: string) => void;
}

export function CreateModelSelector({ selectedModel, onModelSelect }: CreateModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedModelData = models.find(m => m.modelId === selectedModel);

  const getModelLogo = (modelName: string) => {
    if (modelName.toLowerCase().includes('dall-e') || modelName.toLowerCase().includes('gpt')) return '🎨';
    if (modelName.toLowerCase().includes('flux')) return '⚡';
    if (modelName.toLowerCase().includes('recraft')) return '🎯';
    if (modelName.toLowerCase().includes('photon')) return '📸';
    if (modelName.toLowerCase().includes('bagel')) return '🥯';
    if (modelName.toLowerCase().includes('ideogram')) return '💭';
    if (modelName.toLowerCase().includes('imagen')) return '🖼️';
    if (modelName.toLowerCase().includes('gemini')) return '💎';
    return '✨';
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Choose AI Model
      </label>
      
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between h-12 px-4"
      >
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getModelLogo(selectedModelData?.name || '')}</span>
          <div className="text-left">
            <div className="font-medium text-sm">
              {selectedModelData?.name || 'Select Model'}
            </div>
          </div>
        </div>
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform",
          isOpen && "rotate-180"
        )} />
      </Button>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 shadow-lg border">
          <CardContent className="p-2 max-h-80 overflow-y-auto">
            <div className="space-y-1">
              {models.map((model) => (
                <button
                  key={model.modelId}
                  onClick={() => {
                    onModelSelect(model.modelId);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-700",
                    selectedModel === model.modelId && "bg-purple-50 dark:bg-purple-900/20"
                  )}
                >
                  <span className="text-2xl">{getModelLogo(model.name)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{model.name}</span>
                    </div>
                  </div>
                  {selectedModel === model.modelId && (
                    <Check className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
