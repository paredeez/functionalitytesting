import { NextResponse } from "next/server";
import { Resend } from "resend";

const REQUIRED_FIELDS = [
  "fullName",
  "email",
  "phone",
  "serviceAddress",
  "jobType",
  "urgency",
  "description"
] as const;

function getField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const baseUrl = new URL(request.url);
  const isEmbed = formData.get("embed") === "1";
  const returnPath = isEmbed ? "/embed" : "/quote";
  const quoteUrl = new URL(returnPath, baseUrl.origin);

  for (const field of REQUIRED_FIELDS) {
    if (!getField(formData, field)) {
      quoteUrl.searchParams.set("status", "missing");
      return NextResponse.redirect(quoteUrl);
    }
  }

  if (!formData.get("consent")) {
    quoteUrl.searchParams.set("status", "consent");
    return NextResponse.redirect(quoteUrl);
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.QUOTE_RECIPIENT_EMAIL;
  const businessName = process.env.BUSINESS_NAME || "Business Website";
  const senderEmail =
    process.env.RESEND_FROM_EMAIL || `${businessName} <onboarding@resend.dev>`;

  if (!resendApiKey) {
    quoteUrl.searchParams.set("status", "config");
    return NextResponse.redirect(quoteUrl);
  }

  if (!recipientEmail) {
    quoteUrl.searchParams.set("status", "config");
    return NextResponse.redirect(quoteUrl);
  }

  const fullName = getField(formData, "fullName");
  const email = getField(formData, "email");
  const phone = getField(formData, "phone");
  const serviceAddress = getField(formData, "serviceAddress");
  const jobType = getField(formData, "jobType");
  const urgency = getField(formData, "urgency");
  const preferredDate = getField(formData, "preferredDate") || "Not provided";
  const description = getField(formData, "description");

  const resend = new Resend(resendApiKey);
  const subject = `New Enquiry - ${businessName} - ${urgency.toUpperCase()} - ${jobType}`;

  const htmlBody = `
    <h2 style="margin-bottom: 8px;">New website enquiry</h2>
    <p style="margin-top: 0;"><strong>Business:</strong> ${escapeHtml(businessName)}</p>
    <p style="margin-top: 0;"><strong style="color:#b91c1c;">Urgency:</strong> ${escapeHtml(urgency)}</p>
    <table cellpadding="6" cellspacing="0" border="0" style="border-collapse: collapse;">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(fullName)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>
      <tr><td><strong>Address</strong></td><td>${escapeHtml(serviceAddress)}</td></tr>
      <tr><td><strong>Job Type</strong></td><td>${escapeHtml(jobType)}</td></tr>
      <tr><td><strong>Preferred Date</strong></td><td>${escapeHtml(preferredDate)}</td></tr>
    </table>
    <h3 style="margin-bottom: 6px;">Description</h3>
    <p style="white-space: pre-wrap;">${escapeHtml(description)}</p>
  `;

  try {
    await resend.emails.send({
      from: senderEmail,
      to: recipientEmail,
      replyTo: email,
      subject,
      html: htmlBody
    });

    quoteUrl.searchParams.set("status", "sent");
    return NextResponse.redirect(quoteUrl);
  } catch {
    quoteUrl.searchParams.set("status", "error");
    return NextResponse.redirect(quoteUrl);
  }
}
