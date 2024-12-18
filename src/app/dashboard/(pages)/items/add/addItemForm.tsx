'use client';

import { Input } from '@/components/ui/input';
import Form from 'next/form';
import { useActionState } from 'react';
import { addItem } from './addItemAction';
import { Button } from '@/components/ui/button';

export default function AddItemForm() {
  const [, formAction, isPending] = useActionState(addItem, null);

  return (
    <div>
      <Form action={formAction} className="flex flex-col gap-4 w-1/2 mt-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Nome do Produto
          </label>
          <Input name="name" id="name" placeholder="Digite o nome do produto" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-medium">
            Descrição
          </label>
          <Input
            name="description"
            id="description"
            placeholder="Digite a descrição do produto"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="unitPrice" className="text-sm font-medium">
            Preço Unitário
          </label>
          <Input
            name="unitPrice"
            id="unitPrice"
            type="number"
            step="0.01"
            min="0"
            placeholder="Digite o preço unitário"
          />
        </div>

        <Button type="submit" disabled={isPending} className="w-fit mt-4">
          Adicionar
        </Button>
      </Form>
    </div>
  );
}
