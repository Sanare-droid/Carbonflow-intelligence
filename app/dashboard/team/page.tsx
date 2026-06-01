'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockUsers } from '@/lib/mock-data';
import { UserPlus, Mail, Trash2, Shield } from 'lucide-react';

export default function TeamPage() {
  const getRoleColor = (role: string) => {
    const colors: { [key: string]: string } = {
      Admin: 'bg-red-100 text-red-800',
      Manager: 'bg-blue-100 text-blue-800',
      Officer: 'bg-emerald-100 text-emerald-800',
      Auditor: 'bg-purple-100 text-purple-800',
      Buyer: 'bg-orange-100 text-orange-800',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  const roleLevels: { [key: string]: string } = {
    Admin: 'Full access to all features and settings',
    Manager: 'Can manage projects and team members',
    Officer: 'Can view and update project details',
    Auditor: 'Can review documents and verify projects',
    Buyer: 'Can browse and purchase carbon credits',
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground mt-1">Manage team members and their roles</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-secondary">
          <UserPlus className="w-4 h-4" />
          Invite Member
        </Button>
      </div>

      {/* Team Members */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>{mockUsers.length} members in your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                    {user.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Descriptions */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Role Permissions
          </CardTitle>
          <CardDescription>What each role can do in CarbonFlow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(roleLevels).map(([role, description]) => (
              <div key={role} className="p-4 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getRoleColor(role)}>{role}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>

          {/* Detailed Permissions */}
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="font-semibold mb-4">Permission Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Feature</th>
                    <th className="text-center py-3 px-4 font-semibold">Admin</th>
                    <th className="text-center py-3 px-4 font-semibold">Manager</th>
                    <th className="text-center py-3 px-4 font-semibold">Officer</th>
                    <th className="text-center py-3 px-4 font-semibold">Auditor</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'View Dashboard', admin: true, manager: true, officer: true, auditor: true },
                    { feature: 'Create Projects', admin: true, manager: true, officer: false, auditor: false },
                    { feature: 'Edit Projects', admin: true, manager: true, officer: true, auditor: false },
                    { feature: 'Upload Documents', admin: true, manager: true, officer: true, auditor: false },
                    { feature: 'Verify Documents', admin: true, manager: true, officer: false, auditor: true },
                    { feature: 'Manage Team', admin: true, manager: false, officer: false, auditor: false },
                    { feature: 'View Reports', admin: true, manager: true, officer: true, auditor: true },
                    { feature: 'Export Data', admin: true, manager: true, officer: false, auditor: true },
                  ].map((item) => (
                    <tr key={item.feature} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{item.feature}</td>
                      <td className="py-3 px-4 text-center">{item.admin ? '✓' : '✗'}</td>
                      <td className="py-3 px-4 text-center">{item.manager ? '✓' : '✗'}</td>
                      <td className="py-3 px-4 text-center">{item.officer ? '✓' : '✗'}</td>
                      <td className="py-3 px-4 text-center">{item.auditor ? '✓' : '✗'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Invitations */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Pending Invitations</CardTitle>
          <CardDescription>Team members invited but not yet registered</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">No pending invitations</div>
        </CardContent>
      </Card>
    </div>
  );
}
