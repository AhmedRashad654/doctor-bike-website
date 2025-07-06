import "./../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Almarai, Noto_Serif } from "next/font/google";
import { Alef } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import type { Metadata } from "next";
import Navbar from "@/components/homePage/Navbar/Navbar";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "./StoreProvider";
import InitUser from "@/components/initialUser";

type Params = Promise<{ locale: string }>;

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

const noto = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

const alef = Alef({
  subsets: ["hebrew"],
  weight: ["400"],
  display: "swap",
  preload: true,
});

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    icons: {
      icon: "/logo_Bike.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let fontClass = noto.className;

  if (locale === "ar") {
    fontClass = almarai.className;
  } else if (locale === "he") {
    fontClass = alef.className;
  }

  return (
    <html
      lang={locale}
      className={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={`${fontClass} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <StoreProvider>
              <InitUser />
              <CartProvider>
                <main className="max-w-[100vw] overflow-x-hidden">
                  <Navbar />
                  {children}
                </main>
                <Toaster position="top-center" />
              </CartProvider>
            </StoreProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
