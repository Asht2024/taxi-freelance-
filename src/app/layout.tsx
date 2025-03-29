import Head from "next/head";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../../components/Navbar";
import { AnimatePresence } from "framer-motion";
import Footer from "../../components/Footer";
import AuthProvider from '../../components/AuthProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asht Cab - Premium Taxi Service",
  description: "Book reliable taxi services in Gujarat with 24/7 availability",
};

const navItems = [
  { name: "Home", link: "/" },
  { 
    name: "Services", 
    link: "/Service",
    dropdown: [
      { name: "All Services", link: "/Service" },
      { name: "Local Taxi Cab Service in Ahmedabad", link: "/local-taxi-cab-service-ahmdabad" },
      { name: "Ahmedabad to Mumbai Taxi Cab Service", link: "/ahmedabad-to-mumbai-taxi-cab-service" },
      { name: "Rajkot to Hirasar Airport Taxi Service", link: "/rajkot-to-hirasar-cab-service" },
      { name: "Taxi Service in Gujarat", link: "/taxi-service-in-gujarat" },
      { name: "Taxi Service in Ahmedabad Airport", link: "/taxi-service-in-ahmedabad-airport" },
      { name: "Rajkot Airport Taxi", link: "/rajkot-airport-taxi" },
      { name: "Cab Service in Ahmedabad for Outstation", link: "/cab-service-in-ahmedabad-for-outstation" },
    ]
  },
  { name: "About", link: "/About" },
  { name: "Contact", link: "/Contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Google Site Verification Meta Tag */}
        <meta name="google-site-verification" content="Sx1-bx7mmWGPc4RxGh4xLUgJ9k3oL2SMwLqeez_lMDU" />

        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=G-0Q3C25Y9BD`}></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0Q3C25Y9BD');
        ` }} />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id=G-0Q3C25Y9BBD'+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','G-0Q3C25Y9BBD');
        ` }} />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <Navbar navItems={navItems} />
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
