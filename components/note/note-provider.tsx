import { createContext, useContext, useEffect, useRef } from "react";
import { proxy, subscribe, useSnapshot, ref } from "valtio";
import { subscribeKey } from "valtio/utils";
import { min, max } from "./note-constants";
import type { NoteType } from "~/db/note-type-db";
import { createNote, updateNote } from "~/app/notes/actions";
import { PostgrestErrorStruct } from "~/db/error";
import { boolean, is } from "superstruct";
import { toast, useToaster } from "react-hot-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "~/db/types";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";

export type NoteStateType = NoteType & {
  /** A reference to the form element */
  ref: ReturnType<typeof ref<React.RefObject<HTMLFormElement>>> | null;
  /** The state of the autosave toggle */
  autosave: boolean;
  /** A unique value that is used to identify the client in a render*/
  clientUuid: string;
  /** Helper for Requirements UI */
  isUnderMin: boolean;
  /** Helper for Requirements UI */
  isUnderMax: boolean;
  /** Used to determine if the last update to content was local or server side */
  isLocalUpdate: boolean;
  /** Disable submit button */
  disableSubmit: boolean;
  /** Wraps the Server action so we can receive the message */
  action: (formData: FormData) => Promise<string | undefined>;
};

/** Need an efficient way to access the ui state of the form without prop drilling everywhere */
const NoteContext = createContext<undefined | NoteStateType>(undefined);
export const NoteProvider = ({ children, init }: { children: React.ReactNode; init: NoteType }) => {
  const api = createClientComponentClient<Database>();

  const router = useRouter();

  const state = useRef(
    proxy<NoteStateType>({
      ...init,
      ref: null,
      autosave: false,
      clientUuid: nanoid(),
      isUnderMin: init.content.length < min,
      isUnderMax: init.content.length < max,
      isLocalUpdate: false,
      disableSubmit: init.content.length < min || init.content.length > max,

      action: async (formData: FormData) => {
        const isUpdate = typeof state.slug === "string" && state.slug !== "new";
        const res = await (isUpdate ? updateNote : createNote)(formData);
        if (is(res, PostgrestErrorStruct) || res.slug === null) {
          return toast.error("Something went wrong. Try again in a few seconds.");
        }
        if (!isUpdate) {
          state.id = res.id;
          state.slug = res.slug;
          toast.success("Your new note has been created!");
          router.replace(res.slug);
        }
      },
    }),
  ).current;

  useEffect(() => {
    const subscribe = () => {
      api
        .channel(`note:${state.id}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "notes",
            filter: `id=eq.${state.id}`,
          },
          (payload) => {
            const latestNote = payload.new as NoteType;
            // If this client updated the note last, we do nothing
            if (state.clientUuid === latestNote.active_client) return;
            // Otherwise we simply update the content and validations.
            state.isLocalUpdate = false;
            state.content = latestNote.content;
            state.isUnderMax = latestNote.content.length <= 500;
            state.isUnderMin = latestNote.content.length <= 20;
          },
        )
        .subscribe();
    };

    // If the id was initially give, aka this is a new note.
    if (state.id !== -1) subscribe();

    const contentSubscription = subscribeKey(state, "content", async (c) => {
      state.isUnderMax = c.length <= 500;
      state.isUnderMin = c.length <= 20;
      if (state.autosave === false && state.isUnderMax === true && state.isUnderMin === false) {
        state.disableSubmit = false;
      }
      if (state.autosave && state.isLocalUpdate && state.isUnderMax === true && state.isUnderMin === false) {
        if (state.ref?.current) {
          const formData = new FormData(state.ref.current);
          formData.set("content", c);
          await state.action(formData);
        }
      }
    });

    // The moment autosave is either turned on or off, we need to save the current copy.
    const autosaveSubscription = subscribeKey(state, "autosave", async (c) => {
      /** Dealing with the submit button */
      if (c === true) {
        state.disableSubmit = true;
      } else {
        if (state.isUnderMax === true && state.isUnderMin === false) {
          state.disableSubmit = false;
        }
      }
      /** No matter the situation, we need to save the moment this is on or off. */
      if (state.isUnderMax === true && state.isUnderMin === false) {
        state.isLocalUpdate = true;
        if (state.ref?.current) {
          const formData = new FormData(state.ref.current);
          formData.set("content", state.content);
          await state.action(formData);
        }
      }
    });

    return () => {
      if (state.id !== -1) api.channel(`note:${state.id}`).unsubscribe();
      contentSubscription();
      autosaveSubscription();
    };
  }, [state, api]);
  return <NoteContext.Provider value={state}>{children}</NoteContext.Provider>;
};

export const useNoteState = () => {
  const state = useContext(NoteContext);
  if (state === undefined) throw new Error("useNoteProxy must be used within a NoteProvider");
  return state;
};
export const useNoteSnap = () => {
  const state = useNoteState();
  return useSnapshot(state);
};
