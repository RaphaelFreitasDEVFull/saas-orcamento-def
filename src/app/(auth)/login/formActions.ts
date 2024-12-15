'use server';

import { signIn } from '../../../../auth';

export const loginDash = async (_nullabe: any, formData: FormData) => {
  await signIn('credentials', {
    userName: formData.get('userName'),
    password: formData.get('password'),
    redirect: true,
    redirectTo: '/dashboard',
  });
};
