'use client';

import Form from 'next/form';
import { useActionState, useState } from 'react';
import { addQuote } from './addQuote';
import { Button } from '@/components/ui/button';

type Item = {
  id: number;
  name: string;
  unitPrice: number;
};

type Client = {
  id: number;
  name: string;
};

type AddQuoteFormProps = {
  clients: Client[];
  items: Item[];
};

type QuoteItem = {
  id: string;
  itemId: number;
  quantity: number;
  unitPrice: number;
};

export default function AddQuoteForm({ clients, items }: AddQuoteFormProps) {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [state, formAction, isPending] = useActionState(addQuote, null);

  const calculateTotal = () => {
    return quoteItems.reduce((total, item) => {
      return total + item.quantity * item.unitPrice;
    }, 0);
  };

  const addQuoteItem = () => {
    const newItem: QuoteItem = {
      id: crypto.randomUUID(),
      itemId: 0,
      quantity: 0,
      unitPrice: 0,
    };
    setQuoteItems([...quoteItems, newItem]);
  };

  const removeQuoteItem = (id: string) => {
    setQuoteItems(quoteItems.filter((item) => item.id !== id));
  };

  const updateQuoteItem = (id: string, field: keyof QuoteItem, value: any) => {
    setQuoteItems(
      quoteItems.map((item) => {
        if (item.id === id) {
          if (field === 'itemId') {
            const selectedItem = items.find((i) => i.id === Number(value));
            return {
              ...item,
              [field]: value,
              unitPrice: selectedItem?.unitPrice || 0,
            };
          }
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-4 mt-4">
        <Form action={formAction} className="flex flex-col gap-4">
          <input
            type="hidden"
            name="items"
            value={JSON.stringify(quoteItems)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Título
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded-lg px-3 py-2"
                placeholder="Digite o título do orçamento"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="client" className="text-sm font-medium">
                Cliente
              </label>
              <select
                id="client"
                name="clientId"
                className="border rounded-lg px-3 py-2"
              >
                <option value="" disabled>
                  Selecione um cliente
                </option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="border rounded-lg px-3 py-2"
              >
                <option value="pending">Pendente</option>
                <option value="approved">Aprovado</option>
                <option value="rejected">Rejeitado</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="currency" className="text-sm font-medium">
                Moeda
              </label>
              <select
                id="currency"
                name="currency"
                className="border rounded-lg px-3 py-2"
              >
                <option value="BRL">Real (BRL)</option>
                <option value="USD">Dólar (USD)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Itens do Orçamento</label>
            <div className="border rounded-lg p-4">
              <div className="flex flex-col gap-4">
                {quoteItems.map((quoteItem) => (
                  <div key={quoteItem.id} className="grid grid-cols-4 gap-4">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={`item-${quoteItem.id}`}
                        className="text-sm font-medium"
                      >
                        Item
                      </label>
                      <select
                        id={`item-${quoteItem.id}`}
                        name={`items[${quoteItem.id}].itemId`}
                        value={quoteItem.itemId}
                        onChange={(e) =>
                          updateQuoteItem(
                            quoteItem.id,
                            'itemId',
                            Number(e.target.value)
                          )
                        }
                        className="border rounded-lg px-3 py-2"
                      >
                        <option value="">Selecione um item</option>
                        {items.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={`quantity-${quoteItem.id}`}
                        className="text-sm font-medium"
                      >
                        Quantidade
                      </label>
                      <input
                        type="number"
                        id={`quantity-${quoteItem.id}`}
                        name={`items[${quoteItem.id}].quantity`}
                        value={quoteItem.quantity}
                        onChange={(e) =>
                          updateQuoteItem(
                            quoteItem.id,
                            'quantity',
                            Number(e.target.value)
                          )
                        }
                        className="border rounded-lg px-3 py-2"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={`unitPrice-${quoteItem.id}`}
                        className="text-sm font-medium"
                      >
                        Preço Unitário
                      </label>
                      <input
                        type="number"
                        id={`unitPrice-${quoteItem.id}`}
                        name={`items[${quoteItem.id}].unitPrice`}
                        value={quoteItem.unitPrice}
                        onChange={(e) =>
                          updateQuoteItem(
                            quoteItem.id,
                            'unitPrice',
                            Number(e.target.value)
                          )
                        }
                        className="border rounded-lg px-3 py-2"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeQuoteItem(quoteItem.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addQuoteItem}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-fit"
                >
                  Adicionar Item
                </button>

                <div className="flex justify-end mt-4 border-t pt-4">
                  <div className="text-xl font-bold">
                    Total:{' '}
                    {calculateTotal().toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isPending}>
            Salvar Orçamento
          </Button>
        </Form>
      </div>
    </div>
  );
}
