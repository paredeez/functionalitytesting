import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem"
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)"
        }}
      >
        <h1 style={{ marginTop: 0 }}>Ashfield Plumbing</h1>
        <p style={{ color: "#4b5563" }}>
          Need a repair, install, or emergency callout? Request your quote in a
          few minutes.
        </p>
        <Link
          href="/quote"
          style={{
            display: "inline-block",
            marginTop: "1rem",
            background: "#0f766e",
            color: "#ffffff",
            padding: "0.75rem 1rem",
            borderRadius: "10px",
            fontWeight: 600
          }}
        >
          Get a Quote
        </Link>
      </section>
    </main>
  );
}
