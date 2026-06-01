'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, ArrowRight, BarChart3, Users, Zap, CheckCircle } from 'lucide-react';

export default function ClosingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background flex items-center justify-center py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main CTA Section */}
        <div className="text-center space-y-8 mb-16">
          <div className="inline-block">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Stripe for Carbon Projects
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-primary">
              Turns climate action into investment-ready assets in minutes
            </p>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground">
              Carbon projects worldwide are stuck. Verification takes months. Investors stay away. Billions in climate finance never reach the ground.
            </p>
            <p className="text-lg font-semibold">
              CarbonFlow changes that. One platform. Three capabilities. Instant credibility.
            </p>
          </div>

          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </div>

        {/* Value Proposition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="border-border/50 bg-card hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Register & Document</h3>
              <p className="text-sm text-muted-foreground">
                Easy project registration with automated verification readiness scoring
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Track Impact</h3>
              <p className="text-sm text-muted-foreground">
                Real-time metrics, risk assessment, and verification progress dashboards
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Monetize Credits</h3>
              <p className="text-sm text-muted-foreground">
                Trade verified carbon credits on the global marketplace with transparent pricing
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tech Stack & Features */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl border border-primary/20 p-8 mb-16">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Enterprise-Grade Platform</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <p className="text-sm text-muted-foreground">AWS Cloud Native</p>
                <p className="text-xs text-muted-foreground mt-1">Aurora PostgreSQL, S3, CloudWatch</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">Zero</div>
                <p className="text-sm text-muted-foreground">Manual Verification</p>
                <p className="text-xs text-muted-foreground mt-1">Automated scoring & assessment</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <p className="text-sm text-muted-foreground">Real-Time Monitoring</p>
                <p className="text-xs text-muted-foreground mt-1">Live metrics & impact tracking</p>
              </div>
            </div>

            <div className="pt-4 border-t border-primary/20">
              <p className="text-sm text-muted-foreground mb-4">Built with cutting-edge technology:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Next.js 16', 'TypeScript', 'Prisma ORM', 'AWS Aurora', 'Server Actions', 'JWT Auth', 'RBAC'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Numbers */}
        <div className="bg-card border border-border/50 rounded-2xl p-8 mb-16">
          <div className="text-center space-y-8">
            <h2 className="text-2xl font-bold">Ready to Scale Global Impact</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: '100+', label: 'Active Projects' },
                { number: '500K+', label: 'Carbon Credits' },
                { number: '50M', label: 'tCO₂e Impact' },
                { number: '180+', label: 'Organizations' },
              ].map((stat, idx) => (
                <div key={idx}>
                  <p className="text-3xl font-bold text-primary mb-1">{stat.number}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="space-y-4 md:space-y-0 md:flex gap-4 justify-center mb-12">
          <Link href="/dashboard/projects">
            <Button size="lg" className="gap-2 w-full md:w-auto bg-primary hover:bg-secondary text-lg h-12">
              Explore Live Projects
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>

          <Link href="/dashboard/marketplace">
            <Button size="lg" variant="outline" className="gap-2 w-full md:w-auto text-lg h-12">
              View Marketplace
              <Zap className="w-5 h-5" />
            </Button>
          </Link>

          <Link href="/demo">
            <Button size="lg" variant="outline" className="gap-2 w-full md:w-auto text-lg h-12">
              Replay Demo
              <Leaf className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Final Message */}
        <div className="text-center space-y-4 pt-8 border-t border-border/50">
          <p className="text-lg font-semibold text-muted-foreground">
            Unlock the full potential of your carbon projects
          </p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            CarbonFlow combines simple project management, intelligent verification assessment, and global marketplace connectivity to transform how organizations monetize their climate action initiatives.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
            <span>✓ AWS Architecture</span>
            <span>✓ Production-Ready</span>
            <span>✓ 48-Hour Build</span>
          </div>
        </div>
      </div>
    </div>
  );
}
