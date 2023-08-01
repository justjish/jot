// These styles apply to every route in the application
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Jot";
const description = "A simple note taking app";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://jish.dev"),
  themeColor: "#000",
};
export default async function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} h-screen bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black`}
      >
        <Toaster />
        {props.children}
      </body>
    </html>
  );
}
