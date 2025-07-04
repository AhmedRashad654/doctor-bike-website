import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import instagem from "@/public/instagram.png";
import whatsapp from "@/public/logos_whatsapp-icon.png";
import {  Phone } from "lucide-react";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";

export default function ContactUs() {
  return (
    <main className="min-h-screen py-12 px-4 md:px-0 flex justify-center items-start bg-background text-foreground pt-36">
      <Card className="w-full max-w-2xl shadow-md border">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold mb-4">
            اتصل بنا
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 leading-loose">
          <p>يسعدنا تواصلك معنا! يمكنك التواصل معنا عبر الوسائل التالية:</p>

          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <span className="font-medium">رقم الهاتف:</span>
              <a
                href="tel:+201234567890"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Phone className="inline ml-2 w-5 h-5" />
                +20 123 456 7890
              </a>
            </li>

            <li className="flex items-center justify-between">
              <span className="font-medium">واتساب:</span>
              <a
                href="https://wa.me/201234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 flex items-center gap-3 hover:underline"
              >
                <Image
                  src={whatsapp}
                  alt="whatsApp"
                  className="w-[25px] h-[25px]"
                />
                تواصل عبر واتساب
              </a>
            </li>

            <li className="flex items-center justify-between">
              <span className="font-medium">منصة X:</span>
              <a
                href="https://x.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black dark:text-gray-400 hover:underline"
              >
                <FaXTwitter className="inline ml-2 w-5 h-5" />
                @profile
              </a>
            </li>

            <li className="flex items-center justify-between">
              <span className="font-medium">Instagram:</span>
              <a
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 flex items-center gap-3 hover:underline"
              >
                <Image
                  src={instagem}
                  alt="instagram"
                  className="w-[25px] h-[25px]"
                />
                @profile
              </a>
            </li>
          </ul>

          <p className="text-sm text-muted-foreground mt-8 text-center">
            فريق doctor bike متواجد دائمًا لمساعدتك والإجابة على استفساراتك.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

