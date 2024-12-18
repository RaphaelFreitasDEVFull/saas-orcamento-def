import { db } from '@/lib/prisma';
import { auth } from '../../../../../auth';
import AddQuoteForm from './addQuoteForm';
import { redirect } from 'next/navigation';

export default async function QuotesPage() {
  const session = await auth();

  if (!session) {
    redirect('/dashboard/login');
  }

  const clients = await db.client.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  const items = await db.item.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Orçamentos</h1>
      <div className="flex flex-col gap-4">
        <AddQuoteForm clients={clients} items={items} />
      </div>
    </div>
  );
}
