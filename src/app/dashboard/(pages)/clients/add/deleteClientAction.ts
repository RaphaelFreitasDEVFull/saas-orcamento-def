'use server';

import { db } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export const deleteClient = async (id: number) => {
  await db.client.delete({
    where: { id: Number(id) },
  });

  redirect('/dashboard/clients');
};
