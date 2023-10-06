import type { APIRoute } from 'astro';
import { query } from '../../utils/db';
import { getCurrentUser } from '../../utils/auth';

export const POST: APIRoute = async (context) => {
  const user = await getCurrentUser(context.cookies);

  if (!user) {
    return new Response('redirecting...', {
      headers: {
        location: '/',
      },
      status: 301,
    });
  }

  const data = await context.request.formData();
  const complete = data.get('complete') === 'true';

  if (!user.id) {
    console.error('no user found');

    return new Response('redirecting...', {
      headers: {
        location: '/',
      },
      status: 301,
    });
  }

  await query(
    `
      INSERT INTO entries (
        user_id,
        complete
      )
      VALUES (
        $1,
        $2
      );
    `,
    [user.id, complete],
  );

  return new Response('redirecting...', {
    headers: {
      location: '/track',
    },
    status: 301,
  });
};
