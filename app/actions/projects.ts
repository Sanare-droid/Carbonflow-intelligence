'use server';

import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { CreateProjectSchema, UpdateProjectSchema } from '@/lib/validations';
import { v4 as uuidv4 } from 'uuid';

export async function getProjects(organizationId: string) {
  try {
    const session = await getSession();
    if (!session) return { error: 'Unauthorized' };

    const projects = await prisma.project.findMany({
      where: { organizationId },
      include: {
        createdBy: { select: { firstName: true, lastName: true } },
        _count: {
          select: { documents: true, metrics: true, credits: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return { projects };
  } catch {
    return { error: 'Failed to fetch projects' };
  }
}

export async function getProjectById(projectId: string) {
  try {
    const session = await getSession();
    if (!session) return { error: 'Unauthorized' };

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        organization: true,
        createdBy: { select: { firstName: true, lastName: true, email: true } },
        updatedBy: { select: { firstName: true, lastName: true } },
        documents: { select: { id: true, name: true, type: true, createdAt: true } },
        metrics: { select: { id: true, metricType: true, value: true, unit: true } },
        credits: { select: { id: true, creditNumber: true, quantity: true, status: true } },
        risks: { select: { id: true, riskType: true, severity: true } },
      },
    });

    if (!project) return { error: 'Project not found' };

    return { project };
  } catch {
    return { error: 'Failed to fetch project' };
  }
}

export async function createProject(organizationId: string, data: unknown) {
  try {
    const session = await getSession();
    if (!session) return { error: 'Unauthorized' };

    const parsed = CreateProjectSchema.parse(data);

    const project = await prisma.project.create({
      data: {
        id: 'proj-' + uuidv4(),
        name: parsed.name,
        description: parsed.description,
        type: parsed.type,
        location: parsed.location,
        startDate: parsed.startDate,
        endDate: parsed.endDate,
        estimatedCO2e: parsed.estimatedCO2e,
        organizationId,
        createdById: session.userId,
        updatedById: session.userId,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        id: 'audit-' + uuidv4(),
        action: 'CREATE',
        entityType: 'PROJECT',
        entityId: project.id,
        userId: session.userId,
        organizationId,
        projectId: project.id,
      },
    });

    return { project };
  } catch (error) {
    return { error: 'Failed to create project' };
  }
}

export async function updateProject(projectId: string, data: unknown) {
  try {
    const session = await getSession();
    if (!session) return { error: 'Unauthorized' };

    const parsed = UpdateProjectSchema.parse(data);

    const project = await prisma.project.update({
      where: { id: projectId },
      data: {
        ...parsed,
        updatedById: session.userId,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        id: 'audit-' + uuidv4(),
        action: 'UPDATE',
        entityType: 'PROJECT',
        entityId: projectId,
        userId: session.userId,
        organizationId: project.organizationId,
        projectId,
      },
    });

    return { project };
  } catch {
    return { error: 'Failed to update project' };
  }
}

export async function deleteProject(projectId: string) {
  try {
    const session = await getSession();
    if (!session) return { error: 'Unauthorized' };

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) return { error: 'Project not found' };

    await prisma.project.delete({ where: { id: projectId } });

    // Audit log
    await prisma.auditLog.create({
      data: {
        id: 'audit-' + uuidv4(),
        action: 'DELETE',
        entityType: 'PROJECT',
        entityId: projectId,
        userId: session.userId,
        organizationId: project.organizationId,
      },
    });

    return { success: true };
  } catch {
    return { error: 'Failed to delete project' };
  }
}

export async function getProjectMetrics(projectId: string) {
  try {
    const metrics = await prisma.impactMetric.findMany({
      where: { projectId },
      orderBy: { measurementDate: 'desc' },
    });

    return { metrics };
  } catch {
    return { error: 'Failed to fetch metrics' };
  }
}

export async function getDashboardMetrics(organizationId: string) {
  try {
    const session = await getSession();
    if (!session) return { error: 'Unauthorized' };

    const projects = await prisma.project.findMany({
      where: { organizationId },
    });

    const totalCO2e = projects.reduce((sum, p) => sum + p.estimatedCO2e, 0);
    const verifiedCO2e = projects
      .filter((p) => p.verifiedCO2e)
      .reduce((sum, p) => sum + (p.verifiedCO2e || 0), 0);

    const activeProjects = projects.filter((p) => p.status === 'ACTIVE').length;
    const completedProjects = projects.filter((p) => p.status === 'COMPLETED').length;

    const credits = await prisma.carbonCredit.findMany({
      where: { organizationId },
    });

    const totalCredits = credits.reduce((sum, c) => sum + c.quantity, 0);
    const issuedCredits = credits.filter((c) => c.status === 'ISSUED').reduce((sum, c) => sum + c.quantity, 0);

    const metrics = await prisma.impactMetric.findMany({
      where: { project: { organizationId } },
    });

    return {
      metrics: {
        totalProjects: projects.length,
        activeProjects,
        completedProjects,
        totalCO2e: Math.round(totalCO2e),
        verifiedCO2e: Math.round(verifiedCO2e),
        totalCredits: Math.round(totalCredits),
        issuedCredits: Math.round(issuedCredits),
        totalMetrics: metrics.length,
      },
    };
  } catch (error) {
    console.error('[v0] Error fetching dashboard metrics:', error);
    return { error: 'Failed to fetch metrics' };
  }
}
