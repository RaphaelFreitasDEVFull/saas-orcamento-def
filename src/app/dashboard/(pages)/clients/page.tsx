import {
  Table,
  TableCell,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/lib/prisma';
import Link from 'next/link';
import { auth } from '../../../../../auth';
import DeleteClient from './add/_components/deleteClient';
import { redirect } from 'next/navigation';

const ClientsPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/dashboard/login');
  }

  const clients = await db.client.findMany({
    where: {
      user: {
        id: Number(session?.user?.id),
      },
    },
  });

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Clientes</h1>
      <Link
        href="/dashboard/clients/add"
        className="bg-blue-500 text-white p-2 rounded-md self-end w-fit"
      >
        Adicionar Cliente
      </Link>
      <div className="flex flex-col gap-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.address}</TableCell>
                  <TableCell className="flex gap-2 items-start justify-start text-red-500">
                    <DeleteClient id={client.id} />
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

export default ClientsPage;
