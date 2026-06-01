import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockProjects } from '@/lib/mock-data';
import { ShoppingCart, MapPin, TrendingUp, Leaf } from 'lucide-react';

export default function MarketplacePage() {
  const publicProjects = mockProjects.filter((p) => ['Active', 'Issued'].includes(p.status));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Carbon Credits Marketplace</h1>
        <p className="text-muted-foreground mt-1">Browse and purchase verified carbon credits</p>
      </div>

      {/* Marketplace Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Available Credits</div>
              <div className="text-3xl font-bold mt-2">
                {(publicProjects.reduce((sum, p) => sum + (p.creditsVerified - p.creditsSold), 0) / 1000000).toFixed(2)}M
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Average Price</div>
              <div className="text-3xl font-bold mt-2">$16.50</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Total Volume Sold</div>
              <div className="text-3xl font-bold mt-2">
                {(mockProjects.reduce((sum, p) => sum + p.creditsSold, 0) / 1000000).toFixed(2)}M
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects for Sale */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Available Projects</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {publicProjects.map((project) => {
            const availableCredits = project.creditsVerified - project.creditsSold;
            return (
              <Card key={project.id} className="border-border/50 overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </CardDescription>
                    </div>
                    <Badge className={project.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Project Info */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-muted-foreground">Type</div>
                      <div className="font-medium mt-1">{project.type}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Annual Impact</div>
                      <div className="font-medium mt-1">{(project.annualEmissionReduction / 1000).toFixed(0)}K tCO₂e</div>
                    </div>
                  </div>

                  {/* Credits Info */}
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Available Credits</span>
                      <span className="font-bold text-primary">{(availableCredits / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                        style={{ width: `${Math.min((availableCredits / project.creditsVerified) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Impact & Price */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border text-sm">
                    <div>
                      <div className="text-muted-foreground flex items-center gap-1">
                        <Leaf className="w-4 h-4" />
                        Impact
                      </div>
                      <div className="font-medium mt-1">{project.jobsCreated} jobs</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Price/Credit</div>
                      <div className="font-medium mt-1">$15-18</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button className="w-full gap-2 bg-primary hover:bg-secondary mt-2">
                    <ShoppingCart className="w-4 h-4" />
                    Purchase Credits
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Marketplace Info */}
      <Card className="border-border/50 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Why Buy Carbon Credits?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold text-sm mb-2">Verified Impact</h3>
              <p className="text-sm text-muted-foreground">All credits are independently verified and audited to ensure genuine carbon reduction.</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2">Corporate Responsibility</h3>
              <p className="text-sm text-muted-foreground">Meet ESG goals and sustainability commitments by offsetting your organizational carbon footprint.</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2">Social Impact</h3>
              <p className="text-sm text-muted-foreground">Support projects that create jobs, empower communities, and protect ecosystems worldwide.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Browse Projects', desc: 'Explore verified carbon projects across different geographies and types' },
              { step: 2, title: 'Select & Purchase', desc: 'Choose the amount of credits you want and complete the transaction' },
              { step: 3, title: 'Receive Credits', desc: 'Credits are added to your portfolio and can be tracked in real-time' },
              { step: 4, title: 'Track Impact', desc: 'Monitor the real-world impact of your carbon offset investments' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-semibold text-sm">{item.step}</div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
