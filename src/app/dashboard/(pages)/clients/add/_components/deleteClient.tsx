'use client';

import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import Form from 'next/form';
import { useActionState } from 'react';
import { deleteClient } from '../deleteClientAction';

interface DeleteClientProps {
  id: number;
}

const DeleteClient = ({ id }: DeleteClientProps) => {
  const [, formAction, isPending] = useActionState(
    () => deleteClient(id),
    null
  );

  return (
    <div>
      <Form action={formAction}>
        <Button variant="ghost" size="sm" disabled={isPending}>
          <Trash2Icon className="w-4 h-4" />
          Excluir
        </Button>
      </Form>
    </div>
  );
};

export default DeleteClient;
