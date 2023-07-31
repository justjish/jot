import { useNoteSnap, useNoteState } from "../note-provider";
import { min, max } from "../note-constants";
export const TextArea = () => {
  // Using valtio state won't cause a re-render when the value changes
  const state = useNoteState();
  const snap = useNoteSnap();
  return (
    <div className="rounded-t-lg bg-gray-800 px-4 py-2">
      <label htmlFor="comment" className="sr-only"></label>
      <textarea
        name="content"
        rows={10}
        className="w-full border-0 bg-gray-800 px-0 text-sm text-white placeholder-gray-400 focus:ring-0"
        placeholder="Start writing your note here!"
        required={true}
        minLength={min}
        maxLength={max}
        value={snap.content}
        onChange={(evt) => {
          state.isLocalUpdate = true;
          state.content = evt.currentTarget.value;
        }}
      />
    </div>
  );
};
export default TextArea;
