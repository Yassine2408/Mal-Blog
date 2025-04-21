import React from 'react';
import Header from './header';
import Footer from './footer';

interface LayoutProps {
  children: React.ReactNode;
  transparentHeader?: boolean;
  hideFooter?: boolean;
}

export default function Layout({ 
  children, 
  transparentHeader = false, 
  hideFooter = false 
}: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header transparent={transparentHeader} />
      <main className="flex-grow">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
