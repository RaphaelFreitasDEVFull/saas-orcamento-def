'use server';

import { signIn } from '../../../../auth';

export const loginDash = async (_nullabe: unknown, formData: FormData) => {
  await signIn('credentials', {
    userName: formData.get('userName'),
    password: formData.get('password'),
    redirect: true,
    redirectTo: '/dashboard',
  });
};
