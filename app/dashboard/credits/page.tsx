import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockProjects, mockKPIs } from '@/lib/mock-data';
import { TrendingUp, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

export default function CreditsPage() {
  const totalGenerated = mockKPIs.totalCreditsGenerated;
  const totalVerified = mockKPIs.totalCreditsVerified;
  const totalSold = mockKPIs.totalCreditsSold;
  const totalRetired = mockKPIs.totalCreditsVerified - mockKPIs.totalCreditsSold;

  const creditsData = [
    { label: 'Generated', value: totalGenerated, color: 'bg-blue-500', lightColor: 'bg-blue-50', textColor: 'text-blue-700' },
    { label: 'Verified', value: totalVerified, color: 'bg-emerald-500', lightColor: 'bg-emerald-50', textColor: 'text-emerald-700' },
    { label: 'Sold', value: totalSold, color: 'bg-primary', lightColor: 'bg-primary/10', textColor: 'text-primary' },
    { label: 'Retired', value: totalRetired, color: 'bg-purple-500', lightColor: 'bg-purple-50', textColor: 'text-purple-700' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Carbon Credits</h1>
        <p className="text-muted-foreground mt-1">Monitor and manage your carbon credit portfolio</p>
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {creditsData.map((metric) => (
          <Card key={metric.label} className={`border-border/50 overflow-hidden`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">{metric.label}</div>
                  <div className="text-3xl font-bold mt-2">{(metric.value / 1000000).toFixed(2)}M</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {((metric.value / totalGenerated) * 100).toFixed(1)}% of total
                  </div>
                </div>
                <div className={`w-12 h-12 ${metric.lightColor} rounded-lg flex items-center justify-center`}>
                  <div className={`w-2 h-2 ${metric.color} rounded-full`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Credit Flow & Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Credit Flow */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Credit Flow Pipeline
            </CardTitle>
            <CardDescription>Credits movement through verification and sale stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { stage: 'Generated', count: totalGenerated, percent: 100, color: 'bg-blue-500' },
                { stage: 'Verified', count: totalVerified, percent: (totalVerified / totalGenerated) * 100, color: 'bg-emerald-500' },
                { stage: 'Sold', count: totalSold, percent: (totalSold / totalGenerated) * 100, color: 'bg-primary' },
              ].map((item) => (
                <div key={item.stage}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.stage}</span>
                    <span className="text-sm font-semibold">
                      {(item.count / 1000000).toFixed(2)}M ({item.percent.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} transition-all rounded-full`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Flow Stats */}
            <div className="mt-6 pt-4 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verification Rate</span>
                <span className="font-semibold">{((totalVerified / totalGenerated) * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sales Conversion</span>
                <span className="font-semibold">{((totalSold / totalVerified) * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pending Sale</span>
                <span className="font-semibold">{((totalVerified - totalSold) / 1000000).toFixed(2)}M credits</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Card */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Gross Revenue</div>
              <div className="text-4xl font-bold text-primary mt-1">${(mockKPIs.totalRevenue / 1000000).toFixed(1)}M</div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">Average Price per Credit</div>
              <div className="text-2xl font-bold mt-1">
                ${totalSold > 0 ? (mockKPIs.totalRevenue / totalSold).toFixed(2) : '0.00'}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">Projected Revenue</div>
              <div className="text-2xl font-bold text-emerald-600 mt-1">
                ${(mockKPIs.totalRevenue * 1.35 / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-muted-foreground mt-1">with pending credits</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Credits Performance */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Credits by Project</CardTitle>
          <CardDescription>Individual project credit generation and sales performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProjects.map((project) => (
              <div key={project.id} className="p-4 border border-border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-sm">{project.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{project.location}</p>
                  </div>
                  <Badge variant="outline">{project.status}</Badge>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-blue-50 rounded p-2 text-center">
                    <div className="text-xs text-muted-foreground">Generated</div>
                    <div className="text-sm font-bold mt-1">{(project.creditsGenerated / 1000).toFixed(0)}K</div>
                  </div>
                  <div className="bg-emerald-50 rounded p-2 text-center">
                    <div className="text-xs text-muted-foreground">Verified</div>
                    <div className="text-sm font-bold mt-1">{(project.creditsVerified / 1000).toFixed(0)}K</div>
                  </div>
                  <div className="bg-primary/10 rounded p-2 text-center">
                    <div className="text-xs text-muted-foreground">Sold</div>
                    <div className="text-sm font-bold mt-1">{(project.creditsSold / 1000).toFixed(0)}K</div>
                  </div>
                  <div className="bg-purple-50 rounded p-2 text-center">
                    <div className="text-xs text-muted-foreground">Revenue</div>
                    <div className="text-sm font-bold mt-1">${(project.projectRevenue / 1000000).toFixed(2)}M</div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="mt-3 flex gap-1 h-2 rounded-full overflow-hidden bg-muted">
                  <div
                    className="bg-blue-500"
                    style={{ width: `${(project.creditsGenerated / mockKPIs.totalCreditsGenerated) * 100}%` }}
                  />
                  <div
                    className="bg-emerald-500"
                    style={{ width: `${(project.creditsVerified / mockKPIs.totalCreditsGenerated) * 100}%` }}
                  />
                  <div
                    className="bg-primary"
                    style={{ width: `${(project.creditsSold / mockKPIs.totalCreditsGenerated) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Credit Market Info */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-secondary" />
            Market Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="text-sm font-medium text-emerald-900">Year-over-Year Growth</div>
              <div className="text-3xl font-bold text-emerald-700 mt-2">+34%</div>
              <div className="text-xs text-emerald-700 mt-1">Credits sold compared to last year</div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm font-medium text-blue-900">Market Demand</div>
              <div className="text-3xl font-bold text-blue-700 mt-2">Strong</div>
              <div className="text-xs text-blue-700 mt-1">High buyer interest for verified credits</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Credit Valuation</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Market Price</span>
                  <span className="font-medium">$15-18/credit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Your Average Price</span>
                  <span className="font-medium">${totalSold > 0 ? (mockKPIs.totalRevenue / totalSold).toFixed(2) : '0.00'}/credit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Premium Rate</span>
                  <span className="font-medium text-emerald-600">+{totalSold > 0 ? ((mockKPIs.totalRevenue / totalSold - 15) / 15 * 100).toFixed(1) : '0'}%</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Portfolio Health</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Diversification</span>
                  <Badge variant="outline">Excellent</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Risk Profile</span>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Low</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
