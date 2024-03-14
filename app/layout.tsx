import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "I Don't Know Chat",
  description:"ChatGPT 3.5-turbo model for entertaining user",
  openGraph: {
    title: "Chat I Don't Know",
    description: 'ChatGPT 3.5-turbo model for entertaining use',
    url: 'http://localhost:3000',
    siteName: "Chat I Don't Know",
    images: [
      {
        url: 'http://localhost:3000/og-image-2.jpg', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'http://localhost:3000/og-image-2.jpg', // Must be an absolute URL
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
          defaultTheme="system"     
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
