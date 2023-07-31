import { createServerComponentClient, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "~/db/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SITE_URL } from "./utils";

/**
 * getSessionClient
 *
 * Get the api client ensuring the user is authenticated along the way.
 * @param returnTo If the user is not authenticated, then this where we should send them back to once they are.
 * @returns
 */
export const getSessionClient = async (returnTo?: string) => {
  const supabase = createServerComponentClient<Database>({ cookies });
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
  const supabase = createServerActionClient<Database>({ cookies });
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
