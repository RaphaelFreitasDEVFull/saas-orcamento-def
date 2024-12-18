import AddItemForm from './addItemForm';
import { auth } from '../../../../../../auth';
import { redirect } from 'next/navigation';

export default async function AddItemPage() {
  const session = await auth();

  if (!session) {
    redirect('/dashboard/login');
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Adicionar Produto</h1>
      <AddItemForm />
    </div>
  );
}
