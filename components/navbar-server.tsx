"use server";
import { handleSignOut } from "../app/notes/actions";
import Navbar from "~/components/navbar-client";
import { getSessionClient } from "~/lib/user";
/**
 * Needed to split the server and the client side of the component into two seperate pieces that are imported into the layout.
 */
export default async function NavServer() {
  const {
    session: { user },
  } = await getSessionClient();
  return (
    <Navbar
      imgUrl={user.user_metadata.avatar_url ?? ""}
      name={user.user_metadata.full_name! ?? ""}
      email={user.email! ?? ""}
      signOut={handleSignOut}
    />
  );
}
