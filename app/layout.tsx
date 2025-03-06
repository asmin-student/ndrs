import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nepal Disaster Response System',
  description: 'A comprehensive disaster management system for Nepal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Div A: Outer container */}
          <div className="min-h-screen bg-background/90 p-4 md:p-6 lg:p-8">
            {/* Div B: Inner container */}
            <div className="relative min-h-[calc(100vh-4rem)] bg-background rounded-xl shadow-lg flex">
              <Navbar />
              <main className="flex-1 overflow-hidden">
                <div className="container h-full py-6 px-4 md:px-6">
                  {children}
                </div>
              </main>
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}