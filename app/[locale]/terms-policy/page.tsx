import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPolicy() {
  return (
    <main className="min-h-screen py-12 px-4 md:px-0 flex justify-center items-start bg-background text-foreground pt-36">
      <Card className="w-full max-w-3xl shadow-md border">
        <CardHeader>
          <CardTitle className="text-xl lg:text-2xl text-center font-bold mb-4">
            الشروط والأحكام لاستخدام تطبيق Doctor Bike
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 leading-loose">
          <p>
            مرحبًا بك في تطبيق Doctor Bike. يرجى قراءة هذه الشروط والأحكام
            بعناية قبل استخدام التطبيق، حيث إن استخدامك لهذا التطبيق يعني
            موافقتك على الالتزام بهذه الشروط والأحكام.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-2">قبول الشروط:</h3>
            <p>
              عند تحميلك أو استخدامك لتطبيق Doctor Bike ، فإنك توافق على
              الالتزام بجميع الشروط والأحكام المنصوص عليها هنا، بالإضافة إلى أي
              تحديثات أو تغييرات قد تطرأ على هذه الشروط في المستقبل.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              التسجيل واستخدام الحساب:
            </h3>
            <ul className="list-disc pr-5 space-y-2">
              <li>
                يتعين على المستخدم إنشاء حساب لاستخدام التطبيق. يجب أن تكون
                المعلومات المقدمة عند التسجيل دقيقة، كاملة، وصحيحة.
              </li>
              <li>
                أنت مسؤول عن الحفاظ على سرية بيانات حسابك وتفاصيل الدخول الخاصة
                بك، ويجب عليك إبلاغنا فورًا إذا تم اختراق حسابك أو حدوث أي نشاط
                غير مصرح به.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              الاستخدام المسموح به:
            </h3>
            <ul className="list-disc pr-5 space-y-2">
              <li>
                يُسمح لك باستخدام التطبيق فقط للأغراض القانونية والمشروعة
                المتعلقة بمشاريع البناء.
              </li>
              <li>
                لا يجوز لك استخدام التطبيق في أي نشاط غير قانوني أو يتعارض مع
                حقوق الآخرين.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              حقوق الملكية الفكرية:
            </h3>
            <p>
              جميع الحقوق الفكرية المتعلقة بتطبيق Doctor Bike، بما في ذلك
              البرمجيات، المحتوى، والتصاميم، مملوكة لشركتنا أو مرخصة لنا. لا
              يُسمح لك بنسخ أو تعديل أو توزيع أو استخدام أي جزء من التطبيق دون
              الحصول على إذن مسبق.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
