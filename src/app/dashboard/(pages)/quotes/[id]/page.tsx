import { db } from '@/lib/prisma';
import { auth } from '../../../../../../auth';
import { redirect } from 'next/navigation';
import { PdfButton } from '@/_components/PdfButton';
import { Params } from 'next/dist/server/request/params';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export default async function QuotePage({
  params,
}: {
  params: Params & { id: string };
}) {
  const quote = await db.quote.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      client: true,
      items: {
        include: {
          item: true,
        },
      },
    },
  });

  if (!quote) {
    return <div>Orçamento não encontrado</div>;
  }

  const session = await auth();

  if (!session) {
    redirect('/dashboard/login');
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div id="pdf-content">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Relatório de Orçamento
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">
              Informações do Cliente
            </h2>
            <p className="text-gray-700">Nome: {quote.client.name}</p>
            <p className="text-gray-700">Email: {quote.client.email}</p>
            <p className="text-gray-700">Telefone: {quote.client.phone}</p>
            <p className="text-gray-700">Endereço: {quote.client.address}</p>
          </div>

          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Status do Orçamento</h2>
            <p className="text-gray-700">
              Situação atual:
              <span className="font-medium">
                {quote.status === 'approved'
                  ? 'Aprovado'
                  : quote.status === 'rejected'
                  ? 'Rejeitado'
                  : 'Pendente'}
              </span>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Valores</h2>
            <p className="text-gray-700">
              Valor Total:
              <span className="font-medium">
                {formatCurrency(quote.totalAmount)}
              </span>
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Itens do Orçamento</h2>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantidade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor Unitário
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quote.items.map((quoteItem) => (
                    <tr key={quoteItem.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {quoteItem.item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {quoteItem.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {formatCurrency(quoteItem.unitPrice)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {formatCurrency(
                          quoteItem.quantity * quoteItem.unitPrice
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <PdfButton />
      </div>
    </div>
  );
}
