import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '가치잇섭',
  description: '물건의 가치를 잇다',
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
          {children}
          <Navbar />
          <div className="h-[60px]"></div>
        </div>
      </body>
    </html>
  );
}
