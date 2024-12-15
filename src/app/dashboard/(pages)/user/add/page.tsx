import { redirect } from 'next/navigation';
import { auth } from '../../../../../../auth';
import FormUser from './formUser';
import { db } from '@/lib/prisma';

const userAdd = async () => {
  const session = await auth();

  if (session?.user?.roleName !== 'admin') {
    redirect('/dashboard');
  }

  const roles = await db.role.findMany();
  return (
    <div className="p-6">
      <h1>Adicionar Usuario</h1>
      <FormUser roles={roles} />
    </div>
  );
};

export default userAdd;
