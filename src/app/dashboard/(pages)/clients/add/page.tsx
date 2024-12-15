import AddClientForm from './_components/addClientForm';
import { redirect } from 'next/navigation';
import { auth } from '../../../../../../auth';

const AddClientPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/dashboard/login');
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Adicionar Cliente</h1>
      <AddClientForm />
    </div>
  );
};

export default AddClientPage;
