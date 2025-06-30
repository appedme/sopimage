'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Clock } from 'lucide-react';

interface GenerationTimerProps {
  isGenerating: boolean;
  onComplete?: () => void;
}

export const GenerationTimer = ({ isGenerating, onComplete }: GenerationTimerProps) => {
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!isGenerating) {
      setProgress(0);
      setTimeElapsed(0);
      return;
    }

    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
      
      // Simulate progress with a realistic curve
      // Most generations take 15-45 seconds
      setProgress(prev => {
        if (prev >= 95) return prev; // Don't go to 100% until actually complete
        
        // Exponential decay for realistic progress feeling
        const increment = Math.max(0.5, (100 - prev) * 0.05);
        return Math.min(95, prev + increment);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isGenerating]);

  useEffect(() => {
    if (!isGenerating && progress > 0) {
      // Complete the progress bar when generation is done
      setProgress(100);
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }
  }, [isGenerating, progress, onComplete]);

  if (!isGenerating && timeElapsed === 0) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressColor = () => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 60) return 'bg-yellow-500';
    if (progress < 90) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStatusMessage = () => {
    if (!isGenerating && progress === 100) return 'Generation complete!';
    if (progress < 20) return 'Initializing AI models...';
    if (progress < 40) return 'Processing your prompt...';
    if (progress < 60) return 'Generating images...';
    if (progress < 80) return 'Adding final details...';
    if (progress < 95) return 'Almost ready...';
    return 'Finalizing images...';
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="font-medium">Generation Progress</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {formatTime(timeElapsed)}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{getStatusMessage()}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="text-xs text-muted-foreground text-center">
            {isGenerating ? 
              'Both models are working simultaneously to create your images...' : 
              'Your images are ready!'
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
