import { redirect } from 'next/navigation';
import { auth } from '../../../../../../auth';
import FormUser from './formUser';

const userAdd = async () => {
  const session = await auth();

  if (session?.user?.roleName !== 'admin') {
    redirect('/dashboard');
  }

  return (
    <div className="p-6">
      <h1>Adicionar Usuario</h1>
      <FormUser />
    </div>
  );
};

export default userAdd;
