'use server';

import { db } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export const deleteRole = async (id: string, _prevState: any) => {
  const role = await db.role.delete({
    where: {
      id: Number(id),
    },
  });

  return redirect('/dashboard/jobs');
};
