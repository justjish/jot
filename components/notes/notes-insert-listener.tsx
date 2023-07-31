"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import type { Database } from "~/db/types";
import { useRouter } from "next/navigation";

const EmptyInsert: React.FC<{ uid: string }> = ({ uid }) => {
  const api = createClientComponentClient<Database>();
  const router = useRouter();
  React.useEffect(() => {
    const channel = api
      .channel(`notes:${uid}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notes",
          filter: `user_id=eq.${uid}`,
        },
        () => router.refresh(),
      )
      .subscribe();
    return () => void channel.unsubscribe(); // unsubscribe on unmount
  }, [api, uid]);
  return <></>;
};
export default EmptyInsert;
