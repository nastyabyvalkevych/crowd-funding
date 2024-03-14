import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import "remixicon/fonts/remixicon.css";
import FooterSection from "@/components/common/Footer";
import LayoutProvider from "@/providers/layout-provider";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ukraine Aid Fund",
  description: "Donate to help",
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
    <ClerkProvider>
      <html lang={locale}>
        <body className={nunito.className}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <LayoutProvider> {children}</LayoutProvider>

            <div className="mt-16 md:mt-32">
              <FooterSection />
            </div>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
