import type { APIRoute } from "astro";
import { query } from "../../utils/db";
import { getAuth } from "../../astro-clerk";

export const POST: APIRoute = async (context) => {
  const auth = await getAuth({ server: context.request });

  if (auth instanceof Response) {
    return new Response("redirecting...", {
      headers: {
        location: "/",
      },
      status: 301,
    });
  }

  const data = await context.request.formData();
  const complete = data.get("complete") === "true";

  if (!auth.userId) {
    console.error("no user found");

    return new Response("redirecting...", {
      headers: {
        location: "/",
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
    [auth.userId, complete]
  );

  return new Response("redirecting...", {
    headers: {
      location: "/track",
    },
    status: 301,
  });
};
