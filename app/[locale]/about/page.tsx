import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <main className="min-h-screen py-12 px-4 md:px-0 flex justify-center items-start bg-background text-foreground pt-36">
      <Card className="w-full max-w-3xl shadow-md border">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold mb-4"> 
            من نحن
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 leading-loose">
          <p>
            نحن في <strong>doctor bike</strong> نسعى لتحقيق تحول حقيقي في صناعة البناء
            من خلال توفير أدوات مبتكرة وفعّالة تُمكّن فرق العمل من متابعة مشاريع
            البناء بكفاءة عالية. تطبيقنا يهدف إلى تحسين إدارة المشاريع، تعزيز
            التواصل بين جميع الأطراف المعنية، وتقليل المخاطر، مما يساهم في تسليم
            المشاريع في الوقت المحدد وبأعلى معايير الجودة.
          </p>

          <p>
            من خلال <strong>doctor bike</strong>، نوفر لك إمكانية متابعة تقدم العمل في
            الموقع، رصد الأداء، وإدارة المهام بكل سهولة، بالإضافة إلى ضمان
            الالتزام بالسلامة والامتثال للمعايير الدولية. سواء كنت مدير مشروع أو
            صاحب عمل أو أحد العمال، يوفر لك تطبيقنا كافة الأدوات التي تحتاجها
            لتنسيق الجهود وضمان سير العمل بسلاسة.
          </p>

          <p>
            نحن نؤمن بأن التكنولوجيا يمكن أن تحدث فرقًا كبيرًا في تعزيز
            الإنتاجية وتقليل التكاليف. لهذا السبب، يسعى <strong>doctor bike</strong> إلى
            أن يكون شريكك الموثوق في كل مرحلة من مراحل مشروع البناء، بدءًا من
            التخطيط وحتى التسليم.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
