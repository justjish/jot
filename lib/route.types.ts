import type { LinkProps } from "next/link";
import type Link from "next/link";
import type { useRouter } from "next/navigation";

export type AppRouterInstance = ReturnType<typeof useRouter>;
export type RouterReplace = Parameters<AppRouterInstance["replace"]>[0];
export type LinkHref = Parameters<typeof Link>[0]["href"];
