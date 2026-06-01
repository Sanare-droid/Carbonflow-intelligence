'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Plus, ArrowUpRight } from 'lucide-react';
import { getAuthSession } from '@/app/actions/auth';
import { getProjects } from '@/app/actions/projects';
import { useEffect, useState as useStateClient } from 'react';

interface Project {
  id: string;
  name: string;
  location?: string;
  status: string;
  type: string;
  estimatedCO2e: number;
  createdBy: { firstName: string; lastName: string };
  _count: { documents: number; metrics: number; credits: number };
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useStateClient('');
  const [statusFilter, setStatusFilter] = useStateClient<string | null>(null);
  const [projects, setProjects] = useStateClient<Project[]>([]);
  const [loading, setLoading] = useStateClient(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const session = await getAuthSession();
      if (!session?.organizationId) {
        setLoading(false);
        return;
      }

      const result = await getProjects(session.organizationId);
      if (result.projects) {
        setProjects(result.projects);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.location || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 border-emerald-200';
      case 'Verification':
        return 'bg-amber-50 border-amber-200';
      case 'Issued':
        return 'bg-blue-50 border-blue-200';
      case 'Draft':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-white border-border';
    }
  };

  const statuses = ['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'ARCHIVED'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and track your carbon offset projects</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-secondary">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={!statusFilter ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter(null)}
          >
            All
          </Button>
          {statuses.map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-3">
        {loading ? (
          <>
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-6 w-2/3" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="space-y-1">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-6 w-full" />
                        </div>
                      ))}
                    </div>
                    <div className="text-right space-y-2">
                      <Skeleton className="h-4 w-1/2 ml-auto" />
                      <Skeleton className="h-5 w-2/3 ml-auto" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
              <Card className="border cursor-pointer transition-all hover:shadow-md hover:border-primary/50">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    {/* Project Info */}
                    <div>
                      <h3 className="font-semibold text-foreground">{project.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{project.location || 'No location'}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="outline">{project.status}</Badge>
                        <span className="text-xs text-muted-foreground">{project.type}</span>
                      </div>
                    </div>

                    {/* CO2e Info */}
                    <div>
                      <div className="text-xs text-muted-foreground">Estimated CO₂e</div>
                      <div className="text-lg font-bold">{(project.estimatedCO2e / 1000).toFixed(1)}K</div>
                      <div className="text-xs text-muted-foreground mt-1">metric tonnes</div>
                    </div>

                    {/* Counts */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Documents</div>
                        <div className="text-lg font-bold">{project._count.documents}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Metrics</div>
                        <div className="text-lg font-bold">{project._count.metrics}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Credits</div>
                        <div className="text-lg font-bold">{project._count.credits}</div>
                      </div>
                    </div>

                    {/* Created By */}
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Created by</div>
                      <div className="text-sm font-medium">{project.createdBy.firstName} {project.createdBy.lastName}</div>
                      <div className="flex justify-end mt-2">
                        <ArrowUpRight className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="font-semibold text-lg">No projects found</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  {projects.length === 0 ? 'Create your first project to get started' : 'Try adjusting your search or filters'}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
