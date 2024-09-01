import { Inter } from "next/font/google";
import '../app/lib/fontawesome.js';
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Divani: Fabrica de calzados- Manejo de stock de productos",
  description: "Stock Divani",
};

export default function RootLayout({ children }) {  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
