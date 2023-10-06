import { Clerk, decodeJwt } from '@clerk/clerk-sdk-node';
import type { AstroCookies } from 'astro';

const clerk = Clerk({ secretKey: import.meta.env.CLERK_SECRET_KEY });

export async function getCurrentUser(cookies: AstroCookies) {
  try {
    const sessionToken = cookies.get('__session')?.value;
    if (!sessionToken) {
      throw new Error('no session token found');
    }

    const data = decodeJwt(sessionToken);
    const session = await clerk.sessions.verifySession(
      data.payload.sid,
      sessionToken,
    );

    const user = await clerk.users.getUser(session.userId);

    return user;
  } catch (error) {
    return false;
  }
}
