import { oauth } from "./actions";
import { SocialForm } from "~/components/auth/social-form";
import { ACTIVE_PROVIDERS } from "~/components/auth/social-constants";
import Logo from "~/components/svg/logo";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Database } from "~/lib/db.types";
export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { returnTo: returnToSSC } = searchParams;
  const api = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await api.auth.getSession();

  if (session) redirect("/notes");
  return (
    <div className="flex h-screen">
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <h1 className="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 bg-clip-text text-4xl font-extrabold uppercase text-transparent">
          Jot
        </h1>
        <Logo className="h-32 w-32" />
        <div className="mb-5 max-w-screen-sm text-center">
          <h2 className="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 bg-clip-text text-2xl font-extrabold text-transparent">
            A simple note taking app.
          </h2>
        </div>
        {ACTIVE_PROVIDERS.map((provider) => (
          <SocialForm
            key={provider}
            provider={provider}
            action={oauth}
            returnTo={typeof returnToSSC === "string" ? returnToSSC : undefined}
          />
        ))}
      </div>
    </div>
  );
}
