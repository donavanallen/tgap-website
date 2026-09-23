import type { Metadata } from "next";
import SimpleNav from "@/components/SimpleNav";

export const metadata: Metadata = {
  title: "Terms of Use | TGAP",
  description: "Terms governing use of tgap.us and the tools published on it.",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <>
      <SimpleNav />
      <main className="legal-page">
        <h1>Terms of Use</h1>
        <div className="legal-updated">Last updated September 2026</div>

        <p>By using tgap.us (the &quot;Site&quot;), you agree to these terms. If you do not agree, please do not use the Site.</p>

        <h2>Informational Purposes Only</h2>
        <p>The content on this Site is provided for general information about TGAP LLC and its activities. It does not constitute investment, financial, legal, or tax advice, and it is not an offer to sell or a solicitation of an offer to buy any security or interest in any project. Any such offering will be made only to qualified investors through definitive offering documents.</p>

        <h2>Calculators and Tools</h2>
        <p>The investment calculators on this Site are provided as educational tools. Results depend entirely on the inputs you provide and simplified assumptions. They are estimates only and should not be relied upon for any investment, lending, or purchasing decision. Consult a qualified professional before acting on any calculation.</p>

        <h2>No Guarantees</h2>
        <p>Real estate investment involves risk, including the possible loss of principal. Descriptions of current or past projects are not a guarantee of future results.</p>

        <h2>Intellectual Property</h2>
        <p>All content on the Site, including text, design, graphics, and photographs, is owned by TGAP LLC or its licensors and may not be reproduced without permission.</p>

        <h2>Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, TGAP LLC is not liable for any loss or damage arising from your use of, or reliance on, the Site or its tools.</p>

        <h2>Governing Law</h2>
        <p>These terms are governed by the laws of the State of Utah.</p>

        <h2>Contact</h2>
        <p>Questions about these terms can be sent through the contact form on our <a href="/#contact">home page</a>.</p>
      </main>
    </>
  );
}
