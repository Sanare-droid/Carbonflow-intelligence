import 'server-only';
import { cookies } from 'next/headers';
import { createToken, verifyToken, type TokenPayload } from './auth-utils';

export { createToken, verifyToken, type TokenPayload };

export async function getSession(): Promise<TokenPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;
    
    if (!token) return null;
    
    return verifyToken(token);
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('authToken');
}
