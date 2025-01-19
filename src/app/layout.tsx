import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PapaPanel',
  description: '基于 React Admin 的 LEMP 环境自动化部署和监控管理平台',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
} 