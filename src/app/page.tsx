'use client';

import dynamic from 'next/dynamic';

const AdminApp = dynamic(() => import('../components/AdminApp'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="text-2xl font-semibold">Loading...</div>
    </div>
  ),
});

export default function Home() {
  return <AdminApp />;
} 