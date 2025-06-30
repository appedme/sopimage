'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Share2, Copy, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface SingleImageDisplayProps {
  result: {
    prompt: string;
    modelId: string;
    modelName: string;
    generatedImage: {
      image: string;
      mimeType: string;
    } | null;
  };
}

export function SingleImageDisplay({ result }: SingleImageDisplayProps) {
  const handleDownload = async () => {
    if (!result.generatedImage?.image) return;
    
    try {
      const response = await fetch(result.generatedImage.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-generated-${Date.now()}.webp`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('Image downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download image');
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(result.prompt);
    toast.success('Prompt copied to clipboard!');
  };

  const handleShare = async () => {
    if (navigator.share && result.generatedImage?.image) {
      try {
        await navigator.share({
          title: 'AI Generated Image',
          text: `Check out this AI-generated image: "${result.prompt}"`,
          url: result.generatedImage.image
        });
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(result.generatedImage.image);
        toast.success('Image URL copied to clipboard!');
      }
    } else if (result.generatedImage?.image) {
      navigator.clipboard.writeText(result.generatedImage.image);
      toast.success('Image URL copied to clipboard!');
    }
  };

  if (!result.generatedImage?.image) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No image generated</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Generated Image</CardTitle>
          <p className="text-sm text-muted-foreground">"{result.prompt}"</p>
        </CardHeader>
      </Card>
      
      <Card className="overflow-hidden">
        <div className="relative group">
          <img
            src={result.generatedImage.image}
            alt={result.prompt}
            className="w-full h-auto rounded-lg"
            style={{ maxHeight: '600px', objectFit: 'contain' }}
          />
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDownload}
                className="bg-white/90 hover:bg-white text-black"
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleShare}
                className="bg-white/90 hover:bg-white text-black"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400">
                {result.modelName}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {result.generatedImage.mimeType}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyPrompt}
              className="text-muted-foreground hover:text-foreground"
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy Prompt
            </Button>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>Generated with AI</span>
            </div>
            <div>
              <span>Model: {result.modelName}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
