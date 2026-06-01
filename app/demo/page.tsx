'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ChevronRight, CheckCircle, Leaf, TrendingUp, AlertCircle, BarChart3, ShoppingCart, Play, Pause } from 'lucide-react';

type DemoStep = 'intro' | 'create' | 'documents' | 'verification' | 'risk' | 'impact' | 'marketplace' | 'closing';

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState<DemoStep>('intro');
  const [showTechnical, setShowTechnical] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [demoData, setDemoData] = useState({
    projectName: 'Maasai Mara Reforestation Initiative',
    projectType: 'Reforestation',
    location: 'Kenya',
    estimatedCO2e: 125000,
  });

  // Auto-play effect: advance to next step every 5 seconds
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setTimeout(() => {
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < steps.length) {
        setCurrentStep(steps[nextIndex].id);
      } else {
        setAutoPlay(false); // Stop at the end
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [autoPlay, currentStep]);

  // Map steps to plain-language explanations
  const stepExplanations: Record<DemoStep, { title: string; explanation: string; technical?: string }> = {
    intro: {
      title: 'What You\'ll See',
      explanation: 'Follow a real African conservation project through CarbonFlow. You\'ll understand how we turn projects into verified, investable assets.',
    },
    create: {
      title: 'Registry',
      explanation: 'Projects start here. Organizations register carbon projects with basic info (name, type, location, estimated impact). Our platform stores it securely.',
      technical: 'Data stored in PostgreSQL with role-based access control',
    },
    documents: {
      title: 'Document Management',
      explanation: 'Projects need supporting documents (plans, methodologies, reports). CarbonFlow organizes them securely and tracks their status.',
      technical: 'Files stored in Amazon S3 with presigned URLs and audit logging',
    },
    verification: {
      title: 'Readiness Score',
      explanation: 'Our system automatically calculates how ready a project is for third-party verification. This speeds up the process from months to days.',
      technical: 'Real-time calculations based on database records; rules engine evaluates completion status',
    },
    risk: {
      title: 'Risk Assessment',
      explanation: 'Before investors buy credits, they need to understand risks. Our system evaluates environmental, market, and operational factors automatically.',
      technical: 'Server-side risk engine analyzing historical data and project characteristics',
    },
    impact: {
      title: 'Impact Tracking',
      explanation: 'As projects execute, impact metrics come in. CarbonFlow aggregates and verifies these numbers in real-time.',
      technical: 'ImpactMetric model with verification workflow; automatic aggregation queries',
    },
    marketplace: {
      title: 'Trading Platform',
      explanation: 'When credits are verified, they can be sold. CarbonFlow connects sellers with global buyers, eliminating expensive brokers.',
      technical: 'Trade model with order matching; Stripe integration for settlement',
    },
    closing: {
      title: 'Done',
      explanation: 'You\'ve seen the entire flow. From scattered climate projects to verified, traded credits. That\'s the CarbonFlow difference.',
      technical: '',
    },
  };

  const steps: Array<{ id: DemoStep; title: string; icon: React.ReactNode }> = [
    { id: 'intro', title: 'Welcome', icon: <Leaf className="w-5 h-5" /> },
    { id: 'create', title: 'Create Project', icon: <CheckCircle className="w-5 h-5" /> },
    { id: 'documents', title: 'Upload Docs', icon: <CheckCircle className="w-5 h-5" /> },
    { id: 'verification', title: 'Verification', icon: <CheckCircle className="w-5 h-5" /> },
    { id: 'risk', title: 'Risk Score', icon: <AlertCircle className="w-5 h-5" /> },
    { id: 'impact', title: 'Impact Metrics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'marketplace', title: 'Marketplace', icon: <ShoppingCart className="w-5 h-5" /> },
    { id: 'closing', title: 'Summary', icon: <TrendingUp className="w-5 h-5" /> },
  ];

  const getStepIndex = (step: DemoStep) => steps.findIndex((s) => s.id === step);
  const currentStepIndex = getStepIndex(currentStep);
  const progressPercent = ((currentStepIndex + 1) / steps.length) * 100;

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id);
    }
  };

  const previousStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">CarbonFlow Judge Demo</h1>
          </div>
          <p className="text-muted-foreground text-lg">Discover how CarbonFlow turns carbon projects into investment-ready assets</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-primary">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Step Indicators & Controls */}
        <div className="flex justify-between items-center mb-8 gap-4">
          <div className="flex justify-between flex-1 overflow-x-auto gap-2 pb-2">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => {
                  setCurrentStep(step.id);
                  if (autoPlay) setAutoPlay(false); // Stop auto-play when manually clicking
                }}
                className={`flex flex-col items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  idx === currentStepIndex
                    ? 'bg-primary text-white'
                    : idx < currentStepIndex
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                {step.icon}
                <span className="text-xs font-medium">{step.title}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoPlay(!autoPlay)}
              className={autoPlay ? 'bg-primary/10 text-primary border-primary' : ''}
            >
              {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Link href="/demo/closing">
              <Button variant="outline" size="sm">
                Skip
              </Button>
            </Link>
          </div>
        </div>

        {/* Step Explanation */}
        <Card className="border-primary/20 bg-primary/5 mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-semibold text-primary mb-1">{stepExplanations[currentStep].title}</p>
                <p className="text-sm text-muted-foreground">{stepExplanations[currentStep].explanation}</p>
                {showTechnical && stepExplanations[currentStep].technical && (
                  <p className="text-xs text-muted-foreground mt-2 italic border-t border-primary/10 pt-2">
                    Technical: {stepExplanations[currentStep].technical}
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowTechnical(!showTechnical)}
                className="text-xs text-primary hover:text-primary/80 ml-4 whitespace-nowrap"
              >
                {showTechnical ? 'Hide' : 'Show'} Technical
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="border-border/50 mb-8">
          <CardContent className="pt-8">
            {currentStep === 'intro' && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold">Welcome to CarbonFlow</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    In this 2-minute demo, you'll see how organizations use CarbonFlow to:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Create & Document</h3>
                    <p className="text-sm text-muted-foreground">Register projects with comprehensive documentation</p>
                  </div>

                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <AlertCircle className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Assess & Verify</h3>
                    <p className="text-sm text-muted-foreground">Get AI-powered risk assessment and verification readiness</p>
                  </div>

                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <ShoppingCart className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Monetize</h3>
                    <p className="text-sm text-muted-foreground">Trade carbon credits on the global marketplace</p>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    We'll use the <span className="font-semibold text-primary">Maasai Mara Reforestation Initiative</span> as our example
                  </p>
                </div>
              </div>
            )}

            {currentStep === 'create' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Step 1: Create Carbon Project</h2>
                  <p className="text-muted-foreground mb-6">Organizations register their carbon offset projects with essential information</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 space-y-4 border border-border">
                  <div>
                    <label className="text-sm font-medium">Project Name</label>
                    <p className="text-lg font-semibold mt-1">{demoData.projectName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Project Type</label>
                      <p className="text-lg font-semibold mt-1">{demoData.projectType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Location</label>
                      <p className="text-lg font-semibold mt-1">{demoData.location}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Estimated CO₂e Reduction</label>
                    <p className="text-2xl font-bold mt-1 text-primary">{demoData.estimatedCO2e.toLocaleString()} tonnes</p>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">Real data:</span> Maasai Mara project restores 5,000 hectares of native acacia woodland, supporting local communities and wildlife
                  </p>
                </div>
              </div>
            )}

            {currentStep === 'documents' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Step 2: Upload Documents</h2>
                  <p className="text-muted-foreground mb-6">Secure document storage with S3 integration for project verification</p>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'Project Plan', type: 'PDF', size: '2.4 MB', status: 'Verified' },
                    { name: 'Methodology Document', type: 'PDF', size: '1.8 MB', status: 'Verified' },
                    { name: 'Environmental Impact Assessment', type: 'PDF', size: '3.2 MB', status: 'In Review' },
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                          <FileIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                      <Badge variant={doc.status === 'Verified' ? 'default' : 'secondary'}>{doc.status}</Badge>
                    </div>
                  ))}
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">Built-in:</span> Secure S3 upload with pre-signed URLs, audit logging, and document versioning
                  </p>
                </div>
              </div>
            )}

            {currentStep === 'verification' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Step 3: Verification Readiness</h2>
                  <p className="text-muted-foreground mb-6">Real-time calculation of project verification readiness score</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 text-center border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-2">Verification Readiness Score</p>
                    <p className="text-5xl font-bold text-primary mb-2">87%</p>
                    <p className="text-sm font-medium text-muted-foreground">Project is verification-ready</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { item: 'Project Documentation', status: 'Complete' },
                      { item: 'Environmental Assessment', status: 'Complete' },
                      { item: 'Community Engagement', status: 'In Progress' },
                      { item: 'Baseline Data', status: 'Complete' },
                    ].map((check, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm font-medium">{check.item}</span>
                        <Badge variant={check.status === 'Complete' ? 'default' : 'secondary'}>{check.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">Automated:</span> Database-driven calculations updating in real-time as documents are added
                  </p>
                </div>
              </div>
            )}

            {currentStep === 'risk' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Step 4: AI Risk Assessment</h2>
                  <p className="text-muted-foreground mb-6">Intelligent risk scoring across environmental, market, and operational factors</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-lg p-6 border border-emerald-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-emerald-700 font-medium">Overall Risk Level</p>
                        <p className="text-3xl font-bold text-emerald-900 mt-1">LOW</p>
                      </div>
                      <Badge className="bg-emerald-600">Score: 18/100</Badge>
                    </div>
                    <p className="text-sm text-emerald-700">Project shows strong risk management and community engagement</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { label: 'Environmental Risk', score: 'Low', color: 'emerald' },
                      { label: 'Market Risk', score: 'Medium', color: 'amber' },
                      { label: 'Operational Risk', score: 'Low', color: 'emerald' },
                    ].map((risk, idx) => (
                      <div key={idx} className={`p-4 rounded-lg bg-${risk.color}-50 border border-${risk.color}-200`}>
                        <p className="text-sm text-muted-foreground mb-2">{risk.label}</p>
                        <Badge variant="outline" className={`bg-${risk.color}-100 text-${risk.color}-800 border-${risk.color}-300`}>
                          {risk.score}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">Powered by:</span> Server-side risk assessment engine analyzing historical data and project characteristics
                  </p>
                </div>
              </div>
            )}

            {currentStep === 'impact' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Step 5: Impact Dashboard</h2>
                  <p className="text-muted-foreground mb-6">Real-time metrics tracking environmental and social impact</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: 'CO₂ Sequestered', value: '89.5K', unit: 'tonnes', color: 'primary' },
                    { label: 'Trees Planted', value: '250K', unit: 'saplings', color: 'emerald' },
                    { label: 'Jobs Created', value: '185', unit: 'positions', color: 'blue' },
                    { label: 'Community Members', value: '2,400', unit: 'people', color: 'purple' },
                  ].map((metric, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-muted/50 border border-border">
                      <p className="text-xs text-muted-foreground mb-2">{metric.label}</p>
                      <p className="text-2xl font-bold text-primary mb-1">{metric.value}</p>
                      <p className="text-xs text-muted-foreground">{metric.unit}</p>
                    </div>
                  ))}
                </div>

                <div className="h-48 bg-muted/50 rounded-lg border border-border flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Impact trends over time (real database data)</p>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">Real-time:</span> Metrics aggregated from database with automatic verification and audit trails
                  </p>
                </div>
              </div>
            )}

            {currentStep === 'marketplace' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Step 6: Carbon Credit Marketplace</h2>
                  <p className="text-muted-foreground mb-6">Trade verified carbon credits on the global market</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-6 border border-border">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Credits Generated</p>
                        <p className="text-2xl font-bold text-primary">125K</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Credits Verified</p>
                        <p className="text-2xl font-bold text-emerald-600">89.5K</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Credits Sold</p>
                        <p className="text-2xl font-bold text-blue-600">42.3K</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Avg Price</p>
                        <p className="text-2xl font-bold">$15.40</p>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      <h4 className="font-semibold mb-3">Recent Trades</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 bg-background rounded">
                          <span>1,000 credits to EcoTech Solutions</span>
                          <span className="font-semibold">$15,400</span>
                        </div>
                        <div className="flex justify-between p-2 bg-background rounded">
                          <span>500 credits to Green Finance Corp</span>
                          <span className="font-semibold">$7,700</span>
                        </div>
                        <div className="flex justify-between p-2 bg-background rounded">
                          <span>2,500 credits to Impact Investors Ltd</span>
                          <span className="font-semibold">$38,500</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">Multi-org platform:</span> Connects buyers and sellers globally with automated trade settlement and compliance
                  </p>
                </div>
              </div>
            )}

            {currentStep === 'closing' && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold">CarbonFlow: The Complete Solution</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    From project registration to global marketplace transactions—all in one platform
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-primary" />
                        For Project Developers
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p>✓ Easy project registration & documentation</p>
                      <p>✓ Automated verification readiness scoring</p>
                      <p>✓ Real-time impact tracking</p>
                      <p>✓ Global credit marketplace access</p>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        For Investors
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p>✓ Verified project access</p>
                      <p>✓ Risk assessment & impact metrics</p>
                      <p>✓ Transparent marketplace pricing</p>
                      <p>✓ Secure transaction settlement</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-lg p-8 border border-primary/20 text-center">
                  <p className="text-2xl font-bold mb-2">CarbonFlow turns carbon projects into investment-ready assets in minutes.</p>
                  <p className="text-muted-foreground">Enterprise-grade platform built with Next.js, Aurora PostgreSQL, and AWS</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <p className="font-semibold text-primary mb-1">100+ Projects</p>
                    <p className="text-muted-foreground">Active carbon offset initiatives</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">500K+ Credits</p>
                    <p className="text-muted-foreground">Trading on global marketplace</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">50M+ tCO₂e</p>
                    <p className="text-muted-foreground">Total verified impact</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center gap-4">
          <Button
            onClick={previousStep}
            variant="outline"
            disabled={currentStepIndex === 0}
            className="flex items-center gap-2 hover:bg-accent active:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </Button>

          <div className="text-sm text-muted-foreground">
            {currentStep === 'closing' ? (
              <div className="flex flex-col items-center gap-3">
                <Link href="/dashboard/projects" className="block w-full">
                  <Button className="gap-2 w-full bg-primary hover:bg-primary/90 active:bg-primary/80 transition-colors">
                    View Live Dashboard
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/dashboard/marketplace" className="block w-full">
                  <Button variant="outline" className="gap-2 w-full hover:bg-accent active:bg-accent/80 transition-colors">
                    Explore Marketplace
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ) : null}
          </div>

          <Button
            onClick={nextStep}
            disabled={currentStepIndex === steps.length - 1}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 active:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
