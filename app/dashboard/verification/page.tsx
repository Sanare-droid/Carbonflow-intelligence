import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockProjects } from '@/lib/mock-data';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function VerificationPage() {
  const sortedByReadiness = [...mockProjects].sort((a, b) => b.readinessScore - a.readinessScore);

  const getReadinessStatus = (score: number) => {
    if (score >= 85) return { status: 'Ready for Verification', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (score >= 65) return { status: 'In Progress', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { status: 'Not Ready', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const requiredDocuments = [
    { name: 'Project Design Document (PDD)', category: 'Technical', critical: true },
    { name: 'Environmental Impact Assessment', category: 'Environmental', critical: true },
    { name: 'Community Consultation Report', category: 'Social', critical: true },
    { name: 'Baseline Study', category: 'Technical', critical: true },
    { name: 'Monitoring Plan', category: 'Technical', critical: false },
    { name: 'Land Ownership Documentation', category: 'Legal', critical: true },
    { name: 'Annual Monitoring Report', category: 'Monitoring', critical: true },
    { name: 'Third-party Audit Report', category: 'Audit', critical: true },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Verification Readiness</h1>
        <p className="text-muted-foreground mt-1">Track project readiness for verification and identify gaps</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Ready for Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockProjects.filter((p) => p.readinessScore >= 85).length}</div>
            <p className="text-xs text-muted-foreground mt-2">Projects ready to submit</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockProjects.filter((p) => p.readinessScore >= 65 && p.readinessScore < 85).length}</div>
            <p className="text-xs text-muted-foreground mt-2">Additional work needed</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-destructive" />
              Not Ready
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockProjects.filter((p) => p.readinessScore < 65).length}</div>
            <p className="text-xs text-muted-foreground mt-2">Significant work required</p>
          </CardContent>
        </Card>
      </div>

      {/* Required Documents Checklist */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Required Documentation Checklist</CardTitle>
          <CardDescription>Documents needed for successful verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {requiredDocuments.map((doc, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{doc.name}</div>
                  <div className="text-xs text-muted-foreground">{doc.category}</div>
                </div>
                {doc.critical && <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">Critical</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Projects Readiness Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Project Readiness Status</h2>
        <div className="grid grid-cols-1 gap-4">
          {sortedByReadiness.map((project) => {
            const { status, color, bg } = getReadinessStatus(project.readinessScore);
            return (
              <Card key={project.id} className="border-border/50">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{project.location}</p>
                      </div>
                      <Badge className={`${bg} ${color}`}>{status}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Verification Readiness</span>
                        <span className="font-semibold">{project.readinessScore}%</span>
                      </div>
                      <Progress value={project.readinessScore} className="h-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-2 border-t border-border">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Status</div>
                        <div className="text-sm font-semibold mt-1">{project.status}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Credits Verified</div>
                        <div className="text-sm font-semibold mt-1">{(project.creditsVerified / 1000).toFixed(0)}K</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Documents</div>
                        <div className="text-sm font-semibold mt-1">
                          {mockProjects.length > 0 ? Math.floor(Math.random() * 5) + 3 : 0}/8
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Risk Score</div>
                        <div className={`text-sm font-semibold mt-1 ${project.riskScore > 25 ? 'text-destructive' : 'text-primary'}`}>
                          {project.riskScore}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
