import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

export default async function About() {
  const t = await getTranslations("about");
  return (
    <main className="min-h-screen py-8 md:py-12 px-4 md:px-0 flex justify-center items-start bg-background text-foreground ">
      <Card className="w-full max-w-3xl shadow-md border">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold mb-4">
            {t("title")}
          </CardTitle>
        </CardHeader>

        <CardContent
          className="space-y-6 leading-loose"
          dangerouslySetInnerHTML={{ __html: t.raw("content") }}
        ></CardContent>
      </Card>
    </main>
  );
}
