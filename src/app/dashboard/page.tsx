import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/prisma';
import { auth } from '../../../auth';
import Image from 'next/image';

const DashboardHomePage = async () => {
  const session = await auth();

  const clientsTotais = await db.client.count();
  const clientsUsuario = await db.client.count({
    where: {
      user: {
        id: Number(session?.user?.id),
      },
    },
  });

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 *:flex *:flex-col *:items-center *:justify-center">
        <Card className="bg-blue-100 text-blue-800 border-blue-800">
          <CardHeader className="flex flex-row items-center justify-center p-4">
            <CardTitle className="text-blue-800 font-bold text-lg">
              Numero de Clientes Totais
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row items-center justify-center">
            <p className="text-blue-800 font-bold text-lg">{clientsTotais}</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-100 text-blue-800 border-blue-800">
          <CardHeader className="flex flex-row items-center justify-center p-4">
            <CardTitle className="text-blue-800 font-bold text-lg">
              Numero de Clientes do Usuario
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row items-center justify-center">
            <p className="text-blue-800 font-bold text-lg">{clientsUsuario}</p>
          </CardContent>
        </Card>
      </div>
      <Image
        src={'/logo.png'}
        alt="logo"
        width={500}
        height={500}
        className="opacity-20"
      />
    </div>
  );
};

export default DashboardHomePage;
