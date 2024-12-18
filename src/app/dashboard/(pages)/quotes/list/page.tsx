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
import { PlusIcon } from 'lucide-react';
import { auth } from 'auth';

export default async function QuotesListPage() {
  const session = await auth();

  const quotes = await db.quote.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
    include: {
      client: true,
    },
  });

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Orçamentos</h1>
        <Link href="/dashboard/quotes/add">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6">
            + Novo Orçamento
          </Button>
        </Link>
      </div>

      <p className="text-sm text-gray-500">
        Veja todos os orçamentos cadastrados
      </p>

      <div className="bg-white shadow-sm border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-600">ID</TableHead>
              <TableHead className="font-semibold text-gray-600">
                Título
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Cliente
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Status
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Total
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Data
              </TableHead>
              <TableHead className="font-semibold text-gray-600 text-center">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map((quote) => (
              <TableRow
                key={quote.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium text-gray-900">
                  {quote.id}
                </TableCell>
                <TableCell className="text-gray-700">{quote.title}</TableCell>
                <TableCell className="text-gray-700">
                  {quote.client.name}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      quote.status === 'approved'
                        ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                        : quote.status === 'rejected'
                        ? 'bg-red-50 text-red-700 ring-1 ring-red-600/20'
                        : 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20'
                    }`}
                  >
                    {quote.status === 'approved'
                      ? 'Aprovado'
                      : quote.status === 'rejected'
                      ? 'Rejeitado'
                      : 'Pendente'}
                  </span>
                </TableCell>
                <TableCell className="font-medium">
                  {quote.currency === 'BRL' ? 'R$ ' : '$ '}
                  {quote.totalAmount}
                </TableCell>
                <TableCell className="text-gray-700">
                  {quote.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/quotes/${quote.id}`}>
                    <PlusIcon className="h-4 w-4" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
