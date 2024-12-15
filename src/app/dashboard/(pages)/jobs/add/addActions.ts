'use server';

import { db } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export const addRole = async (_prevState: any, formData: FormData) => {
  try {
    // Validação dos dados
    const roleName = formData.get('roleName');

    if (!roleName) {
      throw new Error('Todos os campos são obrigatórios');
    }

    //verifica se o cargo ja existe
    const role = await db.role.findFirst({
      where: {
        roleName: roleName as string,
      },
    });

    if (role) {
      throw new Error('Cargo já existe');
    }

    //cria o cargo
    const newRole = await db.role.create({
      data: {
        roleName: roleName as string,
      },
    });

    redirect('/dashboard/jobs');
  } catch (error: any) {
    return { error: error.message };
  }
};
