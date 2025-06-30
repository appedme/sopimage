'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function FloatingCreateButton() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Show the button after a delay and only if not on create page
    const timer = setTimeout(() => {
      if (pathname !== '/create') {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isVisible || pathname === '/create') {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <Link href="/create">
          <Button
            size="lg"
            className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white dark:border-gray-800"
          >
            <Sparkles className="w-6 h-6" />
          </Button>
        </Link>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Create Mode
          </div>
        </div>
        
        {/* Dismiss button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center text-xs transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
