import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Database } from "~/db/types";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const api = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await api.auth.getSession();

  // Simple redirect to either home page or notes page
  return session ? redirect("/notes") : redirect("/home");
}
