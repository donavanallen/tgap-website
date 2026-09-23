import type { Metadata } from "next";
import SimpleNav from "@/components/SimpleNav";

export const metadata: Metadata = {
  title: "Privacy Policy | TGAP",
  description: "How TGAP LLC collects, uses, and protects information submitted through tgap.us.",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <>
      <SimpleNav />
      <main className="legal-page">
        <h1>Privacy Policy</h1>
        <div className="legal-updated">Last updated September 2026</div>

        <p>TGAP LLC (&quot;TGAP,&quot; &quot;we,&quot; &quot;us&quot;) operates tgap.us. This policy explains what information we collect through the site and how we use it.</p>

        <h2>Information We Collect</h2>
        <p>When you submit our contact form, we collect the information you provide: name, email address, phone number, the nature of your inquiry, and any message you include. We also collect standard technical data such as browser type, device, pages visited, and approximate location, through analytics tools.</p>

        <h2>How We Use It</h2>
        <p>We use contact information to respond to your inquiry, discuss potential investment or partnership opportunities, and, if you request it, send you updates about TGAP projects. We use analytics data to understand how the site is used and to improve it.</p>

        <h2>Sharing</h2>
        <p>We do not sell your personal information. We may share it with service providers who help us operate the site and communicate with you (for example, email delivery and customer relationship management tools), and where required by law.</p>

        <h2>Retention and Security</h2>
        <p>We keep contact submissions for as long as needed to respond to you and maintain our business records. We use reasonable technical and organizational measures to protect your information, though no method of transmission over the internet is completely secure.</p>

        <h2>Your Choices</h2>
        <p>You may ask us to update or delete the information we hold about you, or to stop contacting you, at any time by using the contact form on our home page.</p>

        <h2>Changes</h2>
        <p>We may update this policy from time to time. The date at the top reflects the most recent revision.</p>
      </main>
    </>
  );
}
