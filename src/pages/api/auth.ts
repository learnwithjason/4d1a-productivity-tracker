import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  return new Response('redirecting...', {
    headers: {
      location: '/',
    },
    status: 301,
  });
};
