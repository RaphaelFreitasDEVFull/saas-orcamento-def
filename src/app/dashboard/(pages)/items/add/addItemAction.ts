'use server';

import { db } from '@/lib/prisma';
import { auth } from '../../../../../../auth';
import { redirect } from 'next/navigation';

export async function addItem(prevState: unknown, formData: FormData) {
  const session = await auth();

  const name = formData.get('name');
  const description = formData.get('description');
  const unitPrice = formData.get('unitPrice');

  if (!name) {
    throw new Error('Nome é obrigatório');
  }

  if (!unitPrice || isNaN(parseFloat(unitPrice as string))) {
    throw new Error('Preço unitário inválido');
  }

  await db.item.create({
    data: {
      name: name as string,
      description: (description as string) || '',
      unitPrice: parseFloat(unitPrice as string),
      user: {
        connect: {
          id: Number(session?.user?.id),
        },
      },
    },
  });

  redirect('/dashboard/items');
}
