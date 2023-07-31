"use client";
import Instructions from "./instructions";
import { TextArea } from "../fields/textarea";
import Submit from "./footer";
import HiddenInputs from "../fields/hidden";
import { useNoteSnap, useNoteState } from "../note-provider";
import { useRef, useEffect } from "react";
import { ref } from "valtio";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}
const FormInternal: React.FC<FormProps> = () => {
  const snap = useNoteSnap();
  const state = useNoteState();
  const formRef = useRef<HTMLFormElement>(null);
  // Capture the ref and store in our state
  useEffect(() => void (state.ref = ref(formRef)), [formRef, state]);
  return (
    <form action={snap.action} ref={formRef}>
      <div className="w-full rounded-t-lg border-0 bg-gray-700 ">
        <HiddenInputs />
        <TextArea />
        <Submit />
      </div>
    </form>
  );
};
const Form = () => {
  return (
    <>
      <FormInternal />
      <Instructions />
    </>
  );
};

export default Form;
