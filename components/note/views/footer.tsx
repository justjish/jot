import AutoSave from "../fields/auto-save";
import Submit from "../fields/submit";
import { max } from "../note-constants";
import { useNoteSnap } from "../note-provider";

const ContentLength = () => {
  const snap = useNoteSnap();
  return <>{snap.content.length}</>;
};
const Footer = () => {
  return (
    <div className="flex items-center justify-between border-t border-gray-600 px-3 py-2">
      <Submit />
      <AutoSave />
      {<ContentLength />}/{max}
    </div>
  );
};

export default Footer;
