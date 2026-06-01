'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockOrganization } from '@/lib/mock-data';
import { Save, Building2, Bell, Lock, Zap } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your organization and account preferences</p>
      </div>

      {/* Organization Settings */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Organization Profile
          </CardTitle>
          <CardDescription>Basic information about your organization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Organization Name</label>
              <Input defaultValue={mockOrganization.name} className="mt-1.5" />
            </div>
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <Input type="email" defaultValue={mockOrganization.email} className="mt-1.5" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Address</label>
              <Input defaultValue={mockOrganization.address} className="mt-1.5" />
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button className="bg-primary hover:bg-secondary gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing Settings */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Billing & Subscription
          </CardTitle>
          <CardDescription>Manage your subscription plan and billing details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold">Pro Plan</h3>
                <p className="text-sm text-muted-foreground mt-1">Unlimited projects, advanced analytics, and priority support</p>
              </div>
              <Badge className="bg-primary">Active</Badge>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Monthly Cost</span>
                <span className="font-semibold">$499/month</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next Billing Date</span>
                <span className="font-semibold">July 15, 2026</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline">Change Plan</Button>
            <Button variant="outline">Update Payment Method</Button>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Tip:</strong> Upgrade to our Enterprise plan for custom workflows, dedicated support, and advanced integrations.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Control how you receive updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: 'Project Status Changes', description: 'Get notified when project statuses update' },
            { label: 'Document Reviews', description: 'Receive alerts for document verification results' },
            { label: 'Credits Issued', description: 'Be informed when new credits are generated' },
            { label: 'Risk Alerts', description: 'Get warned about high-risk projects' },
            { label: 'Weekly Digest', description: 'Receive a weekly summary of platform activity' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <div className="font-medium text-sm">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
              </div>
              <input type="checkbox" className="w-4 h-4 rounded" defaultChecked />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security
          </CardTitle>
          <CardDescription>Protect your account and data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">Two-Factor Authentication</h3>
              <Badge className="bg-destructive">Not Enabled</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Add an extra layer of security to your account</p>
            <Button variant="outline" size="sm">
              Enable 2FA
            </Button>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">API Keys</h3>
              <Badge variant="outline">{2} Active</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Manage API keys for integrations</p>
            <Button variant="outline" size="sm">
              Manage API Keys
            </Button>
          </div>

          <div className="pt-4 border-t border-border">
            <Button variant="outline" className="text-destructive hover:text-destructive">
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
          <CardDescription>Additional options for power users</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button variant="outline" className="w-full">
              Export Organization Data
            </Button>
            <Button variant="outline" className="w-full">
              View Audit Logs
            </Button>
            <Button variant="outline" className="w-full">
              API Documentation
            </Button>
          </div>

          <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg mt-6">
            <h3 className="font-semibold text-sm text-destructive mb-2">Danger Zone</h3>
            <p className="text-sm text-muted-foreground mb-3">Irreversible actions that require caution</p>
            <Button variant="outline" className="text-destructive hover:text-destructive">
              Delete Organization
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
