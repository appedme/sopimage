'use client';

import { useState } from 'react';
import { AuthPrompt } from '@/components/AuthPrompt';
import { PromptInput } from '@/components/PromptInput';
import { ImageCard } from '@/components/ImageCard';
import { GenerationTimer } from '@/components/GenerationTimer';
import { HistoryPanel } from '@/components/HistoryPanel';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { useGenerationHistory } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Github, Heart, Crown } from 'lucide-react';
import { toast } from 'sonner';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [currentGeneration, setCurrentGeneration] = useState<any>(null);
  
  const { generateImages, isGenerating, error, clearError } = useImageGeneration();
  const { history, addToHistory, clearHistory } = useGenerationHistory();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    clearError();
    const result = await generateImages(prompt);
    
    if (result) {
      setCurrentGeneration(result);
      addToHistory({
        prompt: result.prompt,
        modelAImage: result.modelAImage,
        modelBImage: result.modelBImage,
      });
      toast.success('Images generated successfully!');
    } else if (error) {
      toast.error(error);
    }
  };

  const handlePromptSelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  if (!isAuthenticated) {
    return <AuthPrompt onContinueWithoutAuth={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AI Image Generator
                </h1>
                <p className="text-sm text-muted-foreground">
                  Unlimited generations with GPT-Image-1 & DALL-E-3
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                <Crown className="w-3 h-3 mr-1" />
                Free Unlimited
              </Badge>
              <Button variant="outline" size="sm" asChild>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  Star on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Prompt Input */}
          <div className="space-y-6">
            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            {/* Model Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Available Models</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <p className="font-medium text-green-800">GPT-Image-1</p>
                    <p className="text-xs text-green-600">Model A</p>
                  </div>
                  <Badge variant="outline" className="border-green-300 text-green-700">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <p className="font-medium text-blue-800">DALL-E-3</p>
                    <p className="text-xs text-blue-600">Model B</p>
                  </div>
                  <Badge variant="outline" className="border-blue-300 text-blue-700">Active</Badge>
                </div>
                <div className="text-center py-2">
                  <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-700">
                    🚀 More models coming soon!
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Panel - Generation Results */}
          <div className="space-y-6">
            {isGenerating && <GenerationTimer isGenerating={isGenerating} />}
            
            {currentGeneration && !isGenerating && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Generated Images</CardTitle>
                    <p className="text-sm text-muted-foreground">"{currentGeneration.prompt}"</p>
                  </CardHeader>
                </Card>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentGeneration.modelAImage && (
                    <ImageCard
                      image={currentGeneration.modelAImage}
                      modelName="GPT-Image-1"
                      prompt={currentGeneration.prompt}
                    />
                  )}
                  {currentGeneration.modelBImage && (
                    <ImageCard
                      image={currentGeneration.modelBImage}
                      modelName="DALL-E-3"
                      prompt={currentGeneration.prompt}
                    />
                  )}
                </div>
              </div>
            )}

            {!currentGeneration && !isGenerating && (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Ready to Create</h3>
                  <p className="text-muted-foreground">
                    Enter a prompt and generate unlimited AI images with two powerful models
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel - History */}
          <div>
            <HistoryPanel
              history={history}
              onClearHistory={clearHistory}
              onPromptSelect={handlePromptSelect}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>by the AI Image Generator team</span>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
            <Badge variant="outline" className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              🎨 Unlimited AI Image Generation - Forever Free
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}
