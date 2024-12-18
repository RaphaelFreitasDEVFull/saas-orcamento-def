'use client';

import Form from 'next/form';
import { setSignOut } from './dashActions';
import { useActionState } from 'react';
import { LogOutIcon } from 'lucide-react';

export default function LogoutButton() {
  const [, formAction, isLoading] = useActionState(setSignOut, null);

  return (
    <Form action={formAction}>
      <button
        type="submit"
        className="w-full flex items-center gap-2 text-gray-600 hover:text-gray-900"
        disabled={isLoading}
      >
        <LogOutIcon size={20} />
        <span>Sair</span>
      </button>
    </Form>
  );
}
