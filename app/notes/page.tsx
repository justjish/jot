import NotesItem from "~/components/notes/notes-item";
import Empty from "~/components/notes/notes-empty";
import { clsx } from "clsx";
import { getSessionClient } from "~/lib/user";
import Search from "~/components/notes/notes-search";

export default async function Page({
  params,
  searchParams,
}: {
  params: Record<string, string> | undefined;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { search } = searchParams;
  const { api, session } = await getSessionClient(`/notes`);
  const { data: notes } =
    typeof search === "string"
      ? await api.from("notes").select("*").order("updated_at", { ascending: false }).textSearch("content", search)
      : await api.from("notes").select("*").order("updated_at", { ascending: false });
  return (
    <main className="h-full">
      <div className="mt-5 flex flex-row content-center justify-center">
        <Search
          className={clsx((!search || !search.length) && (!notes || notes.length === 0) ? "invisible" : undefined)}
        />
      </div>
      {!notes || notes.length === 0 ? (
        !search ? (
          <Empty uid={session.user.id} />
        ) : (
          <div className="mt-52 grid place-items-center overflow-hidden">
            <div className="mb-72 overflow-hidden">No results found</div>
          </div>
        )
      ) : (
        <div>
          <ul role="list" className="mx-6 mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
            {notes?.map((note) => <NotesItem key={note.id} {...note} />)}
          </ul>
        </div>
      )}
    </main>
  );
}
