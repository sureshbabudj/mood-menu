import type { Metadata } from "next";
import { Karla, Sour_Gummy} from "next/font/google";

import { AppProviders } from "./providers";
import "./styles.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://moodmenu.kanini.top"),
  title: {
    default: "MoodMenu",
    template: "%s | MoodMenu",
  },
  description: "Discover recipes based on your mood.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MoodMenu",
    description: "Discover recipes based on your mood.",
    url: "https://moodmenu.kanini.top",
    siteName: "MoodMenu",
    type: "website",
    images: [
      {
        url: "/assets/logo-share.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@moodmenu",
    title: "MoodMenu",
    description: "Discover recipes based on your mood.",
    images: ["/assets/logo-share.png"],
  },
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
