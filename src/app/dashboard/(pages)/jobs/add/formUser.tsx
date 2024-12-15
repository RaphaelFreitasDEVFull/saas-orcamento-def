'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Form from 'next/form';
import { useActionState } from 'react';
import { addRole } from './addActions';

const FormUser = () => {
  const [state, formAction, isLoading] = useActionState(addRole, null);
  return (
    <div className="flex flex-col gap-4 mt-4">
      <Form action={formAction} className="flex flex-col gap-2 w-1/2">
        <div>
          <Label>Cargo</Label>
          <Input name="roleName" />
        </div>
        <Button
          type="submit"
          className="w-fit mt-4 bg-blue-500 hover:bg-blue-600"
        >
          Adicionar
        </Button>
      </Form>
    </div>
  );
};

export default FormUser;
