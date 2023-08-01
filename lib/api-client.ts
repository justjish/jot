"use server";
import {
  createServerComponentClient,
  createServerActionClient,
  createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";
import type { Database } from "~/lib/db.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SITE_URL } from "./utils";
import { cache } from "react";

export const createServerCacheClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
});
export const createActionCacheClient = cache(() => {
  const cookieStore = cookies();
  return createServerActionClient<Database>({ cookies: () => cookieStore });
});
export const createRouteCacheClient = cache(() => {
  const cookieStore = cookies();
  return createRouteHandlerClient<Database>({ cookies: () => cookieStore });
});

/**
 * getServerClient
 *
 * Get the api client ensuring the user is authenticated along the way.
 * @param returnTo If the user is not authenticated, then this where we should send them back to once they are.
 * @returns
 */
export const getServerClient = async (returnTo?: string) => {
  const supabase = createServerCacheClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) throw error;
  if (session === null) {
    const url = new URL("/home", SITE_URL);
    if (returnTo) url.searchParams.append("returnTo", returnTo);
    throw redirect(url.toString());
  }
  return { api: supabase, session };
};

/**
 * getActionClient
 * Returns the action client if the user is authenticated.
 * TODO: Use a modal to login user so that the pending note doesn't disappear.
 */
export const getActionClient = async (returnTo?: string) => {
  const supabase = createActionCacheClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) throw error;
  if (session === null) {
    const url = new URL("/home", SITE_URL);
    if (returnTo) url.searchParams.append("returnTo", returnTo);
    throw redirect(url.toString());
  }
  return { api: supabase, session };
};
