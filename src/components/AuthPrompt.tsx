'use client';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogIn, Crown, Zap, Star, Shield } from 'lucide-react';

interface AuthPromptProps {
  onContinueWithoutAuth: () => void;
}

export const AuthPrompt = ({ onContinueWithoutAuth }: AuthPromptProps) => {
  const handleStackAuthLogin = () => {
    // This would integrate with StackAuth
    // For now, we'll just show an alert
    alert('StackAuth integration would be implemented here. For demo purposes, continuing without auth.');
    onContinueWithoutAuth();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Image Generator
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Create unlimited AI images with GPT-Image-1 and DALL-E-3
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <Crown className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Free Unlimited Access</p>
                <p className="text-sm text-green-600">No limits, no watermarks</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Star className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-800">Dual AI Models</p>
                <p className="text-sm text-blue-600">GPT-Image-1 & DALL-E-3</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <Shield className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-purple-800">More Models Coming</p>
                <p className="text-sm text-purple-600">Midjourney, Stable Diffusion & more</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleStackAuthLogin}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              size="lg"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login with StackAuth (Free)
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full" size="lg">
                  Continue Without Login
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Continue Without Login?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You can use the image generator without logging in, but you won't be able to:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Save your generation history</li>
                      <li>Access premium features (coming soon)</li>
                      <li>Sync across devices</li>
                    </ul>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onContinueWithoutAuth}>
                    Continue Anyway
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="text-center">
            <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
              🚀 More AI models coming soon!
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
