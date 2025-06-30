'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GenerationHistory } from '@/types';
import { History, Trash2, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface HistoryPanelProps {
  history: GenerationHistory[];
  onClearHistory: () => void;
  onPromptSelect: (prompt: string) => void;
}

export const HistoryPanel = ({ history, onClearHistory, onPromptSelect }: HistoryPanelProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleDownload = (imageUrl: string, modelName: string) => {
    // Open image in new tab instead of downloading due to CORS
    window.open(imageUrl, '_blank');
  };

  if (history.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Generation History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No generations yet. Start creating some images!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Generation History ({history.length})
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onClearHistory}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
        {history.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-2">{item.prompt}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTime(item.timestamp)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPromptSelect(item.prompt)}
                className="shrink-0"
              >
                Use
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {item.modelAImage && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">GPT-Image-1</Badge>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => handleDownload(item.modelAImage!.image, 'GPT-Image-1')}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => window.open(item.modelAImage!.image, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="aspect-square relative rounded-md overflow-hidden bg-muted">
                    <Image
                      src={item.modelAImage.image}
                      alt={`GPT-Image-1: ${item.prompt}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              )}

              {item.modelBImage && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">DALL-E-3</Badge>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => handleDownload(item.modelBImage!.image, 'DALL-E-3')}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => window.open(item.modelBImage!.image, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="aspect-square relative rounded-md overflow-hidden bg-muted">
                    <Image
                      src={item.modelBImage.image}
                      alt={`DALL-E-3: ${item.prompt}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
