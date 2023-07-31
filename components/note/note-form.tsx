"use client";
import type { NoteType } from "~/db/note-type-db";
import { NoteProvider } from "./note-provider";
import Form from "./views/form";
const NoteForm = ({ note }: { note: NoteType }) => {
  return (
    <NoteProvider init={note}>
      <Form />
    </NoteProvider>
  );
};

export default NoteForm;
