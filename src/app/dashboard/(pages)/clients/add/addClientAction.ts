'use server';

import { db } from '@/lib/prisma';
import { auth } from '../../../../../../auth';
import { redirect } from 'next/navigation';

export async function addClient(prevState: unknown, formData: FormData) {
  const session = await auth();
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const address = formData.get('address');

  await db.client.create({
    data: {
      name: name as string,
      email: email as string,
      phone: phone as string,
      address: address as string,
      user: {
        connect: {
          id: Number(session?.user?.id),
        },
      },
    },
  });

  redirect('/dashboard/clients');
}
