import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="bg-softbase relative">
        <div className="bg-white max-w-[480px] min-h-[100vh] mx-auto border-gray border-[1px] box-content relative">
          <Header />
          {children}
          <Navbar />
        </div>
      </body>
    </html>
  );
}
