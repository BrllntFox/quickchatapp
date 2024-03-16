import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "I Don't Know Chat",
  description:"ChatGPT 3.5-turbo model for entertaining user",
  openGraph: {
    title: "Chat I Don't Know",
    description: 'ChatGPT 3.5-turbo model for entertaining use',
    url: 'https://idontknowchat.vercel.app/',
    siteName: "Chat I Don't Know",
    images: [
      {
        url: 'https://asset.cloudinary.com/diiy0vfg1/e26483b11c8563d025f15c941745899f', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://asset.cloudinary.com/diiy0vfg1/e26483b11c8563d025f15c941745899f', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
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
