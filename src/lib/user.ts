import { compareSync } from 'bcrypt-ts';
import { db } from './prisma';

export type User = {
  userName: string;
  name: string;
  role: number;
  id: number;
};

export async function findUserByCredentials(
  userName: string,
  password: string
) {
  const user = await db.user.findFirst({
    where: {
      userName: userName,
    },
    include: {
      role: true, // incluir relacionamento com role
    },
  });

  if (!user) return null;

  const passMatch = compareSync(password, user.password);

  if (passMatch)
    return {
      userName: user.userName,
      name: user.name,
      role: user.roleId,
      roleName: user.role.roleName, // adicionar nome da role
      id: user.id,
    };

  return null;
}

export async function findUserById(id: string) {
  const user = await db.user.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      role: true,
    },
  });

  return user ? user : null;
}
