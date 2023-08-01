"use client";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { SITE_URL } from "~/lib/utils";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid";
import { RouterReplace } from "~/lib/route.types";

export default function Search({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <div className={clsx("relative", className)}>
      <label
        htmlFor="search"
        className="absolute -top-2 left-2 hidden bg-transparent px-1 text-xs font-medium text-red-900"
      >
        Name
      </label>
      <input
        type="text"
        name="search"
        id="search"
        className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Search Notes"
        onChange={(evt) => {
          const url = new URL("/notes", SITE_URL);
          const val = evt.currentTarget.value;
          if (val.length > 0)
            url.searchParams.set("search", evt.currentTarget.value);
          router.replace(url.toString() as RouterReplace);
        }}
      />
      <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
        <div className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
          <MagnifyingGlassCircleIcon className="block h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
