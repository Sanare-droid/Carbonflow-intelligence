'use server';

import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function getOrganization(organizationId: string) {
  try {
    const session = await getSession();
    if (!session || session.organizationId !== organizationId) {
      return { error: 'Unauthorized' };
    }

    const org = await prisma.organization.findUnique({
      where: { id: organizationId },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            createdAt: true,
          },
        },
        projects: {
          select: { id: true, status: true },
        },
        credits: {
          select: { id: true, status: true },
        },
      },
    });

    if (!org) return { error: 'Organization not found' };

    return {
      org: {
        ...org,
        teamSize: org.users.length,
        projectCount: org.projects.length,
        creditCount: org.credits.length,
      },
    };
  } catch {
    return { error: 'Failed to fetch organization' };
  }
}

export async function updateOrganization(organizationId: string, data: unknown) {
  try {
    const session = await getSession();
    if (!session || session.organizationId !== organizationId) {
      return { error: 'Unauthorized' };
    }

    const org = await prisma.organization.update({
      where: { id: organizationId },
      data: data as any,
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        id: 'audit-' + uuidv4(),
        action: 'UPDATE',
        entityType: 'ORG',
        entityId: organizationId,
        userId: session.userId,
        organizationId,
      },
    });

    return { org };
  } catch {
    return { error: 'Failed to update organization' };
  }
}

export async function getOrganizationMembers(organizationId: string) {
  try {
    const session = await getSession();
    if (!session || session.organizationId !== organizationId) {
      return { error: 'Unauthorized' };
    }

    const members = await prisma.user.findMany({
      where: { organizationId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    return { members };
  } catch {
    return { error: 'Failed to fetch members' };
  }
}

export async function inviteTeamMember(organizationId: string, email: string, role: string) {
  try {
    const session = await getSession();
    if (!session || session.organizationId !== organizationId) {
      return { error: 'Unauthorized' };
    }

    // Check if user exists
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing && existing.organizationId === organizationId) {
      return { error: 'User already a member' };
    }

    if (existing) {
      // Update existing user's organization
      const user = await prisma.user.update({
        where: { email },
        data: {
          organizationId,
          role,
        },
      });

      return { user };
    }

    // For new users, they will accept through email (mock here)
    return { message: 'Invitation sent to ' + email };
  } catch {
    return { error: 'Failed to invite member' };
  }
}

export async function updateMemberRole(organizationId: string, userId: string, role: string) {
  try {
    const session = await getSession();
    if (!session || session.organizationId !== organizationId) {
      return { error: 'Unauthorized' };
    }

    if (session.role !== 'ORG_ADMIN' && session.role !== 'ADMIN') {
      return { error: 'Only admins can change roles' };
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        id: 'audit-' + uuidv4(),
        action: 'UPDATE',
        entityType: 'USER',
        entityId: userId,
        userId: session.userId,
        organizationId,
        changes: JSON.stringify({ role }),
      },
    });

    return { user };
  } catch {
    return { error: 'Failed to update member role' };
  }
}

export async function removeMember(organizationId: string, userId: string) {
  try {
    const session = await getSession();
    if (!session || session.organizationId !== organizationId) {
      return { error: 'Unauthorized' };
    }

    if (session.role !== 'ORG_ADMIN' && session.role !== 'ADMIN') {
      return { error: 'Only admins can remove members' };
    }

    if (userId === session.userId) {
      return { error: 'Cannot remove yourself' };
    }

    // Remove user from organization
    await prisma.user.update({
      where: { id: userId },
      data: { organizationId: null },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        id: 'audit-' + uuidv4(),
        action: 'DELETE',
        entityType: 'USER',
        entityId: userId,
        userId: session.userId,
        organizationId,
      },
    });

    return { success: true };
  } catch {
    return { error: 'Failed to remove member' };
  }
}
