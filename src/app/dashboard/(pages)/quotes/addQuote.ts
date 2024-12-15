'use server';

import { db } from '@/lib/prisma';
import { auth } from '../../../../../auth';
import { redirect } from 'next/navigation';

interface QuoteItem {
  itemId: number;
  quantity: number;
  unitPrice: number;
}

export async function addQuote(_prevState: any, formData: FormData) {
  const session = await auth();

  try {
    const title = formData.get('title') as string;
    const clientId = formData.get('clientId') as string;
    const userId = session?.user?.id;
    const currency = formData.get('currency') as string;
    const items = formData.get('items') as string;
    const status = formData.get('status') as string;

    if (!title || title.trim() === '') {
      throw new Error('O título é obrigatório');
    }

    if (!clientId) {
      throw new Error('O cliente é obrigatório');
    }

    if (!currency) {
      throw new Error('A moeda é obrigatória');
    }

    if (!items) {
      throw new Error('Adicione pelo menos um item ao orçamento');
    }

    if (!userId) {
      throw new Error('Usuário não identificado');
    }

    const user = await db.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const parsedItems = JSON.parse(items) as QuoteItem[];
    if (!Array.isArray(parsedItems) || parsedItems.length === 0) {
      throw new Error('Adicione pelo menos um item ao orçamento');
    }

    // Validate each item
    parsedItems.forEach((item: any) => {
      if (!item.itemId) {
        throw new Error('Selecione um item válido');
      }
      if (!item.quantity || item.quantity <= 0) {
        throw new Error('A quantidade deve ser maior que zero');
      }
      if (!item.unitPrice || item.unitPrice <= 0) {
        throw new Error('O preço unitário deve ser maior que zero');
      }
    });

    const totalAmount = parsedItems.reduce((sum, item) => {
      return sum + item.quantity * item.unitPrice;
    }, 0);

    const quote = await db.quote.create({
      data: {
        title,
        status,
        totalAmount,
        currency,
        user: {
          connect: {
            id: Number(userId),
          },
        },
        client: {
          connect: {
            id: Number(clientId),
          },
        },
        items: {
          create: parsedItems.map((item) => ({
            itemId: Number(item.itemId),
            quantity: Number(item.quantity),
            unitPrice: Number(item.unitPrice),
          })),
        },
      },
    });

    redirect('/dashboard/quotes/list');
  } catch (error) {
    console.error('Error creating quote:', error);
    throw error instanceof Error ? error : new Error('Erro ao criar orçamento');
  }
}
