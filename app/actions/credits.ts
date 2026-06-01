'use server';

import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { CreateCreditSchema } from '@/lib/validations';
import { v4 as uuidv4 } from 'uuid';

export async function createCredit(projectId: string, organizationId: string, data: unknown) {
  try {
    const session = await getSession();
    if (!session) return { error: 'Unauthorized' };

    const parsed = CreateCreditSchema.parse(data);

    const credit = await prisma.carbonCredit.create({
      data: {
        id: 'credit-' + uuidv4(),
        creditNumber: `CF-${projectId.substring(0, 8)}-${Date.now()}`,
        vintageYear: parsed.vintageYear,
        quantity: parsed.quantity,
        projectId,
        organizationId,
        createdById: session.userId,
      },
    });

    await prisma.auditLog.create({
      data: {
        id: 'audit-' + uuidv4(),
        action: 'CREATE',
        entityType: 'CREDIT',
        entityId: credit.id,
        userId: session.userId,
        organizationId,
        projectId,
      },
    });

    return { credit };
  } catch (error) {
    return { error: 'Failed to create credit' };
  }
}

export async function getProjectCredits(projectId: string) {
  try {
    const credits = await prisma.carbonCredit.findMany({
      where: { projectId },
      include: {
        createdBy: { select: { firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return { credits };
  } catch {
    return { error: 'Failed to fetch credits' };
  }
}

export async function getOrganizationCredits(organizationId: string) {
  try {
    const credits = await prisma.carbonCredit.findMany({
      where: { organizationId },
      include: {
        project: { select: { name: true } },
        createdBy: { select: { firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return { credits };
  } catch {
    return { error: 'Failed to fetch credits' };
  }
}

export async function issueCredit(creditId: string) {
  try {
    const session = await getSession();
    if (!session) return { error: 'Unauthorized' };

    const credit = await prisma.carbonCredit.update({
      where: { id: creditId },
      data: {
        status: 'ISSUED',
        issuanceDate: new Date(),
      },
    });

    await prisma.auditLog.create({
      data: {
        id: 'audit-' + uuidv4(),
        action: 'UPDATE',
        entityType: 'CREDIT',
        entityId: creditId,
        userId: session.userId,
        organizationId: credit.organizationId,
        projectId: credit.projectId,
      },
    });

    return { credit };
  } catch {
    return { error: 'Failed to issue credit' };
  }
}

export async function retireCredit(creditId: string) {
  try {
    const session = await getSession();
    if (!session) return { error: 'Unauthorized' };

    const credit = await prisma.carbonCredit.update({
      where: { id: creditId },
      data: { status: 'RETIRED' },
    });

    await prisma.auditLog.create({
      data: {
        id: 'audit-' + uuidv4(),
        action: 'UPDATE',
        entityType: 'CREDIT',
        entityId: creditId,
        userId: session.userId,
        organizationId: credit.organizationId,
        projectId: credit.projectId,
      },
    });

    return { credit };
  } catch {
    return { error: 'Failed to retire credit' };
  }
}

export async function deleteCredit(creditId: string) {
  try {
    const session = await getSession();
    if (!session) return { error: 'Unauthorized' };

    const credit = await prisma.carbonCredit.findUnique({ where: { id: creditId } });
    if (!credit) return { error: 'Credit not found' };

    await prisma.carbonCredit.delete({ where: { id: creditId } });

    await prisma.auditLog.create({
      data: {
        id: 'audit-' + uuidv4(),
        action: 'DELETE',
        entityType: 'CREDIT',
        entityId: creditId,
        userId: session.userId,
        organizationId: credit.organizationId,
      },
    });

    return { success: true };
  } catch {
    return { error: 'Failed to delete credit' };
  }
}
