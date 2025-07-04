import Footer from "@/components/homePage/Footer/Footer";
import HeroSection from "@/components/homePage/HeroSection/HeroSection";
import MainCategory from "@/components/homePage/MainCategory/MainCategory";
import ProductMoreSales from "@/components/homePage/ProductMoreSales/ProductMoreSales";

export default async function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ProductMoreSales />
      <MainCategory />
      <Footer />
    </div>
  );
}
