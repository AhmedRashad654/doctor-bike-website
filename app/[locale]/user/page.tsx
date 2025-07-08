"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import DataUserUpdate from "./data-user-update/DataUserUpdate";
import ChangePasswordUserLogin from "./change-password-user-login/ChangePasswordUserLogin";
import { useAppSelector } from "@/redux/hooksRedux";
import { useRouter } from "@/i18n/navigation";
import Logout from "./logout/Logout";

export default function User() {
  const user = useAppSelector((state) => state?.user);
  const router = useRouter();
  // protected Routed

  useEffect(() => {
    if (user?.status !== "idle" && user?.status !== "loading") {
      const notLoggedIn = !user?.data?.id;

      if (notLoggedIn) {
        router.replace("/sign-in");
      }
    }
  }, [user?.status, user?.data?.id, router]);

  return (
    <div className="min-h-[calc(100vh-100px)] flex justify-center py-6 md:py-10">
      <Tabs defaultValue="data" className="mb-6 w-full max-w-7xl px-6">
        <TabsList className="w-full flex sm:flex-row flex-col-reverse  gap-4 justify-between bg-gray-100 dark:bg-gray-800 rounded-md">
          <TabsTrigger value="logout" className="cursor-pointer font-bold">
            تسجيل الخروج
          </TabsTrigger>
          <TabsTrigger value="password" className="cursor-pointer font-bold">
            تغيير كلمة المرور
          </TabsTrigger>
          <TabsTrigger value="data" className="cursor-pointer font-bold">
            البيانات الشخصية
          </TabsTrigger>
        </TabsList>
        <TabsContent value={"data"}>
          <DataUserUpdate />
        </TabsContent>
        <TabsContent value={"password"}>
          <ChangePasswordUserLogin />
        </TabsContent>
        <TabsContent value={"logout"}>
          <Logout />
        </TabsContent>
      </Tabs>
    </div>
  );
}
