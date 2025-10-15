
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutContent } from "./layoutContent";
import { AuthProvider } from "./Providers";
import { Roboto_Condensed } from "next/font/google";
import AlarmBell from "src/components/Alarm_Bell/Alarm_bell";


const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"], // choose weights you need
  style: ["normal", "italic"],  // optional
  display: "swap",
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Aqsa Academy",
  description: "Our mission is to empower poor and backward minority section and thereby develop the socio-economic condition of the society",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${robotoCondensed.className}`}
      >  <AlarmBell/>
        <AuthProvider>
            <LayoutContent element={children}/>
       </AuthProvider>
      </body>
    </html>
  );
}
