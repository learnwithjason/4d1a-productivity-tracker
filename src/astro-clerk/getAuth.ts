import { constants, User } from "@clerk/backend";
import type { AstroGlobal } from "astro";
import { frontendApi, publishableKey } from "./constants";
import { authenticateRequest } from "./authenticateRequest";
import { clerkClient } from "./clerkClient";
import type { GetAuthReturn } from "./types";

export const getAuth = async (
  {
    client,
    server,
  }: {
    client?: AstroGlobal;
    server?: Request;
  },
  options?: { loadUser: boolean }
): Promise<Response | Awaited<GetAuthReturn>> => {
  const { loadUser } = options || {};
  const requestState = await authenticateRequest({ client, server });

  if (requestState.isInterstitial || requestState.isUnknown) {
    const interstitialHtml = clerkClient.localInterstitial({
      frontendApi,
      publishableKey,
    });
    return new Response(`<!DOCTYPE html><html${interstitialHtml}</html>`, {
      status: 401,
      headers: {
        "content-type": "text/html",
        [constants.Headers.AuthMessage]: requestState.message,
        [constants.Headers.AuthReason]: requestState.reason || "",
        [constants.Headers.AuthStatus]: requestState.status || "",
      },
    }) as unknown as GetAuthReturn;
  }

  const auth = requestState.toAuth();

  if (loadUser && auth.userId) {
    return {
      ...auth,
      user: await clerkClient.users.getUser(auth.userId),
    };
  }

  return {
    ...auth,
  };
};
