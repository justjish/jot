import type { NoteType } from "~/db/note-type-db";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { getActionClient } from "~/lib/user";
import { revalidatePath } from "next/cache";

const NotesItem: React.FC<NoteType> = ({ id, content, slug, user_id, created_at, updated_at }) => {
  const rm = async (formData: FormData) => {
    "use server";
    const slug = String(formData.get("slug"));
    const { api } = await getActionClient("/notes");
    await api.from("notes").delete().eq("slug", slug);
    revalidatePath("/notes");
  };
  return (
    <li key={id} className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
      <div className="flex flex-1 flex-col p-8">
        <dl className="mt-1 flex  flex-col justify-between">
          <dt className="sr-only">Last Updated</dt>
          <dd className="mt-3">
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {new Date(updated_at).toLocaleString()}
            </span>
          </dd>
        </dl>
        <h3 className="mt-6 h-16 overflow-y-auto text-sm font-medium text-gray-900">{content}</h3>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <Link
              href={`notes/${slug}`}
              prefetch={true}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              Edit
            </Link>
          </div>
          <form className="-ml-px flex w-0 flex-1" action={rm}>
            <input className="hidden" name="slug" readOnly value={slug ?? "never"} />
            <button
              type="submit"
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <TrashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              Delete
            </button>
          </form>
        </div>
      </div>
    </li>
  );
};
export default NotesItem;
