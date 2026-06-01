import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { mockProjects, mockRiskAssessments } from '@/lib/mock-data';
import { AlertTriangle, TrendingDown, Lightbulb } from 'lucide-react';

export default function RiskPage() {
  const riskAssessment = mockRiskAssessments[0];

  const getRiskColor = (score: number) => {
    if (score <= 20) return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
    if (score <= 35) return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
    return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
  };

  const getRiskStatus = (score: number) => {
    if (score <= 20) return 'Low Risk';
    if (score <= 35) return 'Medium Risk';
    return 'High Risk';
  };

  const categories = [
    { name: 'Documentation', score: 10, description: 'Completeness and quality of project documentation' },
    { name: 'Compliance', score: 18, description: 'Regulatory and standard compliance status' },
    { name: 'Operational', score: 15, description: 'Project operations and execution risks' },
    { name: 'Community', score: 20, description: 'Stakeholder and community-related risks' },
    { name: 'Data Quality', score: 12, description: 'Monitoring data accuracy and reliability' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Risk Assessment</h1>
        <p className="text-muted-foreground mt-1">Monitor project risks and mitigation strategies</p>
      </div>

      {/* Overall Risk Score */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Overall Risk Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#e5e7eb" strokeWidth="16" />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke={riskAssessment.overallScore <= 20 ? '#10b981' : riskAssessment.overallScore <= 35 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="16"
                  strokeDasharray={`${(riskAssessment.overallScore / 100) * 440} 440`}
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-4xl font-bold">{riskAssessment.overallScore}</div>
                <div className="text-xs text-muted-foreground mt-1">Overall Score</div>
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-4">
                <Badge className={`text-sm ${getRiskColor(riskAssessment.overallScore).bg} ${getRiskColor(riskAssessment.overallScore).text}`}>
                  {getRiskStatus(riskAssessment.overallScore)}
                </Badge>
              </div>
              <h3 className="font-semibold mb-2">Risk Summary</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This project has a {getRiskStatus(riskAssessment.overallScore).toLowerCase()} profile. {riskAssessment.overallScore <= 20 ? 'All major risk factors are under control.' : 'Several areas require attention and mitigation strategies.'}
              </p>

              <h3 className="font-semibold mb-2">Recommendations</h3>
              <ul className="space-y-1">
                {riskAssessment.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => {
          const colors = getRiskColor(category.score);
          return (
            <Card key={category.name} className={`border ${colors.border} ${colors.bg}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription className="mt-1">{category.description}</CardDescription>
                  </div>
                  <div className={`text-3xl font-bold ${colors.text}`}>{category.score}</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      category.score <= 20 ? 'bg-emerald-500' : category.score <= 35 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(category.score * 2.5, 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Risk Distribution */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Risk Distribution Across Projects</CardTitle>
          <CardDescription>Portfolio risk assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { risk: 'Low Risk', count: mockProjects.filter((p) => p.riskScore < 20).length, color: 'bg-emerald-100', textColor: 'text-emerald-700' },
              { risk: 'Medium Risk', count: mockProjects.filter((p) => p.riskScore >= 20 && p.riskScore <= 35).length, color: 'bg-amber-100', textColor: 'text-amber-700' },
              { risk: 'High Risk', count: mockProjects.filter((p) => p.riskScore > 35).length, color: 'bg-red-100', textColor: 'text-red-700' },
            ].map((category) => (
              <div key={category.risk} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{category.risk}</span>
                  <span className={`font-bold ${category.textColor}`}>{category.count} projects</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${category.color} transition-all`} style={{ width: `${(category.count / mockProjects.length) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* High Risk Projects Alert */}
      {mockProjects.some((p) => p.riskScore > 35) && (
        <Alert className="border-destructive/50 bg-destructive/5">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription>
            <strong>Attention Required:</strong> {mockProjects.filter((p) => p.riskScore > 35).length} project(s) have high-risk scores and require immediate review and mitigation planning.
          </AlertDescription>
        </Alert>
      )}

      {/* Mitigation Strategies */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Mitigation Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-sm">Documentation Enhancement</h3>
            <p className="text-xs text-muted-foreground mt-1">Strengthen project documentation with comprehensive PDD and baseline studies to reduce verification risks.</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-sm">Community Engagement</h3>
            <p className="text-xs text-muted-foreground mt-1">Increase stakeholder consultation and documentation to address social impact concerns.</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-sm">Monitoring Systems</h3>
            <p className="text-xs text-muted-foreground mt-1">Implement robust monitoring protocols and data quality assurance to ensure credibility.</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-sm">Third-party Audits</h3>
            <p className="text-xs text-muted-foreground mt-1">Schedule regular independent audits to validate claims and identify compliance gaps.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
