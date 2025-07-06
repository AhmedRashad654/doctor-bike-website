import Footer from "@/components/homePage/Footer/Footer";
import HeroSection from "@/components/homePage/HeroSection/HeroSection";
import MainCategory from "@/components/homePage/MainCategory/MainCategory";
import ProductMoreSales from "@/components/homePage/ProductMoreSales/ProductMoreSales";
import { SearchParams } from "./products/[id]/page";

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resultSearchParams = await searchParams;
  const page = resultSearchParams.page ?? "1";
  return (
    <div className="flex flex-col">
      <HeroSection />
      <MainCategory />
      <ProductMoreSales page={page} />
      <Footer />
    </div>
  );
}
