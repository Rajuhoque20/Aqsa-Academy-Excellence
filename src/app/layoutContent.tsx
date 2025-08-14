'use client';

import { useSession } from 'next-auth/react';
import React, { ReactNode } from 'react';
import AuthLayout from 'src/components/AuthContent/AuthLayout';
import Footer from 'src/components/Footer/Footer';
import Header from 'src/components/Header/Header';

export const LayoutContent = ({ element }: { element: ReactNode }) => {
  const { data, status } = useSession();

  if (status === 'loading') {
    // You can replace this with a spinner or skeleton loader if you like
    return <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <span className='text-white'>Loading...</span>
    </div>;
  }

  return data?.user ? (
    <AuthLayout>{element}</AuthLayout>
  ) : (
    <div className="flex flex-col h-max overflow-y-auto overflow-x-hidden w-full min-h-screen">
      <Header />
      {element}
      <Footer />
    </div>
  );
};
