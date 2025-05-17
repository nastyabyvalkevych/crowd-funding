import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import "remixicon/fonts/remixicon.css";
import FooterSection from "@/components/common/Footer";
import LayoutProvider from "@/providers/layout-provider";
import Script from "next/script"; // Import Script from next/script

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
            <LayoutProvider>{children}</LayoutProvider>

            <div className="mt-16 md:mt-32">
              <FooterSection />
            </div>
          </NextIntlClientProvider>

          <Script
            id="1"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                const iframe = document.createElement("iframe");
                
                const iframeStyles = (styleString) => {
                  const style = document.createElement('style');
                  style.textContent = styleString;
                  document.head.append(style);
                }
                
                iframeStyles(\`
                  .chat-frame {
                    position: fixed;
                    bottom: 50px;
                    right: 50px;
                    border: none;
                    backgroundColor:'white';
                  }
                \`);
                
                iframe.src = "https://diploma-sigma-weld.vercel.app/chatbot";
                iframe.classList.add('chat-frame');
                document.body.appendChild(iframe);
                
                window.addEventListener("message", (e) => {
                  if (e.origin !== "https://diploma-sigma-weld.vercel.app") return;
                  let dimensions = JSON.parse(e.data);
                  iframe.width = dimensions.width;
                  iframe.height = dimensions.height;
                  iframe.contentWindow.postMessage("9a21c6fd-1da7-4338-bd04-1a56b680d077", "https://diploma-sigma-weld.vercel.app/");
                });
              `,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
