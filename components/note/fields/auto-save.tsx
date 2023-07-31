import { useNoteState } from "~/components/note/note-provider";
import { clsx } from "clsx";

const AutoSave: React.FC = () => {
  const state = useNoteState();
  const snap = useNoteState();
  // Lets capture the state of the auto-save button.
  // As long as the value being updated, isn't read from the snapshot, it won't cause a re-render.
  // Only allow auto save feature during edits... its a pain without the id and server actions.
  return (
    <label
      className={clsx(
        `${
          snap.slug === null || snap.slug === "new" ? "invisible" : "visible"
        } relative inline-flex cursor-pointer items-center`,
      )}
    >
      <input
        type="checkbox"
        defaultChecked={state.autosave}
        className="peer sr-only"
        onChange={(evt) => (state.autosave = evt.currentTarget.checked)}
      />
      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{snap.slug && "Auto-Save"}</span>
    </label>
  );
};
export default AutoSave;
