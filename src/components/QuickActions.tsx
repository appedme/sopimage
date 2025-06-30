'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Zap, Sparkles } from 'lucide-react';

interface QuickActionsProps {
  onRandomPrompt: () => void;
  onClearPrompt: () => void;
  isGenerating: boolean;
  generationCount: number;
}

export const QuickActions = ({ 
  onRandomPrompt, 
  onClearPrompt, 
  isGenerating, 
  generationCount 
}: QuickActionsProps) => {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">Quick Actions</h3>
          <Badge variant="outline" className="bg-gradient-to-r from-purple-50 to-pink-50">
            <Zap className="w-3 h-3 mr-1" />
            {generationCount} generated
          </Badge>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRandomPrompt}
            disabled={isGenerating}
            className="flex-1"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Random
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearPrompt}
            disabled={isGenerating}
            className="flex-1"
          >
            Clear
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          <div className="flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" />
            {/* <span>Powered by LM Arena API</span> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
