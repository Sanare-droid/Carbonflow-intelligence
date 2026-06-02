'use server';

import { prisma } from '@/lib/db';
import { createToken, setAuthCookie, clearAuthCookie, getSession } from '@/lib/auth';
import { LoginSchema, RegisterSchema } from '@/lib/validations';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export async function login(data: unknown) {
  try {
    const parsed = LoginSchema.parse(data);
    
    const user = await prisma.user.findUnique({
      where: { email: parsed.email },
      include: { organization: true },
    });

    if (!user) {
      return { error: 'Invalid email or password' };
    }

    const passwordMatch = await bcrypt.compare(parsed.password, user.password);
    if (!passwordMatch) {
      return { error: 'Invalid email or password' };
    }

    const token = await createToken({
      userId: user.id,
      email: user.email,
      organizationId: user.organizationId || undefined,
      role: user.role,
    });

    await setAuthCookie(token);

    // Log audit
    try {
      await prisma.auditLog.create({
        data: {
          id: 'audit-' + uuidv4(),
          action: 'LOGIN',
          entityType: 'USER',
          entityId: user.id,
          userId: user.id,
          organizationId: user.organizationId,
        },
      });
    } catch (auditError) {
      console.error('Audit log failed during login:', auditError);
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        organizationId: user.organizationId,
      },
    };
  } catch (error) {
    return { error: 'Invalid input' };
  }
}

export async function register(data: unknown) {
  try {
    const parsed = RegisterSchema.parse(data);

    // Check if email exists
    const existing = await prisma.user.findUnique({
      where: { email: parsed.email },
    });

    if (existing) {
      return { error: 'Email already registered' };
    }

    // Create organization
    const org = await prisma.organization.create({
      data: {
        id: 'org-' + uuidv4(),
        name: parsed.organizationName,
      },
    });

    // Create user with hashed password
    const hashedPassword = await bcrypt.hash(parsed.password, 10);
    const user = await prisma.user.create({
      data: {
        id: 'user-' + uuidv4(),
        email: parsed.email,
        password: hashedPassword,
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        role: 'ORG_ADMIN',
        organizationId: org.id,
      },
    });

    const token = await createToken({
      userId: user.id,
      email: user.email,
      organizationId: user.organizationId || undefined,
      role: user.role,
    });

    await setAuthCookie(token);

    // Log audit
    try {
      await prisma.auditLog.create({
        data: {
          id: 'audit-' + uuidv4(),
          action: 'CREATE',
          entityType: 'USER',
          entityId: user.id,
          userId: user.id,
          organizationId: org.id,
        },
      });
    } catch (auditError) {
      console.error('Audit log failed during registration:', auditError);
      // Non-critical, continue
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        organizationId: user.organizationId,
      },
    };
  } catch (error) {
    return { error: 'Registration failed' };
  }
}

export async function logout() {
  try {
    const session = await getSession();
    if (session) {
      try {
        await prisma.auditLog.create({
          data: {
            id: 'audit-' + uuidv4(),
            action: 'LOGOUT',
            entityType: 'USER',
            entityId: session.userId,
            userId: session.userId,
            organizationId: session.organizationId,
          },
        });
      } catch (auditError) {
        console.error('Audit log failed during logout:', auditError);
      }
    }

    await clearAuthCookie();
    return { success: true };
  } catch {
    return { error: 'Logout failed' };
  }
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { organization: true },
  });

  return user;
}

export async function getAuthSession() {
  return await getSession();
}
