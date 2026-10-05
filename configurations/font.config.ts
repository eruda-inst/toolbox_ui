import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  fallback: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const tostadaFf = localFont({
  src: "../public/fonts/tostadaff.ttf",
  fallback: ["Impact", "Haettenschweiler", "Arial Black", "fantasy"],
  variable: "--font-tostada-ff",
  display: "swap",
});

export { plusJakartaSans, tostadaFf };
