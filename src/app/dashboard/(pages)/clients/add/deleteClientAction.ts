'use server';

import { db } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export const deleteClient = async (id: number, _prevState: unknown) => {
  await db.client.delete({
    where: { id: Number(id) },
  });

  redirect('/dashboard/clients');
};
