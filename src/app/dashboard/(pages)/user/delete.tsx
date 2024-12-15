'use client';

import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import Form from 'next/form';
import { deleteUser } from './deleteAction';
import { useActionState } from 'react';

interface deleteUserProps {
  id: string;
}

export const DeleteUserComponent = ({ id }: deleteUserProps) => {
  const [, formAction, isPending] = useActionState(
    () => deleteUser(id, null),
    null
  );

  return (
    <Form action={formAction}>
      <Button
        variant="ghost"
        size="sm"
        className="text-red-600 hover:text-red-700"
        type="submit"
        disabled={isPending}
      >
        <TrashIcon size={18} />
        <span>Excluir</span>
      </Button>
    </Form>
  );
};
