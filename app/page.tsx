import { redirect } from "next/navigation";
import { createServerCacheClient } from "~/lib/api-client";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const api = createServerCacheClient();
  const {
    data: { session },
  } = await api.auth.getSession();

  // Simple redirect to either home page or notes page
  return session ? redirect("/notes") : redirect("/home");
}
