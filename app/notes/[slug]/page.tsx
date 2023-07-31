import { revalidatePath } from "next/cache";
import NoteForm from "~/components/note/note-form";
import type { NoteType } from "~/db/note-type-db";
import { getSessionClient } from "~/lib/user";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { api, session } = await getSessionClient(`/notes/${params.slug}`);
  let note: NoteType | null;
  if (params.slug === "new") {
    note = {
      content: "",
      created_at: "",
      id: -1,
      slug: null,
      updated_at: "",
      user_id: session.user.id,
      active_client: null,
    };
  } else {
    const { data: noteData, error } = await api.from("notes").select("*").eq("slug", params.slug).single();
    if (error) {
      note = noteData;
      revalidatePath("/notes");
    } else {
      note = noteData;
    }
  }
  return (
    <div className="mx-auto my-10">
      <div className="container mx-auto border-none border-gray-700">
        {note ? <NoteForm note={note} /> : "This note could not be found or you do not have access to it."}
      </div>
    </div>
  );
}
