'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Sparkles, Star, Users, Rocket, Heart, ArrowRight, Download, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const sampleImages = [
    {
      id: 1,
      prompt: "A beautiful cyberpunk girl with neon hair and futuristic clothing in a neon-lit city",
      gptUrl: "https://messages-prod.27c852f3500f38c1e7786e2c9ff9e48f.r2.cloudflarestorage.com/dcbf2e16-f190-4660-956f-61ea92c1b9c4/1751265956840-f70a337f-0c5a-4497-81ff-42d8c3ed5c71.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=c86e09ae0bc1d897b03dfaa30a8b51f3%2F20250630%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250630T064557Z&X-Amz-Expires=3600&X-Amz-Signature=6c138e37f96ef864bfc8ab4b6e2549a3a8071a5e01078f5d72dd2170e64e587b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
      dalleUrl: "https://messages-prod.27c852f3500f38c1e7786e2c9ff9e48f.r2.cloudflarestorage.com/dcbf2e16-f190-4660-956f-61ea92c1b9c4/1751265927803-60c94829-563f-4023-a6e5-707b0b3f3dc1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=c86e09ae0bc1d897b03dfaa30a8b51f3%2F20250630%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250630T064528Z&X-Amz-Expires=3600&X-Amz-Signature=c5356f8c5349684044977d127107a67425741f2edd0347215378f6074cdaf153&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Unlimited Generation",
      description: "Create unlimited AI images with no restrictions or watermarks"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Dual AI Models",
      description: "Compare results from GPT-Image-1 and DALL-E-3 side by side"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "High Quality",
      description: "Professional-grade images perfect for any creative project"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Free Forever",
      description: "No hidden costs, no premium tiers - completely free to use"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Images Generated" },
    { number: "2", label: "AI Models" },
    { number: "∞", label: "Free Generations" },
    { number: "30s", label: "Average Speed" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 dark:from-purple-400/5 dark:to-pink-400/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-4 py-2">
              <Rocket className="w-4 h-4 mr-2" />
              Free Unlimited AI Image Generation
            </Badge>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Create Stunning
              <br />
              AI Images
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your imagination into reality with our powerful AI image generator. 
              Compare results from GPT-Image-1 and DALL-E-3 - completely free, forever.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
              >
                Start Creating Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                View Examples
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of AI image generation with our cutting-edge platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg flex items-center justify-center mx-auto mb-4 text-purple-600 dark:text-purple-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Images Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              See What You Can Create
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real examples generated by our AI models - see the difference between GPT-Image-1 and DALL-E-3
            </p>
          </div>

          {sampleImages.map((sample) => (
            <div key={sample.id} className="max-w-6xl mx-auto mb-16">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <Badge variant="outline" className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 px-4 py-2">
                      Generated Example
                    </Badge>
                    <h3 className="text-xl font-semibold mt-4 mb-2">Prompt Used:</h3>
                    <p className="text-muted-foreground italic">"{sample.prompt}"</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* GPT-Image-1 Result */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                          GPT-Image-1
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => window.open(sample.gptUrl, '_blank')}>
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="aspect-square relative rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                        <Image
                          src={sample.gptUrl}
                          alt={`GPT-Image-1: ${sample.prompt}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </div>

                    {/* DALL-E-3 Result */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                          DALL-E-3
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => window.open(sample.dalleUrl, '_blank')}>
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="aspect-square relative rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                        <Image
                          src={sample.dalleUrl}
                          alt={`DALL-E-3: ${sample.prompt}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Creating?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of creators who are already using our platform to bring their ideas to life
          </p>
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            Get Started Now - It's Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t">
        <div className="container mx-auto px-4">
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
};
