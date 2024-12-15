import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  TableHeader,
} from '@/components/ui/table';
import Link from 'next/link';
import { db } from '@/lib/prisma';
import { auth } from '../../../../../auth';
import { redirect } from 'next/navigation';

const ItemsPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/dashboard/login');
  }

  const items = await db.item.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Produtos</h1>
      <div className="flex flex-col gap-4">
        <Link
          href="/dashboard/items/add"
          className="w-fit bg-blue-500 text-white hover:bg-blue-600 hover:text-white rounded-lg px-4 py-2 self-end"
        >
          Adicionar Produto
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <Table className="w-full rounded-md border mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Preço Unitário</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50">
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.unitPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ItemsPage;
