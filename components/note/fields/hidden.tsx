import { useNoteSnap, useNoteState } from "~/components/note/note-provider";
import { useParams } from "next/navigation";

/**
 * This value is unique to each rendered page that is
 * loaded and should only change on hard browser reload.
 */
const ImmutableInputs = () => {
  const state = useNoteState();
  return <input hidden type="text" name="active_client" value={state.clientUuid} readOnly />;
};

/**
 * NewToEditInputs
 * This inputs will only change when moving the current ui from
 * 'new' to 'edit' mode.
 */
const NewToEditInputs = () => {
  const snap = useNoteSnap();
  const { slug } = useParams();
  return (
    <>
      <input hidden type="number" name="id" value={snap.id} readOnly />
      <input hidden type="text" name="slug" value={snap.slug ?? slug} readOnly />
    </>
  );
};

const HiddenInputs = () => (
  <>
    <ImmutableInputs />
    <NewToEditInputs />
  </>
);

export default HiddenInputs;
