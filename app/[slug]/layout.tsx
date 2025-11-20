import type { ReactNode } from 'react';
import Header from '../../src/components/Header';
import Navigation from '../../src/components/Navigation';
import Footer from '../../src/components/Footer';

export default function PostLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <Navigation />
      <main className="flex-1 bg-white">
        {children}
      </main>
      <Footer />
    </div>
  );
}


