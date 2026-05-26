import type { CSSProperties } from "react";

type QuoteFormProps = {
  status?: string;
  embed?: boolean;
};

function getStatusMessage(status: string | undefined) {
  switch (status) {
    case "sent":
      return { text: "Enquiry sent. We'll be in touch soon.", color: "#166534" };
    case "missing":
      return { text: "Please fill all required fields.", color: "#991b1b" };
    case "consent":
      return { text: "Please accept consent before submitting.", color: "#991b1b" };
    case "config":
      return {
        text: "Form email is not configured (QUOTE_RECIPIENT_EMAIL).",
        color: "#991b1b"
      };
    case "error":
      return { text: "Could not send the enquiry. Please try again.", color: "#991b1b" };
    default:
      return null;
  }
}

export function QuoteForm({ status, embed = false }: QuoteFormProps) {
  const statusMessage = getStatusMessage(status);
  const businessName = process.env.BUSINESS_NAME || "Your Business";

  return (
    <section
      style={{
        width: "100%",
        maxWidth: embed ? "100%" : "760px",
        background: "#ffffff",
        borderRadius: embed ? 0 : "16px",
        padding: embed ? "0" : "2rem",
        boxShadow: embed ? "none" : "0 10px 30px rgba(15, 23, 42, 0.08)"
      }}
    >
      {!embed ? (
        <>
          <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
            Get a Quote from {businessName}
          </h1>
          <p style={{ marginTop: 0, color: "#4b5563", marginBottom: "1.5rem" }}>
            Fill this out and we&apos;ll get back to you with pricing and availability.
          </p>
        </>
      ) : (
        <h2 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1.25rem" }}>
          Request a Quote
        </h2>
      )}

      {statusMessage ? (
        <p
          style={{
            marginTop: 0,
            marginBottom: "1rem",
            fontWeight: 600,
            color: statusMessage.color
          }}
        >
          {statusMessage.text}
        </p>
      ) : null}

      <form
        action="/api/quote"
        method="post"
        style={{ display: "grid", gap: "1rem" }}
        aria-label="Quote request form"
      >
        {embed ? <input type="hidden" name="embed" value="1" /> : null}

        <div style={{ display: "grid", gap: "0.5rem" }}>
          <label htmlFor="fullName">Full Name *</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            style={inputStyle}
          />
        </div>

        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"
          }}
        >
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@email.com"
              style={inputStyle}
            />
          </div>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label htmlFor="phone">Phone *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="0400 000 000"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: "grid", gap: "0.5rem" }}>
          <label htmlFor="serviceAddress">Service Address *</label>
          <input
            id="serviceAddress"
            name="serviceAddress"
            type="text"
            required
            autoComplete="street-address"
            placeholder="123 Example St, Suburb"
            style={inputStyle}
          />
        </div>

        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"
          }}
        >
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label htmlFor="jobType">Job Type *</label>
            <select id="jobType" name="jobType" required style={inputStyle}>
              <option value="">Select service</option>
              <option value="blocked-drain">Blocked drain</option>
              <option value="leak-repair">Leak repair</option>
              <option value="hot-water">Hot water system</option>
              <option value="toilet-repair">Toilet repair/install</option>
              <option value="tapware">Tapware replacement</option>
              <option value="gas-plumbing">Gas plumbing</option>
              <option value="roof-repair">Roof repair</option>
              <option value="gutter-cleaning">Gutter cleaning</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label htmlFor="urgency">Urgency *</label>
            <select id="urgency" name="urgency" required style={inputStyle}>
              <option value="">Select urgency</option>
              <option value="emergency">Emergency (ASAP)</option>
              <option value="today">Today</option>
              <option value="this-week">This week</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gap: "0.5rem" }}>
          <label htmlFor="preferredDate">Preferred Date</label>
          <input id="preferredDate" name="preferredDate" type="date" style={inputStyle} />
        </div>

        <div style={{ display: "grid", gap: "0.5rem" }}>
          <label htmlFor="description">Describe the issue *</label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            placeholder="What do you need help with?"
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input id="consent" name="consent" type="checkbox" required />
          <label htmlFor="consent" style={{ color: "#374151" }}>
            I agree to be contacted about this quote request. *
          </label>
        </div>

        <button type="submit" style={buttonStyle}>
          Request Quote
        </button>
      </form>
    </section>
  );
}

const inputStyle: CSSProperties = {
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  padding: "0.7rem 0.75rem",
  fontSize: "1rem",
  width: "100%"
};

const buttonStyle: CSSProperties = {
  marginTop: "0.5rem",
  border: 0,
  background: "#0f766e",
  color: "#ffffff",
  fontWeight: 700,
  padding: "0.9rem 1rem",
  borderRadius: "10px",
  cursor: "pointer"
};
