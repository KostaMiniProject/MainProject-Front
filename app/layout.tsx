import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Recoil from '@/utility/Recoil';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '가치잇솝',
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
      <head></head>
      <body className="bg-softbase relative">
        <Recoil>
          <div className="bg-white max-w-[480px] min-h-[100vh] mx-auto relative ">
            <div className="mx-[16px]">{children}</div>
            <Navbar />
            <div className="h-[160px]"></div>
          </div>
        </Recoil>
      </body>
    </html>
  );
}
