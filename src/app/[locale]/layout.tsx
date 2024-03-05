import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/common/NavBar";
import {NextIntlClientProvider, useMessages} from 'next-intl';
import FooterSection from "@/components/sections/FooterSection";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: "Ukraine Aid Fund",
  description: "Donat to hepl",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}
export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {

    const messages = useMessages();
  return (
    <html lang={locale}>
      <body className={nunito.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NavBar />
          {children}
          <div className="mt-16 md:mt-32">
            <FooterSection />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
