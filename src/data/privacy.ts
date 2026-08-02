/**
 * Privacy Policy content — English (/privacy-policy)
 *
 * World-class trust-grade legal layout: 16 anchorable sections rendered with a
 * sticky category sidebar, mandatory data tables, a "No Third-Party Sharing"
 * pillar callout, and an 8-question FAQ block mirrored verbatim in FAQPage
 * schema.
 *
 * GEO/AEO notes:
 *  - Direct-answer block + stats strip are liftable verbatim by AI engines.
 *  - Tables for data categories / purposes / legal basis (AI parses tables).
 *  - Lists for rights, collection methods, retention schedule.
 *  - Outbound authority link to the official UAE PDPL portal (u.ae).
 *
 * @see plans/privacy-policy-build-plan.md §4
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md
 */

import type { PrivacyContent } from "@/types/privacy";

export const privacyContent: PrivacyContent = {
  title: "Privacy Policy",
  metaTitle: "Privacy Policy | Wasleen Dubai Approval Consultants",
  metaDescription:
    "Wasleen Approvals never sells or shares your data with third parties. 100% in-house processing under UAE PDPL. Read our full privacy policy or contact us today.",
  ogTitle: "Privacy Policy | Wasleen Dubai Approval Consultants",
  ogDescription:
    "Wasleen Approvals never sells or shares your data with third parties. 100% in-house processing under UAE PDPL (Federal Decree-Law No. 45 of 2021).",
  badgeLabel: "Your Privacy Is Protected",
  h1: "Privacy Policy",
  directAnswer:
    "Wasleen Liminal Approval Consultants is committed to protecting your personal data. We collect only the information needed to deliver Dubai approval services, process it 100% in-house, and never sell, rent, or share your data with any third party. Your data is handled under the UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL).",
  lastUpdatedLabel: "Last updated",
  lastUpdated: "2026-08-02",
  stats: [
    { label: "Third parties we share data with", value: "0" },
    { label: "In-house processing", value: "100%" },
    { label: "Data-request response time", value: "24h" },
    { label: "UAE data-protection law", value: "PDPL No. 45 / 2021" },
  ],
  sections: [
    {
      id: "introduction",
      heading: "Introduction & Our Commitment",
      paragraphs: [
        "This Privacy Policy explains how Wasleen Liminal Approval Consultants (\u201cWasleen\u201d, \u201cwe\u201d, \u201cus\u201d, or \u201cour\u201d) collects, uses, stores, and protects your personal information when you visit our website or use our Dubai approval consultancy services.",
        "Your trust is the foundation of our business. We process your personal data strictly in accordance with the UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (the \u201cUAE PDPL\u201d) and the relevant regulations of the Emirate of Dubai.",
        "In plain terms: we collect only what we need to deliver your approval, we process it in-house, and we never sell or share your data with third parties. This document sets out exactly how we handle your information and what rights you hold.",
      ],
    },
    {
      id: "who-we-are",
      heading: "Who We Are",
      paragraphs: [
        "Wasleen Liminal Approval Consultants is a Dubai-based approvals consultancy. We are registered as an LLC \u2013 Single Owner under the laws of Dubai, hold an active DED trade license (License No. 1188577), and are a member of the Dubai Chamber of Commerce and Industry (Membership No. 486012).",
        "Our registered office is at Office 401, Darwish Building, Al Qusais, Dubai, United Arab Emirates. We act as your registered consultant and liaison for approvals with government authorities including Dubai Municipality, DEWA, Dubai Civil Defense (DCD), Dubai Development Authority (DDA), and other regulatory bodies.",
        "As the data controller for the purposes of the UAE PDPL, we are responsible for deciding how your personal data is collected and used. You can verify our trade license publicly through the official DET license verification portal.",
      ],
      links: [
        {
          label: "Verify our DED trade license on the official DET portal",
          href: "https://app.invest.dubai.ae/search-license",
          external: true,
        },
        {
          label: "View our Business License & Regulatory Registration page",
          href: "/license",
        },
      ],
    },
    {
      id: "information-we-collect",
      heading: "Information We Collect",
      paragraphs: [
        "We collect the minimum personal information required to deliver the approval or consultancy service you request. We do not collect sensitive data unless it is strictly necessary for a specific government approval and you have given your explicit consent.",
        "The table below summarises the categories of information we may collect, why we collect them, and how long we keep them.",
      ],
      table: {
        id: "information-we-collect-table",
        caption: "Table A — Information We Collect",
        headers: ["Data Category", "Examples", "Purpose", "Retention"],
        rows: [
          {
            cells: [
              "Identity & contact details",
              "Full name, Emirates ID, passport number, nationality, phone number, email address",
              "Client identification, communications, and government submission requirements",
              "Until 2 years after project completion",
            ],
          },
          {
            cells: [
              "Project & property details",
              "Property ownership documents, tenancy contract, trade licence, plot and title deed details",
              "Preparing and submitting approval applications to the relevant authorities",
              "Until 2 years after project completion",
            ],
          },
          {
            cells: [
              "Technical documents",
              "Architectural drawings, structural plans, MEP drawings, specifications",
              "Submitting drawings and technical files to authorities such as Dubai Municipality and DCD",
              "Until 2 years after project completion",
            ],
          },
          {
            cells: [
              "Payment & transaction data",
              "Billing details, quotations, invoices, payment status",
              "Invoicing, accounting, and tax compliance",
              "7 years (UAE accounting requirements)",
            ],
          },
          {
            cells: [
              "Communications",
              "Email and WhatsApp messages, call records, enquiry form submissions",
              "Responding to enquiries and maintaining a service record",
              "Until 2 years after last contact",
            ],
          },
        ],
      },
    },
    {
      id: "how-we-collect-information",
      heading: "How We Collect Information",
      paragraphs: [
        "We collect personal information only through legitimate and lawful means, and always with your knowledge. Specifically, we collect data:",
      ],
      lists: [
        {
          items: [
            "Directly from you — when you contact us by phone, WhatsApp, email, or the enquiry form on this website.",
            "From documents you provide — when you share ownership documents, contracts, drawings, or identification as part of an approval application.",
            "From our service delivery — when we correspond with you about an ongoing approval and record project updates.",
            "Automatically via our website — limited, pseudonymous technical data through cookies and analytics (see Section 8).",
          ],
        },
      ],
    },
    {
      id: "how-we-use-your-information",
      heading: "How We Use Your Information",
      paragraphs: [
        "We use your personal data only for the purposes for which it was collected, and never for unrelated commercial purposes. The table below sets out each purpose, the data we rely on, and the lawful basis under the UAE PDPL.",
      ],
      table: {
        id: "how-we-use-information-table",
        caption: "Table B — How We Use Your Information & Legal Basis",
        headers: ["Purpose", "Data Used", "Legal Basis"],
        rows: [
          {
            cells: [
              "Delivering your requested approval service",
              "Identity, project & property details, technical documents",
              "Performance of a contract (you are our client)",
            ],
          },
          {
            cells: [
              "Complying with government authority requirements",
              "Identity documents, property ownership, technical drawings",
              "Legal obligation & explicit consent for authority submissions",
            ],
          },
          {
            cells: [
              "Communicating with you about your project",
              "Contact details, communications",
              "Legitimate interest & contract performance",
            ],
          },
          {
            cells: [
              "Invoicing and record-keeping",
              "Payment & transaction data",
              "Legal obligation (UAE accounting law)",
            ],
          },
          {
            cells: [
              "Website analytics & improvement",
              "Pseudonymous technical data",
              "Legitimate interest (aggregated, not personal)",
            ],
          },
        ],
      },
    },
    {
      id: "no-third-party-sharing",
      heading: "No Third-Party Sharing Policy",
      sidebarLabel: "No Third-Party Sharing Policy",
      paragraphs: [
        "This is our firm and permanent commitment: Wasleen never sells, rents, trades, leases, or shares your personal information with any third party for marketing, advertising, or any commercial purpose.",
        "Your data is used only within our own internal processes to deliver the service you requested. There are no data brokers, no affiliate marketers, and no commercial list rentals in our business model — and there never will be.",
      ],
      callout: {
        title: "Our commitment to you",
        body: "We do not sell, rent, trade, lease, or share your personal information with any third party for marketing, advertising, or any commercial purpose. Your data is used only within our own internal processes to deliver the requested service. The only disclosures are (a) to the government or regulatory authorities required to deliver your approval — always with your authorization and only the minimum documents needed — and (b) where disclosure is mandated by UAE law or a court order.",
      },
    },
    {
      id: "sharing-with-government-authorities",
      heading: "Sharing With Government Authorities",
      paragraphs: [
        "Approvals consultancy inherently requires submitting client documents to government authorities in Dubai and the UAE to deliver the service. This is authorized disclosure to the authorities necessary to provide the requested service — it is not third-party sharing in any commercial sense.",
        "When we submit documents on your behalf, we share only the minimum information each authority requires for your specific application. Depending on your project, the relevant authority may include Dubai Municipality, DEWA, Dubai Civil Defense (DCD), the Dubai Development Authority (DDA), RERA, or other regulatory bodies.",
        "Each submission is made with your authorization as part of the service we have been engaged to deliver. We never submit your documents to an authority you have not approved, and we never use your documents for any purpose other than your own approval.",
      ],
      lists: [
        {
          intro: "Common authorities we may submit documents to, depending on the project:",
          items: [
            "Dubai Municipality (DM) — building permits, completion certificates, NOCs",
            "DEWA — power and water connections and NOCs",
            "Dubai Civil Defense (DCD) — fire and safety approvals",
            "Dubai Development Authority (DDA) — Dubai South projects",
            "Other regulators as required for your specific approval type",
          ],
        },
      ],
    },
    {
      id: "cookies-analytics",
      heading: "Cookies, Analytics & Automated Data",
      paragraphs: [
        "Our website uses cookies and analytics tools to understand how visitors use the site and to improve your experience. We use Google Analytics and Google Tag Manager, configured to collect aggregated, pseudonymous data — we do not combine this technical data with your personal identity.",
        "We do not use cookies to build advertising profiles, and we do not share browsing data with third-party advertising networks.",
      ],
      lists: [
        {
          intro: "The technical data we collect automatically includes:",
          items: [
            "Browser type, device type, and operating system",
            "Pages visited, time on page, and referring website",
            "Approximate geographic location (country/city level only)",
            "Language preference and basic session information",
          ],
        },
      ],
    },
    {
      id: "data-security",
      heading: "Data Security & Storage",
      paragraphs: [
        "We apply appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, alteration, or disclosure. Access to client data is restricted to staff who need it to deliver the service, and we follow secure handling practices for both digital files and physical documents.",
        "Your data is processed and stored within the United Arab Emirates. We do not transfer personal data outside the UAE as part of our routine operations.",
      ],
    },
    {
      id: "data-retention",
      heading: "Data Retention",
      paragraphs: [
        "We keep personal data only for as long as necessary to fulfil the purpose for which it was collected, and to comply with UAE legal and accounting obligations. When data is no longer needed, it is securely deleted or anonymized.",
      ],
      lists: [
        {
          intro: "Our retention schedule in summary:",
          items: [
            "Project files (identity, property, technical documents): 2 years after project completion",
            "Payment and invoice records: 7 years (UAE accounting law)",
            "Enquiry and communication records: 2 years after last contact",
            "Website analytics: as defined by our analytics retention settings",
          ],
        },
      ],
    },
    {
      id: "your-rights",
      heading: "Your Rights Under UAE PDPL",
      paragraphs: [
        "Under the UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL), you have specific rights over the personal data we hold about you. We respect these rights fully and will respond to any valid request within the timeframes set by law.",
      ],
      lists: [
        {
          intro: "Your rights include:",
          items: [
            "The right to be informed about how your data is processed (this policy).",
            "The right of access to the personal data we hold about you.",
            "The right to request correction of inaccurate or incomplete data.",
            "The right to request deletion of your data where permitted by law.",
            "The right to object to or restrict certain processing.",
            "The right to withdraw consent where processing relies on consent.",
            "The right to data portability where applicable.",
          ],
        },
      ],
    },
    {
      id: "childrens-privacy",
      heading: "Children's Privacy",
      paragraphs: [
        "Our services are directed at businesses, property owners, and adults managing construction or fit-out approvals. We do not knowingly collect personal information from children under the age of 18. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.",
      ],
    },
    {
      id: "third-party-links",
      heading: "Third-Party Links",
      paragraphs: [
        "Our website may contain links to external websites, including official government portals such as u.ae. These external sites are outside our control and have their own privacy policies. We are not responsible for the privacy practices or content of third-party websites, and we encourage you to review their policies before providing any personal data.",
      ],
      links: [
        {
          label: "Official UAE government portal — u.ae",
          href: "https://u.ae",
          external: true,
        },
      ],
    },
    {
      id: "changes-to-this-policy",
      heading: "Changes to This Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices, the law, or our services. When we make material changes, we will update the \u201cLast updated\u201d date at the top of this page and, where appropriate, notify you by email or through our website.",
        "We encourage you to review this page periodically to stay informed about how we protect your information. Material changes apply from the date they are published on this page.",
      ],
    },
    {
      id: "contact-us",
      heading: "Contact Us & Data Protection Officer",
      paragraphs: [
        "If you have any questions about this Privacy Policy, or if you wish to exercise any of your data protection rights, please contact our team. We aim to respond to all data-related requests within 24 hours during business days.",
      ],
      links: [
        {
          label: "Email approvals@wasleen.com",
          href: "mailto:approvals@wasleen.com",
        },
        {
          label: "Call +971 56 764 8220",
          href: "tel:+971567648220",
        },
        {
          label: "Message us on WhatsApp",
          href: "https://wa.me/971567648220",
          external: true,
        },
        {
          label: "Contact Wasleen Approvals",
          href: "/contact-us",
        },
      ],
    },
    {
      id: "consent",
      heading: "Consent & How to Withdraw",
      paragraphs: [
        "By engaging our services and providing your personal information, you consent to the collection and processing described in this Privacy Policy. Where we rely on consent for a specific processing activity, you may withdraw that consent at any time.",
        "To withdraw consent or request any change to how your data is handled, contact us using the details in Section 15. Withdrawal of consent does not affect the lawfulness of processing that took place before withdrawal, and certain legal or contractual data may still need to be retained.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does Wasleen Approvals share my personal information with third parties?",
      answer:
        "No. Wasleen never sells, rents, trades, leases, or shares your personal information with any third party for marketing, advertising, or any commercial purpose. Your data is processed 100% in-house and used only to deliver the service you requested.",
    },
    {
      question: "What personal information does Wasleen collect?",
      answer:
        "We collect only the minimum information needed to deliver your approval: identity and contact details, property and project details, technical documents such as drawings, and payment data for invoicing. We never collect more than the service requires.",
    },
    {
      question: "Which government authorities see my documents, and why?",
      answer:
        "To deliver an approval, we may submit your documents to the relevant Dubai authorities such as Dubai Municipality, DEWA, Dubai Civil Defense (DCD), or the Dubai Development Authority (DDA). This authorized disclosure is made only with your consent and only the minimum documents each authority requires are shared.",
    },
    {
      question: "How does Wasleen protect my personal data?",
      answer:
        "We apply appropriate technical and organizational measures to prevent unauthorized access, loss, or disclosure. Access to client data is restricted to staff who need it to deliver the service, and your data is processed and stored within the United Arab Emirates.",
    },
    {
      question: "What are my data protection rights under UAE PDPL?",
      answer:
        "Under UAE Federal Decree-Law No. 45 of 2021 (PDPL), you have the right to be informed, to access your data, to request correction, deletion, or restriction, to withdraw consent, and to data portability where applicable. We respond to all valid requests within legal timeframes.",
    },
    {
      question: "How long does Wasleen retain my personal data?",
      answer:
        "We keep personal data only for as long as needed to deliver the service and meet legal obligations: project files for 2 years after completion, and payment records for 7 years under UAE accounting law. Data is securely deleted or anonymized once no longer needed.",
    },
    {
      question: "How can I request access to, correction, or deletion of my data?",
      answer:
        "Email us at approvals@wasleen.com, call +971 56 764 8220, or message us on WhatsApp with your request. We acknowledge data requests within 24 hours during business days and respond fully within the timeframes set by UAE law.",
    },
    {
      question: "How can I contact Wasleen's data protection team?",
      answer:
        "You can reach our data protection team by email at approvals@wasleen.com, by phone at +971 56 764 8220, or through the Contact Us page. Our registered office is at Office 401, Darwish Building, Al Qusais, Dubai.",
    },
  ],
  faqTitle: "Privacy Policy FAQs",
  faqSubtitle: "Answers to the questions clients ask most about how we handle their data.",
  contactTitle: "Questions About Your Data?",
  contactBody:
    "Our team is ready to help with any privacy question or data request. We respond to all data-related enquiries within 24 hours during business days.",
  contactCtaLabel: "Contact Us",
  callCtaLabel: "Call Now",
  whatsappCtaLabel: "WhatsApp Us",
  whatsappMessage:
    "Hello Wasleen Liminal Approval Consultants, I have a question about your privacy policy and how you handle my personal data.",
  disclaimer: "Regulations may change. This policy reflects our current practices and may be updated to remain compliant with UAE law.",
  sidebarAriaLabel: "Privacy policy sections",
  breadcrumbLabel: "Privacy Policy",
  relatedTitle: "More About Wasleen",
  relatedIntro: "Explore how we operate and how to reach us for your next Dubai approval project.",
  relatedLinks: [
    {
      label: "Business License & Regulatory Registration",
      href: "/license",
      description: "Verify our DED trade license and DCCI membership publicly.",
    },
    {
      label: "Contact Wasleen Approvals",
      href: "/contact-us",
      description: "Reach our team for a free consultation on your approval.",
    },
    {
      label: "About Us",
      href: "/about-us",
      description: "Learn about our company, our team, and how we work.",
    },
  ],
};
