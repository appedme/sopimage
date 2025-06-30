'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@stackframe/stack';
import { models } from '@/data/modelsdata';
import { createPageSamplePrompts, quickPromptTips } from '@/data/createPageData';
import { useSingleImageGeneration } from '@/hooks/useSingleImageGeneration';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, 
  Download, 
  Share2, 
  Copy, 
  Clock, 
  Zap,
  Image as ImageIcon,
  ChevronRight,
  ExternalLink,
  Wand2
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function CreatePage() {
  const user = useUser();
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState<string>(models[0].modelId);
  const [generationTime, setGenerationTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const { generateSingleImage, isGenerating, error, clearError } = useSingleImageGeneration();

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setGenerationTime(prev => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    if (!user) {
      toast.error('Please sign in to generate images');
      return;
    }

    clearError();
    setResult(null);
    setGenerationTime(0);
    setIsTimerRunning(true);

    const selectedModelData = models.find(m => m.modelId === selectedModel);
    const generationResult = await generateSingleImage(
      prompt, 
      selectedModel, 
      selectedModelData?.name || 'Unknown Model'
    );

    setIsTimerRunning(false);

    if (generationResult) {
      setResult(generationResult);
      toast.success('Image generated successfully!');
    } else if (error) {
      toast.error(error);
    }
  };

  const handleDownload = async () => {
    if (!result?.generatedImage?.image) return;
    
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
    navigator.clipboard.writeText(prompt);
    toast.success('Prompt copied to clipboard!');
  };

  const handleCopyImage = () => {
    if (result?.generatedImage?.image) {
      navigator.clipboard.writeText(result.generatedImage.image);
      toast.success('Image URL copied to clipboard!');
    }
  };

  const getShareOptions = () => {
    if (typeof window === 'undefined') return [];
    
    return [
      {
        name: 'Twitter',
        icon: '𝕏',
        url: `https://twitter.com/intent/tweet?text=Check out this AI-generated image: "${prompt}"&url=${encodeURIComponent(window.location.href)}&hashtags=AI,ImageGeneration`,
        color: 'bg-black text-white'
      },
      {
        name: 'Facebook',
        icon: '📘',
        url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
        color: 'bg-blue-600 text-white'
      },
      {
        name: 'LinkedIn',
        icon: '💼',
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
        color: 'bg-blue-700 text-white'
      },
      {
        name: 'Reddit',
        icon: '🔴',
        url: `https://reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=Amazing AI-generated image: "${prompt}"`,
        color: 'bg-orange-600 text-white'
      },
      {
        name: 'WhatsApp',
        icon: '📱',
        url: `https://wa.me/?text=Check out this AI-generated image: "${prompt}" ${window.location.href}`,
        color: 'bg-green-600 text-white'
      }
    ];
  };

  const selectedModelData = models.find(m => m.modelId === selectedModel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AI Image Generator
                </h1>
                <p className="text-sm text-muted-foreground">Create Mode</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300">
                <Sparkles className="w-3 h-3 mr-1" />
                Free Unlimited
              </Badge>
              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Create Stunning AI Images
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from 12+ powerful AI models and bring your imagination to life with unlimited, high-quality image generation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - Controls */}
            <div className="space-y-6">
              {/* Prompt Input */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="w-5 h-5" />
                    Your Creative Prompt
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Describe the image you want to create... (e.g., 'A majestic dragon flying over a mystical forest at sunset')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[120px] resize-none"
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{prompt.length}/500 characters</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyPrompt}
                      disabled={!prompt}
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  
                  {/* Quick Prompt Suggestions */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Quick Ideas:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {createPageSamplePrompts.slice(0, 3).map((sample, index) => (
                        <button
                          key={index}
                          onClick={() => setPrompt(sample.prompt)}
                          className="text-left p-2 text-xs bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded border transition-colors"
                        >
                          <span className="font-medium text-primary">{sample.category}:</span> {sample.prompt}
                        </button>
                      ))}
                    </div>
                    <details className="group">
                      <summary className="text-xs text-primary cursor-pointer hover:underline">Show more ideas...</summary>
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        {createPageSamplePrompts.slice(3).map((sample, index) => (
                          <button
                            key={index + 3}
                            onClick={() => setPrompt(sample.prompt)}
                            className="text-left p-2 text-xs bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded border transition-colors"
                          >
                            <span className="font-medium text-primary">{sample.category}:</span> {sample.prompt}
                          </button>
                        ))}
                      </div>
                    </details>
                  </div>
                </CardContent>
              </Card>

              {/* Model Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Choose AI Model
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto">
                    {models.map((model) => (
                      <button
                        key={model.modelId}
                        onClick={() => setSelectedModel(model.modelId)}
                        className={cn(
                          "p-4 rounded-lg border text-left transition-all hover:shadow-md",
                          selectedModel === model.modelId
                            ? "bg-primary/10 border-primary ring-2 ring-primary/20"
                            : "bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{model.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {model.id}</p>
                          </div>
                          <ChevronRight className={cn(
                            "w-5 h-5 transition-transform",
                            selectedModel === model.modelId ? "rotate-90 text-primary" : "text-muted-foreground"
                          )} />
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Generate Button */}
              <Card>
                <CardContent className="p-6">
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim() || !user}
                    className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                        Generating... {generationTime.toFixed(1)}s
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        {!user ? 'Sign In to Generate' : 'Generate Image'}
                      </>
                    )}
                  </Button>
                  
                  {selectedModelData && (
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                        Selected: {selectedModelData.name}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - Results */}
            <div className="space-y-6">
              {/* Generation Status */}
              {isGenerating && (
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mx-auto">
                        <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-spin" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Creating Your Image</h3>
                        <p className="text-muted-foreground">
                          {selectedModelData?.name} is working on your prompt
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Progress value={(generationTime / 30) * 100} className="h-2" />
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{generationTime.toFixed(1)}s elapsed</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Generated Image */}
              {result && !isGenerating && (
                <Card className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Your Generated Image</CardTitle>
                      <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400">
                        <Clock className="w-3 h-3 mr-1" />
                        {generationTime.toFixed(1)}s
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative group">
                      <img
                        src={result.generatedImage?.image}
                        alt={result.prompt}
                        className="w-full h-auto"
                        style={{ maxHeight: '500px', objectFit: 'contain' }}
                      />
                      
                      {/* Overlay with quick actions */}
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
                            onClick={() => setShowShareModal(true)}
                            className="bg-white/90 hover:bg-white text-black"
                          >
                            <Share2 className="w-4 h-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              {result && !isGenerating && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Button onClick={handleDownload} variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button onClick={() => setShowShareModal(true)} variant="outline" className="w-full">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button onClick={handleCopyPrompt} variant="outline" className="w-full">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Prompt
                      </Button>
                      <Button onClick={handleCopyImage} variant="outline" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Copy URL
                      </Button>
                    </div>
                    
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Generation Details:</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Model:</span>
                          <span className="font-medium">{result.modelName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time:</span>
                          <span className="font-medium">{generationTime.toFixed(1)}s</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Format:</span>
                          <span className="font-medium">{result.generatedImage?.mimeType}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Empty State */}
              {!result && !isGenerating && (
                <Card className="text-center py-16">
                  <CardContent>
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ImageIcon className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Ready to Create</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Enter your creative prompt, choose an AI model, and watch the magic happen
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge variant="outline">✨ Instant Generation</Badge>
                      <Badge variant="outline">🎨 12+ Models</Badge>
                      <Badge variant="outline">⚡ High Quality</Badge>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share Your Creation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {getShareOptions().map((option) => (
                  <a
                    key={option.name}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-all hover:scale-105",
                      option.color
                    )}
                  >
                    <span className="text-xl">{option.icon}</span>
                    <span className="font-medium">Share on {option.name}</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                ))}
              </div>
              <Button
                onClick={() => setShowShareModal(false)}
                variant="outline"
                className="w-full"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
