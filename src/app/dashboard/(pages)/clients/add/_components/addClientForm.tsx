'use client';

import Form from 'next/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useActionState } from 'react';
import { addClient } from '../addClientAction';

const AddClientForm = () => {
  const [, formAction, isPending] = useActionState(addClient, null);

  return (
    <div>
      <Form action={formAction} className="flex flex-col gap-4 w-1/2">
        <div className="flex flex-col gap-2 ">
          <Label>Nome do Cliente</Label>
          <Input
            name="name"
            placeholder="Nome do Cliente"
            required
            className="w-full"
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <Label>Email</Label>
          <Input
            name="email"
            placeholder="Email do Cliente"
            required
            className="w-full"
            autoComplete="off"
            autoCorrect="off"
            type="email"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <Label>Telefone</Label>
          <Input
            name="phone"
            placeholder="Telefone do Cliente"
            required
            className="w-full"
            type="tel"
            autoComplete="off"
            autoCorrect="off"
            pattern="\([0-9]{2}\) [0-9]{5}-[0-9]{4}"
            onInput={(e) => {
              let value = e.currentTarget.value;
              value = value.replace(/\D/g, '');
              if (value.length >= 2) {
                value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
              }
              if (value.length >= 10) {
                value = `${value.substring(0, 10)}-${value.substring(10, 14)}`;
              }
              e.currentTarget.value = value;
            }}
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <Label>Endereço</Label>
          <Input
            name="address"
            placeholder="Endereço do Cliente"
            required
            className="w-full"
            autoComplete="off"
            autoCorrect="off"
            type="text"
          />
        </div>
        <Button
          type="submit"
          className="w-fit self-end mt-4 bg-blue-500 hover:bg-blue-600"
          disabled={isPending}
        >
          Adicionar Cliente
        </Button>
      </Form>
    </div>
  );
};

export default AddClientForm;
