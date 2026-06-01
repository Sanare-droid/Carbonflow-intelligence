'use server';

import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { CreateMetricSchema } from '@/lib/validations';
import { v4 as uuidv4 } from 'uuid';

export async function createMetric(projectId: string, data: unknown) {
  try {
    const session = await getSession();
    if (!session) return { error: 'Unauthorized' };

    const parsed = CreateMetricSchema.parse(data);

    const metric = await prisma.impactMetric.create({
      data: {
        id: 'metric-' + uuidv4(),
        metricType: parsed.metricType,
        value: parsed.value,
        unit: parsed.unit,
        measurementDate: parsed.measurementDate,
        projectId,
        createdById: session.userId,
      },
    });

    const project = await prisma.project.findUnique({ where: { id: projectId } });

    await prisma.auditLog.create({
      data: {
        id: 'audit-' + uuidv4(),
        action: 'CREATE',
        entityType: 'METRIC',
        entityId: metric.id,
        userId: session.userId,
        organizationId: project?.organizationId || 'system',
        projectId,
      },
    });

    return { metric };
  } catch (error) {
    return { error: 'Failed to create metric' };
  }
}

export async function getProjectMetrics(projectId: string) {
  try {
    const metrics = await prisma.impactMetric.findMany({
      where: { projectId },
      include: {
        createdBy: { select: { firstName: true, lastName: true } },
      },
      orderBy: { measurementDate: 'desc' },
    });

    return { metrics };
  } catch {
    return { error: 'Failed to fetch metrics' };
  }
}

export async function verifyMetric(metricId: string) {
  try {
    const session = await getSession();
    if (!session) return { error: 'Unauthorized' };

    const metric = await prisma.impactMetric.update({
      where: { id: metricId },
      data: {
        isVerified: true,
        verifiedDate: new Date(),
      },
    });

    const project = await prisma.project.findUnique({ where: { id: metric.projectId } });

    await prisma.auditLog.create({
      data: {
        id: 'audit-' + uuidv4(),
        action: 'UPDATE',
        entityType: 'METRIC',
        entityId: metricId,
        userId: session.userId,
        organizationId: project?.organizationId || 'system',
        projectId: metric.projectId,
      },
    });

    return { metric };
  } catch {
    return { error: 'Failed to verify metric' };
  }
}

export async function deleteMetric(metricId: string) {
  try {
    const session = await getSession();
    if (!session) return { error: 'Unauthorized' };

    const metric = await prisma.impactMetric.findUnique({ where: { id: metricId } });
    if (!metric) return { error: 'Metric not found' };

    await prisma.impactMetric.delete({ where: { id: metricId } });

    const project = await prisma.project.findUnique({ where: { id: metric.projectId } });

    await prisma.auditLog.create({
      data: {
        id: 'audit-' + uuidv4(),
        action: 'DELETE',
        entityType: 'METRIC',
        entityId: metricId,
        userId: session.userId,
        organizationId: project?.organizationId || 'system',
      },
    });

    return { success: true };
  } catch {
    return { error: 'Failed to delete metric' };
  }
}
