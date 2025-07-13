import Footer from "@/components/homePage/Footer/Footer";
import HeroSection from "@/components/homePage/HeroSection/HeroSection";
import MainCategory from "@/components/homePage/MainCategory/MainCategory";
import ProductMoreSales from "@/components/homePage/ProductMoreSales/ProductMoreSales";
import { SearchParams } from "./products/[id]/page";
import Advertisements from "@/components/homePage/advertisements/Advertisements";
import ProductFromSearch from "@/components/homePage/productFromSearch/ProductFromSearch";

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resultSearchParams = await searchParams;
  const page = resultSearchParams.page ?? "1";
  const nameProduct = resultSearchParams.name ?? "";
  return (
    <div className="flex flex-col">
      <HeroSection />
      {nameProduct ? (
        <ProductFromSearch />
      ) : (
        <>
          <MainCategory />
          <ProductMoreSales page={page} />
          <Advertisements />
        </>
      )}

      <Footer />
    </div>
  );
}
