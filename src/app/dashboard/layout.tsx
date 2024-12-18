import Sidebar from './Sidebar';
import { headers } from 'next/headers';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const headersList = await headers();
  const pathname = headersList.get('x-invoke-path') || '';

  return (
    <div className="flex min-h-screen">
      <Sidebar pathname={pathname} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
