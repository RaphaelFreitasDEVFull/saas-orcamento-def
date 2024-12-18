'use server';

import { db } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export const deleteUser = async (id: string, _prevState: unknown) => {
  console.log(_prevState);
  try {
    await db.user.delete({
      where: {
        id: Number(id),
      },
    });

    return redirect('/dashboard/user');
  } catch (error: unknown) {
    return {
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
};
