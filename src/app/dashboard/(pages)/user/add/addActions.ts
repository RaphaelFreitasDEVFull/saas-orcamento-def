'use server';

import { db } from '@/lib/prisma';
import { hashSync } from 'bcrypt-ts';
import { redirect } from 'next/navigation';

export async function addUser(_prevState: unknown, formData: FormData) {
  try {
    // Validação dos dados
    const name = formData.get('name');
    const userName = formData.get('userName');
    const password = formData.get('password');
    const roleId = formData.get('roleId');

    if (!name || !userName || !password || !roleId) {
      throw new Error('Todos os campos são obrigatórios');
    }

    //verifica se o usuario ja existe
    const user = await db.user.findFirst({
      where: {
        userName: userName as string,
      },
    });

    if (user) {
      throw new Error('Usuário já existe');
    }

    //cria o usuario
    await db.user.create({
      data: {
        name: name as string,
        userName: userName as string,
        password: await hashSync(password as string, 10),
        roleId: Number(roleId),
      },
    });

    return redirect('/dashboard/user');
  } catch (error: unknown) {
    return {
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
}
