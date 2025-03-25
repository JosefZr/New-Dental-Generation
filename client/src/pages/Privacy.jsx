import styled from "styled-components";
import { device } from "@/lib/mediaQuerys";

const H1 = styled.h1`
  color: hsla(0, 0%, 100%, 0.21);
  font-size: 38px;
  line-height: 30px;
  letter-spacing: -3%;
  pointer-events: none;
`;

const H2 = styled.h2`
  font-size: 28px;
  margin-top: 40px;
  font-weight: 600;
  line-height: 56px;
`;

const P = styled.p`
  font-size: 17px;
  font-weight: 400;
  line-height: 25px;
  color: #ffffffb2;

  @media ${device.laptopM} {
    font-size: 18px;
    line-height: 28px;
  }
`;

const EmailLink = styled.a`
  color: #4da6ff;
  cursor: pointer;
  &:hover {
    color: #80c1ff;
  }
`;

const privacyData = [
  {
    title: "Privacy Policy",
    content: "Effective as of 01.01.2025",
  },
  {
    title: "Introduction",
    content: `This Privacy Policy (“Policy”) applies to Your Dental Network (YDN), owned and operated by YOUR DENTAL NETWORK.
    It governs how we collect, use, and protect your personal information in compliance with applicable laws, including the General Data Protection Regulation (GDPR) and other relevant regulations.`,
  },
  {
    title: "1. Collection of Your Personal Information",
    content: `YDN only collects the personal information necessary to provide our services efficiently. This may include:
    - Basic account details (e.g., name, email address, and username)
    - Professional details (e.g., dental practice name, specialty, and business address)
    - Payment information (handled by third-party payment processors; we do not store your credit/debit card details)
    We do not collect sensitive personal data unless explicitly provided by you for specific services.`,
  },
  {
    title: "2. Use of Your Personal Information",
    content: `We use your information to:
    - Operate and deliver the services you request
    - Provide customer support and respond to inquiries
    - Process payments and manage billing
    - Send important account-related updates
    - Offer relevant dental industry resources, networking opportunities, and promotions
    - Improve YDN’s platform, user experience, and service offerings
    - Comply with legal obligations
    We will never sell, rent, or lease your personal information to third parties.`,
  },
  {
    title: "3. Sharing Information with Third Parties",
    content: `YDN may share limited information with trusted partners who assist in providing services, such as:
    - Payment processors (to securely process transactions)
    - Email service providers (to send notifications and updates)
    - Customer support platforms (to improve service efficiency)
    All third-party partners are required to maintain strict confidentiality and use your data only for the agreed purposes.`,
  },
  {
    title: "4. Your Data Protection Rights (GDPR & Other Laws)",
    content: `If you are a resident of the EEA, UK, or applicable jurisdictions, you have the right to:
    - Access your personal data we hold
    - Correct any inaccurate or incomplete data
    - Delete your personal data (subject to legal limitations)
    - Object to the processing of your data
    - Restrict how we process your data
    - Request data portability (transfer your data to another service provider)`,
  },
  {
    title: "5. Right to Deletion",
    content: `Upon a verified request, we will delete your personal information, unless:
    - It is required to complete ongoing transactions or fulfill contracts
    - It is needed to comply with legal obligations
    - It is necessary to detect security incidents, fraud, or illegal activities
    - It is used for research or business analytics in an anonymous manner`,
  },
  {
    title: "6. Children Under 13",
    content: `YDN does not knowingly collect information from children under 13. If we discover that a child has provided personal data without parental consent, we will delete it immediately.`,
  },
  {
    title: "7. Email Communications & Tracking",
    content: `YDN may send emails regarding:
    - Service updates and policy changes
    - Exclusive dental industry news and offers
    - Networking events and professional opportunities
    We may use tracking technologies to measure email engagement (e.g., whether you open or click links in our emails).`,
  },
  {
    title: "8. Data Security Measures",
    content: `We use industry-standard security protocols to protect your personal information, including:
    🔒 Encryption of sensitive data
    🔒 Access controls to restrict unauthorized access
    🔒 Regular security assessments`,
  },
  {
    title: "9. International Data Transfers",
    content: `If you are located outside the United States, your data may be transferred to and processed in the U.S. or other countries where our service providers operate. We ensure appropriate safeguards are in place to protect your data.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy periodically. Any changes will be posted on our website and communicated via email if applicable.`,
  },
  {
    title: "11. Contact Information",
    content: (
      <>
        For questions about this Privacy Policy or your data rights, contact us at
        <EmailLink href="mailto:support@buildydn.com"> support@buildydn.com</EmailLink>.
      </>
    ),
  },
];

export default function Privacy() {
  return (
    <main className="overflow-hidden z-20 py-32 px-4 text-white relative">
      <div className="max-w-[1236px] mx-auto">
        <H1>Privacy Policy</H1>
        {privacyData.map(({ title, content }, index) => (
          <div key={index}>
            <H2>{title}</H2>
            <P>{content}</P>
          </div>
        ))}
      </div>
    </main>
  );
}
