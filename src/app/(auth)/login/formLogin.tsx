'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';
import Form from 'next/form';
import { loginDash } from './formActions';

const FormLogin = () => {
  const [, formAction, isLoading] = useActionState(loginDash, null);

  return (
    <>
      <Form action={formAction}>
        <div className="space-y-2">
          <Label htmlFor="username">Usuário</Label>
          <Input
            id="username"
            type="text"
            placeholder="Seu nome de usuário"
            name="userName"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            placeholder="Sua senha"
            name="password"
          />
        </div>
        <Button type="submit" className="w-full mt-3" disabled={isLoading}>
          Entrar
        </Button>
      </Form>
    </>
  );
};

export default FormLogin;
