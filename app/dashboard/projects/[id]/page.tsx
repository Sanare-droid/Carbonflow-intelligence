'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockProjects, mockDocuments, mockActivityFeed } from '@/lib/mock-data';
import { FileUp, Calendar, MapPin, TrendingUp, AlertTriangle, Users, Zap, Leaf, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params.id as string;
  const project = mockProjects.find((p) => p.id === projectId);
  const documents = mockDocuments.filter((d) => d.projectId === projectId);
  const activity = mockActivityFeed.filter((a) => a.projectId === projectId);

  if (!project) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Project not found</h1>
      </div>
    );
  }

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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div className="flex items-center gap-2">
        <Link href="/dashboard/projects" className="flex items-center gap-1 text-primary hover:text-secondary text-sm">
          <ChevronLeft className="w-4 h-4" />
          Projects
        </Link>
      </div>

      {/* Project Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {project.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Started {project.createdAt.toLocaleDateString()}
              </div>
            </div>
          </div>
          <Badge className={`text-sm ${getStatusColor(project.status)}`}>{project.status}</Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border/50">
            <CardContent className="pt-4">
              <div className="text-sm text-muted-foreground">Type</div>
              <div className="text-lg font-semibold mt-1">{project.type}</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="pt-4">
              <div className="text-sm text-muted-foreground">Credits Generated</div>
              <div className="text-lg font-semibold mt-1">{(project.creditsGenerated / 1000).toFixed(0)}K</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="pt-4">
              <div className="text-sm text-muted-foreground">Annual Emission Reduction</div>
              <div className="text-lg font-semibold mt-1">{(project.annualEmissionReduction / 1000).toFixed(0)}K tCO₂e</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="pt-4">
              <div className="text-sm text-muted-foreground">Readiness Score</div>
              <div className="text-lg font-semibold mt-1 text-primary">{project.readinessScore}%</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="credits">Credits</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Description</div>
                  <p className="mt-1 text-sm">{project.description}</p>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Location</div>
                  <p className="mt-1 text-sm font-medium">{project.location}</p>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Project Type</div>
                  <p className="mt-1 text-sm font-medium">{project.type}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Carbon Credits Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Generated</span>
                  <span className="font-semibold">{(project.creditsGenerated / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Verified</span>
                  <span className="font-semibold text-primary">{(project.creditsVerified / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Sold</span>
                  <span className="font-semibold text-secondary">{(project.creditsSold / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">Retired</span>
                  <span className="font-semibold">{(project.creditsRetired / 1000).toFixed(0)}K</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Project Documents</CardTitle>
                  <CardDescription>All files and documentation for this project</CardDescription>
                </div>
                <Button className="gap-2 bg-primary hover:bg-secondary">
                  <FileUp className="w-4 h-4" />
                  Upload Document
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {documents.length > 0 ? (
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{doc.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {doc.category} • {doc.size}MB • {doc.uploadDate.toLocaleDateString()}
                        </div>
                      </div>
                      <Badge variant="outline" className={doc.status === 'Verified' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'}>
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No documents uploaded yet</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Impact Tab */}
        <TabsContent value="impact" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  Social Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground">Jobs Created</div>
                  <div className="text-2xl font-bold">{project.jobsCreated.toLocaleString()}</div>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="text-xs text-muted-foreground">Households Benefited</div>
                  <div className="text-2xl font-bold">{(project.households / 1000).toFixed(1)}K</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-500" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground">Trees Planted</div>
                  <div className="text-2xl font-bold">{(project.treesPlanted / 1000000).toFixed(2)}M</div>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="text-xs text-muted-foreground">Land Restored</div>
                  <div className="text-2xl font-bold">{(project.landRestored / 1000).toFixed(1)}K ha</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  Climate Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground">Annual CO₂ Reduction</div>
                  <div className="text-2xl font-bold">{(project.annualEmissionReduction / 1000).toFixed(0)}K tCO₂e</div>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="text-xs text-muted-foreground">Women Beneficiaries</div>
                  <div className="text-2xl font-bold">{project.womenBeneficiaries}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Youth Beneficiaries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{project.youthBeneficiaries.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mt-2">Young people directly benefiting from this project</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Credits Tab */}
        <TabsContent value="credits" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Generated</div>
                  <div className="text-3xl font-bold text-primary">{(project.creditsGenerated / 1000000).toFixed(2)}M</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Verified</div>
                  <div className="text-3xl font-bold text-secondary">{(project.creditsVerified / 1000000).toFixed(2)}M</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Sold</div>
                  <div className="text-3xl font-bold text-accent">{(project.creditsSold / 1000000).toFixed(2)}M</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Retired</div>
                  <div className="text-3xl font-bold">{(project.creditsRetired / 1000000).toFixed(2)}M</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">${(project.projectRevenue / 1000000).toFixed(2)}M</div>
              <p className="text-sm text-muted-foreground mt-2">Total revenue from carbon credit sales</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Tab */}
        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-amber-900">Overall Risk Score</h3>
                    <p className="text-sm text-amber-800 mt-1">
                      {project.riskScore <= 20 ? 'Low Risk' : project.riskScore <= 35 ? 'Medium Risk' : 'High Risk'}
                    </p>
                  </div>
                  <div className="text-4xl font-bold text-amber-600">{project.riskScore}</div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Risk Factors</h3>
                {[
                  { name: 'Documentation Risk', score: 18 },
                  { name: 'Compliance Risk', score: 12 },
                  { name: 'Operational Risk', score: 15 },
                  { name: 'Community Risk', score: 20 },
                  { name: 'Data Quality Risk', score: 10 },
                ].map((factor) => (
                  <div key={factor.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span className="text-sm">{factor.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${Math.min(factor.score * 3, 100)}%` }} />
                      </div>
                      <span className="text-xs font-medium w-8 text-right">{factor.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Activity</CardTitle>
              <CardDescription>Timeline of all project updates and changes</CardDescription>
            </CardHeader>
            <CardContent>
              {activity.length > 0 ? (
                <div className="space-y-4">
                  {activity.map((log) => (
                    <div key={log.id} className="flex gap-4 pb-4 border-b border-border last:border-0">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{log.message}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {log.user} • {log.timestamp.toLocaleDateString()} {log.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No activity yet</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
