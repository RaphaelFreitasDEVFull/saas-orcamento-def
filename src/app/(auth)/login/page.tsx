import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import FormLogin from './formLogin';
import { redirect } from 'next/navigation';
import { auth } from '../../../../auth';

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    return redirect('/dashboard');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Entre com suas credenciais para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormLogin />
        </CardContent>
      </Card>
    </div>
  );
}
