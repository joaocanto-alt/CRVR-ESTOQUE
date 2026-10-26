import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { PwaRegister } from "@/components/PwaRegister";
const manrope=Manrope({subsets:["latin"],variable:"--font-manrope",display:"swap"});const inter=Inter({subsets:["latin"],variable:"--font-inter",display:"swap"});
export const metadata:Metadata={
  title:{default:"CRVR Estoque",template:"%s | CRVR Estoque"},
  description:"Catálogo de materiais e registro de entradas e retiradas de EPIs",
  applicationName:"CRVR Estoque",
  manifest:"/manifest.webmanifest",
  appleWebApp:{capable:true,title:"CRVR Estoque",statusBarStyle:"default"},
  icons:{
    icon:[{url:"/pwa/icon-192.png",sizes:"192x192",type:"image/png"},{url:"/pwa/icon-512.png",sizes:"512x512",type:"image/png"}],
    apple:[{url:"/pwa/apple-touch-icon.png",sizes:"180x180",type:"image/png"}],
  },
};
export const viewport:Viewport={themeColor:"#064B2D",width:"device-width",initialScale:1,maximumScale:1,viewportFit:"cover"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR" className={`${manrope.variable} ${inter.variable}`}><body className="font-sans antialiased"><PwaRegister/><AppShell>{children}</AppShell></body></html>}
