'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Form from 'next/form';
import { useActionState } from 'react';
import { addUser } from './addActions';

interface Role {
  id: number;
  roleName: string;
}

const FormUser = ({ roles }: { roles: Role[] }) => {
  const [, formAction, isLoading] = useActionState(addUser, null);
  return (
    <div className="flex flex-col gap-4 mt-4">
      <Form action={formAction} className="flex flex-col gap-2 w-1/2">
        <div className="flex flex-col gap-2 mt-4">
          <Label>Nome</Label>
          <Input name="name" />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <Label>userName</Label>
          <Input name="userName" />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <Label>Senha</Label>
          <Input name="password" />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <Label>Cargo</Label>
          <Select name="roleId">
            <SelectTrigger>
              <SelectValue placeholder="Selecione o cargo" />
            </SelectTrigger>
            <SelectContent>
              {roles?.map((role) => (
                <SelectItem key={role.id} value={role.id.toString()}>
                  <span className="capitalize">{role.roleName}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          className="w-fit mt-4 bg-blue-500 hover:bg-blue-600"
          disabled={isLoading}
        >
          Adicionar
        </Button>
      </Form>
    </div>
  );
};

export default FormUser;
