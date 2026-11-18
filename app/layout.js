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
  title: "NEOPAD STUDIO",
  description:
    "NEOPAD STUDIO is a creative digital and technology studio helping individuals, businesses, organisations, and entrepreneurs turn ideas into practical digital solutions through website development, software and applications, digital marketing and advertising, graphic design and branding, AI, and digital consultancy.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NEOPAD STUDIO",
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
