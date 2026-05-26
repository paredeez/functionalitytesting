import { QuoteForm } from "@/components/QuoteForm";

type QuotePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const resolvedParams = (await searchParams) ?? {};
  const statusParam = resolvedParams.status;
  const status = Array.isArray(statusParam) ? statusParam[0] : statusParam;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "2rem 1rem",
        display: "grid",
        placeItems: "center"
      }}
    >
      <QuoteForm status={status} />
    </main>
  );
}
