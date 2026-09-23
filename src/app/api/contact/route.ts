import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/*
 * Contact form handler.
 * Required env vars (set in Vercel project settings):
 *   RESEND_API_KEY   - API key from resend.com
 *   CONTACT_TO       - inbox that receives submissions (comma separated for multiple)
 *   CONTACT_FROM     - verified sender, e.g. "TGAP Website <noreply@tgap.us>"
 */

type Payload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  company?: string; // honeypot
};

// Very small in-memory rate limit per serverless instance: 5 submissions / 10 min / IP.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const clean = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

export async function POST(req: NextRequest) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: silently accept so bots think they succeeded.
  if (body.company) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const firstName = clean(body.firstName, 100);
  const lastName = clean(body.lastName, 100);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 50);
  const interest = clean(body.interest, 100);
  const message = clean(body.message, 5000);

  if (!firstName || !lastName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM || "TGAP Website <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Contact form not configured: missing RESEND_API_KEY or CONTACT_TO");
    return NextResponse.json({ error: "Form not configured" }, { status: 503 });
  }

  const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/Denver" });
  const subject = `New website inquiry: ${interest || "General"} from ${firstName} ${lastName}`;

  const rows: [string, string][] = [
    ["Name", `${firstName} ${lastName}`],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Interested in", interest || "Not specified"],
    ["Submitted", `${submittedAt} MT`],
  ];

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
      <h2 style="font-weight:600;margin:0 0 16px">New inquiry from tgap.us</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 12px 8px 0;color:#666;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:8px 0">${escapeHtml(v)}</td></tr>`
          )
          .join("")}
      </table>
      <div style="margin-top:20px;padding:16px;background:#f6f4ef;border-left:3px solid #C9A84C;font-size:14px;white-space:pre-wrap">${escapeHtml(message) || "<em>No message</em>"}</div>
      <p style="margin-top:24px;font-size:12px;color:#888">Reply directly to this email to respond to ${escapeHtml(firstName)}.</p>
    </div>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${message || "(none)"}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: email,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend error", res.status, detail);
    return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
