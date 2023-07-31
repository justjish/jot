import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "~/components/navbar-client";
import type { Database } from "~/db/types";
import { handleSignOut } from "./actions";

// Everything past the 'notes' path required Auth.
export default async function Layout(props: { children: React.ReactNode }) {
  const db = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await db.auth.getSession();
  if (!session) redirect("/home");
  return (
    <main className="overflow-hidden">
      <Navbar
        imgUrl={session.user.user_metadata.avatar_url}
        name={session.user.user_metadata.full_name}
        email={session.user.email!}
        signOut={handleSignOut}
      />
      <div className="">{props.children}</div>
    </main>
  );
}
