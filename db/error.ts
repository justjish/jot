import type { PostgrestError } from "@supabase/supabase-js";
import { object, string } from "superstruct";
// Imported for sake of documentation.
export type PostgrestErrorStructType = PostgrestError;
export const PostgrestErrorStruct = object({ message: string(), details: string(), hint: string(), code: string() });
