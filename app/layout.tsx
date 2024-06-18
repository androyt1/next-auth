import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Andrew Aghoghovwia",
    description: "Simple next auth",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <div className='min-h-screen flex flex-col bg-primary'>
                    <Navbar />
                    <main className='flex-1 flex flex-col '>{children}</main>
                </div>
            </body>
        </html>
    );
}
