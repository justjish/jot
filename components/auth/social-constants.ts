import { enums, type Infer } from "superstruct";
export const ALL_PROVIDERS = [
  "apple",
  "azure",
  "bitbucket",
  "discord",
  "facebook",
  "figma",
  "github",
  "gitlab",
  "google",
  "kakao",
  "keycloak",
  "linkedin",
  "notion",
  "slack",
  "spotify",
  "twitch",
  "twitter",
  "workos",
  "zoom",
] as const;
export const ACTIVE_PROVIDERS = ["github"] as const;

// A few helper types to make sure we don't accidentally add a provider to one.
export const AllProvidersStruct = enums(ALL_PROVIDERS);
export type AllProvidersType = Infer<typeof AllProvidersStruct>;

export const ActiveProvidersStruct = enums(ACTIVE_PROVIDERS);
export type ActiveProvidersType = Infer<typeof ActiveProvidersStruct>;
