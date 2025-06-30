'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@stackframe/stack';
import { LandingPage } from '@/components/LandingPage';
import { AuthPrompt } from '@/components/AuthPrompt';
import { PromptInput } from '@/components/PromptInput';
import { ImageCard } from '@/components/ImageCard';
import { GenerationTimer } from '@/components/GenerationTimer';
import { HistoryPanel } from '@/components/HistoryPanel';
import { QuickActions } from '@/components/QuickActions';
import { StatsWidget } from '@/components/StatsWidget';
import { ModelSelector } from '@/components/ModelSelector';
import { SingleImageDisplay } from '@/components/SingleImageDisplay';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { useSingleImageGeneration } from '@/hooks/useSingleImageGeneration';
import { useGenerationHistory } from '@/hooks/useLocalStorage';
import { samplePrompts } from '@/data/samplePrompts';
import { models } from '@/data/modelsdata';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Github, Heart, Crown, Settings, Moon, Sun, LogOut, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { stackClientApp } from '@/stack-client';
import Link from 'next/link';

export default function Home() {
  const user = useUser();
  const [prompt, setPrompt] = useState('');
  const [currentGeneration, setCurrentGeneration] = useState<any>(null);
  const [currentSingleGeneration, setCurrentSingleGeneration] = useState<any>(null);
  const [generationCount, setGenerationCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [generationMode, setGenerationMode] = useState<'dual' | 'single'>('dual');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  
  const { generateImages, isGenerating: isDualGenerating, error: dualError, clearError: clearDualError } = useImageGeneration();
  const { generateSingleImage, isGenerating: isSingleGenerating, error: singleError, clearError: clearSingleError } = useSingleImageGeneration();
  const { history, addToHistory, clearHistory } = useGenerationHistory();

  const isGenerating = isDualGenerating || isSingleGenerating;
  const error = dualError || singleError;

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

    if (generationMode === 'single' && !selectedModel) {
      toast.error('Please select a model for single generation');
      return;
    }

    if (generationMode === 'dual') {
      clearDualError();
      const result = await generateImages(prompt);
      
      if (result) {
        setCurrentGeneration(result);
        setCurrentSingleGeneration(null); // Clear single generation when switching modes
        addToHistory({
          prompt: result.prompt,
          modelAImage: result.modelAImage,
          modelBImage: result.modelBImage,
        });
        setGenerationCount(prev => prev + 1);
        toast.success('Images generated successfully!');
      } else if (dualError) {
        toast.error(dualError);
      }
    } else {
      clearSingleError();
      const selectedModelData = models.find(m => m.modelId === selectedModel);
      const result = await generateSingleImage(prompt, selectedModel!, selectedModelData?.name || 'Unknown Model');
      
      if (result) {
        setCurrentSingleGeneration(result);
        setCurrentGeneration(null); // Clear dual generation when switching modes
        addToHistory({
          prompt: result.prompt,
          modelAImage: result.generatedImage,
          modelBImage: null,
        });
        setGenerationCount(prev => prev + 1);
        toast.success('Image generated successfully!');
      } else if (singleError) {
        toast.error(singleError);
      }
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

  const handleSignOut = async () => {
    await user?.signOut();
    toast.success('Signed out successfully!');
  };

  // Show landing page for unauthenticated users
  if (!user) {
    return <LandingPage onGetStarted={() => stackClientApp.redirectToSignIn()} />;
  }

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
                  {generationMode === 'dual' 
                    ? "Compare models side-by-side with unlimited generations"
                    : `Single model generation with ${models.length}+ AI models`
                  }
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
              <Link href="/create">
                <Button variant="outline" size="sm" className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Create Mode
                </Button>
              </Link>
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
              {user && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user.displayName || user.primaryEmail || 'User'}
                  </span>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-1" />
                    Sign Out
                  </Button>
                </div>
              )}
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

            <ModelSelector
              selectedModel={selectedModel}
              onModelSelect={setSelectedModel}
              generationMode={generationMode}
              onModeChange={setGenerationMode}
            />
          </div>

          {/* Center Panel - Generation Results */}
          <div className="lg:col-span-3 space-y-6">
            {isGenerating && <GenerationTimer isGenerating={isGenerating} />}
            
            {/* Dual Model Results */}
            {generationMode === 'dual' && currentGeneration && !isGenerating && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Generated Images - Model Comparison</CardTitle>
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

            {/* Single Model Results */}
            {generationMode === 'single' && currentSingleGeneration && !isGenerating && (
              <SingleImageDisplay result={currentSingleGeneration} />
            )}

            {/* Empty State */}
            {!currentGeneration && !currentSingleGeneration && !isGenerating && (
              <Card className="text-center py-16">
                <CardContent>
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Ready to Create Magic</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    {generationMode === 'dual' 
                      ? "Enter a creative prompt and watch as two powerful AI models bring your imagination to life"
                      : "Choose your favorite AI model and generate stunning images with precision"
                    }
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="outline">✨ Unlimited</Badge>
                    <Badge variant="outline">🎨 High Quality</Badge>
                    <Badge variant="outline">⚡ Fast Generation</Badge>
                    {generationMode === 'single' && (
                      <Badge variant="outline">🎯 Model Choice</Badge>
                    )}
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
