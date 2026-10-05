import type { Metadata, Viewport } from "next";
import { plusJakartaSans } from "@/configurations/font.config";
import "@/app/globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Toolbox · Login",
  description: "Hub para centralizar ferramentas usadas na Newnet.",
};

export const viewport: Viewport = { colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.className} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
