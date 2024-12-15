import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-800">
          Bem-vindo ao seu Dashboard da OrçaFacil
        </h1>
        <p className="text-xl mb-8 text-gray-600">
          Acesse o dashboard de forma simples
        </p>
        <Button
          asChild
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          <Link href="/login">Acessar Dashboard</Link>
        </Button>
      </main>
    </div>
  );
};

export default Home;
