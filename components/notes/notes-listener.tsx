"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import type { Database } from "~/lib/db.types";
import { useRouter } from "next/navigation";
/**
 * Listener
 *
 * Listens to changes from user posts and triggers a refresh.
 *
 * A better approach would be to make the entire notes list
 * a client component, and use the data we are already getting from
 * the listener to to simply update the ui. However since this is
 * an edge case, this is fine for now.
 *
 * The slight benefit to this approach is that the site can function
 * without it, meaning if we wanted to enable a fully javascript-less
 * experience we could.
 *
 */
const Listener: React.FC<{ uid: string }> = ({ uid }) => {
  const api = createClientComponentClient<Database>();
  const router = useRouter();
  React.useEffect(() => {
    const channel = api
      .channel(`notes:${uid}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notes",
          filter: `user_id=eq.${uid}`,
        },
        () => router.refresh(),
      )
      .subscribe();
    return () => void channel.unsubscribe(); // unsubscribe on unmount
  }, [api, uid, router]);
  return <></>;
};
export default Listener;
