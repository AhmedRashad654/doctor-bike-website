import type { Metadata } from "next";
import "./../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Almarai, Noto_Serif } from "next/font/google";
import { Alef } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

const noto = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const alef = Alef({
  subsets: ["hebrew"],
  weight: ["400"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale });
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
  params: { locale: string };
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
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={`${fontClass}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
