'use server';

import { signOut } from '../../../auth';
import { redirect } from 'next/navigation';

export async function setSignOut() {
  await signOut();
  redirect('/login');
}
