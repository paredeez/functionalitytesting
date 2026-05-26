import { QuoteForm } from "@/components/QuoteForm";

type EmbedPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EmbedPage({ searchParams }: EmbedPageProps) {
  const resolvedParams = (await searchParams) ?? {};
  const statusParam = resolvedParams.status;
  const status = Array.isArray(statusParam) ? statusParam[0] : statusParam;

  return (
    <main style={{ padding: "1rem", background: "transparent" }}>
      <QuoteForm status={status} embed />
    </main>
  );
}
