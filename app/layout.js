import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./home-contact-sidebar.css";
import "./pelc-pages.css";
import ContactDrawerProvider from "@/components/ContactDrawerProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#11100d",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "NOVEX DIGITAL",
  description:
    "NOVEX DIGITAL — New Ideas. New Possibilities. New Legacy. Digital solutions in website development, software, AI, marketing, branding, and technology consultancy.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NOVEX DIGITAL",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ContactDrawerProvider>{children}</ContactDrawerProvider>
      </body>
    </html>
  );
}
