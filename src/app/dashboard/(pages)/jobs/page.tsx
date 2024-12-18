import { redirect } from 'next/navigation';
import { auth } from '../../../../../auth';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/lib/prisma';

import Link from 'next/link';
import { DeleteUserComponent } from './delete';

const UserPage = async () => {
  const session = await auth();

  if (session?.user?.roleName !== 'admin') {
    redirect('/dashboard');
  }

  const roles = await db.role.findMany();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Pagina de Usuarios</h1>
      <div className="flex flex-col gap-4 mt-4">
        <Link href={'/dashboard/jobs/add'}>
          <Button className="self-end w-fit mt-4 bg-blue-500 hover:bg-blue-600">
            <PlusIcon size={20} />
            <span>Adicionar Cargos</span>
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.id}</TableCell>
                  <TableCell>{role.roleName}</TableCell>
                  <TableCell>
                    <DeleteUserComponent id={role.id.toString()} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
