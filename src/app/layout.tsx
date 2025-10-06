import type { Metadata } from "next";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/app/styles/globals.css';

export const metadata: Metadata = {
  title: "miuwoof",
  description: "Building an e-commerce website for pet products MiuWoof",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
