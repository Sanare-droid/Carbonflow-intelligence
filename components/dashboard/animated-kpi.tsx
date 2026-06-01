'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Leaf, Zap, CheckCircle } from 'lucide-react';

interface AnimatedKPIProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  trend?: number;
  color?: 'primary' | 'emerald' | 'blue' | 'amber';
  delay?: number;
}

export function AnimatedKPI({
  title,
  value,
  unit,
  icon,
  trend,
  color = 'primary',
  delay = 0,
}: AnimatedKPIProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const timer = setTimeout(() => {
      setIsVisible(true);
      interval = setInterval(() => {
        setDisplayValue((prev) => {
          const increment = Math.ceil(value / 20);
          if (prev + increment >= value) {
            clearInterval(interval);
            return value;
          }
          return prev + increment;
        });
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [value, delay]);

  const colorClasses = {
    primary: 'text-primary',
    emerald: 'text-emerald-600',
    blue: 'text-blue-600',
    amber: 'text-amber-600',
  };

  const bgClasses = {
    primary: 'from-primary/5 to-primary/10',
    emerald: 'from-emerald-5 to-emerald-10',
    blue: 'from-blue-5 to-blue-10',
    amber: 'from-amber-5 to-amber-10',
  };

  return (
    <Card className={`border-border/50 transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
          <span>{title}</span>
          <div className={`p-2 rounded-lg bg-gradient-to-br ${bgClasses[color]}`}>{icon}</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${colorClasses[color]} transition-all duration-500`}>
          {displayValue.toLocaleString()}
        </div>
        <div className="flex items-center gap-1 mt-2 text-xs">
          {trend !== undefined && trend > 0 && (
            <>
              <TrendingUp className={`w-3 h-3 ${colorClasses[color]}`} />
              <span className={colorClasses[color]}>+{trend}% this month</span>
            </>
          )}
          <span className="text-muted-foreground">{unit}</span>
        </div>
      </CardContent>
    </Card>
  );
}
