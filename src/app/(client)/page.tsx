'use client';

import '@/app/styles/globals.css';
import MyCarousel from "@/components/ui/Carousel";
import PromotionSection from "@/components/ui/PromotionSection";
import ProductSalesSection from "@/components/product/ProductSalesSection";
import ProductNewsSection from "@/components/product/ProductNewsSection";
import ProductDogSection from "@/components/product/ProductDogSection";
import ProductCatSection from "@/components/product/ProductCatSection";
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
