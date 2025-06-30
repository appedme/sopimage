'use client';

import { useState, useEffect } from 'react';
import { AuthPrompt } from '@/components/AuthPrompt';
import { PromptInput } from '@/components/PromptInput';
import { ImageCard } from '@/components/ImageCard';
import { GenerationTimer } from '@/components/GenerationTimer';
import { HistoryPanel } from '@/components/HistoryPanel';
import { QuickActions } from '@/components/QuickActions';
import { StatsWidget } from '@/components/StatsWidget';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { useGenerationHistory } from '@/hooks/useLocalStorage';
import { samplePrompts } from '@/data/samplePrompts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Github, Heart, Crown, Settings, Moon, Sun } from 'lucide-react';
import { toast } from 'sonner';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [currentGeneration, setCurrentGeneration] = useState<any>(null);
  const [generationCount, setGenerationCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const { generateImages, isGenerating, error, clearError } = useImageGeneration();
  const { history, addToHistory, clearHistory } = useGenerationHistory();

  // Mock stats data
  const stats = {
    totalGenerations: 45678 + generationCount,
    averageTime: 28,
    modelsAvailable: 2,
    isOnline: true
  };

  useEffect(() => {
    // Check for system dark mode preference
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

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
      setGenerationCount(prev => prev + 1);
      toast.success('Images generated successfully!');
    } else if (error) {
      toast.error(error);
    }
  };

  const handlePromptSelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  const handleRandomPrompt = () => {
    const randomPrompt = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
    setPrompt(randomPrompt.prompt);
    toast.success('Random prompt selected!');
  };

  const handleClearPrompt = () => {
    setPrompt('');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // if (!isAuthenticated) {
  //   return <AuthPrompt onContinueWithoutAuth={() => setIsAuthenticated(true)} />;
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
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
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300">
                <Crown className="w-3 h-3 mr-1" />
                Free Unlimited
              </Badge>
              <Button variant="outline" size="sm" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            <QuickActions
              onRandomPrompt={handleRandomPrompt}
              onClearPrompt={handleClearPrompt}
              isGenerating={isGenerating}
              generationCount={generationCount}
            />

            <StatsWidget stats={stats} />

            {/* Model Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Available Models</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">GPT-Image-1</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Model A</p>
                  </div>
                  <Badge variant="outline" className="border-green-300 text-green-700 dark:border-green-700 dark:text-green-400">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-300">DALL-E-3</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Model B</p>
                  </div>
                  <Badge variant="outline" className="border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-400">Active</Badge>
                </div>
                <div className="text-center py-2">
                  <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400">
                    🚀 More models coming soon!
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Panel - Generation Results */}
          <div className="lg:col-span-3 space-y-6">
            {isGenerating && <GenerationTimer isGenerating={isGenerating} />}
            
            {currentGeneration && !isGenerating && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Generated Images</CardTitle>
                    <p className="text-sm text-muted-foreground">"{currentGeneration.prompt}"</p>
                  </CardHeader>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Card className="text-center py-16">
                <CardContent>
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Ready to Create Magic</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Enter a creative prompt and watch as two powerful AI models bring your imagination to life
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="outline">✨ Unlimited</Badge>
                    <Badge variant="outline">🎨 High Quality</Badge>
                    <Badge variant="outline">⚡ Fast Generation</Badge>
                  </div>
                </CardContent>
              </Card>
            )}{/* Right Panel - History */}
          <div className="lg:col-span-1">
            <HistoryPanel
              history={history}
              onClearHistory={clearHistory}
              onPromptSelect={handlePromptSelect}
            />
          </div>
          </div>

          
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>using LM Arena API</span>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">API Docs</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
            <Badge variant="outline" className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
              🎨 Unlimited AI Image Generation - Forever Free
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}
