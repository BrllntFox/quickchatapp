import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { openGraphImage } from "@/components/shared/share-metadata";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "I Don't Know",
  description:"ChatGPT 3.5-turbo model for entertainment",
    openGraph: {
      ...openGraphImage,
      title: "I Don't Know ChatApp",
      url:"idontknowchat.vercel.app ",
      siteName: 'IDontKnow',
    },
  }  
;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"     
          disableTransitionOnChange
        >
          <Providers>{children}<SpeedInsights/></Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
