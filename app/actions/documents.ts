'use server';

import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { CreateDocumentSchema } from '@/lib/validations';
import { v4 as uuidv4 } from 'uuid';

export async function createDocument(projectId: string, data: unknown) {
  try {
    const session = await getSession();
    if (!session) return { error: 'Unauthorized' };

    const parsed = CreateDocumentSchema.parse(data);

    const document = await prisma.document.create({
      data: {
        id: 'doc-' + uuidv4(),
        name: parsed.name,
        type: parsed.type,
        s3Key: parsed.s3Key,
        fileSize: parsed.fileSize,
        mimeType: parsed.mimeType,
        uploadedBy: session.userId,
        projectId,
        createdById: session.userId,
        updatedById: session.userId,
      },
    });

    // Get project for organization
    const project = await prisma.project.findUnique({ where: { id: projectId } });

    // Audit log
    await prisma.auditLog.create({
      data: {
        id: 'audit-' + uuidv4(),
        action: 'CREATE',
        entityType: 'DOCUMENT',
        entityId: document.id,
        userId: session.userId,
        organizationId: project?.organizationId || 'system',
        projectId,
      },
    });

    return { document };
  } catch (error) {
    return { error: 'Failed to create document' };
  }
}

export async function getProjectDocuments(projectId: string) {
  try {
    const documents = await prisma.document.findMany({
      where: { projectId },
      include: {
        createdBy: { select: { firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return { documents };
  } catch {
    return { error: 'Failed to fetch documents' };
  }
}

export async function deleteDocument(documentId: string) {
  try {
    const session = await getSession();
    if (!session) return { error: 'Unauthorized' };

    const document = await prisma.document.findUnique({ where: { id: documentId } });
    if (!document) return { error: 'Document not found' };

    await prisma.document.delete({ where: { id: documentId } });

    // Audit log
    const project = await prisma.project.findUnique({ where: { id: document.projectId } });
    await prisma.auditLog.create({
      data: {
        id: 'audit-' + uuidv4(),
        action: 'DELETE',
        entityType: 'DOCUMENT',
        entityId: documentId,
        userId: session.userId,
        organizationId: project?.organizationId || 'system',
      },
    });

    return { success: true };
  } catch {
    return { error: 'Failed to delete document' };
  }
}
