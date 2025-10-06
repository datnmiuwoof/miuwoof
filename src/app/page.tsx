'use client';

import '@/app/styles/globals.css';
import MyCarousel from "@/components/ui/Carousel";
import PromotionSection from "@/components/ui/PromotionSection";
import ProductSalesSection from "@/components/ui/ProductSalesSection";
import ProductNewsSection from "@/components/ui/ProductNewsSection";
import ProductDogSection from "@/components/ui/ProductDogSection";
import ProductCatSection from "@/components/ui/ProductCatSection";
import PostSection from "@/components/ui/postSection";


export default function Home() {
  return (
    <main>
      <MyCarousel />
      <PromotionSection />
      <ProductSalesSection />
      <ProductNewsSection />
      <ProductDogSection />
      <ProductCatSection />
      <PostSection />
    </main>
  );
}
