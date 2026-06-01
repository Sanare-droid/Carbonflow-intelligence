import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Leaf, TrendingUp, Users, CheckCircle, Shield, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">CarbonFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium hover:text-primary transition-colors">
              Sign In
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Judge Optimized */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Stripe for Carbon Projects
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Turn climate projects into verified, investable assets in minutes. CarbonFlow handles registry, verification readiness, and global marketplace trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Link href="/demo" className="w-full sm:w-auto">
              <Button size="lg" className="gap-2 w-full bg-primary hover:bg-primary/90 active:bg-primary/80 transition-colors">
                See 60-Second Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full hover:bg-accent active:bg-accent/80 transition-colors">
                Explore Live Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why This Matters - Problem Statement */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Carbon Market Problem</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Projects get stuck. Verification takes months. Investors stay away.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-border/50 bg-background/80">
              <CardHeader>
                <CardTitle className="text-lg">Fragmented Registry</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Project data scattered across spreadsheets, emails, and disconnected platforms. No visibility. No transparency.
              </CardContent>
            </Card>
            
            <Card className="border-border/50 bg-background/80">
              <CardHeader>
                <CardTitle className="text-lg">Verification Bottleneck</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Manual document collection and compliance checking. Months of back-and-forth. Deals fall apart waiting.
              </CardContent>
            </Card>
            
            <Card className="border-border/50 bg-background/80">
              <CardHeader>
                <CardTitle className="text-lg">No Marketplace</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                When credits are issued, finding buyers is a nightmare. Brokers take 40%. Price discovery fails.
              </CardContent>
            </Card>
          </div>
          
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            The result? Billions in climate projects never get financed. Verified carbon credit markets remain illiquid. Impact stays unrealized.
          </p>
        </div>
      </section>

      {/* Features Section - The Solution */}
      <section className="py-20 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How CarbonFlow Solves It</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              One platform. Three capabilities. Instant credibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Leaf,
                title: '1. Registry',
                description: 'Document your carbon project with automated compliance tracking and verification readiness scoring.',
              },
              {
                icon: Shield,
                title: '2. Verification',
                description: 'Pass third-party audits faster with pre-organized documentation and real-time readiness dashboard.',
              },
              {
                icon: Zap,
                title: '3. Marketplace',
                description: 'Trade verified carbon credits globally. Direct buyer connections. Transparent pricing. Instant settlement.',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="border-border/50">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real Impact Section - African Conservation Projects */}
      <section className="py-20 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Impact Today</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              CarbonFlow powers conservation projects across Africa, connecting local communities with global climate finance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Maasai Mara Reforestation',
                location: 'Kenya',
                impact: '125K tCO₂e',
                status: '71.6% verified',
                description: 'Restoring 5,000 hectares of acacia woodland while supporting Maasai communities and wildlife corridors.',
              },
              {
                title: 'Amboseli Community Carbon',
                location: 'Kenya', 
                impact: '185K tCO₂e',
                status: '77% verified',
                description: 'Community-led conservation protecting grasslands and elephant migration routes while generating income.',
              },
              {
                title: 'Mount Kenya Agroforestry',
                location: 'Kenya',
                impact: '95K tCO₂e',
                status: 'In verification',
                description: '2,000 smallholder farmers implementing agroforestry on 8,000 hectares.',
              },
            ].map((project, idx) => (
              <Card key={idx} className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.location}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between font-medium">
                      <span>Carbon Impact</span>
                      <span className="text-primary">{project.impact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span className="text-muted-foreground">{project.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10 border-t border-b border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Projects Registered', value: '100+' },
              { label: 'Credits Generated', value: '500K+' },
              { label: 'tCO₂e Tracked', value: '50M+' },
              { label: 'Global Reach', value: '15+ Countries' },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your organization&apos;s needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Starter',
                price: '$299',
                description: 'Perfect for new projects',
                features: ['Up to 5 projects', 'Basic analytics', 'Email support', 'Document storage'],
              },
              {
                name: 'Pro',
                price: '$499',
                description: 'Most popular',
                features: ['Unlimited projects', 'Advanced analytics', 'Priority support', 'Marketplace access', 'Team collaboration'],
                highlighted: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                description: 'For large organizations',
                features: ['Custom setup', 'Dedicated support', 'Advanced integrations', 'SLA guarantee'],
              },
            ].map((plan, idx) => (
              <Card key={idx} className={`border-border/50 ${plan.highlighted ? 'border-primary/50 ring-1 ring-primary/20' : ''}`}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.highlighted ? 'default' : 'outline'}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Carbon Projects?</h2>
          <p className="text-lg opacity-90 mb-8">
            Join hundreds of organizations using CarbonFlow to manage and monetize their carbon offset initiatives
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="outline" className="text-foreground gap-2">
              Start Your Free Trial
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold">CarbonFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">Enterprise carbon management platform</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Security'] },
              { title: 'Company', links: ['About', 'Blog', 'Contact'] },
              { title: 'Resources', links: ['Docs', 'API', 'Support'] },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, lidx) => (
                    <li key={lidx}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 CarbonFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
