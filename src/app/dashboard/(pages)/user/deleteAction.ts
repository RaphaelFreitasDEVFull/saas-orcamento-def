'use server';

import { db } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export const deleteUser = async (id: string, _prevState: unknown) => {
  await db.user.delete({
    where: {
      id: Number(id),
    },
  });

  return redirect('/dashboard/user');
};
