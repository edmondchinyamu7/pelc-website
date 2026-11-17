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
  themeColor: "#102b24",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "PELC",
  description:
    "PELC is a digital studio based in Malawi. We design and build websites, apps, brands, and digital experiences that help businesses move forward.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PELC",
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
