"use server";
import { revalidatePath } from "next/cache";
import { getActionClient } from "~/lib/api-client";

export const handleSignOut = async () => {
  const { api } = await getActionClient();
  await api.auth.signOut();
  revalidatePath("/");
};

export const createNote = async (formData: FormData) => {
  const { api } = await getActionClient();
  const content = String(formData.get("content"));
  const active_client = String(formData.get("active_client"));
  const { status, error, data } = await api
    .from("notes")
    .insert({ content, active_client })
    .select()
    .single();
  revalidatePath("/notes");
  return data ?? error;
};

export const updateNote = async (formData: FormData) => {
  const { api } = await getActionClient();
  const id = String(formData.get("id"));
  const slug = String(formData.get("slug"));
  const content = String(formData.get("content"));
  const active_client = String(formData.get("active_client"));
  const { error, data } = await api
    .from("notes")
    .update({ content, active_client })
    .match({ id, slug })
    .select()
    .single();
  revalidatePath("/notes");
  return data ?? error;
};

export const deleteNote = async (formData: FormData) => {
  const slug = String(formData.get("slug"));
  const { api } = await getActionClient("/notes");
  await api.from("notes").delete().eq("slug", slug);
  revalidatePath("/notes");
};
