"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { ActiveProvidersStruct } from "~/components/auth/social-constants";
import type { Database } from "~/lib/db.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { assert } from "superstruct";
import { SITE_URL } from "~/lib/utils";
import { revalidatePath } from "next/cache";

export const oauth = async (formData: FormData) => {
  const provider = String(formData.get("provider"));
  const possibleReturnToSA = formData.get("returnTo");
  // Ensure the provider is an active one.
  assert(provider, ActiveProvidersStruct);
  const redirectToUrl = new URL("/auth/callback", SITE_URL);

  if (possibleReturnToSA !== null && possibleReturnToSA.toString().length)
    redirectToUrl.searchParams.set("returnTo", possibleReturnToSA.toString());

  // TODO: Handle error with error page. Its a developer only error, so it falls under 'unexpected' errors.
  assert(provider, ActiveProvidersStruct);

  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: redirectToUrl.toString(),
    },
  });
  if (error) throw error;
  if (!url) throw new Error("No url returned from api.");
  revalidatePath("/");
  return redirect(url);
};
