'use client';

import { Button } from '@/components/ui/button';
import { 
  Github, 
  Twitter, 
  Heart, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AIImageGen
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Create stunning AI-generated images with the power of multiple AI models. 
              Fast, free, and unlimited.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <div className="space-y-2">
              <Link href="/create" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                Create Images
              </Link>
              <Link href="/generate" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                Compare Models
              </Link>
              <Link href="/history" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                Generation History
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Resources
            </h3>
            <div className="space-y-2">
              <a 
                href="#" 
                className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors"
              >
                API Documentation
              </a>
              <a 
                href="#" 
                className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors"
              >
                Prompt Guide
              </a>
              <a 
                href="#" 
                className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors"
              >
                Support
              </a>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Connect
            </h3>
            <div className="flex space-x-3">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-9 h-9 p-0"
              >
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-9 h-9 p-0"
              >
                <a 
                  href="https://x.com/sh20raj" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Twitter/X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </Button>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Follow{' '}
              <a 
                href="https://x.com/sh20raj" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center"
              >
                @sh20raj
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> by{' '}
              <a 
                href="https://x.com/sh20raj" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:underline ml-1"
              >
                @sh20raj
              </a>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-300">
              © {currentYear} AIImageGen. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
