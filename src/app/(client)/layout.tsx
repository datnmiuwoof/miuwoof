"use client"

import { Provider } from "react-redux";
import { store } from "@/lib/store";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/app/styles/globals.css';
import { Quicksand } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";

const quick = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});



// export const metadata: Metadata = {
//   title: "miuwoof",
//   description: "Building an e-commerce website for pet products MiuWoof",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en" className={quick.className}>
        <body>
          <Header></Header>
          <AuthProvider>{children}</AuthProvider>
          <Footer></Footer>
        </body>
      </html>
    </Provider>

  );
}
