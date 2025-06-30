'use client';

import { useState } from 'react';
import { models } from '@/data/modelsdata';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, ArrowLeftRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModelSelectorProps {
  selectedModel: string | null;
  onModelSelect: (modelId: string) => void;
  generationMode: 'dual' | 'single';
  onModeChange: (mode: 'dual' | 'single') => void;
}

export function ModelSelector({ 
  selectedModel, 
  onModelSelect, 
  generationMode, 
  onModeChange 
}: ModelSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Generation Mode
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mode Toggle */}
        <div className="flex gap-2">
          <Button
            variant={generationMode === 'dual' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onModeChange('dual')}
            className="flex-1 text-xs"
          >
            <ArrowLeftRight className="w-3 h-3 mr-1" />
            Compare Models
          </Button>
          <Button
            variant={generationMode === 'single' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onModeChange('single')}
            className="flex-1 text-xs"
          >
            <Zap className="w-3 h-3 mr-1" />
            Single Model
          </Button>
        </div>

        {/* Mode Description */}
        {generationMode === 'dual' ? (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-800 dark:text-blue-300 font-medium mb-1">
              Side-by-Side Comparison
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Generate with GPT-Image-1 and DALL-E-3 simultaneously to compare results
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-xs text-purple-800 dark:text-purple-300 font-medium mb-1">
                Single Model Generation
              </p>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                Choose your preferred AI model for focused generation
              </p>
            </div>

            {/* Model Selection Grid */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {models.map((model) => (
                <button
                  key={model.modelId}
                  onClick={() => onModelSelect(model.modelId)}
                  className={cn(
                    "w-full p-2 rounded-lg border text-left transition-all hover:shadow-sm",
                    selectedModel === model.modelId
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-xs">{model.name}</p>
                      <p className="text-xs text-muted-foreground">ID: {model.id}</p>
                    </div>
                    {selectedModel === model.modelId && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {selectedModel && (
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-green-600" />
                  <p className="text-xs text-green-800 dark:text-green-300 font-medium">
                    {models.find(m => m.modelId === selectedModel)?.name} Selected
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
