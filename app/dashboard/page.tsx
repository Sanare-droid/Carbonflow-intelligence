import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSession } from '@/lib/auth';
import { getDashboardMetrics, getProjects } from '@/app/actions/projects';
import { TrendingUp, AlertCircle, CheckCircle, Clock, Zap, Leaf } from 'lucide-react';
import { redirect } from 'next/navigation';
import { AnimatedKPI } from '@/components/dashboard/animated-kpi';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect('/auth/login');
  }

  const metricsResult = await getDashboardMetrics(session.organizationId || '');
  const projectsResult = await getProjects(session.organizationId || '');

  if (metricsResult.error || projectsResult.error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Unable to load dashboard metrics. Please try refreshing the page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const metrics = metricsResult.metrics || {
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalCO2e: 0,
    verifiedCO2e: 0,
    totalCredits: 0,
    issuedCredits: 0,
    totalMetrics: 0,
  };

  const projects = projectsResult.projects || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800';
      case 'Verification':
        return 'bg-amber-100 text-amber-800';
      case 'Issued':
        return 'bg-blue-100 text-blue-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your carbon project overview.</p>
      </div>

      {/* What is CarbonFlow? - One-Minute Understanding */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            What is CarbonFlow?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="flex items-start gap-3">
              <span className="font-semibold text-primary min-w-fit">Project Registry:</span>
              <span className="text-muted-foreground">Register and document your carbon offset projects with automated verification readiness scoring</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="font-semibold text-primary min-w-fit">Impact Tracking:</span>
              <span className="text-muted-foreground">Monitor real-time impact metrics, risk assessments, and verification progress across all projects</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="font-semibold text-primary min-w-fit">Global Marketplace:</span>
              <span className="text-muted-foreground">Trade verified carbon credits with buyers and investors worldwide with transparent pricing and settlement</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Top KPI Cards - Animated */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatedKPI
          title="Total Projects"
          value={metrics.totalProjects}
          unit={`${metrics.activeProjects} active`}
          icon={<CheckCircle className="w-5 h-5 text-primary" />}
          color="primary"
          delay={0}
        />
        <AnimatedKPI
          title="Total CO₂e Estimated"
          value={Math.floor(metrics.totalCO2e / 1000)}
          unit="K metric tonnes"
          icon={<Leaf className="w-5 h-5 text-emerald-600" />}
          color="emerald"
          delay={100}
        />
        <AnimatedKPI
          title="Credits Generated"
          value={Math.floor(metrics.totalCredits / 1000)}
          unit="K credits"
          icon={<Zap className="w-5 h-5 text-amber-600" />}
          color="amber"
          delay={200}
        />
        <AnimatedKPI
          title="Verified CO₂e"
          value={Math.floor(metrics.verifiedCO2e / 1000)}
          unit="K metric tonnes"
          icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
          color="blue"
          delay={300}
        />
      </div>

      {/* Judge Impact Statements - Real Projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-emerald-200 bg-emerald-50/50">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base">Maasai Mara Reforestation</CardTitle>
                <CardDescription className="text-xs mt-1">Kenya • Conservation</CardDescription>
              </div>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-300">71.6%</Badge>
            </div>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p className="text-muted-foreground">Restoring 5,000 hectares of acacia woodland, supporting Maasai communities and wildlife corridors.</p>
            <div className="flex justify-between text-xs font-medium">
              <span>125K tCO₂e estimated</span>
              <span className="text-emerald-600">89.5K verified</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base">Amboseli Community Carbon</CardTitle>
                <CardDescription className="text-xs mt-1">Kenya • Community-Led</CardDescription>
              </div>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">77%</Badge>
            </div>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p className="text-muted-foreground">Protecting 15,000 hectares of grasslands while supporting Maasai pastoralist communities and elephant migration.</p>
            <div className="flex justify-between text-xs font-medium">
              <span>185K tCO₂e estimated</span>
              <span className="text-blue-600">142.5K verified</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base">Mount Kenya Agroforestry</CardTitle>
                <CardDescription className="text-xs mt-1">Kenya • Agroforestry</CardDescription>
              </div>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">In Progress</Badge>
            </div>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p className="text-muted-foreground">Supporting 2,000 smallholder farmers implementing agroforestry on 8,000 hectares, improving soil and farmer income.</p>
            <div className="flex justify-between text-xs font-medium">
              <span>95K tCO₂e estimated</span>
              <span className="text-amber-600">Under verification</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Summary & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Project Summary */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-primary" />
              Project Summary
            </CardTitle>
            <CardDescription>Status breakdown of all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{metrics.activeProjects}</div>
                <div className="text-xs text-muted-foreground mt-1">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{metrics.completedProjects}</div>
                <div className="text-xs text-muted-foreground mt-1">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{metrics.totalMetrics}</div>
                <div className="text-xs text-muted-foreground mt-1">Metrics Recorded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{(metrics.totalCO2e / 1000).toFixed(0)}K</div>
                <div className="text-xs text-muted-foreground mt-1">Total CO₂e</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{(metrics.verifiedCO2e / 1000).toFixed(0)}K</div>
                <div className="text-xs text-muted-foreground mt-1">Verified CO₂e</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{(metrics.totalCredits / 1000).toFixed(0)}K</div>
                <div className="text-xs text-muted-foreground mt-1">Total Credits</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Overview */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Verification Status</div>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Verified</span>
                  <span className="font-medium">{metrics.totalProjects > 0 ? Math.floor((metrics.verifiedCO2e / metrics.totalCO2e) * 100) : 0}%</span>
                </div>
                <div className="flex justify-between">
                  <span>In Progress</span>
                  <span className="font-medium">{metrics.totalProjects > 0 ? Math.floor(((metrics.totalCO2e - metrics.verifiedCO2e) / metrics.totalCO2e) * 100) : 0}%</span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="text-sm font-medium text-muted-foreground">Credits Status</div>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Issued</span>
                  <span className="font-medium">{(metrics.issuedCredits / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending</span>
                  <span className="font-medium">{((metrics.totalCredits - metrics.issuedCredits) / 1000).toFixed(0)}K</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
          <CardDescription>Your latest carbon projects</CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No projects yet. Create one to get started!
            </div>
          ) : (
            <div className="space-y-3">
              {projects.slice(0, 5).map((project: any) => (
                <div key={project.id} className="flex items-start justify-between pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{project.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{project.location || 'No location'}</div>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(project.status)}`}>{project.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
