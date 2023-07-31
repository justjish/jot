import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { useNoteSnap } from "~/components/note/note-provider";
import Button from "~/components/ui/button";
const Submit = () => {
  const snap = useNoteSnap();
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || snap.disableSubmit}>
      Save Note
    </Button>
  );
};

export default Submit;
