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

  @media ${device.laptop} {
    /* font-size: 55.5px; */
  }
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
const termsData = [
  {
    title: "Agreement Between User and Your Dental Network (YDN)",
    content:
      "Welcome to Your Dental Network. The YDN website (www.buildydn.com) and services are operated by YOUR DENTAL NETWORK. Your access to and use of YDN is subject to the following Terms & Conditions (“Terms”). By using YDN, you agree to comply with these Terms. Please read them carefully and keep a copy for reference.",
  },
  {
    title: "1. Service Overview",
    content: `YDN is a professional platform designed for dental professionals, clinics, and industry partners to network, access industry resources, and enhance their professional growth.

Our services include:

- Access to dental industry news, education, and resources
- Networking opportunities with other professionals
- Business tools and solutions for dental clinics
- Exclusive partnerships and discounts

By using our platform, you agree to use it for professional purposes only and to comply with all applicable laws and regulations.`,
  },
  {
    title: "2. Privacy Policy",
    content:
      "Your use of YDN is subject to our Privacy Policy, which governs how we collect, use, and protect your data. By using our services, you acknowledge and agree to our data collection practices. Please review our Privacy Policy for more details.",
  },
  {
    title: "3. Account Registration & Responsibilities",
    content: `You must create an account to access certain features of YDN.

- You are responsible for maintaining the confidentiality of your login credentials.
- You agree to provide accurate and complete information when registering and updating your account.
- YDN is not responsible for unauthorized account access due to your failure to protect your credentials.
- We reserve the right to suspend or terminate accounts that provide false information or violate our Terms.`,
  },
  {
    title: "4. Membership & Payment",
    content: `Certain features of YDN may require a paid membership or subscription. By subscribing, you agree to the following:

- Membership fees are charged on a recurring basis until canceled.
- Payments are processed securely through our third-party payment provider.
- You can cancel your subscription before your next billing cycle to avoid future charges.
- Membership fees are non-refundable, except under special circumstances (see our Refund Policy below).`,
  },
  {
    title: "5. Prohibited Conduct",
    content: `You agree not to:

- Use YDN for illegal or unauthorized purposes.
- Share, distribute, or reproduce YDN’s proprietary content without permission.
- Harass, threaten, or impersonate other users.
- Upload viruses, malware, or other harmful code.
- Engage in spamming, phishing, or fraudulent activities.

Violating these rules may result in account suspension or permanent ban.`,
  },
  {
    title: "6. Refund & Cancellation Policy",
    content: `Membership fees are non-refundable due to the digital nature of our services.

If you believe you qualify for an exception (e.g., duplicate charges, accidental purchases), please contact our support team at [support@buildydn.com](mailto:support@buildydn.com).

Cancellation requests must be made before the next billing cycle to prevent further charges.`,
  },
  {
    title: "7. Third-Party Links & Services",
    content:
      "YDN may contain links to third-party websites or services. We do not endorse or assume responsibility for any third-party content, privacy policies, or practices. Use third-party services at your own risk.",
  },
  {
    title: "8. Intellectual Property Rights",
    content: `All content on YDN, including but not limited to text, graphics, logos, images, and software, is owned by YDN or our licensors and is protected under copyright and trademark laws. Users may not:

- Copy, reproduce, distribute, or sell any content from YDN.
- Modify or create derivative works without explicit permission.`,
  },
  {
    title: "9. Disclaimer of Warranties",
    content:
      'YDN provides services "as is" and makes no guarantees regarding accuracy, availability, or results from using our platform. We disclaim all warranties, express or implied, to the fullest extent permitted by law.',
  },
  {
    title: "10. Limitation of Liability",
    content: `To the fullest extent permitted by law, YDN and its affiliates are not liable for any damages, including but not limited to:

- Loss of business, revenue, or data
- Service interruptions
- Unauthorized access to your account or data`,
  },
  {
    title: "11. Indemnification",
    content: `You agree to defend, indemnify, and hold harmless YDN, its officers, employees, and partners from any claims, liabilities, damages, or expenses arising from:

- Your use of YDN
- Your violation of these Terms
- Any content you submit or share through YDN`,
  },
  {
    title: "12. Changes to Terms",
    content:
      "We may update these Terms from time to time. Changes will be posted on our website, and continued use of YDN after changes take effect constitutes acceptance of the new Terms.",
  },
  {
    title: "13. Governing Law & Dispute Resolution",
    content:
      "These Terms are governed by the laws of [Your State/Country]. Any disputes will be resolved through arbitration or courts in [Your Jurisdiction], except where prohibited by law.",
  },
  {
    title: "14. Contact Information",
    content: (
      <>
        For questions about these Terms, contact us at
        <EmailLink href="mailto:support@buildydn.com"> support@buildydn.com</EmailLink>.
      </>
    ),
  },
];

export default function Terms() {
  return (
    <main className="overflow-hidden z-20 py-32 px-4 text-white relative">
      <div className="max-w-[1236px] mx-auto">
        <H1>Terms & Conditions</H1>
        {termsData.map(({ title, content }, index) => (
          <div key={index}>
            <H2>{title}</H2>
            <P>{content}</P>
          </div>
        ))}
      </div>
    </main>
  );
}
