import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

export default async function TermsPolicy() {
  const t = await getTranslations("termsPolicy");
  return (
    <main className="min-h-screen py-6 md:py-12 px-4 md:px-0 flex justify-center items-start bg-background text-foreground">
      <Card className="w-full max-w-3xl shadow-md border">
        <CardHeader>
          <CardTitle className="text-xl lg:text-2xl text-center font-bold mb-4">
            {t("title")}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 leading-loose" dangerouslySetInnerHTML={{ __html: t.raw("content") }}>
        </CardContent>
      </Card>
    </main>
  );
}
