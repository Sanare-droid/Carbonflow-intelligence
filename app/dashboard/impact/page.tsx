import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockKPIs, mockProjects } from '@/lib/mock-data';
import { Users, Leaf, Home, Sprout, Heart, Zap } from 'lucide-react';

export default function ImpactPage() {
  const impactMetrics = [
    {
      icon: Users,
      label: 'Jobs Created',
      value: mockKPIs.totalImpact.jobs,
      formatted: `${(mockKPIs.totalImpact.jobs / 1000).toFixed(1)}K`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Home,
      label: 'Households Benefited',
      value: mockKPIs.totalImpact.households,
      formatted: `${(mockKPIs.totalImpact.households / 1000).toFixed(1)}K`,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Leaf,
      label: 'Trees Planted',
      value: mockKPIs.totalImpact.trees,
      formatted: `${(mockKPIs.totalImpact.trees / 1000000).toFixed(1)}M`,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: Sprout,
      label: 'Land Restored',
      value: mockKPIs.totalImpact.land,
      formatted: `${(mockKPIs.totalImpact.land / 1000).toFixed(1)}K ha`,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      icon: Heart,
      label: 'Women Beneficiaries',
      value: mockKPIs.totalImpact.women,
      formatted: `${(mockKPIs.totalImpact.women / 1000).toFixed(1)}K`,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      icon: Zap,
      label: 'Youth Beneficiaries',
      value: mockKPIs.totalImpact.youth,
      formatted: `${(mockKPIs.totalImpact.youth / 1000).toFixed(1)}K`,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Community Impact</h1>
        <p className="text-muted-foreground mt-1">Positive social and environmental outcomes from our projects</p>
      </div>

      {/* Impact Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {impactMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className={`border-border/50 overflow-hidden`}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                    <div className="text-4xl font-bold mt-2 text-foreground">{metric.formatted}</div>
                    <div className="text-xs text-muted-foreground mt-3">
                      {metric.value > 0 ? `Cumulative impact across ${mockProjects.length} projects` : 'No impact yet'}
                    </div>
                  </div>
                  <div className={`${metric.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Impact by Project */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Impact by Project</CardTitle>
          <CardDescription>Individual project contributions to overall impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProjects.slice(0, 6).map((project) => (
              <div key={project.id} className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold">{project.name}</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-3">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Jobs</div>
                    <div className="text-lg font-bold mt-1">{project.jobsCreated}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Households</div>
                    <div className="text-lg font-bold mt-1">{(project.households / 1000).toFixed(0)}K</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Trees</div>
                    <div className="text-lg font-bold mt-1">{(project.treesPlanted / 1000000).toFixed(1)}M</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Land (ha)</div>
                    <div className="text-lg font-bold mt-1">{(project.landRestored / 1000).toFixed(1)}K</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Women</div>
                    <div className="text-lg font-bold mt-1">{project.womenBeneficiaries}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Youth</div>
                    <div className="text-lg font-bold mt-1">{project.youthBeneficiaries}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environmental Impact */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-600" />
            Environmental Impact
          </CardTitle>
          <CardDescription>Carbon reduction and ecological restoration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="text-sm text-emerald-800 font-medium">Annual CO₂ Emission Reduction</div>
              <div className="text-3xl font-bold text-emerald-700 mt-2">{(mockKPIs.totalEmissionReduction / 1000000).toFixed(2)}M tCO₂e</div>
              <div className="text-xs text-emerald-700 mt-2">Equivalent to removing {Math.round(mockKPIs.totalEmissionReduction / 4.6)} cars from roads for one year</div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-sm text-green-800 font-medium">Total Land Restored</div>
              <div className="text-3xl font-bold text-green-700 mt-2">{(mockKPIs.totalImpact.land / 1000).toFixed(1)}K hectares</div>
              <div className="text-xs text-green-700 mt-2">Area equivalent to approximately {Math.round(mockKPIs.totalImpact.land / 1000 * 1.5)} soccer fields</div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-800 font-medium">Forest & Reforestation</div>
            <div className="text-3xl font-bold text-blue-700 mt-2">{(mockKPIs.totalImpact.trees / 1000000).toFixed(1)}M trees planted</div>
            <div className="text-xs text-blue-700 mt-2">
              These trees will sequester an estimated {Math.round((mockKPIs.totalImpact.trees / 1000000) * 21.77)} tons of CO₂ over their lifetime
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Impact */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Social Impact
          </CardTitle>
          <CardDescription>Economic and community benefits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-800 font-medium">Economic Opportunities</div>
              <div className="text-3xl font-bold text-blue-700 mt-2">{mockKPIs.totalImpact.jobs.toLocaleString()}</div>
              <div className="text-xs text-blue-700 mt-2">Direct and indirect jobs created through project implementation</div>
            </div>

            <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
              <div className="text-sm text-pink-800 font-medium">Gender Equity</div>
              <div className="text-3xl font-bold text-pink-700 mt-2">{mockKPIs.totalImpact.women.toLocaleString()}</div>
              <div className="text-xs text-pink-700 mt-2">Women directly benefiting and gaining economic empowerment</div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-sm text-yellow-800 font-medium">Youth Empowerment</div>
              <div className="text-3xl font-bold text-yellow-700 mt-2">{mockKPIs.totalImpact.youth.toLocaleString()}</div>
              <div className="text-xs text-yellow-700 mt-2">Young people participating in project activities and training programs</div>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-sm text-green-800 font-medium">Community Access</div>
            <div className="text-3xl font-bold text-green-700 mt-2">{(mockKPIs.totalImpact.households / 1000).toFixed(1)}K households</div>
            <div className="text-xs text-green-700 mt-2">Communities with improved access to clean energy, water, or livelihood opportunities</div>
          </div>
        </CardContent>
      </Card>

      {/* Impact Trends */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Impact Growth Trajectory</CardTitle>
          <CardDescription>Cumulative impact over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { year: '2023', jobs: '1,200', trees: '850K', emissions: '850K' },
              { year: '2024', jobs: '2,100', trees: '2.2M', emissions: '1.8M' },
              { year: '2025 (Projected)', jobs: '3,200', trees: '4.5M', emissions: '3.2M' },
            ].map((row) => (
              <div key={row.year} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <span className="font-medium text-sm min-w-[150px]">{row.year}</span>
                <div className="flex items-center justify-between flex-1 gap-4">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Jobs</div>
                    <div className="text-sm font-semibold">{row.jobs}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Trees</div>
                    <div className="text-sm font-semibold">{row.trees}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">CO₂ Reduction</div>
                    <div className="text-sm font-semibold">{row.emissions} tCO₂e</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
