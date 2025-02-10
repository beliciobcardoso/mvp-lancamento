import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "@/components/menu/menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} flex`}>       
          <aside className="flex flex-col h-screen bg-gray-200">
            <header>
              <h1>Logo</h1>
            </header>
            <Menu />
            <footer>
              <p>Footer</p>
            </footer>
          </aside>
          <main className="flex flex-col h-screen w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
