'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Info, Clock, TrendingUp, Users } from 'lucide-react';

interface StatsData {
  totalGenerations: number;
  averageTime: number;
  modelsAvailable: number;
  isOnline: boolean;
}

interface StatsWidgetProps {
  stats: StatsData;
}

export const StatsWidget = ({ stats }: StatsWidgetProps) => {
  const formatTime = (seconds: number) => {
    return `${seconds}s avg`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Platform Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">
              {stats.totalGenerations.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Total Images</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-600">
              {formatTime(stats.averageTime)}
            </div>
            <div className="text-xs text-muted-foreground">Generation Time</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Server Status</span>
            <Badge 
              variant={stats.isOnline ? "default" : "destructive"}
              className="text-xs"
            >
              {stats.isOnline ? "Online" : "Offline"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span>Models Available</span>
            <Badge variant="secondary" className="text-xs">
              {stats.modelsAvailable} Active
            </Badge>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="w-3 h-3" />
            <span>All models are free to use</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
