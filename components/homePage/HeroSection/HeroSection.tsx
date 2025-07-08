import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MainTextHeroSection from "./MainTextHeroSection";
import TriangleHeroSection from "./TriangleHeroSection";
import FooterHeaderSection from "./FooterHeaderSection";
import "@/app/style-swiper.css";
import SwiperHeroSection from "./SwiperHeroSection";
import { GetContact } from "@/services/contact/contact";

export default async function HeroSection() {
  const data = await GetContact();
  console.log(data);
  return (
    <div className="min-h-[750px] relative">
      <SwiperHeroSection />
      <MainTextHeroSection />
      <FooterHeaderSection data={data?.data} />
      <div className="flex justify-end absolute left-0 bottom-0 z-10">
        <TriangleHeroSection />
      </div>
    </div>
  );
}
