'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { samplePrompts } from '@/data/samplePrompts';
import { SamplePrompt } from '@/types';
import { Wand2, Sparkles } from 'lucide-react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const PromptInput = ({ prompt, setPrompt, onGenerate, isGenerating }: PromptInputProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'fantasy', 'nature', 'portrait', 'abstract', 'animals', 'sci-fi'];

  const filteredPrompts = selectedCategory === 'all' 
    ? samplePrompts 
    : samplePrompts.filter(p => p.category === selectedCategory);

  const handleSamplePromptClick = (samplePrompt: SamplePrompt) => {
    setPrompt(samplePrompt.prompt);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5" />
          Create Your Image
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label htmlFor="prompt" className="text-sm font-medium">
            Describe your image
          </label>
          <Textarea
            id="prompt"
            placeholder="A beautiful landscape with mountains and a lake at sunset..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>

        <Button 
          onClick={onGenerate} 
          disabled={isGenerating || !prompt.trim()}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Generating Images...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Images
            </>
          )}
        </Button>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Sample Prompts</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
            {filteredPrompts.map((samplePrompt) => (
              <Button
                key={samplePrompt.id}
                variant="ghost"
                className="h-auto p-3 text-left justify-start"
                onClick={() => handleSamplePromptClick(samplePrompt)}
              >
                <div className="space-y-1">
                  <div className="font-medium text-sm">{samplePrompt.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2">
                    {samplePrompt.prompt.slice(0, 10)}...
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
