import { NextResponse, type NextRequest } from "next/server";
import { createRouteCacheClient } from "~/lib/api-client";

import type { Database } from "~/lib/db.types";
import { SITE_URL } from "~/lib/utils";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const returnTo = requestUrl.searchParams.get("returnTo");
  if (code) {
    const supabase = createRouteCacheClient();
    await supabase.auth.exchangeCodeForSession(code);
  }
  const redirectUrl = new URL("/notes", SITE_URL);
  if (returnTo !== null && returnTo.length) redirectUrl.pathname = returnTo;
  return NextResponse.redirect(redirectUrl.toString());
}
