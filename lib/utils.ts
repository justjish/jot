export const SITE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://jot.jish.dev"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_ENV}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "development" &&
      process.env.NEXT_PUBLIC_DEV_URL
    ? process.env.NEXT_PUBLIC_DEV_URL
    : "http://localhost:3000";
