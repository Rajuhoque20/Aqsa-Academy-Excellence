import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import AuthLayout from "src/components/AuthContent/AuthLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aqsa Academy",
  description: "Our mission is to empower poor and backward minority section and thereby develop the socio-economic condition of the society",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLogin=true;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {  isLogin?
    <AuthLayout>{children}</AuthLayout>:<div   className={`flex flex-col h-max overflow-y-auto overflow-x-hidden w-full min-h-screen`} >
         <Header/>
        {children}
        <Footer/>
        </div>}
       
      </body>
    </html>
  );
}
