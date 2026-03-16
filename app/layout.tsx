import type { Metadata } from "next";
import { Karla, Sour_Gummy} from "next/font/google";

import { AppProviders } from "./providers";
import "./styles.css";

export const metadata: Metadata = {
  title: "MoodMenu",
  description: "Discover recipes based on your mood.",
};

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  weight: ["400", "500", "600", "700"],
});

const sourGummy = Sour_Gummy({
  subsets: ["latin"],
  variable: "--font-sourgummy",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${karla.variable} ${sourGummy.variable}`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
