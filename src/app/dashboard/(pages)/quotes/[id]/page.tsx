export default async function QuotePage({
  params,
}: {
  params: { id: string };
}) {
  const quoteId = parseInt(params.id, 10);
  return <div>Quote {quoteId}</div>;
}
