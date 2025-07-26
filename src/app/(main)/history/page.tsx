'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@stackframe/stack';
import { useGenerationHistory } from '@/hooks/useLocalStorage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  History, 
  Search, 
  Filter, 
  ExternalLink, 
  Copy, 
  Trash2,
  Image as ImageIcon,
  Calendar,
  Clock,
  Sparkles,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function HistoryPage() {
  const user = useUser();
  const { history, clearHistory } = useGenerationHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHistory, setFilteredHistory] = useState(history);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = history.filter((item: any) => 
        item.prompt.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredHistory(filtered);
    } else {
      setFilteredHistory(history);
    }
  }, [searchTerm, history]);

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success('Prompt copied to clipboard!');
  };

  const handleOpenImage = (imageUrl: string) => {
    window.open(imageUrl, '_blank');
    toast.success('Image opened in new tab!');
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <Card>
              <CardContent className="p-8">
                <History className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
                <p className="text-muted-foreground mb-6">
                  Please sign in to view your generation history.
                </p>
                <Link href="/">
                  <Button className="w-full">
                    Go to Home
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
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
                <p className="text-sm text-muted-foreground">Generation History</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-3">
              <Link href="/create">
                <Button variant="outline" size="sm">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Create Mode
                </Button>
              </Link>
              <Link href="/generate">
                <Button variant="outline" size="sm">
                  Compare Models
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Your Generation History
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through all your AI-generated images and revisit your creative journey.
            </p>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search your prompts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="px-3 py-1">
                {filteredHistory.length} images
              </Badge>
              {history.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    clearHistory();
                    toast.success('History cleared!');
                  }}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* History Grid */}
          {filteredHistory.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHistory.map((item: any, index: number) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative group">
                    {item.modelAImage && (
                      <img
                        src={item.modelAImage.image}
                        alt={item.prompt}
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleOpenImage(item.modelAImage?.image || '')}
                          className="bg-white/90 hover:bg-white text-black"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Open
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleCopyPrompt(item.prompt)}
                          className="bg-white/90 hover:bg-white text-black"
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <p className="text-sm font-medium mb-2 line-clamp-2">
                      {item.prompt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(item.timestamp || Date.now())}
                      </div>
                      {item.modelBImage && (
                        <Badge variant="outline" className="text-xs">
                          Dual Mode
                        </Badge>
                      )}
                    </div>
                    
                    {item.modelBImage && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleOpenImage(item.modelAImage?.image || '')}
                            className="aspect-square rounded bg-gray-100 dark:bg-gray-800 overflow-hidden"
                          >
                            <img
                              src={item.modelAImage?.image}
                              alt="Model A"
                              className="w-full h-full object-cover"
                            />
                          </button>
                          <button
                            onClick={() => handleOpenImage(item.modelBImage?.image || '')}
                            className="aspect-square rounded bg-gray-100 dark:bg-gray-800 overflow-hidden"
                          >
                            <img
                              src={item.modelBImage?.image}
                              alt="Model B"
                              className="w-full h-full object-cover"
                            />
                          </button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-16">
              <CardContent>
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <History className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {searchTerm ? 'No matching images' : 'No images yet'}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {searchTerm 
                    ? `No images found matching "${searchTerm}". Try a different search term.`
                    : 'Start generating images to build your creative history.'
                  }
                </p>
                {!searchTerm && (
                  <Link href="/create">
                    <Button>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Create Your First Image
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
