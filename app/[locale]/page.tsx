import LanguageSwitcher from "@/components/language/LanguageSwitcher";
import ToggleTheme from "@/components/theme/ToggleTheme";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations();
  return (
    <div className="text-3xl">
      <div className="">{t("home.title")}</div>
      <p className="dark:text-green-500 text-red-400 bg-link-active">
        This is a test for link-active
      </p>
      <LanguageSwitcher />
      <ToggleTheme />
    </div>
  );
}
