import {
  BriefcaseIcon,
  HomeIcon,
  ListIcon,
  PackageIcon,
  PlusIcon,
  User2Icon,
  UsersIcon,
} from 'lucide-react';
import Link from 'next/link';
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import LogoutButton from './logout';
import { Label } from '@/components/ui/label';

const Sidebar = async ({ pathname }: { pathname: string }) => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 p-4 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-4">
          <span className="rounded-full bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center text-sm font-medium">
            {session?.user?.name?.charAt(0)}
          </span>
          <p className="font-medium">{session?.user?.name}</p>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-4">
          {/* Home Section */}
          <div>
            <Label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Início
            </Label>
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${
                pathname === '/dashboard'
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <HomeIcon size={18} />
              <span>Homepage</span>
            </Link>
          </div>

          {/* Admin Section */}
          {session.user?.roleName === 'admin' && (
            <div>
              <Label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                Administrador
              </Label>
              <div className="space-y-1">
                <Link
                  href="/dashboard/user"
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${
                    pathname === '/dashboard/user'
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <User2Icon size={18} />
                  <span>Usuários</span>
                </Link>
                <Link
                  href="/dashboard/jobs"
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${
                    pathname === '/dashboard/jobs'
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <BriefcaseIcon size={18} />
                  <span>Cargos</span>
                </Link>
              </div>
            </div>
          )}

          {/* Client Management Section */}
          <div>
            <Label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Gerenciamento de Clientes
            </Label>
            <div className="space-y-1">
              <Link
                href="/dashboard/clients"
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${
                  pathname === '/dashboard/clients'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <UsersIcon size={18} />
                <span>Clientes</span>
              </Link>
              <Link
                href="/dashboard/clients/add"
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${
                  pathname === '/dashboard/clients/add'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <PlusIcon size={18} />
                <span>Adicionar Cliente</span>
              </Link>
            </div>
          </div>
          {/* Itens Management Section */}
          <div>
            <Label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Gerenciamento de Produtos
            </Label>
            <div className="space-y-1">
              <Link
                href="/dashboard/items"
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${
                  pathname === '/dashboard/produtos'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <PackageIcon size={18} />
                <span>Produtos</span>
              </Link>
            </div>
          </div>
          {/* orãmento Management Section */}
          <div>
            <Label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Gerenciamento de Orçamentos
            </Label>
            <div className="space-y-1">
              <Link
                href="/dashboard/quotes"
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${
                  pathname === '/dashboard/quotes'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <PlusIcon size={18} />
                <span>Adicionar Orçamento</span>
              </Link>
              <Link
                href="/dashboard/quotes/list"
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${
                  pathname === '/dashboard/quotes/add'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <ListIcon size={18} />
                <span>Listar Orçamentos</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="pt-4 border-t border-gray-100">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;
