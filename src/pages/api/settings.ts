import type { APIRoute } from 'astro';
import { query } from '../../utils/db';
import { getCurrentUser } from '../../utils/auth';

export const POST: APIRoute = async (context) => {
  const user = await getCurrentUser(context.cookies);

  if (!user || !user.id) {
    return new Response('redirecting...', {
      headers: {
        location: '/',
      },
      status: 301,
    });
  }

  const data = await context.request.formData();
  const thing = data.get('thing') as string;

  if (!thing) {
    return new Response('redirecting...', {
      headers: {
        location: '/',
      },
      status: 301,
    });
  }

  await query(
    `
    INSERT INTO settings (
      user_id,
      thing
    ) 
    VALUES (
      $1,
      $2
    )
    ON CONFLICT (user_id)
    DO
      UPDATE SET thing = $2
  `,
    [user.id, thing],
  );

  return new Response('redirecting...', {
    headers: {
      location: '/track',
    },
    status: 301,
  });
};
