import DataUserUpdate from "./data-user-update/DataUserUpdate";
import ChangePasswordUserLogin from "./change-password-user-login/ChangePasswordUserLogin";
import Logout from "./logout/Logout";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { SearchParams } from "../products/[id]/page";

export default async function User({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const t = await getTranslations("auth");
  const resultSearchParams = await searchParams;
  const tab = resultSearchParams.tab || "data";

  return (
    <div className="min-h-[calc(100vh-100px)] flex justify-center py-6 md:py-10">
      <div className="w-full max-w-7xl px-6">
        <div className="mb-6 w-full flex sm:flex-row flex-col-reverse gap-4 justify-between bg-muted dark:bg-gray-800 rounded-lg p-1">
          {[
            { key: "data", label: t("informationPersonal") },
            { key: "password", label: t("changePassword") },
            { key: "logout", label: t("logout") },
          ].map((item) => (
            <Link
              key={item.key}
              href={`/user?tab=${item.key}`}
              className={`cursor-pointer font-bold w-full text-center py-1 rounded-md 
        ${
          tab === item.key
            ? "dark:bg-gray-600 border-1 bg-white dark:text-white"
            : ""
        }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        {tab === "data" && <DataUserUpdate />}
        {tab === "password" && <ChangePasswordUserLogin />}
        {tab === "logout" && <Logout />}
      </div>
    </div>
  );
}
