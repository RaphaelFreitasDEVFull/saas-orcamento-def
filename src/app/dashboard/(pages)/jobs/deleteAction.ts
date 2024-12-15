'use server';

import { db } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export const deleteRole = async (_prevState: unknown, id: string) => {
  await db.role.delete({
    where: {
      id: Number(id),
    },
  });

  return redirect('/dashboard/jobs');
};
