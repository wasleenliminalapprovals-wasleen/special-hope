/**
 * Case Studies — EN Pilot Data (Part 3.1 / Step 4.5)
 *
 * ADDITIVE-ONLY — this is a NEW data file created for the Case Studies
 * mega-plan (plans/case-studies-mega-plan.md). It MUST NEVER modify
 * `src/data/approvals.ts`, `src/data/guides.ts`, or `src/data/services.ts`.
 *
 * Step 4.5 gate (Part 14 / Part 17): exactly ONE quotation — the richest-data
 * pilot — fully complete, then HARD STOP for owner review (Part 17.4).
 * Owner approved 2026-09-01; pilot is now `publishStatus: "live"` and enters
 * sitemap + llms.txt.
 *
 * 2026-09-03 OWNER DECISION (pre-deployment): all 16 entries currently in this
 * file (1 `completed` pilot + 15 `quoted` quotation case studies) are being
 * deployed as-is and were flipped to `publishStatus: "live"`, so sitemap.xml,
 * llms.txt and llms-full.txt list all 16 pages plus the /case-studies hub.
 * Only `live` entries enter sitemap + llms.txt. Future quotation case studies
 * MUST be added as `publishStatus: "draft"` and only flipped to `"live"` after
 * explicit owner approval (daily-by-request cadence per Part 17.4).
 *
 * 2026-09-15 OWNER DECISION (publication): the 5 quotation case studies added
 * 2026-09-14 (LML/QTN/1119, 1139, 1145, 1156, 1159) were approved for
 * publication and flipped to `publishStatus: "live"`, so sitemap.xml, llms.txt
 * and llms-full.txt now carry all 27 pages plus the /case-studies hub, and each
 * EN page ships as an en/ar hreflang pair with its approved Arabic twin.
 * `lastUpdated` stays 2026-09-14 for those 5 entries: the flip changes the
 * publication state only, not the content, so no date is artificially bumped.
 *
 * PILOT: LML/QTN/1114R1 — ARABIANSEA BUSINESS CENTER, DUBAI INTERNET CITY
 *   SUBJECT: QUOTATION FOR DDA & DCD APPROVAL
 *   AMOUNT: FOURTEEN THOUSAND AED ONLY (AED 14,000)
 *   Scope: drawings to DDA & DCD regulation; design approval from DDA & DCD;
 *          inspection from DDA & DCD + completion certificate.
 *   Payment: 50% advance / 40% during / 10% after.
 *
 * Honesty rules applied:
 *   - `projectStatus: "completed"` — set 2026-09-01 per owner directive
 *     (plans/case-studies-mega-plan.md Part 18.8). The owner authorised the
 *     "Done/Completed" and "approved/completed" status surfaces, which require
 *     the claim level to be `completed`. Timeline milestones 2-6 are marked
 *     "approved" WITHOUT fabricated dates — no invented dates are published.
 *   - `consentGranted: false` → anonymized `clientLabel`.
 *   - No fabricated rejection in `timeline` — no rejection exists in source;
 *     the red→green choreography is reserved for real rejection events.
 *   - `outcome` chips are limited to proven quotation + approval facts.
 *
 * @see plans/case-studies-mega-plan.md Part 17 — Single Pilot Page Protocol
 * @see src/types/case-study.ts — ApprovalCaseStudy
 */

import type { ApprovalCaseStudy } from "@/types/case-study";

export const caseStudies: ApprovalCaseStudy[] = [
  {
    slug: "business-center-dda-dcd-approval",
    projectTitle: "DDA & DCD Approval for a Business Center Fit-Out in Dubai",
    seoTitle: "DDA & DCD Approval Case Study in Dubai",
    description:
      "AED 14,000 DDA & DCD approval for a Dubai Internet City business center fit-out: drawings, design approval and completion certificate. Get a free quote today.",
    sourceRef: "LML/QTN/1114R1",
    consentGranted: false,
    clientLabel: "Confidential client — Commercial",
    projectStatus: "completed",
    authorities: ["DDA", "Dubai Civil Defence"],
    primaryApprovalSlug: "dda-approval",
    projectType: "Business center fit-out",
    location: "Dubai Internet City",
    sector: "Commercial",
    directAnswer:
      "This case study covers the completed DDA & DCD approval of a business center fit-out in Dubai Internet City. The AED 14,000 package covered preparing drawings to DDA and DCD regulations, obtaining design approval from both authorities, and conducting the inspection that released the completion certificate. The quotation was issued on 9 June 2026 and both approvals were obtained.",
    stats: [
      { label: "Authorities", value: "DDA + DCD" },
      { label: "Quoted fee", value: "AED 14,000" },
      { label: "Scope", value: "Drawings, approval & inspection" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "This business center fit-out sits inside a Dubai Development Authority (DDA) managed zone, so it needs approval from both the DDA and Dubai Civil Defence (DCD) before work can begin. That means one drawing set has to satisfy two authorities' regulations, and design approval must be secured from each of them before any inspection can take place.\n\nThe quotation's limiting conditions map out where this type of approval usually stalls. The client supplies the existing drawings, documents and green files; exceptional approval requirements, a design revision or a failed inspection each carry an extra charge; and the building management NOC can change the final price. Managing those inputs up front is what keeps the quoted AED 14,000 fee final.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and drawing review",
        description:
          "Review the existing drawings, documents and green files supplied by the client, and confirm the current condition of the business center fit-out space.",
      },
      {
        step: 2,
        title: "Prepare drawings to DDA and DCD regulations",
        description:
          "Prepare the fit-out drawing set so it meets both DDA and DCD regulation requirements in a single submission.",
      },
      {
        step: 3,
        title: "Obtain design approval from DDA and DCD",
        description:
          "Submit the drawing set and supporting documents to the DDA and DCD, and follow up until design approval is obtained from both authorities.",
      },
      {
        step: 4,
        title: "Coordinate the building management NOC",
        description:
          "Liaise with the building management to secure the no-objection certificate, and flag any price change before it affects the quoted fee.",
      },
      {
        step: 5,
        title: "Conduct inspection with DDA and DCD",
        description:
          "Arrange and attend the fit-out inspection with DDA and DCD inspectors, and resolve any findings so the inspection passes.",
      },
      {
        step: 6,
        title: "Release the completion certificate",
        description:
          "Once the inspection passes, finalise the authority documentation and release the completion certificate for the fit-out.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1114R1 issued on 9 June 2026 covering DDA & DCD approval for AED 14,000.",
        state: "approved",
        date: "2026-06-09",
      },
      {
        title: "Site visit",
        detail:
          "Review the existing drawings, documents and green files supplied by the client.",
        state: "approved",
      },
      {
        title: "Drawings prepared",
        detail: "Fit-out drawing set prepared to DDA and DCD regulations.",
        state: "approved",
      },
      {
        title: "Design approval",
        detail: "Design approval obtained from DDA and DCD.",
        state: "approved",
      },
      {
        title: "Inspection",
        detail: "Fit-out inspection conducted with DDA and DCD inspectors.",
        state: "approved",
      },
      {
        title: "Completion",
        detail: "Completion certificate released after the inspection passes.",
        state: "approved",
      },
    ],
    documentsTable: [
      {
        document: "Trade licence",
        description: "Client's valid trade licence for the business center.",
        providedBy: "client",
      },
      {
        document: "Tenancy contract",
        description: "Tenancy contract for the Dubai Internet City space.",
        providedBy: "client",
      },
      {
        document: "Green file and existing drawings",
        description:
          "Existing drawings, documents and green files required by the authorities.",
        providedBy: "client",
      },
      {
        document: "Building management NOC",
        description:
          "No-objection certificate from the building management (may affect the final price).",
        providedBy: "client",
      },
      {
        document: "Fit-out drawing set",
        description: "Drawings prepared to DDA and DCD regulations.",
        providedBy: "wasleen",
      },
      {
        document: "DDA & DCD applications",
        description:
          "Design approval and inspection applications submitted to DDA and DCD.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "9 June 2026",
      },
      {
        stage: "Site visit & drawings",
        planned: "Weeks 1–2",
        actual: "—",
        note: "Indicative — typical DDA & DCD timelines",
      },
      {
        stage: "Design approval (DDA & DCD)",
        planned: "Weeks 3–6",
        actual: "—",
        note: "Indicative — typical DDA & DCD timelines",
      },
      {
        stage: "Inspection",
        planned: "Week 7",
        actual: "—",
        note: "Indicative — typical DDA & DCD timelines",
      },
      {
        stage: "Completion certificate",
        planned: "Week 8",
        actual: "—",
        note: "Indicative — typical DDA & DCD timelines",
      },
    ],
    quotedFee: "AED 14,000",
    feeAmountAED: 14000,
    feeIncluded: [
      "Preparing drawings as per DDA and DCD regulation",
      "Obtaining design approval from DDA and DCD",
      "Conducting inspection from DDA & DCD, releasing completion certificate",
    ],
    proTips: [
      {
        title: "Submit a complete drawing set to avoid revision charges",
        body: "The limiting conditions charge extra for a design revision or exceptional approval requirements. Confirming the existing drawings, documents and green files up front keeps the AED 14,000 fee final.",
      },
      {
        title: "Confirm the building NOC early so the price stays as quoted",
        body: "The quotation notes the building management NOC may change the final price. Securing it early prevents a fee surprise and keeps the fit-out timeline on track.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 14,000" },
      { label: "Approvals covered", value: "DDA + DCD" },
      { label: "Completion certificate", value: "Included" },
    ],
    faqs: [
      {
        question:
          "What does the AED 14,000 quotation cover for this business center fit-out?",
        answer:
          "It covers preparing drawings to DDA and DCD regulations, obtaining design approval from DDA and DCD, and conducting the inspection that releases the completion certificate.",
      },
      {
        question:
          "Which authorities are involved in this DDA & DCD approval case study?",
        answer:
          "Two authorities are involved: the Dubai Development Authority (DDA), which manages Dubai Internet City, and Dubai Civil Defence (DCD), which reviews fire and life-safety requirements for the fit-out.",
      },
      {
        question: "Why does this business center need both DDA and DCD approval?",
        answer:
          "The business center sits inside a DDA-managed zone, so the DDA controls planning and building approval there. The DCD separately reviews fire safety, so the fit-out cannot receive its completion certificate without both approvals.",
      },
      {
        question:
          "What does the client need to provide for the DDA and DCD approval process?",
        answer:
          "The client provides the trade licence, tenancy contract, existing drawings, documents, green files, and a building management NOC. Wasleen prepares the DDA and DCD drawing set and handles the applications.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply only for exceptional approval requirements, a design revision or a failed inspection, and VAT is separate. The building management NOC may also change the final price.",
      },
      {
        question:
          "What is the payment schedule for this DDA & DCD approval quotation?",
        answer:
          "Payment is 50% in advance, 40% during the process, and 10% after the completion certificate is released, as stated in quotation LML/QTN/1114R1.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/business-center-dda-dcd-approval/hero.webp",
        alt: "Blueprint drawing of a business center fit-out for DDA and DCD approval in Dubai Internet City",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/business-center-dda-dcd-approval/documents.webp",
        alt: "Blueprint document checklist for DDA and DCD approval of a business center fit-out",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/interior-fit-out-approval-consultants-in-dubai.webp",
        alt: "Interior fit-out approval consultants in Dubai reviewing drawings for a DDA & DCD business center fit-out",
        caption: "Wasleen approval consultants preparing a DDA & DCD fit-out submission in Dubai",
        width: 2336,
        height: 1760,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "dubai-civil-defense-approval",
      "dubai-municipality-building-permit",
    ],
    relatedGuideSlugs: [
      "dcd-fire-safety-approval-documents",
      "interior-fit-out-permit-process",
      "cad-drawing-standards-dubai-guide",
      "as-built-drawing-requirements",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-06-09",
    lastUpdated: "2026-09-01",
    publishStatus: "live",
  },
  {
    slug: "fire-fighting-dcd-approval-jebel-ali",
    projectTitle: "DCD Approval for Fire Fighting Design Revision in Jebel Ali",
    seoTitle: "Fire Fighting DCD Approval in Jebel Ali",
    description:
      "AED 5,500 DCD approval for a fire fighting design revision in Jebel Ali: drawings, approval, inspection and completion certificate. Get a free quote today.",
    sourceRef: "LML/QTN/1046",
    consentGranted: false,
    clientLabel: "Confidential client — Fire fighting equipment installation",
    projectStatus: "quoted",
    authorities: ["Dubai Civil Defence"],
    primaryApprovalSlug: "dubai-civil-defense-approval",
    projectType: "Fire fighting equipment design revision",
    location: "Jebel Ali",
    sector: "Industrial",
    directAnswer:
      "This case study covers the quoted DCD approval for a fire fighting equipment design revision in Jebel Ali, Dubai. The AED 5,500 quotation from LML/QTN/1046 covers preparing the fire fighting drawings as per Dubai Civil Defence regulation, obtaining design approval from DCD, and conducting the inspection that releases the completion certificate. Government fees are paid directly by the client and VAT is separate.",
    stats: [
      { label: "Authorities", value: "DCD" },
      { label: "Quoted fee", value: "AED 5,500" },
      { label: "Scope", value: "Design revision & approval" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "The client is a fire fighting equipment installation company in Jebel Ali whose existing drawings need a design revision to meet current Dubai Civil Defence regulation. The quotation's limiting conditions show where this type of approval usually stalls: the client supplies the existing drawings, documents and green files; exceptional approval requirements, a design revision or a failed inspection each carry an extra charge; and all government fees are paid directly by the client, with VAT separate. Managing those inputs up front is what keeps the quoted AED 5,500 fee final.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and drawing review",
        description:
          "Review the existing fire fighting drawings, documents and green files supplied by the client, and confirm the design revisions needed for DCD compliance.",
      },
      {
        step: 2,
        title: "Prepare drawings as per DCD regulation",
        description:
          "Prepare the revised fire fighting drawing set so it meets Dubai Civil Defence regulation in a single submission.",
      },
      {
        step: 3,
        title: "Obtain design approval from DCD",
        description:
          "Submit the drawing set and supporting documents to Dubai Civil Defence, and follow up until design approval is obtained.",
      },
      {
        step: 4,
        title: "Coordinate government fees",
        description:
          "Confirm which government fees the client pays directly, keeping the quoted professional fee separate and predictable.",
      },
      {
        step: 5,
        title: "Conduct inspection with DCD",
        description:
          "Arrange and attend the inspection with DCD inspectors, and resolve any findings so the inspection passes.",
      },
      {
        step: 6,
        title: "Release the completion certificate",
        description:
          "Once the inspection passes, finalise the DCD documentation and release the completion certificate.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1046 issued on 28 February 2026 for design revision & DCD approval at AED 5,500.",
        state: "approved",
        date: "2026-02-28",
      },
      {
        title: "Drawing review",
        detail:
          "Review the existing fire fighting drawings, documents and green files supplied by the client.",
        state: "pending",
      },
      {
        title: "Drawings prepared",
        detail: "Revised fire fighting drawing set prepared as per DCD regulation.",
        state: "pending",
      },
      {
        title: "Design approval",
        detail: "Design approval to be obtained from Dubai Civil Defence.",
        state: "pending",
      },
      {
        title: "Inspection",
        detail: "DCD inspection to be conducted once the design revision is approved.",
        state: "pending",
      },
      {
        title: "Completion",
        detail: "Completion certificate to be released after the inspection passes.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Trade licence",
        description: "Client's valid trade licence.",
        providedBy: "client",
      },
      {
        document: "Tenancy contract",
        description: "Tenancy contract for the Jebel Ali premises.",
        providedBy: "client",
      },
      {
        document: "Existing drawings and green files",
        description:
          "Existing fire fighting drawings, documents and green files required by DCD.",
        providedBy: "client",
      },
      {
        document: "Government fees",
        description:
          "All government fees are paid directly by the client per the quotation.",
        providedBy: "client",
      },
      {
        document: "Fire fighting drawing set",
        description: "Revised drawings prepared as per DCD regulation.",
        providedBy: "wasleen",
      },
      {
        document: "DCD applications",
        description:
          "Design approval and inspection applications submitted to Dubai Civil Defence.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "28 February 2026",
      },
      {
        stage: "Site visit & drawings",
        planned: "Weeks 1–2",
        actual: "—",
        note: "Indicative — typical DCD timelines",
      },
      {
        stage: "Design approval (DCD)",
        planned: "Weeks 3–5",
        actual: "—",
        note: "Indicative — typical DCD timelines",
      },
      {
        stage: "Inspection",
        planned: "Week 6",
        actual: "—",
        note: "Indicative — typical DCD timelines",
      },
      {
        stage: "Completion certificate",
        planned: "Week 7",
        actual: "—",
        note: "Indicative — typical DCD timelines",
      },
    ],
    quotedFee: "AED 5,500",
    feeAmountAED: 5500,
    feeIncluded: [
      "Preparing drawings as per DCD regulation",
      "Obtaining design approval from DCD",
      "Conducting inspection from DCD, releasing completion certificate",
    ],
    proTips: [
      {
        title: "Supply complete existing drawings to keep the AED 5,500 fee final",
        body: "The limiting conditions charge extra for exceptional approval requirements, a design revision or a failed inspection. Confirming the existing fire fighting drawings, documents and green files up front protects the quoted price.",
      },
      {
        title: "Budget government fees separately — they are client-paid",
        body: "The quotation states all government fees are done by the client and VAT is separate, so the AED 5,500 professional fee stays predictable.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 5,500" },
      { label: "Approval authority", value: "Dubai Civil Defence" },
      { label: "Scope", value: "Design revision & inspection" },
    ],
    faqs: [
      {
        question:
          "What does the AED 5,500 quotation cover for this fire fighting DCD approval?",
        answer:
          "It covers preparing the fire fighting drawings as per Dubai Civil Defence regulation, obtaining design approval from DCD, and conducting the inspection that releases the completion certificate.",
      },
      {
        question:
          "Which authority is involved in this Jebel Ali fire fighting approval?",
        answer:
          "Dubai Civil Defence (DCD), which reviews fire and life-safety requirements for the fire fighting equipment design in Dubai.",
      },
      {
        question:
          "What does the client need to provide for this DCD approval?",
        answer:
          "The client provides the existing drawings, documents and green files, and pays all government fees directly. Wasleen prepares the DCD drawing set and handles the applications.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, a design revision or a failed inspection; VAT is separate, and government fees are paid by the client.",
      },
      {
        question:
          "What is the payment schedule for this DCD approval quotation?",
        answer:
          "Payment is 50% in advance, 40% during work progress and 10% after completion, as stated in quotation LML/QTN/1046.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 28 February 2026 for AED 5,500; the approval scope is engaged and the final approval is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/fire-fighting-dcd-approval-jebel-ali/hero.webp",
        alt: "Blueprint drawing of a fire fighting design revision for DCD approval in Jebel Ali",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/fire-fighting-dcd-approval-jebel-ali/documents.webp",
        alt: "Blueprint document checklist for DCD approval of a fire fighting equipment design revision",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/fire-and-safety-approvals-in-dubai-dcd-consultants.webp",
        alt: "Fire and safety approvals in Dubai with DCD consultants reviewing a fire fighting design",
        caption: "DCD fire and life-safety approval consultants in Dubai",
        width: 2336,
        height: 1760,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "dubai-municipality-civil-defense-noc",
      "dubai-municipality-completion-certificate",
      "mep-approval",
    ],
    relatedGuideSlugs: [
      "dcd-fire-safety-approval-documents",
      "interior-fit-out-permit-process",
      "cad-drawing-standards-dubai-guide",
      "as-built-drawing-requirements",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "business-center-dda-dcd-approval",
      "fire-fighting-dcd-approval-al-quoz",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-02-28",
    lastUpdated: "2026-09-02",
    publishStatus: "live",
  },
  {
    slug: "fire-fighting-dcd-approval-al-quoz",
    projectTitle: "DCD Approval for Fire Fighting Drawings in Al Quoz",
    seoTitle: "Fire Fighting DCD Approval in Al Quoz",
    description:
      "AED 3,300 DCD approval for fire fighting drawings in Al Quoz: drawings, design approval, inspection and completion certificate. Get a free quote today.",
    sourceRef: "LML/QTN/1047",
    consentGranted: false,
    clientLabel: "Confidential client — Fire fighting equipment installation",
    projectStatus: "quoted",
    authorities: ["Dubai Civil Defence"],
    primaryApprovalSlug: "dubai-civil-defense-approval",
    projectType: "Fire fighting DCD approval",
    location: "Al Quoz",
    sector: "Industrial",
    directAnswer:
      "This case study covers the quoted DCD approval for fire fighting drawings at a fire fighting equipment installation company in Al Quoz, Dubai. The AED 3,300 quotation from LML/QTN/1047 covers preparing the drawings as per Dubai Civil Defence regulation, obtaining design approval from DCD, and conducting the inspection that releases the completion certificate. Government fees are paid directly by the client and VAT is separate.",
    stats: [
      { label: "Authorities", value: "DCD" },
      { label: "Quoted fee", value: "AED 3,300" },
      { label: "Scope", value: "Drawings, approval & inspection" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "The client is a fire fighting equipment installation company in Al Quoz that needs DCD approval for a fire fighting drawing set. The quotation's limiting conditions define where the fee stays final: the client supplies the existing drawings, documents and green files; exceptional approval requirements, a design revision or a failed inspection each carry an extra charge; and all government fees are paid directly by the client, with VAT separate. Confirming those inputs at the start is what protects the quoted AED 3,300 fee.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and drawing review",
        description:
          "Review the existing fire fighting drawings, documents and green files supplied by the client, and confirm what the Al Quoz premises need for DCD compliance.",
      },
      {
        step: 2,
        title: "Prepare drawings as per DCD regulation",
        description:
          "Prepare the fire fighting drawing set so it meets Dubai Civil Defence regulation in a single submission.",
      },
      {
        step: 3,
        title: "Obtain design approval from DCD",
        description:
          "Submit the drawing set and supporting documents to Dubai Civil Defence, and follow up until design approval is obtained.",
      },
      {
        step: 4,
        title: "Coordinate government fees",
        description:
          "Confirm which government fees the client pays directly, keeping the quoted professional fee separate and predictable.",
      },
      {
        step: 5,
        title: "Conduct inspection with DCD",
        description:
          "Arrange and attend the inspection with DCD inspectors, and resolve any findings so the inspection passes.",
      },
      {
        step: 6,
        title: "Release the completion certificate",
        description:
          "Once the inspection passes, finalise the DCD documentation and release the completion certificate.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1047 issued on 3 March 2026 for DCD approval at AED 3,300.",
        state: "approved",
        date: "2026-03-03",
      },
      {
        title: "Drawing review",
        detail:
          "Review the existing fire fighting drawings, documents and green files supplied by the client.",
        state: "pending",
      },
      {
        title: "Drawings prepared",
        detail: "Fire fighting drawing set prepared as per DCD regulation.",
        state: "pending",
      },
      {
        title: "Design approval",
        detail: "Design approval to be obtained from Dubai Civil Defence.",
        state: "pending",
      },
      {
        title: "Inspection",
        detail: "DCD inspection to be conducted once the drawings are approved.",
        state: "pending",
      },
      {
        title: "Completion",
        detail: "Completion certificate to be released after the inspection passes.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Trade licence",
        description: "Client's valid trade licence.",
        providedBy: "client",
      },
      {
        document: "Tenancy contract",
        description: "Tenancy contract for the Al Quoz premises.",
        providedBy: "client",
      },
      {
        document: "Existing drawings and green files",
        description:
          "Existing fire fighting drawings, documents and green files required by DCD.",
        providedBy: "client",
      },
      {
        document: "Government fees",
        description:
          "All government fees are paid directly by the client per the quotation.",
        providedBy: "client",
      },
      {
        document: "Fire fighting drawing set",
        description: "Fire fighting drawings prepared as per DCD regulation.",
        providedBy: "wasleen",
      },
      {
        document: "DCD applications",
        description:
          "Design approval and inspection applications submitted to Dubai Civil Defence.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "3 March 2026",
      },
      {
        stage: "Site visit & drawings",
        planned: "Weeks 1–2",
        actual: "—",
        note: "Indicative — typical DCD timelines",
      },
      {
        stage: "Design approval (DCD)",
        planned: "Weeks 3–5",
        actual: "—",
        note: "Indicative — typical DCD timelines",
      },
      {
        stage: "Inspection",
        planned: "Week 6",
        actual: "—",
        note: "Indicative — typical DCD timelines",
      },
      {
        stage: "Completion certificate",
        planned: "Week 7",
        actual: "—",
        note: "Indicative — typical DCD timelines",
      },
    ],
    quotedFee: "AED 3,300",
    feeAmountAED: 3300,
    feeIncluded: [
      "Preparing drawings as per DCD regulation",
      "Obtaining design approval from DCD",
      "Conducting inspection from DCD, releasing completion certificate",
    ],
    proTips: [
      {
        title: "Supply complete existing drawings to keep the AED 3,300 fee final",
        body: "The limiting conditions charge extra for exceptional approval requirements, a design revision or a failed inspection. Confirming the existing fire fighting drawings, documents and green files up front protects the quoted price.",
      },
      {
        title: "Budget government fees separately — they are client-paid",
        body: "The quotation states all government fees are done by the client and VAT is separate, so the AED 3,300 professional fee stays predictable.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 3,300" },
      { label: "Approval authority", value: "Dubai Civil Defence" },
      { label: "Scope", value: "Drawings, approval & inspection" },
    ],
    faqs: [
      {
        question:
          "What does the AED 3,300 quotation cover for this fire fighting DCD approval?",
        answer:
          "It covers preparing the fire fighting drawings as per Dubai Civil Defence regulation, obtaining design approval from DCD, and conducting the inspection that releases the completion certificate.",
      },
      {
        question:
          "Which authority is involved in this Al Quoz fire fighting approval?",
        answer:
          "Dubai Civil Defence (DCD), which reviews fire and life-safety requirements for the fire fighting equipment design in Dubai.",
      },
      {
        question:
          "What does the client need to provide for this DCD approval?",
        answer:
          "The client provides the existing drawings, documents and green files, and pays all government fees directly. Wasleen prepares the DCD drawing set and handles the applications.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, a design revision or a failed inspection; VAT is separate, and government fees are paid by the client.",
      },
      {
        question:
          "What is the payment schedule for this DCD approval quotation?",
        answer:
          "Payment is 50% in advance, 40% during work progress and 10% after completion, as stated in quotation LML/QTN/1047.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 3 March 2026 for AED 3,300; the approval scope is engaged and the final approval is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/fire-fighting-dcd-approval-al-quoz/hero.webp",
        alt: "Blueprint drawing of fire fighting drawings for DCD approval in Al Quoz",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/fire-fighting-dcd-approval-al-quoz/documents.webp",
        alt: "Blueprint document checklist for DCD approval of fire fighting drawings in Al Quoz",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/fire-and-safety-approvals-in-dubai-dcd-consultants.webp",
        alt: "Fire and safety approvals in Dubai with DCD consultants reviewing a fire fighting design",
        caption: "DCD fire and life-safety approval consultants in Dubai",
        width: 2336,
        height: 1760,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "dubai-municipality-civil-defense-noc",
      "dubai-municipality-completion-certificate",
      "mep-approval",
    ],
    relatedGuideSlugs: [
      "dcd-fire-safety-approval-documents",
      "interior-fit-out-permit-process",
      "cad-drawing-standards-dubai-guide",
      "as-built-drawing-requirements",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "business-center-dda-dcd-approval",
      "fire-fighting-dcd-approval-jebel-ali",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-03-03",
    lastUpdated: "2026-09-02",
    publishStatus: "live",
  },
  {
    slug: "dda-approval-alma-arabian-ranches",
    projectTitle: "DDA Approval for a Villa in Alma, Arabian Ranches",
    seoTitle: "DDA Approval Case Study in Arabian Ranches",
    description:
      "AED 5,500 DDA approval for a villa in Alma, Arabian Ranches: drawings, design approval, inspection and completion certificate. Get a free quote today.",
    sourceRef: "LML/QTN/1049",
    consentGranted: false,
    clientLabel: "Confidential client — Residential villa",
    projectStatus: "quoted",
    authorities: ["DDA"],
    primaryApprovalSlug: "dda-approval",
    projectType: "Villa DDA approval",
    location: "Alma, Arabian Ranches",
    sector: "Residential",
    directAnswer:
      "This case study covers the quoted DDA approval for a villa in Alma, Arabian Ranches, Dubai. The AED 5,500 quotation from LML/QTN/1049 covers preparing the villa drawings as per DDA regulation, obtaining design approval from the Dubai Development Authority (DDA), and conducting the inspection that releases the completion certificate. The quotation was issued on 12 March 2026 and the approval scope is engaged but not yet claimed.",
    stats: [
      { label: "Authorities", value: "DDA" },
      { label: "Quoted fee", value: "AED 5,500" },
      { label: "Scope", value: "Drawings, approval & inspection" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "Alma is a villa community within Arabian Ranches, a Dubai Development Authority (DDA) managed master development. A villa renovation or fit-out there needs DDA approval before work can begin, and the drawings must be prepared as per DDA regulation so the design approval and the final inspection both pass.\n\nThe quotation's limiting conditions define where the fee stays final: the client supplies the existing drawings, documents and green files; exceptional approval requirements, a design revision or a failed inspection each carry an extra charge; and if DDA require the submission through a contracting company licence, the price may differ. Confirming those inputs at the start is what protects the quoted AED 5,500 fee.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and drawing review",
        description:
          "Review the existing villa drawings, documents and green files supplied by the client, and confirm the current condition of the villa at Alma, Arabian Ranches.",
      },
      {
        step: 2,
        title: "Prepare drawings as per DDA regulation",
        description:
          "Prepare the villa drawing set so it meets Dubai Development Authority regulation in a single submission.",
      },
      {
        step: 3,
        title: "Obtain design approval from DDA",
        description:
          "Submit the drawing set and supporting documents to the DDA, and follow up until design approval is obtained.",
      },
      {
        step: 4,
        title: "Coordinate the community approval",
        description:
          "Liaise with the Arabian Ranches community management on the no-objection certificate where required, and flag any contracting company licence requirement early.",
      },
      {
        step: 5,
        title: "Conduct inspection with DDA",
        description:
          "Arrange and attend the DDA inspection of the villa, and resolve any findings so the inspection passes.",
      },
      {
        step: 6,
        title: "Release the completion certificate",
        description:
          "Once the inspection passes, finalise the DDA documentation and release the completion certificate.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1049 issued on 12 March 2026 for DDA approval at AED 5,500.",
        state: "approved",
        date: "2026-03-12",
      },
      {
        title: "Drawing review",
        detail:
          "Review the existing villa drawings, documents and green files supplied by the client.",
        state: "pending",
      },
      {
        title: "Drawings prepared",
        detail: "Villa drawing set prepared as per DDA regulation.",
        state: "pending",
      },
      {
        title: "Design approval",
        detail: "Design approval to be obtained from the Dubai Development Authority.",
        state: "pending",
      },
      {
        title: "Inspection",
        detail: "DDA inspection to be conducted once the drawings are approved.",
        state: "pending",
      },
      {
        title: "Completion",
        detail: "Completion certificate to be released after the inspection passes.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Trade licence",
        description: "Client's valid trade licence.",
        providedBy: "client",
      },
      {
        document: "Title deed or tenancy",
        description: "Title deed or tenancy evidence for the villa at Alma, Arabian Ranches.",
        providedBy: "client",
      },
      {
        document: "Existing drawings and green files",
        description:
          "Existing villa drawings, documents and green files required by DDA.",
        providedBy: "client",
      },
      {
        document: "Community approval / NOC",
        description:
          "Arabian Ranches community no-objection certificate for the villa works where required.",
        providedBy: "client",
      },
      {
        document: "Villa drawing set",
        description: "Villa drawings prepared as per DDA regulation.",
        providedBy: "wasleen",
      },
      {
        document: "DDA applications",
        description:
          "Design approval and inspection applications submitted to the Dubai Development Authority.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "12 March 2026",
      },
      {
        stage: "Site visit & drawings",
        planned: "Weeks 1–2",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
      {
        stage: "Design approval (DDA)",
        planned: "Weeks 3–5",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
      {
        stage: "Inspection",
        planned: "Week 6",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
      {
        stage: "Completion certificate",
        planned: "Week 7",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
    ],
    quotedFee: "AED 5,500",
    feeAmountAED: 5500,
    feeIncluded: [
      "Preparing drawings as per DDA regulation",
      "Obtaining design approval from DDA",
      "Conducting inspection from DDA, releasing completion certificate",
    ],
    proTips: [
      {
        title: "Supply complete villa drawings to keep the AED 5,500 fee final",
        body: "The limiting conditions charge extra for exceptional approval requirements, a design revision or a failed inspection. Confirming the existing villa drawings, documents and green files up front protects the quoted price.",
      },
      {
        title: "Confirm the contracting company licence requirement early",
        body: "The quotation notes that if DDA require submission through a contracting company licence, the price may differ. Checking this before approval starts avoids a surprise change to the fee.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 5,500" },
      { label: "Approval authority", value: "Dubai Development Authority (DDA)" },
      { label: "Scope", value: "Drawings, approval & inspection" },
    ],
    faqs: [
      {
        question: "What does the AED 5,500 quotation cover for this villa DDA approval?",
        answer:
          "It covers preparing the villa drawings as per DDA regulation, obtaining design approval from the Dubai Development Authority (DDA), and conducting the inspection that releases the completion certificate.",
      },
      {
        question: "Which authority is involved in this Arabian Ranches villa approval?",
        answer:
          "The Dubai Development Authority (DDA), which manages the master development approval for villa communities like Arabian Ranches in Dubai.",
      },
      {
        question: "What does the client need to provide for this DDA approval?",
        answer:
          "The client provides the existing villa drawings, documents and green files. Wasleen prepares the DDA drawing set and handles the design approval and inspection applications.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, a design revision or a failed inspection, and if DDA require submission through a contracting company licence the price may differ.",
      },
      {
        question: "What is the payment schedule for this DDA approval quotation?",
        answer:
          "Payment is 50% in advance, 40% during work progress and 10% after completion, as stated in quotation LML/QTN/1049.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 12 March 2026 for AED 5,500; the approval scope is engaged and the final approval is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/dda-approval-alma-arabian-ranches/hero.webp",
        alt: "Blueprint drawing of a villa for DDA approval in Alma, Arabian Ranches",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/dda-approval-alma-arabian-ranches/documents.webp",
        alt: "Blueprint document checklist for DDA approval of a villa in Arabian Ranches",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/villa-renovation-approval-dubai.webp",
        alt: "Villa renovation approval in Dubai with DDA approval consultants reviewing a residential property design",
        caption: "Villa DDA approval consultants in Dubai",
        width: 1376,
        height: 768,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "emaar-community-approval",
      "community-approval",
      "dubai-municipality-completion-certificate",
    ],
    relatedGuideSlugs: [
      "emaar-community-design-guidelines",
      "interior-fit-out-permit-process",
      "cad-drawing-standards-dubai-guide",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: ["business-center-dda-dcd-approval"],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-03-12",
    lastUpdated: "2026-09-02",
    publishStatus: "live",
  },
  {
    slug: "dm-dcd-approval-dubai-marina-apartment",
    projectTitle: "DM & DCD Approval for an Apartment Fit-Out in Dubai Marina",
    seoTitle: "DM & DCD Approval Case Study in Dubai Marina",
    description:
      "AED 12,000 DM & DCD approval for a Dubai Marina apartment fit-out: drawings, design approval, inspection, completion certificate. Get a free quote today.",
    sourceRef: "LML/QTN/1075",
    consentGranted: false,
    clientLabel: "Confidential client — Contracting company",
    projectStatus: "quoted",
    authorities: ["Dubai Municipality", "Dubai Civil Defence"],
    primaryApprovalSlug: "dubai-municipality-building-permit",
    projectType: "Apartment fit-out DM & DCD approval",
    location: "Dubai Marina",
    sector: "Residential",
    directAnswer:
      "This case study covers the quoted DM & DCD approval for an apartment fit-out in Dubai Marina, Dubai. The AED 12,000 quotation from LML/QTN/1075 covers preparing the drawings as per Dubai Municipality and Dubai Civil Defence regulation, obtaining design approval from both authorities, and conducting the inspection that releases the completion certificate. The quotation was issued on 13 April 2026 and the approval scope is engaged but not yet claimed.",
    stats: [
      { label: "Authorities", value: "DM + DCD" },
      { label: "Quoted fee", value: "AED 12,000" },
      { label: "Scope", value: "Drawings, approval & inspection" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "Dubai Marina sits inside Dubai Municipality's jurisdiction, so an apartment fit-out there needs approval from both Dubai Municipality (DM) and Dubai Civil Defence (DCD) before work can begin. That means one drawing set has to satisfy both authorities' regulations, and design approval must be secured from each of them before any inspection can take place.\n\nThe quotation's limiting conditions define where the fee stays final: the client supplies the existing drawings, documents and green files; exceptional approval requirements, a design revision or a failed inspection each carry an additional charge; and VAT is separate. Confirming those inputs at the start is what protects the quoted AED 12,000 fee.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and drawing review",
        description:
          "Review the existing apartment drawings, documents and green files supplied by the client, and confirm the current condition of the apartment at Dubai Marina.",
      },
      {
        step: 2,
        title: "Prepare drawings as per DM and DCD regulation",
        description:
          "Prepare the apartment drawing set so it meets both Dubai Municipality and Dubai Civil Defence regulation in a single submission.",
      },
      {
        step: 3,
        title: "Obtain design approval from DM and DCD",
        description:
          "Submit the drawing set and supporting documents to Dubai Municipality and Dubai Civil Defence, and follow up until design approval is obtained from both authorities.",
      },
      {
        step: 4,
        title: "Coordinate the building management NOC",
        description:
          "Liaise with the Dubai Marina building management to secure the no-objection certificate where required, and flag any price change before it affects the quoted fee.",
      },
      {
        step: 5,
        title: "Conduct inspection with DM and DCD",
        description:
          "Arrange and attend the fit-out inspection with DM and DCD inspectors, and resolve any findings so the inspection passes.",
      },
      {
        step: 6,
        title: "Release the completion certificate",
        description:
          "Once the inspection passes, finalise the authority documentation and release the completion certificate for the apartment fit-out.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1075 issued on 13 April 2026 for DM & DCD approval at AED 12,000.",
        state: "approved",
        date: "2026-04-13",
      },
      {
        title: "Drawing review",
        detail:
          "Review the existing apartment drawings, documents and green files supplied by the client.",
        state: "pending",
      },
      {
        title: "Drawings prepared",
        detail: "Apartment drawing set prepared as per DM and DCD regulation.",
        state: "pending",
      },
      {
        title: "Design approval",
        detail: "Design approval to be obtained from Dubai Municipality and Dubai Civil Defence.",
        state: "pending",
      },
      {
        title: "Inspection",
        detail: "DM and DCD inspection to be conducted once the drawings are approved.",
        state: "pending",
      },
      {
        title: "Completion",
        detail: "Completion certificate to be released after the inspection passes.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Trade licence",
        description: "Client's valid trade licence.",
        providedBy: "client",
      },
      {
        document: "Tenancy contract or title deed",
        description: "Tenancy contract or title deed for the Dubai Marina apartment.",
        providedBy: "client",
      },
      {
        document: "Existing drawings and green files",
        description:
          "Existing apartment drawings, documents and green files required by DM and DCD.",
        providedBy: "client",
      },
      {
        document: "Building management NOC",
        description:
          "Building management no-objection certificate for the Dubai Marina apartment where required.",
        providedBy: "client",
      },
      {
        document: "Apartment drawing set",
        description: "Apartment fit-out drawings prepared as per DM and DCD regulation.",
        providedBy: "wasleen",
      },
      {
        document: "DM and DCD applications",
        description:
          "Design approval and inspection applications submitted to Dubai Municipality and Dubai Civil Defence.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "13 April 2026",
      },
      {
        stage: "Site visit & drawings",
        planned: "Weeks 1–2",
        actual: "—",
        note: "Indicative — typical DM & DCD timelines",
      },
      {
        stage: "Design approval (DM & DCD)",
        planned: "Weeks 3–5",
        actual: "—",
        note: "Indicative — typical DM & DCD timelines",
      },
      {
        stage: "Inspection",
        planned: "Week 6",
        actual: "—",
        note: "Indicative — typical DM & DCD timelines",
      },
      {
        stage: "Completion certificate",
        planned: "Week 7",
        actual: "—",
        note: "Indicative — typical DM & DCD timelines",
      },
    ],
    quotedFee: "AED 12,000",
    feeAmountAED: 12000,
    feeIncluded: [
      "Preparing drawings as per DM and DCD regulation",
      "Obtaining design approval from DM and DCD",
      "Conducting inspection from DM and DCD, releasing completion certificate",
    ],
    proTips: [
      {
        title: "Supply complete apartment drawings to keep the AED 12,000 fee final",
        body: "The limiting conditions charge additional for exceptional approval requirements, a design revision or a failed inspection. Confirming the existing apartment drawings, documents and green files up front protects the quoted price.",
      },
      {
        title: "Budget VAT separately — it is not in the quotation",
        body: "The limiting conditions state VAT will be separate, so the AED 12,000 professional fee stays predictable and you can plan the total budget accurately.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 12,000" },
      { label: "Approval authority", value: "Dubai Municipality & Dubai Civil Defence" },
      { label: "Scope", value: "Drawings, approval & inspection" },
    ],
    faqs: [
      {
        question: "What does the AED 12,000 quotation cover for this Dubai Marina apartment fit-out?",
        answer:
          "It covers preparing the apartment drawings as per Dubai Municipality and Dubai Civil Defence regulation, obtaining design approval from both authorities, and conducting the inspection that releases the completion certificate.",
      },
      {
        question: "Which authorities are involved in this Dubai Marina apartment approval?",
        answer:
          "Dubai Municipality (DM) and Dubai Civil Defence (DCD), which together review the building permit and the fire and life-safety requirements for the apartment fit-out.",
      },
      {
        question: "What does the client need to provide for this DM & DCD approval?",
        answer:
          "The client provides the existing drawings, documents and green files, and the building management NOC where required. Wasleen prepares the drawing set and handles the DM and DCD applications.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, a design revision or a failed inspection, and VAT is separate.",
      },
      {
        question: "What is the payment schedule for this DM & DCD approval quotation?",
        answer:
          "Payment is 50% in advance, 40% during work progress and 10% after completion, as stated in quotation LML/QTN/1075.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 13 April 2026 for AED 12,000; the approval scope is engaged and the final approval is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/dm-dcd-approval-dubai-marina-apartment/hero.webp",
        alt: "Blueprint drawing of an apartment fit-out for DM and DCD approval in Dubai Marina",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/dm-dcd-approval-dubai-marina-apartment/documents.webp",
        alt: "Blueprint document checklist for DM and DCD approval of an apartment fit-out in Dubai Marina",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/interior-fit-out-approval-consultants-in-dubai.webp",
        alt: "Interior fit-out approval consultants in Dubai reviewing an apartment fit-out design",
        caption: "DM & DCD interior fit-out approval consultants in Dubai",
        width: 2336,
        height: 1760,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "dubai-municipality-noc",
      "dubai-civil-defense-approval",
      "mep-approval",
      "dubai-municipality-completion-certificate",
    ],
    relatedGuideSlugs: [
      "interior-fit-out-permit-process",
      "dcd-fire-safety-approval-documents",
      "cad-drawing-standards-dubai-guide",
      "as-built-drawing-requirements",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "business-center-dda-dcd-approval",
      "fire-fighting-dcd-approval-al-quoz",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-04-13",
    lastUpdated: "2026-09-02",
    publishStatus: "live",
  },
  {
    slug: "dda-approval-dubai-contracting-renovation",
    projectTitle: "DDA Approval for a Contracting & Renovation Project in Dubai",
    seoTitle: "DDA Approval Case Study in Dubai",
    description:
      "AED 7,000 DDA approval for a contracting and renovation project in Dubai: drawings, design approval, inspection and completion certificate. Get a free quote today.",
    sourceRef: "LML/QTN/1078",
    consentGranted: false,
    clientLabel: "Confidential client — Contracting & renovation company",
    projectStatus: "quoted",
    authorities: ["DDA"],
    primaryApprovalSlug: "dda-approval",
    projectType: "Contracting & renovation DDA approval",
    location: "Dubai",
    sector: "Residential",
    directAnswer:
      "This case study covers the quoted DDA approval for a contracting and renovation project in Dubai. The AED 7,000 quotation from LML/QTN/1078 covers preparing the drawings as per DDA regulation, obtaining design approval from the Dubai Development Authority (DDA), and conducting the inspection that releases the completion certificate. The quotation was issued on 16 April 2026 and the approval scope is engaged but not yet claimed.",
    stats: [
      { label: "Authorities", value: "DDA" },
      { label: "Quoted fee", value: "AED 7,000" },
      { label: "Scope", value: "Drawings, approval & inspection" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "A contracting and renovation company working across Dubai needed a Dubai Development Authority (DDA) approval for its project, quoted in LML/QTN/1078. Where works fall under DDA jurisdiction, the drawings must be prepared as per DDA regulation so the design approval and the final inspection both pass before the completion certificate can be released.\n\nThe quotation's limiting conditions define where the fee stays final: the client supplies the existing drawings, documents and green files; exceptional approval requirements, a design revision or a failed inspection each carry an additional charge; and if DDA require the submission through a contracting company licence, the price may differ. Confirming those inputs at the start is what protects the quoted AED 7,000 fee.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and drawing review",
        description:
          "Review the existing drawings, documents and green files supplied by the client, and confirm the scope and condition of the renovation works.",
      },
      {
        step: 2,
        title: "Prepare drawings as per DDA regulation",
        description:
          "Prepare the drawing set so it meets Dubai Development Authority regulation in a single submission.",
      },
      {
        step: 3,
        title: "Obtain design approval from DDA",
        description:
          "Submit the drawing set and supporting documents to the DDA, and follow up until design approval is obtained.",
      },
      {
        step: 4,
        title: "Confirm the contracting company licence requirement",
        description:
          "Check with DDA whether the submission must go through a contracting company licence, and flag any price change before it affects the quoted fee.",
      },
      {
        step: 5,
        title: "Conduct inspection with DDA",
        description:
          "Arrange and attend the DDA inspection of the renovation works, and resolve any findings so the inspection passes.",
      },
      {
        step: 6,
        title: "Release the completion certificate",
        description:
          "Once the inspection passes, finalise the DDA documentation and release the completion certificate.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1078 issued on 16 April 2026 for DDA approval at AED 7,000.",
        state: "approved",
        date: "2026-04-16",
      },
      {
        title: "Drawing review",
        detail:
          "Review the existing drawings, documents and green files supplied by the client.",
        state: "pending",
      },
      {
        title: "Drawings prepared",
        detail: "Drawing set prepared as per DDA regulation.",
        state: "pending",
      },
      {
        title: "Design approval",
        detail: "Design approval to be obtained from the Dubai Development Authority.",
        state: "pending",
      },
      {
        title: "Inspection",
        detail: "DDA inspection to be conducted once the drawings are approved.",
        state: "pending",
      },
      {
        title: "Completion",
        detail: "Completion certificate to be released after the inspection passes.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Trade licence",
        description: "Client's valid trade licence.",
        providedBy: "client",
      },
      {
        document: "Title deed or tenancy",
        description: "Title deed or tenancy evidence for the property in Dubai.",
        providedBy: "client",
      },
      {
        document: "Existing drawings and green files",
        description:
          "Existing drawings, documents and green files required by DDA.",
        providedBy: "client",
      },
      {
        document: "Contracting company licence",
        description:
          "Contracting company licence where DDA require the submission through the contractor.",
        providedBy: "client",
      },
      {
        document: "Renovation drawing set",
        description: "Renovation drawings prepared as per DDA regulation.",
        providedBy: "wasleen",
      },
      {
        document: "DDA applications",
        description:
          "Design approval and inspection applications submitted to the Dubai Development Authority.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "16 April 2026",
      },
      {
        stage: "Site visit & drawings",
        planned: "Weeks 1–2",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
      {
        stage: "Design approval (DDA)",
        planned: "Weeks 3–5",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
      {
        stage: "Inspection",
        planned: "Week 6",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
      {
        stage: "Completion certificate",
        planned: "Week 7",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
    ],
    quotedFee: "AED 7,000",
    feeAmountAED: 7000,
    feeIncluded: [
      "Preparing drawings as per DDA regulation",
      "Obtaining design approval from DDA",
      "Conducting inspection from DDA, releasing completion certificate",
    ],
    proTips: [
      {
        title: "Supply complete drawings to keep the AED 7,000 fee final",
        body: "The limiting conditions charge additional for exceptional approval requirements, a design revision or a failed inspection. Confirming the existing drawings, documents and green files up front protects the quoted price.",
      },
      {
        title: "Confirm the contracting company licence requirement early",
        body: "The quotation notes that if DDA require submission through a contracting company licence, the price may differ. Checking this before approval starts avoids a surprise change to the fee.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 7,000" },
      { label: "Approval authority", value: "Dubai Development Authority (DDA)" },
      { label: "Scope", value: "Drawings, approval & inspection" },
    ],
    faqs: [
      {
        question: "What does the AED 7,000 quotation cover for this Dubai DDA approval?",
        answer:
          "It covers preparing the drawings as per DDA regulation, obtaining design approval from the Dubai Development Authority (DDA), and conducting the inspection that releases the completion certificate.",
      },
      {
        question: "Which authority is involved in this contracting and renovation approval?",
        answer:
          "The Dubai Development Authority (DDA), which reviews the design approval and conducts the inspection before the completion certificate is released.",
      },
      {
        question: "What does the client need to provide for this DDA approval?",
        answer:
          "The client provides the existing drawings, documents and green files, and the contracting company licence where DDA require the submission through the contractor. Wasleen prepares the drawing set and handles the DDA applications.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, a design revision or a failed inspection, and if DDA require the submission through a contracting company licence the price may differ.",
      },
      {
        question: "What is the payment schedule for this DDA approval quotation?",
        answer:
          "Payment is 50% in advance, 40% during work progress and 10% after completion, as stated in quotation LML/QTN/1078.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 16 April 2026 for AED 7,000; the approval scope is engaged and the final approval is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/dda-approval-dubai-contracting-renovation/hero.webp",
        alt: "Blueprint drawing for a DDA approval of a contracting and renovation project in Dubai",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/dda-approval-dubai-contracting-renovation/documents.webp",
        alt: "Blueprint document checklist for a DDA approval of a contracting and renovation project in Dubai",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/dda-fit-out-approval-engineering.webp",
        alt: "DDA fit-out approval engineering drawings for a contracting and renovation project in Dubai",
        caption: "DDA approval drawings and engineering in Dubai",
        width: 1376,
        height: 768,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "dubai-municipality-noc",
      "community-approval",
      "dubai-municipality-completion-certificate",
    ],
    relatedGuideSlugs: [
      "interior-fit-out-permit-process",
      "cad-drawing-standards-dubai-guide",
      "as-built-drawing-requirements",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "business-center-dda-dcd-approval",
      "dda-approval-alma-arabian-ranches",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-04-16",
    lastUpdated: "2026-09-02",
    publishStatus: "live",
  },
  {
    slug: "dm-approval-dubai-real-estate-company",
    projectTitle: "DM Approval for a Real Estate Company Project in Dubai",
    seoTitle: "DM Approval Case Study in Dubai",
    description:
      "AED 12,000 DM approval for a real estate company project in Dubai: drawings, design approval, inspection and completion certificate. Get a free quote today.",
    sourceRef: "LML/QTN/1081",
    consentGranted: false,
    clientLabel: "Confidential client — Real estate company",
    projectStatus: "quoted",
    authorities: ["Dubai Municipality"],
    primaryApprovalSlug: "dubai-municipality-building-permit",
    projectType: "DM building approval",
    location: "Dubai",
    sector: "Commercial",
    directAnswer:
      "This case study covers the quoted Dubai Municipality (DM) approval for a real estate company project in Dubai. The AED 12,000 quotation from LML/QTN/1081 covers preparing the drawings as per DM regulation, obtaining design approval from Dubai Municipality, and conducting the inspection that releases the completion certificate. The quotation was issued on 22 April 2026 and the approval scope is engaged but not yet claimed.",
    stats: [
      { label: "Authorities", value: "DM" },
      { label: "Quoted fee", value: "AED 12,000" },
      { label: "Scope", value: "Drawings, approval & inspection" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "A real estate company operating in Dubai needed a Dubai Municipality (DM) approval for one of its projects, quoted in LML/QTN/1081. Before work can begin, the drawings must be prepared as per DM regulation so the design approval and the final inspection both pass, and the completion certificate can then be released.\n\nThe quotation's limiting conditions define where the fee stays final: the client supplies the existing drawings, documents and green files; exceptional approval requirements, a design revision or a failed inspection each carry an additional charge; and VAT is separate. Confirming those inputs at the start is what protects the quoted AED 12,000 fee.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and drawing review",
        description:
          "Review the existing drawings, documents and green files supplied by the client, and confirm the scope and condition of the works.",
      },
      {
        step: 2,
        title: "Prepare drawings as per DM regulation",
        description:
          "Prepare the drawing set so it meets Dubai Municipality regulation in a single submission.",
      },
      {
        step: 3,
        title: "Obtain design approval from DM",
        description:
          "Submit the drawing set and supporting documents to Dubai Municipality, and follow up until design approval is obtained.",
      },
      {
        step: 4,
        title: "Coordinate the property documentation",
        description:
          "Liaise with the property owner or management on the ownership and NOC requirements, and flag any price change before it affects the quoted fee.",
      },
      {
        step: 5,
        title: "Conduct inspection with DM",
        description:
          "Arrange and attend the DM inspection of the works, and resolve any findings so the inspection passes.",
      },
      {
        step: 6,
        title: "Release the completion certificate",
        description:
          "Once the inspection passes, finalise the Dubai Municipality documentation and release the completion certificate.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1081 issued on 22 April 2026 for DM approval at AED 12,000.",
        state: "approved",
        date: "2026-04-22",
      },
      {
        title: "Drawing review",
        detail:
          "Review the existing drawings, documents and green files supplied by the client.",
        state: "pending",
      },
      {
        title: "Drawings prepared",
        detail: "Drawing set prepared as per DM regulation.",
        state: "pending",
      },
      {
        title: "Design approval",
        detail: "Design approval to be obtained from Dubai Municipality.",
        state: "pending",
      },
      {
        title: "Inspection",
        detail: "DM inspection to be conducted once the drawings are approved.",
        state: "pending",
      },
      {
        title: "Completion",
        detail: "Completion certificate to be released after the inspection passes.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Trade licence",
        description: "Client's valid trade licence.",
        providedBy: "client",
      },
      {
        document: "Title deed or tenancy",
        description: "Title deed or tenancy evidence for the property in Dubai.",
        providedBy: "client",
      },
      {
        document: "Existing drawings and green files",
        description:
          "Existing drawings, documents and green files required by DM.",
        providedBy: "client",
      },
      {
        document: "Property NOC",
        description:
          "No-objection certificate from the property owner or management where required.",
        providedBy: "client",
      },
      {
        document: "Project drawing set",
        description: "Drawings prepared as per DM regulation.",
        providedBy: "wasleen",
      },
      {
        document: "DM applications",
        description:
          "Design approval and inspection applications submitted to Dubai Municipality.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "22 April 2026",
      },
      {
        stage: "Site visit & drawings",
        planned: "Weeks 1–2",
        actual: "—",
        note: "Indicative — typical DM timelines",
      },
      {
        stage: "Design approval (DM)",
        planned: "Weeks 3–5",
        actual: "—",
        note: "Indicative — typical DM timelines",
      },
      {
        stage: "Inspection",
        planned: "Week 6",
        actual: "—",
        note: "Indicative — typical DM timelines",
      },
      {
        stage: "Completion certificate",
        planned: "Week 7",
        actual: "—",
        note: "Indicative — typical DM timelines",
      },
    ],
    quotedFee: "AED 12,000",
    feeAmountAED: 12000,
    feeIncluded: [
      "Preparing drawings as per DM regulation",
      "Obtaining design approval from DM",
      "Conducting inspection from DM, releasing completion certificate",
    ],
    proTips: [
      {
        title: "Supply complete drawings to keep the AED 12,000 fee final",
        body: "The limiting conditions charge additional for exceptional approval requirements, a design revision or a failed inspection. Confirming the existing drawings, documents and green files up front protects the quoted price.",
      },
      {
        title: "Budget VAT separately — it is not in the quotation",
        body: "The limiting conditions state VAT will be separate, so the AED 12,000 professional fee stays predictable and you can plan the total budget accurately.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 12,000" },
      { label: "Approval authority", value: "Dubai Municipality (DM)" },
      { label: "Scope", value: "Drawings, approval & inspection" },
    ],
    faqs: [
      {
        question: "What does the AED 12,000 quotation cover for this Dubai DM approval?",
        answer:
          "It covers preparing the drawings as per Dubai Municipality regulation, obtaining design approval from Dubai Municipality (DM), and conducting the inspection that releases the completion certificate.",
      },
      {
        question: "Which authority is involved in this real estate company project approval?",
        answer:
          "Dubai Municipality (DM), which reviews the design approval and conducts the inspection before the completion certificate is released.",
      },
      {
        question: "What does the client need to provide for this DM approval?",
        answer:
          "The client provides the existing drawings, documents and green files, and the property owner or management NOC where required. Wasleen prepares the drawing set and handles the DM applications.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, a design revision or a failed inspection, and VAT is separate.",
      },
      {
        question: "What is the payment schedule for this DM approval quotation?",
        answer:
          "Payment is 50% in advance, 40% during work progress and 10% after completion, as stated in quotation LML/QTN/1081.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 22 April 2026 for AED 12,000; the approval scope is engaged and the final approval is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/dm-approval-dubai-real-estate-company/hero.webp",
        alt: "Blueprint drawing for a DM approval of a real estate company project in Dubai",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/dm-approval-dubai-real-estate-company/documents.webp",
        alt: "Blueprint document checklist for a DM approval of a real estate company project in Dubai",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/interior-approvals-dubai-muncipality-consultants.webp",
        alt: "Interior approvals with Dubai Municipality consultants for a real estate company project in Dubai",
        caption: "Dubai Municipality interior approvals for a real estate project",
        width: 2336,
        height: 1760,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "dubai-municipality-noc",
      "mep-approval",
      "dubai-municipality-completion-certificate",
    ],
    relatedGuideSlugs: [
      "interior-fit-out-permit-process",
      "cad-drawing-standards-dubai-guide",
      "as-built-drawing-requirements",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "business-center-dda-dcd-approval",
      "dm-dcd-approval-dubai-marina-apartment",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-04-22",
    lastUpdated: "2026-09-02",
    publishStatus: "live",
  },
  {
    slug: "dda-dcd-food-safety-approval-cafe",
    projectTitle: "DDA, DCD & Food Safety Approval for a Café in Dubai",
    seoTitle: "DDA, DCD & Food Safety Case Study",
    description:
      "AED 6,000 DDA, DCD and food safety approval for a café in Dubai: layout drawings, design approval, inspection and food safety clearance. Get a free quote today.",
    sourceRef: "LML/QTN/1083",
    consentGranted: false,
    clientLabel: "Confidential client — Café & restaurant company",
    projectStatus: "quoted",
    authorities: ["DDA", "Dubai Civil Defence", "Dubai Municipality"],
    primaryApprovalSlug: "dda-approval",
    projectType: "Café & restaurant approval (DDA, DCD & Food Safety)",
    location: "Dubai",
    sector: "Hospitality",
    directAnswer:
      "This case study covers the quoted DDA, DCD and food safety approval for a café and restaurant in Dubai. The AED 6,000 quotation from LML/QTN/1083 covers preparing drawings as per DDA and DCD regulation, obtaining design approval from both authorities, conducting the inspections that release the completion certificate, and obtaining the food safety approval through Dubai Municipality. The quotation was issued on 23 April 2026 and the approval scope is engaged but not yet claimed.",
    stats: [
      { label: "Authorities", value: "DDA, DCD & DM" },
      { label: "Quoted fee", value: "AED 6,000" },
      { label: "Scope", value: "Drawings, approvals & inspection" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "A café and restaurant company operating in Dubai needed DDA, DCD and food safety approval for its new outlet, quoted in LML/QTN/1083. The work spans two design authorities — Dubai Development Authority (DDA) for the community approval and Dubai Civil Defence (DCD) for fire safety — plus a separate food safety approval through Dubai Municipality. Because food service adds a second track on top of the fit-out approvals, the drawing set, the design submissions and the inspections all need to be coordinated so one approval does not hold up another.\n\nThe quotation's limiting conditions define where the fee stays final: the client supplies the existing drawings, documents and green files; exceptional approval requirements, a design revision or a failed inspection each carry an additional charge; and VAT is separate. Confirming those inputs at the start is what protects the quoted AED 6,000 fee.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and drawing review",
        description:
          "Review the existing drawings, documents and green files supplied by the client, and confirm the café layout and scope of the fit-out works.",
      },
      {
        step: 2,
        title: "Prepare drawings as per DDA and DCD regulation",
        description:
          "Prepare the drawing set, including the fire safety layouts, so it meets Dubai Development Authority and Dubai Civil Defence regulation.",
      },
      {
        step: 3,
        title: "Obtain design approval from DDA and DCD",
        description:
          "Submit the drawing set and supporting documents to both authorities, and follow up until design approval is obtained.",
      },
      {
        step: 4,
        title: "Prepare and submit the food safety layout",
        description:
          "Prepare the food safety layout drawings and submit them to Dubai Municipality for the food control approval.",
      },
      {
        step: 5,
        title: "Coordinate food safety revisions",
        description:
          "Coordinate any revisions raised by Dubai Municipality during the food safety review, and follow up to keep the approval moving.",
      },
      {
        step: 6,
        title: "Conduct inspection with DDA and DCD",
        description:
          "Arrange and attend the DDA and DCD inspections of the works, and resolve any findings so the inspections pass.",
      },
      {
        step: 7,
        title: "Release completion and food safety approvals",
        description:
          "Once the inspections pass, finalise the documentation and release the completion certificate and the food safety approval.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1083 issued on 23 April 2026 for DDA, DCD and food safety approval at AED 6,000.",
        state: "approved",
        date: "2026-04-23",
      },
      {
        title: "Drawing review",
        detail:
          "Review the existing drawings, documents and green files supplied by the client.",
        state: "pending",
      },
      {
        title: "Drawings prepared",
        detail: "Drawing set prepared as per DDA and DCD regulation.",
        state: "pending",
      },
      {
        title: "Design approvals",
        detail: "Design approval to be obtained from DDA and DCD.",
        state: "pending",
      },
      {
        title: "Food safety submission",
        detail:
          "Food safety layout to be submitted to Dubai Municipality and revisions coordinated.",
        state: "pending",
      },
      {
        title: "Inspections",
        detail: "DDA and DCD inspections to be conducted once the drawings are approved.",
        state: "pending",
      },
      {
        title: "Completion",
        detail:
          "Completion certificate and food safety approval to be released after the inspections pass.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Trade licence",
        description: "Client's valid trade licence.",
        providedBy: "client",
      },
      {
        document: "Tenancy contract or title deed",
        description: "Tenancy contract or title deed evidence for the café premises in Dubai.",
        providedBy: "client",
      },
      {
        document: "Existing drawings and green files",
        description:
          "Existing drawings, documents and green files required by DDA and DCD.",
        providedBy: "client",
      },
      {
        document: "Community NOC",
        description:
          "No-objection certificate from the community management where required.",
        providedBy: "client",
      },
      {
        document: "Café layout and food handling details",
        description:
          "Layout and food handling information needed for the food safety submission to Dubai Municipality.",
        providedBy: "client",
      },
      {
        document: "Project drawing set",
        description:
          "Drawings prepared as per DDA and DCD regulation, including fire safety layouts.",
        providedBy: "wasleen",
      },
      {
        document: "DDA, DCD and food safety applications",
        description:
          "Design approval and inspection applications to DDA and DCD, and the food safety layout submission to Dubai Municipality.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "23 April 2026",
      },
      {
        stage: "Site visit & drawings",
        planned: "Weeks 1–2",
        actual: "—",
        note: "Indicative — typical DDA, DCD & DM timelines",
      },
      {
        stage: "Design approvals (DDA & DCD)",
        planned: "Weeks 3–5",
        actual: "—",
        note: "Indicative — typical DDA, DCD & DM timelines",
      },
      {
        stage: "Food safety approval (DM)",
        planned: "Weeks 4–6",
        actual: "—",
        note: "Indicative — typical DDA, DCD & DM timelines",
      },
      {
        stage: "Inspections",
        planned: "Weeks 6–7",
        actual: "—",
        note: "Indicative — typical DDA, DCD & DM timelines",
      },
      {
        stage: "Completion certificate",
        planned: "Week 7–8",
        actual: "—",
        note: "Indicative — typical DDA, DCD & DM timelines",
      },
    ],
    quotedFee: "AED 6,000",
    feeAmountAED: 6000,
    feeIncluded: [
      "Preparing drawings as per DDA and DCD regulation",
      "Obtaining design approval from DDA and DCD",
      "Conducting inspection from DDA and DCD, releasing completion certificate",
      "Food safety approval: layout drawings, submission to Dubai Municipality, coordination for revisions, obtaining final approval",
    ],
    proTips: [
      {
        title: "Run the food safety track in parallel to save weeks",
        body: "The quotation covers the food safety layout and Dubai Municipality submission alongside the DDA and DCD fit-out approvals. Starting the food safety drawings with the main set keeps both tracks moving at once instead of one waiting on the other.",
      },
      {
        title: "Supply complete drawings to keep the AED 6,000 fee final",
        body: "The limiting conditions charge additional for exceptional approval requirements, a design revision or a failed inspection. Confirming the existing drawings, documents and green files up front protects the quoted price.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 6,000" },
      { label: "Approval authorities", value: "DDA, DCD & Dubai Municipality" },
      { label: "Scope", value: "Drawings, approvals & inspection" },
    ],
    faqs: [
      {
        question: "What does the AED 6,000 quotation cover for this café approval in Dubai?",
        answer:
          "It covers preparing the drawings as per Dubai Development Authority (DDA) and Dubai Civil Defence (DCD) regulation, obtaining design approval from both authorities, conducting the inspections that release the completion certificate, and obtaining the food safety approval through Dubai Municipality.",
      },
      {
        question: "Which authorities are involved in this café and restaurant approval?",
        answer:
          "Dubai Development Authority (DDA) and Dubai Civil Defence (DCD) review the design approvals and inspections, and Dubai Municipality handles the food safety approval for the food service layout.",
      },
      {
        question: "What does the client need to provide for this DDA, DCD and food safety approval?",
        answer:
          "The client provides the existing drawings, documents and green files, the community NOC where required, and the café layout and food handling details. Wasleen prepares the drawing set, makes the DDA and DCD applications and submits the food safety layout to Dubai Municipality.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, a design revision or a failed inspection, and VAT is separate.",
      },
      {
        question: "What is the payment schedule for this DDA, DCD and food safety quotation?",
        answer:
          "Payment is 50% in advance, 40% during work progress and 10% after completion, as stated in quotation LML/QTN/1083.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 23 April 2026 for AED 6,000; the approval scope is engaged and the final approval is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/dda-dcd-food-safety-approval-cafe/hero.webp",
        alt: "Blueprint drawing for a DDA, DCD and food safety approval of a café project in Dubai",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/dda-dcd-food-safety-approval-cafe/documents.webp",
        alt: "Blueprint document checklist for a DDA, DCD and food safety approval of a café project in Dubai",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/restaurant-food-business-approval-dubai.webp",
        alt: "Restaurant and food business approval with Dubai Municipality for a café project in Dubai",
        caption: "Dubai Municipality food business approval for a café",
        width: 1376,
        height: 768,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "food-control-department-approval",
      "dubai-civil-defense-approval",
      "dubai-municipality-completion-certificate",
    ],
    relatedGuideSlugs: [
      "dubai-food-control-approval-guide",
      "dcd-fire-safety-approval-documents",
      "interior-fit-out-permit-process",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "business-center-dda-dcd-approval",
      "dda-approval-alma-arabian-ranches",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-04-23",
    lastUpdated: "2026-09-02",
    publishStatus: "live",
  },
  {
    slug: "dm-dcd-approval-technical-services-company",
    projectTitle: "DM & DCD Approval for a Technical Services Company in Dubai",
    seoTitle: "DM & DCD Approval Case Study",
    description:
      "AED 42,000 DM & DCD approval for a technical services company in Dubai: documents, approvals, work permit and completion certificates. Get a free quote today.",
    sourceRef: "LML/QTN/1084",
    consentGranted: false,
    clientLabel: "Confidential client — Technical services company",
    projectStatus: "quoted",
    authorities: ["Dubai Municipality", "Dubai Civil Defence"],
    primaryApprovalSlug: "dubai-municipality-building-permit",
    projectType: "DM & DCD approval through consultant and contractor",
    location: "Dubai",
    sector: "Commercial",
    directAnswer:
      "This case study covers the quoted Dubai Municipality (DM) and Dubai Civil Defence (DCD) approval for a technical services company project in Dubai, delivered through the consultant and the main contractor. The AED 42,000 quotation from LML/QTN/1084 covers collecting the documents and as-built drawings, obtaining DM design approval and the DM work permit, obtaining DCD design approval, and conducting the DM and DCD final inspections that release the completion certificates. The quotation was issued on 24 April 2026 and the approval scope is engaged but not yet claimed.",
    stats: [
      { label: "Authorities", value: "DM & DCD" },
      { label: "Quoted fee", value: "AED 42,000" },
      { label: "Scope", value: "Approvals, work permit & inspection" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "A technical services company in Dubai needed DM and DCD approval for its project, quoted in LML/QTN/1084 and delivered through the consultant and the main contractor. The quotation is split into two phases: the first covers collecting the documents and as-built drawings, confirming the client design approval and obtaining DM design approval through the consultant; the second assigns the main contractor for the work permit, obtains the DM work permit and the DCD design approval, runs the pre-inspection that releases the consultant NOC, and closes with the DM and DCD final inspection that releases the completion certificates. Because the work permit and the contractor assignment sit between the design and the final approval, each step has to clear before the next can start.\n\nThe quotation's limiting conditions define where the fee stays final: the client supplies the existing drawings, documents and green files; exceptional approval requirements, a design revision or a failed inspection each carry an additional charge; and VAT is separate. Confirming those inputs at the start is what protects the quoted AED 42,000 fee.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and document collection",
        description:
          "Collect the existing drawings, documents and as-built drawings based on the site condition, and confirm the scope of the works with the client.",
      },
      {
        step: 2,
        title: "Prepare drawings as per DM and DCD regulation",
        description:
          "Prepare or compile the drawing set and as-built drawings so they meet Dubai Municipality and Dubai Civil Defence regulation.",
      },
      {
        step: 3,
        title: "Obtain DM design approval through the consultant",
        description:
          "Submit through the consultant for design approval and follow up until DM design approval is obtained.",
      },
      {
        step: 4,
        title: "Assign the main contractor for the work permit",
        description:
          "Assign the main contractor and prepare the work permit application for Dubai Municipality.",
      },
      {
        step: 5,
        title: "Obtain the DM work permit",
        description:
          "Obtain the DM work permit through the contractor and consultant.",
      },
      {
        step: 6,
        title: "Obtain DCD design approval",
        description:
          "Submit to Dubai Civil Defence and obtain the DCD design approval for fire safety.",
      },
      {
        step: 7,
        title: "Conduct the pre-inspection and final inspection",
        description:
          "Run the pre-inspection, release the consultant NOC, collect the final inspection documents, and conduct the DM and DCD final inspection.",
      },
      {
        step: 8,
        title: "Release the completion certificates",
        description:
          "Once the final inspection is approved, release the DM and DCD completion certificates.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1084 issued on 24 April 2026 for DM and DCD approval at AED 42,000.",
        state: "approved",
        date: "2026-04-24",
      },
      {
        title: "Document & drawing collection",
        detail:
          "Collect the existing drawings, documents and as-built drawings based on the site condition.",
        state: "pending",
      },
      {
        title: "DM design approval",
        detail: "Design approval to be obtained from Dubai Municipality through the consultant.",
        state: "pending",
      },
      {
        title: "Work permit",
        detail: "DM work permit to be obtained through the main contractor and consultant.",
        state: "pending",
      },
      {
        title: "DCD design approval",
        detail: "DCD design approval to be obtained from Dubai Civil Defence.",
        state: "pending",
      },
      {
        title: "Pre-inspection & NOC",
        detail: "Pre-inspection to be conducted and the consultant NOC released for the final inspection.",
        state: "pending",
      },
      {
        title: "Final inspection",
        detail: "DM and DCD final inspection to be conducted once the drawings are approved.",
        state: "pending",
      },
      {
        title: "Completion",
        detail: "DM and DCD completion certificates to be released after the inspection is approved.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Trade licence",
        description: "Client's valid trade licence.",
        providedBy: "client",
      },
      {
        document: "Title deed or tenancy",
        description: "Title deed or tenancy evidence for the property in Dubai.",
        providedBy: "client",
      },
      {
        document: "Existing drawings and green files",
        description:
          "Existing drawings, documents and green files required by DM and DCD.",
        providedBy: "client",
      },
      {
        document: "Client design approval",
        description:
          "Approval of the design by the client before the DM submission.",
        providedBy: "client",
      },
      {
        document: "As-built drawings",
        description:
          "As-built drawings prepared or collected based on the site condition.",
        providedBy: "wasleen",
      },
      {
        document: "Main contractor assignment",
        description:
          "Main contractor assigned and registered for the DM work permit application.",
        providedBy: "client",
      },
      {
        document: "DM and DCD applications",
        description:
          "Design approval, work permit and inspection applications submitted to DM and DCD.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "24 April 2026",
      },
      {
        stage: "Documents & drawings",
        planned: "Weeks 1–2",
        actual: "—",
        note: "Indicative — typical DM & DCD timelines",
      },
      {
        stage: "DM design approval",
        planned: "Weeks 3–5",
        actual: "—",
        note: "Indicative — typical DM & DCD timelines",
      },
      {
        stage: "DM work permit",
        planned: "Weeks 5–6",
        actual: "—",
        note: "Indicative — typical DM & DCD timelines",
      },
      {
        stage: "DCD design approval",
        planned: "Weeks 4–6",
        actual: "—",
        note: "Indicative — typical DM & DCD timelines",
      },
      {
        stage: "Pre-inspection & NOC",
        planned: "Week 6",
        actual: "—",
        note: "Indicative — typical DM & DCD timelines",
      },
      {
        stage: "Final inspection & certificates",
        planned: "Weeks 7–8",
        actual: "—",
        note: "Indicative — typical DM & DCD timelines",
      },
    ],
    quotedFee: "AED 42,000",
    feeAmountAED: 42000,
    feeIncluded: [
      "Preparing or collecting documents and as-built drawings for DM and DCD submission",
      "Obtaining DM design approval through the consultant",
      "Assigning the main contractor and obtaining the DM work permit",
      "Obtaining DCD design approval",
      "Conducting the pre-inspection and releasing the consultant NOC for the final inspection",
      "Conducting the DM and DCD final inspection and releasing the completion certificates",
    ],
    proTips: [
      {
        title: "Book the contractor assignment before the work permit",
        body: "The quotation assigns the main contractor before the DM work permit is obtained, and the work permit must clear before the DCD design approval and final inspection can run. Confirming the contractor early keeps the whole sequence moving.",
      },
      {
        title: "Supply complete documents to keep the AED 42,000 fee final",
        body: "The limiting conditions charge additional for exceptional approval requirements, a design revision or a failed inspection. Confirming the existing drawings, documents and green files up front protects the quoted price.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 42,000" },
      { label: "Approval authorities", value: "Dubai Municipality & Dubai Civil Defence" },
      { label: "Scope", value: "Approvals, work permit & inspection" },
    ],
    faqs: [
      {
        question: "What does the AED 42,000 quotation cover for this DM and DCD approval?",
        answer:
          "It covers preparing or collecting the documents and as-built drawings, obtaining DM design approval through the consultant, assigning the main contractor and obtaining the DM work permit, obtaining DCD design approval, and conducting the DM and DCD final inspection that releases the completion certificates.",
      },
      {
        question: "Which authorities are involved in this technical services project approval?",
        answer:
          "Dubai Municipality (DM) handles the design approval, work permit and completion certificate, and Dubai Civil Defence (DCD) reviews the fire safety design and joins the final inspection.",
      },
      {
        question: "How is the AED 42,000 quotation structured?",
        answer:
          "The quotation is split into two phases: AED 24,000 for the documents, as-built drawings and DM design approval, and AED 18,000 for the work permit, DCD design approval, pre-inspection and final inspection that releases the completion certificates.",
      },
      {
        question: "What does the client need to provide for this DM and DCD approval?",
        answer:
          "The client provides the existing drawings, documents and green files, approves the design, and assigns the main contractor for the work permit. Wasleen prepares the drawing set, coordinates the consultant submissions and handles the DM and DCD applications.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, a design revision or a failed inspection, and VAT is separate.",
      },
      {
        question: "What is the payment schedule for this DM and DCD quotation?",
        answer:
          "Payment is 50% in advance, 40% during work progress and 10% after completion, as stated in quotation LML/QTN/1084.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 24 April 2026 for AED 42,000; the approval scope is engaged and the final approval is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/dm-dcd-approval-technical-services-company/hero.webp",
        alt: "Blueprint drawing for a DM and DCD approval of a technical services company project in Dubai",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/dm-dcd-approval-technical-services-company/documents.webp",
        alt: "Blueprint document checklist for a DM and DCD approval of a technical services company project in Dubai",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/dm-building-permit-dubai-municipality.webp",
        alt: "Dubai Municipality building permit approval documents for a technical services company project in Dubai",
        caption: "Dubai Municipality building permit approval for a technical services project",
        width: 1200,
        height: 896,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "dubai-civil-defense-approval",
      "dubai-municipality-noc",
      "dubai-municipality-completion-certificate",
    ],
    relatedGuideSlugs: [
      "how-long-does-dm-building-permit-take",
      "dcd-fire-safety-approval-documents",
      "interior-fit-out-permit-process",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "dm-approval-dubai-real-estate-company",
      "dm-dcd-approval-dubai-marina-apartment",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-04-24",
    lastUpdated: "2026-09-02",
    publishStatus: "live",
  },
  {
    slug: "dewa-load-schedule-request-dubai",
    projectTitle: "DEWA Load Schedule Request for a Technical Services Company in Dubai",
    seoTitle: "DEWA Load Schedule Request Case Study",
    description:
      "AED 1,200 DEWA load schedule request for a technical services company in Dubai: documents, submission and follow-up. Get a free quote today.",
    sourceRef: "LML/QTN/1087",
    consentGranted: false,
    clientLabel: "Confidential client — Technical services company",
    projectStatus: "quoted",
    authorities: ["DEWA"],
    primaryApprovalSlug: "dewa-load-enhancement",
    projectType: "DEWA existing load schedule request",
    location: "Dubai",
    sector: "Commercial",
    directAnswer:
      "This case study covers the quoted request for an existing load schedule with Dubai Electricity and Water Authority (DEWA) for a technical services company project in Dubai. The AED 1,200 quotation from LML/QTN/1087 covers preparing and submitting the request for the existing load schedule and following up with DEWA until the schedule is issued. The quotation was issued on 27 April 2026 and the load schedule request is engaged but not yet delivered.",
    stats: [
      { label: "Authority", value: "DEWA" },
      { label: "Quoted fee", value: "AED 1,200" },
      { label: "Scope", value: "Load schedule request" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "A technical services company in Dubai needed the existing load schedule for its premises from Dubai Electricity and Water Authority (DEWA), quoted in LML/QTN/1087. The existing load schedule records the connected load on the DEWA account and is the baseline DEWA uses before any change in the electrical load, such as a load enhancement, a meter change or a new connection, can be processed. The AED 1,200 professional fee covers preparing the request for the existing load schedule based on the client's drawings, documents and approved drawings, submitting it to DEWA and following up until the schedule is issued.\n\nThe quotation keeps the fee final with clear limits: the client supplies the existing drawings, documents and approved drawings; a design revision or an authority approval after the first approval carries an additional charge; and third-party services, authority submission payments and insurance are excluded from the fee.",
    solutionSteps: [
      {
        step: 1,
        title: "Collect the required documents",
        description:
          "Collect the existing drawings, documents and approved drawings that the client provides for the load schedule request.",
      },
      {
        step: 2,
        title: "Prepare and submit the load schedule request",
        description:
          "Prepare the request for the existing load schedule and submit it to Dubai Electricity and Water Authority on the client's behalf.",
      },
      {
        step: 3,
        title: "Follow up and deliver the load schedule",
        description:
          "Follow up with DEWA until the existing load schedule is issued and deliver the issued schedule to the client.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1087 issued on 27 April 2026 for the DEWA load schedule request at AED 1,200.",
        state: "approved",
        date: "2026-04-27",
      },
      {
        title: "Document collection",
        detail:
          "Collect the existing drawings, documents and approved drawings required for the load schedule request.",
        state: "pending",
      },
      {
        title: "Load schedule request",
        detail: "Prepare and submit the request for the existing load schedule to DEWA.",
        state: "pending",
      },
      {
        title: "Load schedule issued",
        detail:
          "Follow up with DEWA until the existing load schedule is issued and deliver it to the client.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Existing drawings and approved drawings",
        description:
          "Existing drawings, documents and approved drawings that the client provides for the load schedule request.",
        providedBy: "client",
      },
      {
        document: "Load schedule request",
        description:
          "Request for the existing load schedule prepared based on the client's drawings and documents.",
        providedBy: "wasleen",
      },
      {
        document: "DEWA submission and follow-up",
        description:
          "Submission to Dubai Electricity and Water Authority and follow-up until the load schedule is issued.",
        providedBy: "wasleen",
      },
      {
        document: "Issued load schedule",
        description:
          "Existing load schedule issued by DEWA and delivered to the client.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "27 April 2026",
      },
      {
        stage: "Document collection",
        planned: "Days 1–2",
        actual: "—",
        note: "Indicative — typical DEWA timelines",
      },
      {
        stage: "Load schedule request",
        planned: "Days 2–5",
        actual: "—",
        note: "Indicative — typical DEWA timelines",
      },
      {
        stage: "Load schedule issued",
        planned: "Days 5–7",
        actual: "—",
        note: "Indicative — typical DEWA timelines",
      },
    ],
    quotedFee: "AED 1,200",
    feeAmountAED: 1200,
    feeIncluded: [
      "Preparing the request for the existing load schedule based on the client's drawings, documents and approved drawings",
      "Submitting the load schedule request to Dubai Electricity and Water Authority",
      "Following up with DEWA until the existing load schedule is issued",
      "Delivering the issued existing load schedule to the client",
    ],
    proTips: [
      {
        title: "Order the load schedule before any change in electrical load",
        body: "The existing load schedule is the baseline DEWA uses before a load enhancement, a meter change or a new connection. Ordering it early lets you plan the next DEWA step without waiting.",
      },
      {
        title: "Confirm the documents to keep the AED 1,200 fee final",
        body: "The quotation keeps the fee final when the client provides the existing drawings, documents and approved drawings. Confirming those inputs up front protects the quoted price.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 1,200" },
      { label: "Approval authority", value: "Dubai Electricity & Water Authority (DEWA)" },
      { label: "Scope", value: "Existing load schedule request" },
    ],
    faqs: [
      {
        question: "What does the AED 1,200 quotation cover for this DEWA load schedule request?",
        answer:
          "It covers preparing and submitting the request for the existing load schedule based on the client's drawings, documents and approved drawings, and following up with DEWA until the existing load schedule is issued.",
      },
      {
        question: "Which authority issues the existing load schedule?",
        answer:
          "Dubai Electricity and Water Authority (DEWA) issues the existing load schedule for the premises in Dubai.",
      },
      {
        question: "What does the client need to provide for the load schedule request?",
        answer:
          "The client provides the existing drawings, documents and approved drawings that DEWA requires for the load schedule request.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for a design revision or an authority approval after the first approval, and third-party services, authority submission payments and insurance are excluded from the fee.",
      },
      {
        question: "What is the payment schedule for this DEWA quotation?",
        answer:
          "Payment is 100% in advance plus 5% VAT, payable by cheque to LIMINAL ARC INTERIORS LLC – DEWA, as stated in quotation LML/QTN/1087.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 27 April 2026 for AED 1,200; the load schedule request is engaged and the schedule is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/dewa-load-schedule-request-dubai/hero.webp",
        alt: "Blueprint drawing for a DEWA load schedule request for a technical services company project in Dubai",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/dewa-load-schedule-request-dubai/documents.webp",
        alt: "Blueprint document checklist for a DEWA load schedule request for a technical services company project in Dubai",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/dewa-electricity-connection-approval.webp",
        alt: "DEWA electricity connection approval process for a new property in Dubai",
        caption: "DEWA electricity connection approval process for a property in Dubai",
        width: 1376,
        height: 768,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "dewa-approval",
      "dewa-connection-noc",
      "dewa-meter-installation",
      "dewa-temporary-power-connection",
    ],
    relatedGuideSlugs: ["dewa-connection-process-guide", "dewa-meter-installation-steps"],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "dm-dcd-approval-technical-services-company",
      "business-center-dda-dcd-approval",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-04-27",
    lastUpdated: "2026-09-02",
    publishStatus: "live",
  },
  {
    slug: "dm-dcd-approval-warehouse-merging-dubai-investment-park",
    projectTitle: "DM & DCD Approval for Warehouse Merging in Dubai Investment Park",
    seoTitle: "Warehouse Merging Approval Case Study",
    description:
      "AED 16,000 DM & DCD approval to merge warehouses 16 and 17 in Dubai Investment Park: drawings, design approval and completion certificate. Get a free quote today.",
    sourceRef: "LML/QTN/1089",
    consentGranted: false,
    clientLabel: "Confidential client — Medical equipment and transportation trading companies",
    projectStatus: "quoted",
    authorities: ["Dubai Municipality", "Dubai Civil Defence"],
    primaryApprovalSlug: "dubai-municipality-building-permit",
    projectType: "DM & DCD approval for merging two warehouse units",
    location: "Dubai",
    sector: "Industrial",
    directAnswer:
      "This case study covers the quoted Dubai Municipality (DM) and Dubai Civil Defence (DCD) approval for merging Warehouse 16 and 17 in Dubai Investment Park Second, Dubai. The AED 16,000 quotation from LML/QTN/1089 covers preparing drawings as per DM and DCD regulation, obtaining design approval from DM and DCD, and conducting the DM and DCD inspection that releases the completion certificate. The quotation was issued on 29 April 2026 and the approval scope is engaged but not yet claimed.",
    stats: [
      { label: "Authorities", value: "DM & DCD" },
      { label: "Quoted fee", value: "AED 16,000" },
      { label: "Scope", value: "Merging two warehouses" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "Two companies in Dubai Investment Park Second needed approval from Dubai Municipality (DM) and Dubai Civil Defence (DCD) to merge Warehouse 16 and 17 into a single unit, quoted in LML/QTN/1089. Merging two warehouse units combines two approved spaces into one, so the revised layout and its fire safety design have to be re-approved by both authorities before the merged unit can be occupied. The AED 16,000 professional fee covers preparing drawings as per DM and DCD regulation, obtaining design approval from DM and DCD, and conducting the DM and DCD inspection that releases the completion certificate.\n\nThe quotation keeps the fee final with clear limits: the client supplies the existing drawings, documents and green files; exceptional approval requirements, an inspection failure or a design revision each carry an additional charge; and VAT is separate. Confirming the existing documents at the start is what protects the quoted AED 16,000 fee.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and document collection",
        description:
          "Collect the existing drawings, documents and green files based on the site condition and confirm the warehouse merging scope with the client.",
      },
      {
        step: 2,
        title: "Prepare drawings as per DM and DCD regulation",
        description:
          "Prepare the revised layout drawings for the merged warehouse so they meet Dubai Municipality and Dubai Civil Defence regulation.",
      },
      {
        step: 3,
        title: "Obtain design approval from DM and DCD",
        description:
          "Submit the revised drawings and obtain the design approval from Dubai Municipality and Dubai Civil Defence.",
      },
      {
        step: 4,
        title: "Conduct the DM and DCD inspection",
        description:
          "Coordinate the inspection from DM and DCD for the merged warehouse unit and address any inspection comments.",
      },
      {
        step: 5,
        title: "Release the completion certificate",
        description:
          "Once the inspection is approved, release the completion certificate for the merged warehouse unit.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1089 issued on 29 April 2026 for the DM and DCD warehouse merging approval at AED 16,000.",
        state: "approved",
        date: "2026-04-29",
      },
      {
        title: "Document & drawing collection",
        detail:
          "Collect the existing drawings, documents and green files based on the site condition.",
        state: "pending",
      },
      {
        title: "DM & DCD design approval",
        detail:
          "Prepare the revised warehouse layout drawings and obtain design approval from DM and DCD.",
        state: "pending",
      },
      {
        title: "DM & DCD inspection",
        detail:
          "Conduct the inspection from DM and DCD for the merged warehouse unit.",
        state: "pending",
      },
      {
        title: "Completion certificate",
        detail:
          "Release the completion certificate once the DM and DCD inspection is approved.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Existing drawings, documents and green files",
        description:
          "Existing drawings, documents and green files for Warehouse 16 and 17 provided by the client.",
        providedBy: "client",
      },
      {
        document: "Merged warehouse drawings",
        description:
          "Revised layout drawings for the merged warehouse prepared as per DM and DCD regulation.",
        providedBy: "wasleen",
      },
      {
        document: "DM and DCD design approval",
        description:
          "Design approval obtained from Dubai Municipality and Dubai Civil Defence for the merged unit.",
        providedBy: "wasleen",
      },
      {
        document: "DM and DCD inspection and completion certificate",
        description:
          "Inspection conducted by DM and DCD and the completion certificate released for the merged warehouse.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "29 April 2026",
      },
      {
        stage: "Documents & drawings",
        planned: "Weeks 1–2",
        actual: "—",
        note: "Indicative — typical DM & DCD timelines",
      },
      {
        stage: "DM & DCD design approval",
        planned: "Weeks 3–5",
        actual: "—",
        note: "Indicative — typical DM & DCD timelines",
      },
      {
        stage: "DM & DCD inspection",
        planned: "Weeks 5–6",
        actual: "—",
        note: "Indicative — typical DM & DCD timelines",
      },
      {
        stage: "Completion certificate",
        planned: "Weeks 6–7",
        actual: "—",
        note: "Indicative — typical DM & DCD timelines",
      },
    ],
    quotedFee: "AED 16,000",
    feeAmountAED: 16000,
    feeIncluded: [
      "Preparing drawings as per DM and DCD regulation for the merged warehouse",
      "Obtaining design approval from Dubai Municipality and Dubai Civil Defence",
      "Conducting the DM and DCD inspection for the merged warehouse unit",
      "Releasing the completion certificate once the inspection is approved",
    ],
    proTips: [
      {
        title: "Confirm the existing drawings before the merging approval",
        body: "The quotation keeps the AED 16,000 fee final when the client provides the existing drawings, documents and green files. Confirming those inputs up front protects the quoted price.",
      },
      {
        title: "Prepare the merged layout for both authorities together",
        body: "The revised warehouse layout is reviewed by DM for building compliance and by DCD for fire safety. Preparing the drawing set for both authorities at once avoids rework and keeps the approval moving.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 16,000" },
      { label: "Approval authorities", value: "Dubai Municipality & Dubai Civil Defence" },
      { label: "Scope", value: "Merging two warehouse units" },
    ],
    faqs: [
      {
        question: "What does the AED 16,000 quotation cover for this warehouse merging approval?",
        answer:
          "It covers preparing drawings as per DM and DCD regulation, obtaining design approval from Dubai Municipality and Dubai Civil Defence, and conducting the DM and DCD inspection that releases the completion certificate for the merged warehouse unit.",
      },
      {
        question: "Which authorities approve the warehouse merging?",
        answer:
          "Dubai Municipality (DM) reviews the revised building layout and issues the completion certificate, and Dubai Civil Defence (DCD) reviews the fire safety design and joins the inspection.",
      },
      {
        question: "Why does merging two warehouses need approval?",
        answer:
          "Merging Warehouse 16 and 17 combines two approved spaces into a single unit, so the revised layout and its fire safety design have to be re-approved by DM and DCD before the merged unit can be occupied.",
      },
      {
        question: "What does the client need to provide for this approval?",
        answer:
          "The client provides the existing drawings, documents and green files for Warehouse 16 and 17. Wasleen prepares the revised drawings, coordinates the DM and DCD submissions and conducts the inspection.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, an inspection failure or a design revision, and VAT is separate.",
      },
      {
        question: "What is the payment schedule for this DM and DCD quotation?",
        answer:
          "Payment is 50% in advance before starting the work, 40% during work progress and 10% after completion, as stated in quotation LML/QTN/1089.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 29 April 2026 for AED 16,000; the approval scope is engaged and the completion certificate is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/dm-dcd-approval-warehouse-merging-dubai-investment-park/hero.webp",
        alt: "Blueprint drawing for a DM and DCD approval merging two warehouse units in Dubai Investment Park",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/dm-dcd-approval-warehouse-merging-dubai-investment-park/documents.webp",
        alt: "Blueprint document checklist for a DM and DCD approval merging two warehouse units in Dubai Investment Park",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/warehouse-industrial-approval-dubai.webp",
        alt: "Warehouse industrial approval process with Dubai Municipality",
        caption: "DM and DCD approval for merging warehouse units in Dubai Investment Park",
        width: 1376,
        height: 768,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "dubai-civil-defense-approval",
      "dubai-municipality-noc",
      "dubai-municipality-completion-certificate",
    ],
    relatedGuideSlugs: [
      "how-long-does-dm-building-permit-take",
      "dcd-fire-safety-approval-documents",
      "interior-fit-out-permit-process",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "dm-dcd-approval-technical-services-company",
      "dm-dcd-approval-dubai-marina-apartment",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-04-29",
    lastUpdated: "2026-09-02",
    publishStatus: "live",
  },
  {
    slug: "nakheel-trakhees-approval-palm-jumeirah",
    projectTitle: "Trakhees & Nakheel Approval for a Villa in Palm Jumeirah",
    seoTitle: "Trakhees & Nakheel Approval Case Study",
    description:
      "AED 7,000 Trakhees approval and Nakheel NOC for a villa in Palm Jumeirah, Dubai: drawings, NOC and inspection to release completion. Get a free quote today.",
    sourceRef: "LML/QTN/1097",
    consentGranted: false,
    clientLabel: "Confidential client — Palm Jumeirah villa owner",
    projectStatus: "quoted",
    authorities: ["Nakheel", "Trakhees"],
    primaryApprovalSlug: "nakheel-developer-approval",
    projectType: "Trakhees approval and Nakheel NOC for a villa renovation",
    location: "Palm Jumeirah, Dubai",
    sector: "Residential",
    directAnswer:
      "This case study covers the quoted Trakhees approval and Nakheel NOC for a villa on Palm Jumeirah, Dubai. The AED 7,000 quotation from LML/QTN/1097 covers preparing drawings as per Nakheel and Trakhees regulation, obtaining the NOC from Nakheel, and conducting the inspection that releases completion. The quotation was issued on 11 May 2026 and the approval scope is engaged but completion is not yet claimed.",
    stats: [
      { label: "Authorities", value: "Nakheel + Trakhees" },
      { label: "Quoted fee", value: "AED 7,000" },
      { label: "Scope", value: "Drawings, NOC & inspection" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "A villa owner on Palm Jumeirah needed approval from Trakhees and a No Objection Certificate (NOC) from Nakheel for renovation works at the villa, quoted in LML/QTN/1097. Work on a Palm Jumeirah villa is regulated by the master developer Nakheel as well as Trakhees, so the drawings have to satisfy both sets of regulation before the NOC and inspection can release completion. The AED 7,000 professional fee covers preparing drawings as per Nakheel and Trakhees regulation, obtaining the NOC from Nakheel, and conducting the inspection that releases completion.\n\nThe quotation keeps the fee final with clear limits: the client supplies the existing drawings, documents and green files; exceptional approval requirements, an inspection failure or a design revision each carry an additional charge; an extra AED 4,000 applies if the submission is made through a contracting company; and VAT is separate. Confirming the existing documents at the start is what protects the quoted AED 7,000 fee.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and document collection",
        description:
          "Collect the existing drawings, documents and green files based on the site condition and confirm the villa renovation scope with the client.",
      },
      {
        step: 2,
        title: "Prepare drawings as per Nakheel and Trakhees regulation",
        description:
          "Prepare the villa renovation drawings so they meet Nakheel and Trakhees regulation for Palm Jumeirah.",
      },
      {
        step: 3,
        title: "Obtain the NOC from Nakheel",
        description:
          "Submit the drawings and obtain the No Objection Certificate from Nakheel for the villa works.",
      },
      {
        step: 4,
        title: "Conduct the inspection",
        description:
          "Coordinate the Trakhees inspection for the completed villa works and address any inspection comments.",
      },
      {
        step: 5,
        title: "Release the completion",
        description:
          "Once the inspection is approved, release the completion for the villa works on Palm Jumeirah.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1097 issued on 11 May 2026 for the Trakhees approval and Nakheel NOC at AED 7,000.",
        state: "approved",
        date: "2026-05-11",
      },
      {
        title: "Document & drawing collection",
        detail:
          "Collect the existing drawings, documents and green files based on the site condition.",
        state: "pending",
      },
      {
        title: "Nakheel NOC",
        detail:
          "Prepare the villa renovation drawings as per Nakheel and Trakhees regulation and obtain the NOC from Nakheel.",
        state: "pending",
      },
      {
        title: "Inspection",
        detail:
          "Conduct the Trakhees inspection for the completed villa works on Palm Jumeirah.",
        state: "pending",
      },
      {
        title: "Completion release",
        detail:
          "Release the completion for the villa works once the inspection is approved.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Existing drawings, documents and green files",
        description:
          "Existing drawings, documents and green files for the villa provided by the client.",
        providedBy: "client",
      },
      {
        document: "Villa renovation drawings",
        description:
          "Renovation drawings prepared as per Nakheel and Trakhees regulation for the Palm Jumeirah villa.",
        providedBy: "wasleen",
      },
      {
        document: "Nakheel NOC",
        description:
          "No Objection Certificate obtained from Nakheel for the villa works.",
        providedBy: "wasleen",
      },
      {
        document: "Inspection and completion release",
        description:
          "Inspection conducted and completion released for the villa works on Palm Jumeirah.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "11 May 2026",
      },
      {
        stage: "Documents & drawings",
        planned: "Weeks 1–2",
        actual: "—",
        note: "Indicative — typical Trakhees & Nakheel timelines",
      },
      {
        stage: "Nakheel NOC",
        planned: "Weeks 3–4",
        actual: "—",
        note: "Indicative — typical Trakhees & Nakheel timelines",
      },
      {
        stage: "Inspection",
        planned: "Weeks 4–5",
        actual: "—",
        note: "Indicative — typical Trakhees & Nakheel timelines",
      },
      {
        stage: "Completion release",
        planned: "Weeks 5–6",
        actual: "—",
        note: "Indicative — typical Trakhees & Nakheel timelines",
      },
    ],
    quotedFee: "AED 7,000",
    feeAmountAED: 7000,
    feeIncluded: [
      "Preparing drawings as per Nakheel and Trakhees regulation",
      "Obtaining the NOC from Nakheel",
      "Conducting the inspection and releasing completion",
    ],
    proTips: [
      {
        title: "Confirm the existing drawings before the Trakhees approval",
        body: "The quotation keeps the AED 7,000 fee final when the client provides the existing drawings, documents and green files. Confirming those inputs up front protects the quoted price.",
      },
      {
        title: "Budget for the contracting company surcharge",
        body: "The quotation adds AED 4,000 if the submission is made through a contracting company. Submitting directly through Wasleen avoids this surcharge and keeps the approval within the quoted fee.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 7,000" },
      { label: "Approval authorities", value: "Nakheel & Trakhees" },
      { label: "Scope", value: "Drawings, NOC & inspection" },
    ],
    faqs: [
      {
        question: "What does the AED 7,000 quotation cover for this villa approval?",
        answer:
          "It covers preparing drawings as per Nakheel and Trakhees regulation, obtaining the NOC from Nakheel, and conducting the inspection that releases completion for the Palm Jumeirah villa.",
      },
      {
        question: "Which authorities approve the works on a Palm Jumeirah villa?",
        answer:
          "Trakhees provides the approval for the villa works and Nakheel, as the master developer, issues the No Objection Certificate that allows the works to proceed on Palm Jumeirah.",
      },
      {
        question: "Why does a Palm Jumeirah villa need both Trakhees approval and a Nakheel NOC?",
        answer:
          "Palm Jumeirah is a Nakheel master community, so villa works are regulated by Nakheel as well as Trakhees. The drawings must satisfy both sets of regulation before the NOC and inspection can release completion.",
      },
      {
        question: "What does the client need to provide for this approval?",
        answer:
          "The client provides the existing drawings, documents and green files for the villa. Wasleen prepares the drawings, obtains the Nakheel NOC and coordinates the inspection.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, an inspection failure or a design revision, and an extra AED 4,000 applies if the submission is made through a contracting company. VAT is separate.",
      },
      {
        question: "What is the payment schedule for this quotation?",
        answer:
          "Payment is 50% in advance before starting the work, 40% during work progress and 10% after completion, as stated in quotation LML/QTN/1097.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 11 May 2026 for AED 7,000; the approval scope is engaged and completion is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/nakheel-trakhees-approval-palm-jumeirah/hero.webp",
        alt: "Blueprint drawing for a Trakhees approval and Nakheel NOC for a villa in Palm Jumeirah",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/nakheel-trakhees-approval-palm-jumeirah/documents.webp",
        alt: "Blueprint document checklist for a Trakhees approval and Nakheel NOC for a villa in Palm Jumeirah",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/villa-renovation-approval-dubai.webp",
        alt: "Villa renovation approval process for a residential property in Dubai",
        caption: "Trakhees approval and Nakheel NOC for a villa in Palm Jumeirah",
        width: 1376,
        height: 768,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "nakheel-developer-approval",
      "community-approval",
      "interior-fit-out-approval",
    ],
    relatedGuideSlugs: [
      "nakheel-renovation-approval-process",
      "interior-fit-out-permit-process",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "dda-approval-alma-arabian-ranches",
      "dm-dcd-approval-dubai-marina-apartment",
      "business-center-dda-dcd-approval",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-05-11",
    lastUpdated: "2026-09-02",
    publishStatus: "live",
  },
  {
    slug: "rta-rowps-work-permit-al-quoz",
    projectTitle: "RTA ROWPS Work Permit for a Technical Services Company in Al Quoz",
    seoTitle: "RTA ROWPS Work Permit Case Study",
    description:
      "AED 2,000 RTA ROWPS work permit for a technical services company in Al Quoz, Dubai: drawings per RTA regulations and permit issuance. Get a free quote today.",
    sourceRef: "LML/QTN/1098",
    consentGranted: false,
    clientLabel: "Confidential client — Technical services company in Al Quoz",
    projectStatus: "quoted",
    authorities: ["RTA"],
    primaryApprovalSlug: "rta-approval",
    projectType: "RTA ROWPS work permit for a technical services company",
    location: "Al Quoz, Dubai",
    sector: "Commercial",
    directAnswer:
      "This case study covers the quoted RTA Road Occupancy Work Permit System (ROWPS) work permit for a technical services company in Al Quoz, Dubai. RTA requires a road occupancy work permit for activities that occupy or affect public roads and footpaths in Dubai, and the AED 2,000 quotation from LML/QTN/1098 covers preparing documents and drawings as per RTA regulations and obtaining the RTA ROWPS work permit. The quotation was issued on 11 May 2026 and completion is not yet claimed.",
    stats: [
      { label: "Authorities", value: "RTA" },
      { label: "Quoted fee", value: "AED 2,000" },
      { label: "Scope", value: "Drawings & work permit" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "A technical services company in Al Quoz needed an RTA Road Occupancy Work Permit System (ROWPS) work permit for works in the area, quoted in LML/QTN/1098. RTA issues road occupancy work permits for activities that occupy or affect public roads and footpaths in Dubai, so the documents and drawings have to comply with RTA regulations before the permit can be issued. The AED 2,000 professional fee covers preparing documents and drawings as per RTA regulations and obtaining the RTA ROWPS work permit.\n\nThe quotation keeps the fee final with clear limits: the client supplies all other existing drawings, documents and green files; exceptional approval requirements, an inspection failure or a design revision each carry an additional charge; and VAT is separate. Confirming the existing documents at the start is what protects the quoted AED 2,000 fee.",
    solutionSteps: [
      {
        step: 1,
        title: "Document collection and scope confirmation",
        description:
          "Collect the existing drawings, documents and green files from the client and confirm the works that need the RTA road occupancy permit.",
      },
      {
        step: 2,
        title: "Prepare documents and drawings as per RTA regulations",
        description:
          "Prepare the documents and drawings for the works so they comply with RTA regulations for occupying the road.",
      },
      {
        step: 3,
        title: "Submit the RTA ROWPS application",
        description:
          "Submit the documents and drawings through the RTA Road Occupancy Work Permit System application.",
      },
      {
        step: 4,
        title: "Obtain the RTA ROWPS work permit",
        description:
          "Follow up with RTA and obtain the road occupancy work permit for the works in Al Quoz.",
      },
      {
        step: 5,
        title: "Hand over the permit",
        description:
          "Hand the approved RTA ROWPS work permit to the client so the works can proceed.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1098 issued on 11 May 2026 for the RTA ROWPS work permit at AED 2,000.",
        state: "approved",
        date: "2026-05-11",
      },
      {
        title: "Document & drawing collection",
        detail:
          "Collect the existing drawings, documents and green files from the client.",
        state: "pending",
      },
      {
        title: "RTA ROWPS submission",
        detail:
          "Prepare the documents and drawings as per RTA regulations and submit the ROWPS application to RTA.",
        state: "pending",
      },
      {
        title: "Permit issuance",
        detail:
          "Obtain the RTA ROWPS work permit for the works in Al Quoz.",
        state: "pending",
      },
      {
        title: "Completion",
        detail:
          "Hand the RTA ROWPS work permit over to the client so the works can proceed.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Existing drawings, documents and green files",
        description:
          "Existing drawings, documents and green files for the works provided by the client.",
        providedBy: "client",
      },
      {
        document: "Documents and drawings as per RTA regulations",
        description:
          "Documents and drawings prepared for the works so they comply with RTA regulations.",
        providedBy: "wasleen",
      },
      {
        document: "RTA ROWPS application",
        description:
          "Application submitted through the RTA Road Occupancy Work Permit System.",
        providedBy: "wasleen",
      },
      {
        document: "RTA ROWPS work permit",
        description:
          "Road occupancy work permit obtained from RTA for the works in Al Quoz.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "11 May 2026",
      },
      {
        stage: "Documents & drawings",
        planned: "Weeks 1–2",
        actual: "—",
        note: "Indicative — typical RTA timelines",
      },
      {
        stage: "RTA ROWPS submission",
        planned: "Weeks 2–3",
        actual: "—",
        note: "Indicative — typical RTA timelines",
      },
      {
        stage: "Permit issuance",
        planned: "Weeks 3–4",
        actual: "—",
        note: "Indicative — typical RTA timelines",
      },
      {
        stage: "Completion",
        planned: "Weeks 4–5",
        actual: "—",
        note: "Indicative — typical RTA timelines",
      },
    ],
    quotedFee: "AED 2,000",
    feeAmountAED: 2000,
    feeIncluded: [
      "Preparing documents and drawings as per RTA regulations",
      "Obtaining the RTA ROWPS work permit",
    ],
    proTips: [
      {
        title: "Provide the existing drawings before the RTA ROWPS application",
        body: "The quotation keeps the AED 2,000 fee final when the client provides all other existing drawings, documents and green files. Confirming those inputs up front protects the quoted price.",
      },
      {
        title: "Budget for additional approval or inspection charges",
        body: "The quotation adds a charge for exceptional approval requirements and for an inspection failure or design revision. Preparing the documents and drawings correctly the first time keeps the permit within the quoted fee.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 2,000" },
      { label: "Approval authority", value: "RTA" },
      { label: "Scope", value: "Drawings & work permit" },
    ],
    faqs: [
      {
        question: "What does the AED 2,000 quotation cover for this RTA work permit?",
        answer:
          "It covers preparing documents and drawings as per RTA regulations and obtaining the RTA Road Occupancy Work Permit System (ROWPS) work permit for the works in Al Quoz.",
      },
      {
        question: "What is an RTA ROWPS work permit?",
        answer:
          "ROWPS is the RTA Road Occupancy Work Permit System, the system the Roads and Transport Authority uses to issue work permits for activities that occupy or affect public roads and footpaths in Dubai.",
      },
      {
        question: "Why does a technical services company in Al Quoz need an RTA road occupancy permit?",
        answer:
          "Works that occupy or affect public roads or footpaths in Dubai require a permit from the Roads and Transport Authority so the authority can manage road safety and traffic. RTA approval is the permit that governs these road occupancy works.",
      },
      {
        question: "What does the client need to provide for this approval?",
        answer:
          "The client provides all existing drawings, documents and green files. Wasleen prepares the documents and drawings as per RTA regulations and obtains the RTA ROWPS work permit.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements and for an inspection failure or design revision, as stated in quotation LML/QTN/1098. VAT is separate.",
      },
      {
        question: "What is the payment schedule for this quotation?",
        answer:
          "Payment is 50% in advance before starting the work, 40% during work progress and 10% after completion of the work.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 11 May 2026 for AED 2,000; the approval scope is engaged and completion is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/rta-rowps-work-permit-al-quoz/hero.webp",
        alt: "Blueprint drawing for an RTA ROWPS work permit for a technical services project in Al Quoz",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/rta-rowps-work-permit-al-quoz/documents.webp",
        alt: "Blueprint document checklist for an RTA ROWPS work permit application in Al Quoz",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/blueprint-drawing-submission-approval-dubai.webp",
        alt: "Blueprint drawing submission prepared as per RTA regulations for a road occupancy work permit in Dubai",
        caption: "RTA ROWPS work permit documents for a technical services company in Al Quoz",
        width: 1376,
        height: 768,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "rta-approval",
      "dubai-municipality-building-permit",
      "dewa-connection-noc",
    ],
    relatedGuideSlugs: [
      "rta-approval-commercial-projects",
      "dewa-connection-process-guide",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "dm-dcd-approval-technical-services-company",
      "dewa-load-schedule-request-dubai",
      "fire-fighting-dcd-approval-al-quoz",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-05-11",
    lastUpdated: "2026-09-02",
    publishStatus: "live",
  },
  {
    slug: "dcd-approval-burlington-tower-3",
    projectTitle: "DCD Approval for an Office Fit-Out in Burlington Tower 3",
    seoTitle: "DCD Approval for an Office Fit-Out in Burlington Tower 3",
    description:
      "AED 3,200 DCD approval for an office fit-out at Burlington Tower 3, Dubai: drawings per DCD regulation, design approval, inspection and completion certificate. Get a free quote today.",
    sourceRef: "LML/QTN/1104",
    consentGranted: false,
    clientLabel: "Confidential client — Fire fighting equipment installation company",
    projectStatus: "quoted",
    authorities: ["Dubai Civil Defence"],
    primaryApprovalSlug: "dubai-civil-defense-approval",
    projectType: "DCD approval for an office fit-out",
    location: "Burlington Tower 3, Dubai",
    sector: "Commercial",
    directAnswer:
      "This case study covers the quoted Dubai Civil Defence (DCD) approval for an office fit-out at Burlington Tower 3, Dubai. The AED 3,200 quotation from LML/QTN/1104 covers preparing drawings as per DCD regulation, obtaining design approval from DCD, and conducting the inspection that releases the completion certificate. The quotation was issued on 18 May 2026 and completion is not yet claimed.",
    stats: [
      { label: "Authorities", value: "DCD" },
      { label: "Quoted fee", value: "AED 3,200" },
      { label: "Scope", value: "Drawings, approval & inspection" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "A fire fighting equipment installation company needed Dubai Civil Defence (DCD) approval for an office unit at Burlington Tower 3, Dubai, quoted in LML/QTN/1104. DCD approval is the fire and life-safety clearance required for interior fit-out projects in commercial buildings, so the office drawings have to comply with DCD regulation before design approval and the final inspection can be obtained. The AED 3,200 professional fee covers preparing the drawings as per DCD regulation, obtaining design approval from DCD, and conducting the inspection that releases the completion certificate.\n\nThe quotation keeps the fee final with clear limits: the client gives all other existing drawings, documents and green files; exceptional approval requirements, an inspection failure or a design revision each carry an additional charge; and VAT is separate. Confirming the existing documents at the start is what protects the quoted AED 3,200 fee.",
    solutionSteps: [
      {
        step: 1,
        title: "Scope and document confirmation",
        description:
          "Collect the existing drawings, documents and green files from the client and confirm the office fit-out works at Burlington Tower 3 that need DCD approval.",
      },
      {
        step: 2,
        title: "Prepare drawings as per DCD regulation",
        description:
          "Prepare the office fit-out drawing set so it complies with Dubai Civil Defence regulation for fire and life safety.",
      },
      {
        step: 3,
        title: "Obtain design approval from DCD",
        description:
          "Submit the drawings to Dubai Civil Defence and follow up until design approval is obtained for the office fit-out.",
      },
      {
        step: 4,
        title: "Conduct the DCD inspection",
        description:
          "Arrange and attend the inspection with DCD inspectors for the office fit-out, and resolve any findings so it passes.",
      },
      {
        step: 5,
        title: "Release the completion certificate",
        description:
          "Once the inspection passes, finalise the DCD documentation and release the completion certificate for the office.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1104 issued on 18 May 2026 for the DCD approval of the office at AED 3,200.",
        state: "approved",
        date: "2026-05-18",
      },
      {
        title: "Document & drawing collection",
        detail:
          "Collect the existing drawings, documents and green files from the client.",
        state: "pending",
      },
      {
        title: "Design approval (DCD)",
        detail:
          "Prepare the office fit-out drawings as per DCD regulation and obtain design approval from Dubai Civil Defence.",
        state: "pending",
      },
      {
        title: "Inspection",
        detail:
          "Conduct the DCD inspection for the office fit-out works at Burlington Tower 3.",
        state: "pending",
      },
      {
        title: "Completion",
        detail:
          "Release the completion certificate after the DCD inspection passes.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Existing drawings, documents and green files",
        description:
          "Existing drawings, documents and green files for the office provided by the client.",
        providedBy: "client",
      },
      {
        document: "Office drawings as per DCD regulation",
        description:
          "Office fit-out drawings prepared so they comply with Dubai Civil Defence regulation.",
        providedBy: "wasleen",
      },
      {
        document: "DCD design approval application",
        description:
          "Application submitted to Dubai Civil Defence for design approval of the office fit-out.",
        providedBy: "wasleen",
      },
      {
        document: "Inspection and completion certificate",
        description:
          "DCD inspection arranged and the completion certificate released for the office.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "18 May 2026",
      },
      {
        stage: "Documents & drawings",
        planned: "Weeks 1–2",
        actual: "—",
        note: "Indicative — typical DCD timelines",
      },
      {
        stage: "Design approval (DCD)",
        planned: "Weeks 3–5",
        actual: "—",
        note: "Indicative — typical DCD timelines",
      },
      {
        stage: "Inspection",
        planned: "Week 6",
        actual: "—",
        note: "Indicative — typical DCD timelines",
      },
      {
        stage: "Completion certificate",
        planned: "Week 7",
        actual: "—",
        note: "Indicative — typical DCD timelines",
      },
    ],
    quotedFee: "AED 3,200",
    feeAmountAED: 3200,
    feeIncluded: [
      "Preparing drawings as per DCD regulation",
      "Obtaining design approval from DCD",
      "Conducting inspection from DCD, releasing completion certificate",
    ],
    proTips: [
      {
        title: "Provide the existing drawings and green files up front",
        body: "The quotation keeps the AED 3,200 fee final when the client gives all other existing drawings, documents and green files. Confirming those inputs at the start protects the quoted price.",
      },
      {
        title: "Budget separately for VAT and any revision charges",
        body: "The quotation states VAT is separate, and exceptional approval requirements or an inspection failure or design revision carry an additional charge. Preparing the office drawings correctly as per DCD regulation keeps the approval within the quoted fee.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 3,200" },
      { label: "Approval authority", value: "Dubai Civil Defence" },
      { label: "Scope", value: "Drawings, approval & inspection" },
    ],
    faqs: [
      {
        question: "What does the AED 3,200 quotation cover for this DCD approval?",
        answer:
          "It covers preparing the office fit-out drawings as per Dubai Civil Defence regulation, obtaining design approval from DCD, and conducting the inspection that releases the completion certificate.",
      },
      {
        question: "Which authority approves this office fit-out case study?",
        answer:
          "Dubai Civil Defence (DCD), which issues the fire and life-safety approval required for interior fit-out works in commercial buildings in Dubai.",
      },
      {
        question: "Why does an office fit-out at Burlington Tower 3 need DCD approval?",
        answer:
          "DCD approval is the fire and life-safety clearance required before interior fit-out works in a commercial building can proceed. DCD reviews fire protection, alarms, exits and related life-safety measures in the office drawings.",
      },
      {
        question: "What does the client need to provide for this approval?",
        answer:
          "The client gives all other existing drawings, documents and green files. Wasleen prepares the office fit-out drawings as per DCD regulation and manages the design approval, inspection and completion certificate.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements and for an inspection failure or design revision, as stated in quotation LML/QTN/1104. VAT is separate.",
      },
      {
        question: "What is the payment schedule for this quotation?",
        answer:
          "Payment is 50% in advance before starting the work, 40% during work progress and 10% after completion of the work.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 18 May 2026 for AED 3,200; the approval scope is engaged and completion is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/dcd-approval-burlington-tower-3/hero.webp",
        alt: "Blueprint drawing for a DCD office fit-out approval at Burlington Tower 3 in Dubai",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/dcd-approval-burlington-tower-3/documents.webp",
        alt: "Blueprint document checklist for a DCD office approval application at Burlington Tower 3",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/DCD-approval-consultants-in-dubai (1).webp",
        alt: "Dubai Civil Defense approval consultants reviewing fire safety compliance for an office fit-out in Dubai",
        caption: "Dubai Civil Defense approval consultants for office fit-outs",
        width: 1920,
        height: 1080,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "interior-fit-out-approval",
      "dubai-municipality-civil-defense-noc",
      "dubai-municipality-completion-certificate",
    ],
    relatedGuideSlugs: [
      "dcd-fire-safety-approval-documents",
      "interior-fit-out-permit-process",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "business-center-dda-dcd-approval",
      "fire-fighting-dcd-approval-al-quoz",
      "dm-dcd-approval-technical-services-company",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-05-18",
    lastUpdated: "2026-09-02",
    publishStatus: "live",
  },
  {
    slug: "dda-approval-arabian-ranches-interior-modification",
    projectTitle: "DDA Approval for an Interior Modification in Arabian Ranches",
    seoTitle: "DDA Interior Modification Approval in Arabian Ranches",
    description:
      "AED 6,000 DDA approval quotation for an interior modification in Arabian Ranches, Dubai. Drawings, design approval, inspection and completion. Get a free quote today.",
    sourceRef: "LML/QTN/1105",
    consentGranted: false,
    clientLabel: "Confidential client — Residential property owner",
    projectStatus: "quoted",
    authorities: ["DDA"],
    primaryApprovalSlug: "dda-approval",
    projectType: "Interior modification DDA approval",
    location: "Arabian Ranches, Dubai",
    sector: "Residential",
    directAnswer:
      "This case study covers the quoted DDA approval for an interior modification in Arabian Ranches, Dubai. The AED 6,000 quotation from LML/QTN/1105 covers preparing the interior modification drawings as per DDA regulation, obtaining design approval from the Dubai Development Authority (DDA), and conducting the inspection that releases the completion certificate. The quotation was issued on 20 May 2026 and states that once the Emaar NOC is received the work can be completed within 5 days.",
    stats: [
      { label: "Authorities", value: "DDA" },
      { label: "Quoted fee", value: "AED 6,000" },
      { label: "Scope", value: "Interior modification works" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "Arabian Ranches is an Emaar-managed residential master community under the jurisdiction of the Dubai Development Authority (DDA). An interior modification there needs DDA approval before work can begin, and the drawings must be prepared as per DDA regulation so the design approval and the final inspection both pass. The quotation's limiting conditions make the Emaar NOC the key input: once the Emaar NOC is received, the work can be completed within 5 days, with any comments or revisions adding time.\n\nThe quotation also keeps the AED 6,000 fee defined: the client supplies the existing drawings, documents and green files; exceptional approval requirements, a design revision or a failed inspection each carry an extra charge; and VAT is separate. Confirming those inputs at the start is what protects the quoted fee.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and document review",
        description:
          "Review the existing drawings, documents and green files supplied by the client, and confirm the current condition of the property at Arabian Ranches, Dubai.",
      },
      {
        step: 2,
        title: "Coordinate the Emaar NOC",
        description:
          "Arabian Ranches is an Emaar-managed community, so the Emaar no-objection certificate is required to proceed. Once it is received, the quotation allows the work to be completed within 5 days.",
      },
      {
        step: 3,
        title: "Prepare drawings as per DDA regulation",
        description:
          "Prepare the interior modification drawing set so it meets Dubai Development Authority regulation for the works in Arabian Ranches.",
      },
      {
        step: 4,
        title: "Obtain design approval from DDA",
        description:
          "Submit the drawing set and supporting documents to the DDA, and follow up until design approval is obtained.",
      },
      {
        step: 5,
        title: "Conduct inspection with DDA",
        description:
          "Arrange and attend the DDA inspection of the interior modification works, and resolve any findings so the inspection passes.",
      },
      {
        step: 6,
        title: "Release the completion certificate",
        description:
          "Once the inspection passes, finalise the DDA documentation and release the completion certificate.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1105 issued on 20 May 2026 for the DDA approval of an interior modification at AED 6,000.",
        state: "approved",
        date: "2026-05-20",
      },
      {
        title: "Drawing review",
        detail:
          "Review the existing drawings, documents and green files supplied by the client.",
        state: "pending",
      },
      {
        title: "Emaar NOC",
        detail:
          "Emaar no-objection certificate for the works in Arabian Ranches; once received the work can be completed within 5 days.",
        state: "pending",
      },
      {
        title: "Drawings prepared",
        detail: "Interior modification drawing set prepared as per DDA regulation.",
        state: "pending",
      },
      {
        title: "Design approval",
        detail: "Design approval to be obtained from the Dubai Development Authority.",
        state: "pending",
      },
      {
        title: "Inspection",
        detail: "DDA inspection to be conducted once the drawings are approved.",
        state: "pending",
      },
      {
        title: "Completion",
        detail: "Completion certificate to be released after the inspection passes.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Trade licence",
        description: "Client's valid trade licence.",
        providedBy: "client",
      },
      {
        document: "Title deed or tenancy",
        description: "Title deed or tenancy evidence for the property in Arabian Ranches.",
        providedBy: "client",
      },
      {
        document: "Existing drawings and green files",
        description:
          "Existing drawings, documents and green files required by DDA for the interior modification.",
        providedBy: "client",
      },
      {
        document: "Emaar NOC",
        description:
          "Emaar no-objection certificate for the Arabian Ranches property, which lets the DDA approval proceed.",
        providedBy: "client",
      },
      {
        document: "Interior modification drawing set",
        description: "Interior modification drawings prepared as per DDA regulation.",
        providedBy: "wasleen",
      },
      {
        document: "DDA applications",
        description:
          "Design approval and inspection applications submitted to the Dubai Development Authority.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "20 May 2026",
      },
      {
        stage: "Emaar NOC & drawings",
        planned: "Within 5 days of Emaar NOC",
        actual: "—",
        note: "Per quotation LML/QTN/1105 limiting conditions",
      },
      {
        stage: "Design approval (DDA)",
        planned: "After NOC & submission",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
      {
        stage: "Inspection",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
      {
        stage: "Completion certificate",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
    ],
    quotedFee: "AED 6,000",
    feeAmountAED: 6000,
    feeIncluded: [
      "Preparing drawings as per DDA regulation for interior modification",
      "Obtaining design approval from DDA",
      "Conducting inspection from DDA, releasing completion certificate",
    ],
    proTips: [
      {
        title: "Start the Emaar NOC before DDA submission",
        body: "Arabian Ranches is an Emaar-managed community, and the quotation states the work can be completed within 5 days once the Emaar NOC is received. Securing the NOC first is what compresses the overall approval timeline.",
      },
      {
        title: "Supply complete existing drawings to keep the AED 6,000 fee final",
        body: "The limiting conditions charge extra for exceptional approval requirements, a design revision or a failed inspection, with VAT separate. Confirming the existing drawings, documents and green files up front protects the quoted price.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 6,000" },
      { label: "Approval authority", value: "Dubai Development Authority (DDA)" },
      { label: "Scope", value: "Interior modification drawings, approval & inspection" },
    ],
    faqs: [
      {
        question: "What does the AED 6,000 quotation cover for this interior modification DDA approval?",
        answer:
          "It covers preparing the interior modification drawings as per DDA regulation, obtaining design approval from the Dubai Development Authority (DDA), and conducting the inspection that releases the completion certificate.",
      },
      {
        question: "Which authority and community are involved in this DDA approval?",
        answer:
          "The Dubai Development Authority (DDA) issues the approval, and Arabian Ranches is an Emaar-managed residential master community under DDA jurisdiction in Dubai.",
      },
      {
        question: "Why is the Emaar NOC important for this Arabian Ranches approval?",
        answer:
          "Arabian Ranches is operated by Emaar, so the Emaar no-objection certificate is required before the DDA works proceed. Quotation LML/QTN/1105 states that once the Emaar NOC is received the work can be completed within 5 days, with comments or revisions adding time.",
      },
      {
        question: "What does the client need to provide for this DDA approval?",
        answer:
          "The client provides the existing drawings, documents and green files as well as the Emaar NOC. Wasleen prepares the interior modification drawing set and handles the DDA design approval and inspection applications.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, a design revision or a failed inspection, and VAT is separate as stated in quotation LML/QTN/1105.",
      },
      {
        question: "What is the payment schedule for this DDA approval quotation?",
        answer:
          "Payment is 50% in advance, 40% during work progress and 10% after completion, as stated in quotation LML/QTN/1105.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 20 May 2026 for AED 6,000; the approval scope is engaged and the final approval is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/dda-approval-arabian-ranches-interior-modification/hero.webp",
        alt: "Blueprint drawing for a DDA interior modification approval in Arabian Ranches, Dubai",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/dda-approval-arabian-ranches-interior-modification/documents.webp",
        alt: "Blueprint document checklist for a DDA interior modification approval in Arabian Ranches",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/interior-fit-out-approval-service-dubai.webp",
        alt: "Interior fit-out approval service drawings for a residential DDA interior modification in Arabian Ranches",
        caption: "DDA interior modification approval service in Dubai",
        width: 1200,
        height: 1200,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "emaar-community-approval",
      "interior-fit-out-approval",
      "dubai-municipality-completion-certificate",
    ],
    relatedGuideSlugs: [
      "emaar-community-design-guidelines",
      "interior-fit-out-permit-process",
      "cad-drawing-standards-dubai-guide",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "business-center-dda-dcd-approval",
      "dda-approval-dubai-contracting-renovation",
      "dm-dcd-approval-dubai-marina-apartment",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-05-20",
    lastUpdated: "2026-09-02",
    publishStatus: "live",
  },
  {
    slug: "dda-approval-arabian-ranches-swimming-pool-works",
    projectTitle: "DDA Approval for Swimming Pool Works in Arabian Ranches",
    seoTitle: "DDA Swimming Pool Approval Case Study",
    description:
      "AED 12,000 DDA approval quotation for interior modification and swimming pool works in Arabian Ranches, Dubai. Contact us for a free quote today.",
    sourceRef: "LML/QTN/1106",
    consentGranted: false,
    clientLabel: "Confidential client — Residential property owner",
    projectStatus: "quoted",
    authorities: ["DDA"],
    primaryApprovalSlug: "dda-approval",
    projectType: "Interior modification and swimming pool works DDA approval",
    location: "Arabian Ranches, Dubai",
    sector: "Residential",
    directAnswer:
      "This case study documents a quoted DDA approval for interior modification and swimming pool works in Arabian Ranches, Dubai. The AED 12,000 quotation, LML/QTN/1106 issued on 20 May 2026, covers preparing the drawings as per DDA regulation, obtaining design approval from the Dubai Development Authority (DDA) and conducting the inspection that releases the completion certificate. The quotation states that once the Emaar NOC is received the work can be completed within 5-10 days, with any comments or revisions requiring additional time.",
    stats: [
      { label: "Authorities", value: "DDA" },
      { label: "Quoted fee", value: "AED 12,000" },
      { label: "Scope", value: "Interior modification & pool works" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "Arabian Ranches is an Emaar-managed residential community under the Dubai Development Authority (DDA), and this quotation bundles the two work streams the property needs — interior modification and swimming pool works — into one AED 12,000 approval scope. Both work streams have to be drawn as per DDA regulation so a single design approval and one final inspection can pass together. The Emaar NOC sits at the centre of the programme: the quotation only commits to completing the work within 5-10 days once the NOC is received, with any comments or revisions adding time.\nThe AED 12,000 fee stays defined as long as the client supplies the existing drawings, documents and green files up front. The limiting conditions keep the extras transparent — an exceptional approval requirement, an inspection failure or a design revision each carries an additional charge, and VAT is separate. Payment follows the 50-40-10 schedule stated on the quotation: 50% in advance before work starts, 40% during progress and 10% after completion.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and document review",
        description:
          "Review the existing drawings, documents and green files supplied by the client, and confirm the current condition of the property in Arabian Ranches, Dubai, including the area of the swimming pool works.",
      },
      {
        step: 2,
        title: "Coordinate the Emaar NOC",
        description:
          "Arabian Ranches is an Emaar-managed community, so the Emaar no-objection certificate must be received before the DDA works proceed; the quotation allows completion within 5-10 days once it is in hand.",
      },
      {
        step: 3,
        title: "Prepare drawings as per DDA regulation",
        description:
          "Prepare the drawing set for the interior modification and swimming pool works so it meets Dubai Development Authority regulation for Arabian Ranches.",
      },
      {
        step: 4,
        title: "Obtain design approval from DDA",
        description:
          "Submit the drawing set and supporting documents to the Dubai Development Authority, and follow up until design approval is obtained.",
      },
      {
        step: 5,
        title: "Conduct inspection with DDA",
        description:
          "Arrange and attend the DDA inspection of the completed interior modification and swimming pool works, and resolve any findings so the inspection passes.",
      },
      {
        step: 6,
        title: "Release the completion certificate",
        description:
          "Once the inspection passes, finalise the DDA documentation and release the completion certificate.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1106 issued on 20 May 2026 for the DDA approval of interior modification and swimming pool works at AED 12,000.",
        state: "approved",
        date: "2026-05-20",
      },
      {
        title: "Drawing review",
        detail:
          "Review the existing drawings, documents and green files supplied by the client.",
        state: "pending",
      },
      {
        title: "Emaar NOC",
        detail:
          "Emaar no-objection certificate for the works in Arabian Ranches; once received the work can be completed within 5-10 days.",
        state: "pending",
      },
      {
        title: "Drawings prepared",
        detail:
          "Drawing set for the interior modification and swimming pool works prepared as per DDA regulation.",
        state: "pending",
      },
      {
        title: "Design approval",
        detail: "Design approval to be obtained from the Dubai Development Authority.",
        state: "pending",
      },
      {
        title: "Inspection",
        detail: "DDA inspection to be conducted once the drawings are approved.",
        state: "pending",
      },
      {
        title: "Completion",
        detail: "Completion certificate to be released after the inspection passes.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Trade licence",
        description: "Client's valid trade licence.",
        providedBy: "client",
      },
      {
        document: "Title deed or tenancy",
        description: "Title deed or tenancy evidence for the property in Arabian Ranches.",
        providedBy: "client",
      },
      {
        document: "Existing drawings and green files",
        description:
          "Existing drawings, documents and green files required by DDA, covering the property and its swimming pool works.",
        providedBy: "client",
      },
      {
        document: "Emaar NOC",
        description:
          "Emaar no-objection certificate for the Arabian Ranches property, which lets the DDA approval proceed.",
        providedBy: "client",
      },
      {
        document: "Interior and pool works drawing set",
        description:
          "Drawings for the interior modification and swimming pool works prepared as per DDA regulation.",
        providedBy: "wasleen",
      },
      {
        document: "DDA applications",
        description:
          "Design approval and inspection applications submitted to the Dubai Development Authority.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "20 May 2026",
      },
      {
        stage: "Emaar NOC & drawings",
        planned: "Within 5-10 days of Emaar NOC",
        actual: "—",
        note: "Per quotation LML/QTN/1106 limiting conditions",
      },
      {
        stage: "Design approval (DDA)",
        planned: "After NOC & submission",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
      {
        stage: "Inspection",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
      {
        stage: "Completion certificate",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
    ],
    quotedFee: "AED 12,000",
    feeAmountAED: 12000,
    feeIncluded: [
      "Preparing drawings as per DDA regulation for interior modification and swimming pool works",
      "Obtaining design approval from DDA",
      "Conducting inspection from DDA, releasing completion certificate",
    ],
    proTips: [
      {
        title: "Get the Emaar NOC before DDA submission",
        body: "Arabian Ranches is an Emaar-managed community, and the quotation states the combined interior and pool works can be completed within 5-10 days once the Emaar NOC is received. Securing the NOC first is what compresses the whole approval timeline.",
      },
      {
        title: "Confirm the full drawing set to protect the AED 12,000 fee",
        body: "The limiting conditions charge extra for exceptional approval requirements, an inspection failure or a design revision, with VAT separate. Supplying the complete existing drawings, documents and green files up front — including the pool area — keeps the quoted AED 12,000 price final.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 12,000" },
      { label: "Approval authority", value: "Dubai Development Authority (DDA)" },
      {
        label: "Scope",
        value: "Interior modification & pool works drawings, approval & inspection",
      },
    ],
    faqs: [
      {
        question: "What does the AED 12,000 DDA approval quotation include?",
        answer:
          "The quotation covers preparing the drawings as per DDA regulation for interior modification and swimming pool works, obtaining design approval from the Dubai Development Authority (DDA), and conducting the inspection that releases the completion certificate.",
      },
      {
        question: "Why does this quotation combine interior modification with swimming pool works?",
        answer:
          "LML/QTN/1106 bundles the two work streams a villa in Arabian Ranches needs into a single DDA approval scope. The drawings for both the interior modification and the swimming pool works must be prepared as per DDA regulation so one design approval and one final inspection can pass together, which is reflected in the AED 12,000 fee.",
      },
      {
        question: "Which authority and community are involved in this DDA approval?",
        answer:
          "The Dubai Development Authority (DDA) issues the approval, and Arabian Ranches is an Emaar-managed residential community under DDA jurisdiction in Dubai.",
      },
      {
        question: "Why is the Emaar NOC important for this Arabian Ranches approval?",
        answer:
          "Arabian Ranches is operated by Emaar, so the Emaar no-objection certificate is required before the DDA works proceed. Quotation LML/QTN/1106 states that once the Emaar NOC is received the work can be completed within 5-10 days, with comments or revisions adding time.",
      },
      {
        question: "What does the client need to provide for this DDA approval?",
        answer:
          "The client provides the existing drawings, documents and green files as well as the Emaar NOC. Wasleen prepares the interior modification and swimming pool drawing set and handles the DDA design approval and inspection applications.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, an inspection failure or a design revision, and VAT is separate as stated in quotation LML/QTN/1106.",
      },
      {
        question: "What is the payment schedule for this DDA approval quotation?",
        answer:
          "Payment is 50% in advance before the work starts, 40% during work progress and 10% after completion, as stated in quotation LML/QTN/1106.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 20 May 2026 for AED 12,000; the approval scope is engaged and the final approval is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/dda-approval-arabian-ranches-swimming-pool-works/hero.webp",
        alt: "Blueprint drawing for a DDA swimming pool works approval in Arabian Ranches, Dubai",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/dda-approval-arabian-ranches-swimming-pool-works/documents.webp",
        alt: "Blueprint document checklist for a DDA swimming pool works approval in Arabian Ranches",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/villa-renovation-approval-dubai.webp",
        alt: "Villa renovation approval process for residential interior and swimming pool works in Arabian Ranches",
        caption: "DDA approval for villa interior and swimming pool works in Arabian Ranches",
        width: 1376,
        height: 768,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "emaar-community-approval",
      "interior-fit-out-approval",
      "dubai-municipality-completion-certificate",
    ],
    relatedGuideSlugs: [
      "emaar-community-design-guidelines",
      "interior-fit-out-permit-process",
      "cad-drawing-standards-dubai-guide",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "business-center-dda-dcd-approval",
      "dda-approval-dubai-contracting-renovation",
      "dm-dcd-approval-dubai-marina-apartment",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-05-20",
    lastUpdated: "2026-09-02",
    publishStatus: "live",
  },
  {
    slug: "dda-emaar-approval-arabian-ranches",
    projectTitle: "DDA & Emaar Approval for a Property in Arabian Ranches",
    seoTitle: "DDA & Emaar Approval in Arabian Ranches",
    description:
      "AED 22,000 DDA & Emaar approval quote at Arabian Ranches, Dubai: drawings, design approval, inspection and completion certificate. Get a free quote today.",
    sourceRef: "LML/QTN/1115",
    consentGranted: false,
    clientLabel: "Confidential client — Residential property owner",
    projectStatus: "quoted",
    authorities: ["DDA"],
    primaryApprovalSlug: "dda-approval",
    projectType: "DDA & Emaar approval",
    location: "Arabian Ranches, Dubai",
    sector: "Residential",
    directAnswer:
      "This case study covers the quoted DDA & Emaar approval for a property in Arabian Ranches, Dubai. The AED 22,000 quotation, LML/QTN/1115 issued on 9 June 2026, covers preparing the drawings as per DDA & Emaar regulation, obtaining design approval from the Dubai Development Authority (DDA) and Emaar, and conducting the DDA inspection that releases the completion certificate.",
    stats: [
      { label: "Authorities", value: "DDA & Emaar" },
      { label: "Quoted fee", value: "AED 22,000" },
      { label: "Scope", value: "Drawings, approval & inspection" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "Arabian Ranches is an Emaar-managed residential community under the jurisdiction of the Dubai Development Authority (DDA). This quotation covers the full approval path a property there needs: the subject is a DDA & Emaar approval, so the drawing set has to be prepared as per DDA & Emaar regulation before design approval can be obtained from both, followed by a DDA inspection that releases the completion certificate.\nThe AED 22,000 fee is defined around the inputs the client controls. The client supplies the existing drawings, documents and green files; exceptional approval requirements, an inspection failure or a design revision each carry an additional charge; and VAT is separate. The quotation does not commit to a fixed completion timeline, so confirming the existing documents up front is what keeps the programme and the quoted price realistic.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and document review",
        description:
          "Review the existing drawings, documents and green files supplied by the client, and confirm the current condition of the property in Arabian Ranches, Dubai.",
      },
      {
        step: 2,
        title: "Confirm Emaar community requirements",
        description:
          "Arabian Ranches is an Emaar-managed community, so the Emaar community approval requirements are confirmed before the drawing set is prepared.",
      },
      {
        step: 3,
        title: "Prepare drawings as per DDA & Emaar regulation",
        description:
          "Prepare the drawing set so it meets both Dubai Development Authority and Emaar regulation for the works at the Arabian Ranches property.",
      },
      {
        step: 4,
        title: "Obtain design approval from DDA & Emaar",
        description:
          "Submit the drawing set and supporting documents, and follow up until design approval is obtained from the DDA and Emaar.",
      },
      {
        step: 5,
        title: "Conduct inspection with DDA",
        description:
          "Arrange and attend the DDA inspection of the works, and resolve any findings so the inspection passes.",
      },
      {
        step: 6,
        title: "Release the completion certificate",
        description:
          "Once the inspection passes, finalise the DDA documentation and release the completion certificate.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1115 issued on 9 June 2026 for the DDA & Emaar approval at AED 22,000.",
        state: "approved",
        date: "2026-06-09",
      },
      {
        title: "Drawing review",
        detail:
          "Review the existing drawings, documents and green files supplied by the client.",
        state: "pending",
      },
      {
        title: "Emaar community requirements",
        detail:
          "Confirm the Emaar community approval requirements for the Arabian Ranches property.",
        state: "pending",
      },
      {
        title: "Drawings prepared",
        detail: "Drawing set prepared as per DDA & Emaar regulation.",
        state: "pending",
      },
      {
        title: "Design approval",
        detail:
          "Design approval to be obtained from the Dubai Development Authority and Emaar.",
        state: "pending",
      },
      {
        title: "Inspection",
        detail: "DDA inspection to be conducted once the drawings are approved.",
        state: "pending",
      },
      {
        title: "Completion",
        detail: "Completion certificate to be released after the inspection passes.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Trade licence",
        description: "Client's valid trade licence.",
        providedBy: "client",
      },
      {
        document: "Title deed or tenancy",
        description: "Title deed or tenancy evidence for the property in Arabian Ranches.",
        providedBy: "client",
      },
      {
        document: "Existing drawings and green files",
        description:
          "Existing drawings, documents and green files required for the DDA & Emaar approval.",
        providedBy: "client",
      },
      {
        document: "Drawing set as per DDA & Emaar regulation",
        description:
          "Drawings prepared to meet both Dubai Development Authority and Emaar regulation for the Arabian Ranches property.",
        providedBy: "wasleen",
      },
      {
        document: "DDA applications",
        description:
          "Design approval and inspection applications submitted to the Dubai Development Authority.",
        providedBy: "wasleen",
      },
      {
        document: "Emaar design approval submission",
        description:
          "Design approval submission made to Emaar as the Arabian Ranches community authority.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "9 June 2026",
      },
      {
        stage: "Drawings preparation",
        planned: "To be confirmed",
        actual: "—",
        note: "No timeline commitment is stated in quotation LML/QTN/1115",
      },
      {
        stage: "Design approval (DDA & Emaar)",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA & Emaar timelines",
      },
      {
        stage: "Inspection (DDA)",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
      {
        stage: "Completion certificate",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
    ],
    quotedFee: "AED 22,000",
    feeAmountAED: 22000,
    feeIncluded: [
      "Preparing drawings as per DDA & Emaar regulation",
      "Obtaining design approval from DDA & Emaar",
      "Conducting inspection from DDA, releasing completion certificate",
    ],
    proTips: [
      {
        title: "Prepare one drawing set to both DDA & Emaar regulation",
        body: "The approval subject is DDA & Emaar, so the same drawing set must satisfy the Dubai Development Authority and the Emaar community requirements. Aligning the drawings to both regulations before submission avoids a design revision and the additional charge that follows it.",
      },
      {
        title: "Supply the complete existing documents to protect the AED 22,000 fee",
        body: "The limiting conditions charge extra for exceptional approval requirements, an inspection failure or a design revision, with VAT separate. Handing over the full existing drawings, documents and green files up front keeps the quoted AED 22,000 price final.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 22,000" },
      { label: "Approval authority", value: "Dubai Development Authority (DDA) & Emaar" },
      {
        label: "Scope",
        value: "Drawings, DDA & Emaar design approval & DDA inspection",
      },
    ],
    faqs: [
      {
        question: "What does the AED 22,000 DDA & Emaar approval quotation include?",
        answer:
          "The quotation covers preparing the drawings as per DDA & Emaar regulation, obtaining design approval from the Dubai Development Authority (DDA) and Emaar, and conducting the DDA inspection that releases the completion certificate.",
      },
      {
        question: "Which authorities are involved in this Arabian Ranches approval?",
        answer:
          "The Dubai Development Authority (DDA) issues the design approval and conducts the inspection, and Emaar is the Arabian Ranches community authority whose approval is part of the same scope, as stated in quotation LML/QTN/1115.",
      },
      {
        question: "Why does this approval require both DDA and Emaar?",
        answer:
          "Arabian Ranches is an Emaar-managed residential community under the Dubai Development Authority. The quotation is therefore prepared as per DDA & Emaar regulation, with design approval obtained from DDA and Emaar so the community and authority approvals are handled together.",
      },
      {
        question: "What does the client need to provide for this approval?",
        answer:
          "The client provides the existing drawings, documents and green files. Wasleen prepares the drawing set as per DDA & Emaar regulation and handles the DDA and Emaar design approval and inspection applications.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, an inspection failure or a design revision, and VAT is separate as stated in the limiting conditions of quotation LML/QTN/1115.",
      },
      {
        question: "Does the quotation commit to a fixed completion timeline?",
        answer:
          "No. Unlike some Arabian Ranches quotations, LML/QTN/1115 does not state a completion window in its limiting conditions, so the programme depends on the documents supplied and the DDA and Emaar approval process.",
      },
      {
        question: "What is the payment schedule for this DDA & Emaar approval quotation?",
        answer:
          "Payment is 50% in advance before starting the work, 40% during work progress and 10% after completion of the work, as stated in quotation LML/QTN/1115.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 9 June 2026 for AED 22,000; the approval scope is engaged and the final approval is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/dda-emaar-approval-arabian-ranches/hero.webp",
        alt: "Blueprint drawing for a DDA & Emaar approval in Arabian Ranches, Dubai",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/dda-emaar-approval-arabian-ranches/documents.webp",
        alt: "Blueprint document checklist for a DDA & Emaar approval in Arabian Ranches",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/villa-renovation-approval-dubai.webp",
        alt: "Villa renovation approval process for a residential DDA & Emaar approval in Arabian Ranches",
        caption: "DDA & Emaar approval for a property in Arabian Ranches, Dubai",
        width: 1376,
        height: 768,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "emaar-community-approval",
      "interior-fit-out-approval",
      "dubai-municipality-completion-certificate",
    ],
    relatedGuideSlugs: [
      "emaar-community-design-guidelines",
      "interior-fit-out-permit-process",
      "cad-drawing-standards-dubai-guide",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "business-center-dda-dcd-approval",
      "dda-approval-dubai-contracting-renovation",
      "dm-dcd-approval-dubai-marina-apartment",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-06-09",
    lastUpdated: "2026-09-07",
    publishStatus: "live",
  },
  {
    slug: "dda-dcd-approval-business-bay",
    projectTitle: "DDA & DCD Approval for a Property in Business Bay, Dubai",
    seoTitle: "DDA & DCD Approval in Business Bay",
    description:
      "AED 7,000 DDA & DCD approval quote at Business Bay, Dubai: drawings, design approval, inspection and completion certificate. Get a free quote today.",
    sourceRef: "LML/QTN/1118",
    consentGranted: false,
    clientLabel: "Confidential client — Commercial property",
    projectStatus: "quoted",
    authorities: ["DDA", "Dubai Civil Defence"],
    primaryApprovalSlug: "dda-approval",
    projectType: "DDA & DCD approval",
    location: "Business Bay, Dubai",
    sector: "Commercial",
    directAnswer:
      "This case study covers the quoted DDA & DCD approval for a property in Business Bay, Dubai. The AED 7,000 quotation, LML/QTN/1118 issued on 18 June 2026, covers preparing the drawings as per DDA and DCD regulation, obtaining design approval from the Dubai Development Authority (DDA) and Dubai Civil Defence (DCD), and conducting the inspection that releases the completion certificate.",
    stats: [
      { label: "Authorities", value: "DDA & DCD" },
      { label: "Quoted fee", value: "AED 7,000" },
      { label: "Scope", value: "Drawings, approval & inspection" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "Business Bay is a DDA master community of high-rise towers in central Dubai, and this quotation covers the DDA & DCD approval path a property there needs before fit-out work can be certified. The approval subject combines the Dubai Development Authority (DDA), which governs design approval within the community, with Dubai Civil Defence (DCD), which reviews the fire and life-safety aspects of the design, so one drawing set has to satisfy both regulators and be followed by an inspection that releases the completion certificate.\nThe AED 7,000 fee is defined around inputs the client controls. The client supplies all other existing drawings, documents and green files; exceptional approval requirements, an inspection failure or a design revision each carry an additional charge; and VAT is separate. The quotation also notes that if an NOC is required from the tower's building management, the price may differ — so confirming the building-management position early is what keeps the quoted AED 7,000 realistic. No fixed completion timeline is committed in the quotation.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and document review",
        description:
          "Review the existing drawings, documents and green files supplied by the client, and confirm the current condition of the property in Business Bay, Dubai.",
      },
      {
        step: 2,
        title: "Confirm building management requirements",
        description:
          "Confirm whether an NOC from the tower's building management is required, since quotation LML/QTN/1118 states the price may differ if it is.",
      },
      {
        step: 3,
        title: "Prepare drawings as per DDA and DCD regulation",
        description:
          "Prepare the drawing set so it meets both Dubai Development Authority and Dubai Civil Defence regulation for the Business Bay property.",
      },
      {
        step: 4,
        title: "Obtain design approval from DDA and DCD",
        description:
          "Submit the drawing set and supporting documents, and follow up until design approval is obtained from the DDA and DCD.",
      },
      {
        step: 5,
        title: "Conduct inspection with DDA & DCD",
        description:
          "Arrange and attend the inspection with the DDA and DCD, and resolve any findings so the inspection passes.",
      },
      {
        step: 6,
        title: "Release the completion certificate",
        description:
          "Once the inspection passes, finalise the DDA & DCD documentation and release the completion certificate.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1118 issued on 18 June 2026 for the DDA & DCD approval at AED 7,000.",
        state: "approved",
        date: "2026-06-18",
      },
      {
        title: "Document & drawing review",
        detail:
          "Review the existing drawings, documents and green files supplied by the client.",
        state: "pending",
      },
      {
        title: "Building management requirements",
        detail:
          "Confirm whether an NOC from the tower's building management is required for the Business Bay property.",
        state: "pending",
      },
      {
        title: "Drawings prepared",
        detail: "Drawing set prepared as per DDA and DCD regulation.",
        state: "pending",
      },
      {
        title: "Design approval",
        detail:
          "Design approval to be obtained from the Dubai Development Authority and Dubai Civil Defence.",
        state: "pending",
      },
      {
        title: "Inspection",
        detail: "DDA & DCD inspection to be conducted once the drawings are approved.",
        state: "pending",
      },
      {
        title: "Completion",
        detail: "Completion certificate to be released after the inspection passes.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Trade licence",
        description: "Client's valid trade licence for the business occupying the Business Bay property.",
        providedBy: "client",
      },
      {
        document: "Title deed or tenancy",
        description:
          "Title deed or tenancy evidence for the property in Business Bay, Dubai.",
        providedBy: "client",
      },
      {
        document: "Existing drawings and green files",
        description:
          "Existing drawings, documents and green files required for the DDA & DCD approval.",
        providedBy: "client",
      },
      {
        document: "Building management NOC",
        description:
          "If required by the tower's building management, the NOC is confirmed up front — quotation LML/QTN/1118 notes the price may differ where it is needed.",
        providedBy: "client",
      },
      {
        document: "Drawing set as per DDA and DCD regulation",
        description:
          "Drawings prepared to meet both Dubai Development Authority and Dubai Civil Defence regulation for the Business Bay property.",
        providedBy: "wasleen",
      },
      {
        document: "DDA & DCD applications",
        description:
          "Design approval and inspection applications submitted to the Dubai Development Authority and Dubai Civil Defence.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "18 June 2026",
      },
      {
        stage: "Drawings preparation",
        planned: "To be confirmed",
        actual: "—",
        note: "No timeline commitment is stated in quotation LML/QTN/1118",
      },
      {
        stage: "Design approval (DDA & DCD)",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA & DCD timelines",
      },
      {
        stage: "Inspection (DDA & DCD)",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA & DCD timelines",
      },
      {
        stage: "Completion certificate",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA & DCD timelines",
      },
    ],
    quotedFee: "AED 7,000",
    feeAmountAED: 7000,
    feeIncluded: [
      "Preparing drawings as per DDA and DCD regulation",
      "Obtaining design approval from DDA and DCD",
      "Conducting inspection from DDA & DCD, releasing completion certificate",
    ],
    proTips: [
      {
        title: "Prepare one drawing set to both DDA and DCD regulation",
        body: "The approval subject is DDA & DCD, so the same drawing set must satisfy the Dubai Development Authority and the Dubai Civil Defence fire and life-safety requirements. Aligning the drawings to both regulations before submission avoids a design revision and the additional charge that follows it.",
      },
      {
        title: "Confirm the building management NOC before committing",
        body: "Quotation LML/QTN/1118 states the price may differ if an NOC is required from the tower's building management. Handing over the full existing drawings, documents and green files and confirming the NOC position up front keeps the quoted AED 7,000 fee as close to final as possible.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 7,000" },
      {
        label: "Approval authority",
        value: "Dubai Development Authority (DDA) & Dubai Civil Defence (DCD)",
      },
      {
        label: "Scope",
        value: "Drawings, DDA & DCD design approval & inspection",
      },
    ],
    faqs: [
      {
        question: "What does the AED 7,000 DDA & DCD approval quotation include?",
        answer:
          "The quotation covers preparing the drawings as per DDA and DCD regulation, obtaining design approval from the Dubai Development Authority (DDA) and Dubai Civil Defence (DCD), and conducting the inspection that releases the completion certificate.",
      },
      {
        question: "Which authorities are involved in this Business Bay approval?",
        answer:
          "The Dubai Development Authority (DDA) governs design approval within Business Bay and Dubai Civil Defence (DCD) reviews the fire and life-safety aspects, with both authorities carrying out the inspection that releases the completion certificate, as stated in quotation LML/QTN/1118.",
      },
      {
        question: "Why does a Business Bay property need both DDA and DCD approval?",
        answer:
          "Business Bay is a DDA master community, so the DDA issues the design approval for work in the community. Dubai Civil Defence approval is also required so the fire and life-safety elements of the design are reviewed and signed off before the completion certificate can be released.",
      },
      {
        question: "What does the client need to provide for this approval?",
        answer:
          "The client provides the existing drawings, documents and green files, and, if required by the tower's building management, the building management NOC. Wasleen prepares the drawing set as per DDA and DCD regulation and handles the DDA and DCD approval applications.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, an inspection failure or a design revision, and VAT is separate as stated in the limiting conditions of quotation LML/QTN/1118. The quotation also notes the price may differ if an NOC is required from the building management.",
      },
      {
        question: "Does the quotation commit to a fixed completion timeline?",
        answer:
          "No. Quotation LML/QTN/1118 does not state a completion window, so the programme depends on the documents supplied, the building management NOC position and the DDA and DCD approval process.",
      },
      {
        question: "What is the payment schedule for this DDA & DCD approval quotation?",
        answer:
          "Payment is 50% in advance before starting the work, 40% during work progress and 10% after completion of the work, as stated in quotation LML/QTN/1118.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 18 June 2026 for AED 7,000; the approval scope is engaged and the final approval is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/dda-dcd-approval-business-bay/hero.webp",
        alt: "Blueprint drawing for a DDA & DCD approval in Business Bay, Dubai",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/dda-dcd-approval-business-bay/documents.webp",
        alt: "Blueprint document checklist for a DDA & DCD approval in Business Bay",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/interior-fit-out-approval-consultants-in-dubai.webp",
        alt: "Interior fit-out approval consultants in Dubai reviewing drawings for a DDA & DCD approval in Business Bay",
        caption: "Preparing a DDA & DCD approval submission for a property in Business Bay, Dubai",
        width: 2336,
        height: 1760,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "dubai-civil-defense-approval",
      "interior-fit-out-approval",
      "dubai-municipality-completion-certificate",
    ],
    relatedGuideSlugs: [
      "dcd-fire-safety-approval-documents",
      "interior-fit-out-permit-process",
      "cad-drawing-standards-dubai-guide",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "business-center-dda-dcd-approval",
      "dcd-approval-burlington-tower-3",
      "dda-approval-dubai-contracting-renovation",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-06-18",
    lastUpdated: "2026-09-07",
    publishStatus: "live",
  },
  {
    slug: "dcd-as-built-drawings-showroom-dubai-design-district",
    projectTitle: "DCD As-Built Drawings for a Showroom in D3, Dubai",
    seoTitle: "DCD As-Built Drawings for a D3 Showroom",
    description:
      "Prepare DCD as-built drawings for a ground-floor showroom in Building 5, D3 Dubai from an AED 4,500 quote: site visit, as-built survey and DCD-ready drawings.",
    sourceRef: "LML/QTN/1119-26",
    consentGranted: false,
    clientLabel: "Confidential client — Showroom in D3",
    projectStatus: "quoted",
    authorities: ["Dubai Civil Defence"],
    primaryApprovalSlug: "dubai-civil-defense-approval",
    projectType: "DCD as-built drawings preparation",
    location: "Building 5, Dubai Design District (D3), Dubai",
    sector: "Commercial",
    directAnswer:
      "This case study covers an AED 4,500 quotation, LML/QTN/1119-26 issued on 18 June 2026, to prepare DCD as-built drawings for a ground-floor showroom (GF 01) in Building 5 of Dubai Design District (D3). The fee covers a site visit, collecting the site as-built and existing drawings and details, and preparing the DCD drawings as per the regulations, with any required revision included.",
    stats: [
      { label: "Authorities", value: "Dubai Civil Defence" },
      { label: "Quoted fee", value: "AED 4,500" },
      { label: "Scope", value: "Site visit, as-built & DCD drawings" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "Dubai Design District (D3) is a creative community of showrooms and design studios, and this ground-floor showroom at Building 5 needed an as-built drawing set prepared for DCD approval. Because the space had already been fitted out, the drawings had to record the built condition rather than the original layout, so the site visit and the collection of the existing as-built and construction drawings were the foundation of the set.\nThe AED 4,500 fee is defined around inputs the client controls. The client supplies all other existing drawings, documents and green files; any revision required while preparing the DCD drawing set is included in the fee; exceptional approval requirements, an inspection failure or a design revision each carry an additional charge; VAT is separate; and the quotation notes that if an NOC is required from the building management, the price may differ. No fixed completion timeline is committed in the quotation.",
    solutionSteps: [
      {
        step: 1,
        title: "Conduct a site visit",
        description:
          "Visit the ground-floor showroom at Building 5, Dubai Design District (D3), and confirm the current built condition of the space.",
      },
      {
        step: 2,
        title: "Collect as-built and existing drawings and details",
        description:
          "Gather the site as-built and existing drawings and details, together with the other existing drawings, documents and green files supplied by the client.",
      },
      {
        step: 3,
        title: "Prepare the DCD drawing set as per regulations",
        description:
          "Prepare the DCD as-built drawings as per Dubai Civil Defence regulations so the set is ready for the DCD approval of the showroom.",
      },
      {
        step: 4,
        title: "Incorporate required revisions",
        description:
          "Apply any revision required to finalise the DCD drawing set — revisions are included in the quoted AED 4,500 fee per quotation LML/QTN/1119-26.",
      },
      {
        step: 5,
        title: "Confirm building management requirements",
        description:
          "Confirm whether an NOC from the building management is required, since quotation LML/QTN/1119-26 states the price may differ where it is.",
      },
      {
        step: 6,
        title: "Finalise and hand over the approved drawing set",
        description:
          "Finalise the DCD-approved as-built drawing set; the final payment under the quotation is due upon receiving the final approval.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1119-26 issued on 18 June 2026 for preparation of DCD as-built drawings for the showroom at AED 4,500.",
        state: "approved",
        date: "2026-06-18",
      },
      {
        title: "Site visit",
        detail:
          "Visit the ground-floor showroom at Building 5, Dubai Design District (D3) to record the built condition.",
        state: "pending",
      },
      {
        title: "As-built & existing drawing collection",
        detail:
          "Collect the site as-built and existing drawings and details, and the existing drawings, documents and green files supplied by the client.",
        state: "pending",
      },
      {
        title: "DCD drawings preparation",
        detail:
          "Prepare the DCD as-built drawing set as per Dubai Civil Defence regulations.",
        state: "pending",
      },
      {
        title: "Revisions incorporated",
        detail:
          "Apply any revision required to finalise the DCD drawing set, included in the quoted fee.",
        state: "pending",
      },
      {
        title: "Building management requirements",
        detail:
          "Confirm whether an NOC from the building management is required for the D3 showroom.",
        state: "pending",
      },
      {
        title: "Final approval",
        detail:
          "Receive the final approval of the DCD as-built drawing set for the showroom.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Existing drawings, documents and green files",
        description:
          "All other existing drawings, documents and green files are to be given by the client, as stated in the limiting conditions of quotation LML/QTN/1119-26.",
        providedBy: "client",
      },
      {
        document: "Site as-built drawings and details",
        description:
          "The as-built and existing drawings and details of the showroom collected during the site visit.",
        providedBy: "client",
      },
      {
        document: "Showroom access for the site visit",
        description:
          "Access to the ground-floor showroom at Building 5, Dubai Design District (D3) so the site visit can be conducted.",
        providedBy: "client",
      },
      {
        document: "Building management NOC",
        description:
          "If required by the building management, the NOC is confirmed up front — quotation LML/QTN/1119-26 notes the price may differ where it is needed.",
        providedBy: "client",
      },
      {
        document: "DCD as-built drawing set",
        description:
          "The DCD drawings prepared as per Dubai Civil Defence regulations for the showroom approval.",
        providedBy: "wasleen",
      },
      {
        document: "Approved DCD drawings",
        description:
          "The finalised DCD-approved drawing set, delivered once the final approval is received.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "18 June 2026",
      },
      {
        stage: "Site visit & as-built collection",
        planned: "To be confirmed",
        actual: "—",
        note: "No timeline commitment is stated in quotation LML/QTN/1119-26",
      },
      {
        stage: "DCD drawings preparation",
        planned: "To be confirmed",
        actual: "—",
        note: "No timeline commitment is stated in quotation LML/QTN/1119-26",
      },
      {
        stage: "Revisions & finalisation",
        planned: "To be confirmed",
        actual: "—",
        note: "Revisions required are included in the quoted fee",
      },
      {
        stage: "Final approval",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DCD drawing approval timelines",
      },
    ],
    quotedFee: "AED 4,500",
    feeAmountAED: 4500,
    feeIncluded: [
      "Conducting a site visit",
      "Collecting the site as-built and existing drawings and details",
      "Preparation of DCD drawings as per the regulations (any revision required included)",
    ],
    proTips: [
      {
        title: "Survey the as-built condition before drawing",
        body: "The DCD drawing set must record the actual fitted-out condition of the showroom, not the original plan. An accurate site survey and a complete as-built and existing drawing set at the start reduce the revisions DCD may ask for and keep the quoted AED 4,500 fee realistic.",
      },
      {
        title: "Confirm the building-management NOC early",
        body: "Quotation LML/QTN/1119-26 states the price may differ if an NOC is required from the building management. Confirming that requirement and handing over the existing drawings, documents and green files up front avoids a price change later in the DCD drawings process.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 4,500" },
      {
        label: "Approval authority",
        value: "Dubai Civil Defence (DCD)",
      },
      {
        label: "Scope",
        value: "DCD as-built drawings preparation for a D3 showroom",
      },
    ],
    faqs: [
      {
        question: "What does the AED 4,500 DCD drawings quotation include?",
        answer:
          "The quotation covers conducting a site visit, collecting the site as-built and existing drawings and details, and preparing the DCD drawings as per the regulations, with any revision required included, as stated in quotation LML/QTN/1119-26.",
      },
      {
        question: "Which authority is involved in this DCD drawings project?",
        answer:
          "The drawings are prepared for Dubai Civil Defence (DCD) approval of the ground-floor showroom at Building 5, Dubai Design District (D3), Dubai.",
      },
      {
        question: "Why does a showroom in D3 need DCD as-built drawings?",
        answer:
          "Because the showroom had already been fitted out, the DCD approval needs an as-built drawing set that records the actual built condition of the space, prepared as per Dubai Civil Defence regulations.",
      },
      {
        question: "What does the client need to provide for these DCD drawings?",
        answer:
          "The client provides all other existing drawings, documents and green files, access for the site visit, and the building management NOC if it is required. Wasleen conducts the site visit, collects the as-built details and prepares the DCD drawing set.",
      },
      {
        question: "Are drawing revisions included in the quoted fee?",
        answer:
          "Yes. Quotation LML/QTN/1119-26 states that any revision required while preparing the DCD drawings is included in the AED 4,500 fee.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, an inspection failure or a design revision, and VAT is separate, as stated in the limiting conditions of quotation LML/QTN/1119-26. The price may also differ if an NOC is required from the building management.",
      },
      {
        question: "Does the quotation commit to a completion timeline?",
        answer:
          "No. Quotation LML/QTN/1119-26 does not state a completion window, so the programme depends on the as-built details collected, the documents supplied and the DCD review of the drawing set.",
      },
      {
        question: "What is the payment schedule for this DCD drawings quotation?",
        answer:
          "Payment is 50% in advance upon confirmation, 40% as progressive payments upon drawing handover and 10% as final payment upon receiving the final approval, as stated in quotation LML/QTN/1119-26.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/dcd-as-built-drawings-showroom-dubai-design-district/hero.webp",
        alt: "Blueprint as-built drawing prepared for a DCD approval of a showroom in D3, Dubai",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/dcd-as-built-drawings-showroom-dubai-design-district/documents.webp",
        alt: "Blueprint document checklist for DCD as-built drawings of a showroom in D3",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/2d-drawings-for-dcd-approvals-in-dubai.webp",
        alt: "2D drawings prepared for DCD approvals in Dubai for a showroom as-built set in D3",
        caption: "Preparing DCD as-built drawings for a showroom in Dubai Design District (D3)",
        width: 2336,
        height: 1760,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "dubai-civil-defense-approval",
      "interior-fit-out-approval",
      "dubai-municipality-completion-certificate",
    ],
    relatedGuideSlugs: [
      "dcd-fire-safety-approval-documents",
      "cad-drawing-standards-dubai-guide",
      "interior-fit-out-permit-process",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "dcd-approval-burlington-tower-3",
      "fire-fighting-dcd-approval-jebel-ali",
      "dm-dcd-approval-dubai-marina-apartment",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-06-18",
    lastUpdated: "2026-09-07",
    publishStatus: "live",
  },
  {
    slug: "dso-dcd-office-approval-dubai-silicon-oasis",
    projectTitle: "DSO & DCD Office Approval in Dubai Silicon Oasis",
    seoTitle: "DSO & DCD Office Approval in Dubai",
    description:
      "DSO & DCD office approval in Dubai Silicon Oasis quoted at AED 10,000: registration, drawing modification, NOC and inspection fees. Contact us today.",
    sourceRef: "LML/QTN/1120",
    consentGranted: false,
    clientLabel: "Confidential client — Institutional offices in Dubai Silicon Oasis",
    projectStatus: "quoted",
    authorities: ["Dubai Silicon Oasis Authority", "Dubai Civil Defence"],
    primaryApprovalSlug: "dubai-silicon-oasis-approval",
    projectType: "DSO & DCD office approval",
    location: "Dubai Silicon Oasis",
    sector: "Commercial",
    directAnswer:
      "This case study covers quotation LML/QTN/1120 issued on 19 June 2026 for DSO & DCD approval of the 1st and 2nd floor offices of an institutional client in Dubai Silicon Oasis. The AED 10,000 fee covers the DSO registration, drawing modification, obtaining the NOC from DSO & DCD, and conducting the inspection to release the completion certificate.",
    stats: [
      { label: "Authorities", value: "DSO & Dubai Civil Defence" },
      { label: "Quoted fee", value: "AED 10,000" },
      { label: "Scope", value: "Registration, drawings, NOC & inspection" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "Dubai Silicon Oasis is a technology free zone with its own authority, so an office fit-out approval inside the community runs through Dubai Silicon Oasis Authority (DSO) together with Dubai Civil Defence (DCD) for the fire and life-safety elements of the scheme. This project covers the 1st and 2nd floor offices of an institutional client in Dubai Silicon Oasis, and quotation LML/QTN/1120 issued on 19 June 2026 itemises the AED 10,000 fee into four lines: DSO registration, drawing modification, obtaining the NOC from DSO & DCD, and conducting the inspection and releasing the completion certificate.\nThe client supplies all other existing drawings, documents and green files; exceptional approval requirements and any inspection failure or design revision are charged extra; VAT is separate; and any additional works are charged extra. Payment follows a 50% advance, 40% progressive and 10% final schedule, and the quotation does not commit to a fixed completion timeline.",
    solutionSteps: [
      {
        step: 1,
        title: "Review scope and collect the client's documents",
        description:
          "Confirm the 1st and 2nd floor office scope and collect all other existing drawings, documents and green files supplied by the client as the basis for the DSO & DCD approval.",
      },
      {
        step: 2,
        title: "Register the project with DSO",
        description:
          "Register the project with Dubai Silicon Oasis Authority; the AED 2,000 DSO registration fee line in quotation LML/QTN/1120 covers this stage.",
      },
      {
        step: 3,
        title: "Prepare and modify the drawings for DSO & DCD",
        description:
          "Prepare the fit-out drawings for the two office floors and apply the drawing modifications required by DSO & DCD; the AED 3,000 drawing modification line covers this.",
      },
      {
        step: 4,
        title: "Obtain the NOC from DSO & DCD",
        description:
          "Obtain the No Objection Certificates required from Dubai Silicon Oasis Authority and Dubai Civil Defence as the approval proceeds; the AED 3,000 NOC line covers this.",
      },
      {
        step: 5,
        title: "Conduct the inspection and release the completion certificate",
        description:
          "Coordinate the DSO & DCD inspection of the completed office floors and release the completion certificate; the AED 2,000 inspection and completion line covers this.",
      },
      {
        step: 6,
        title: "Hand over and settle the final payment",
        description:
          "Hand over the approved documents and settle the final 10% payment under the 50% advance, 40% progressive and 10% final schedule of quotation LML/QTN/1120.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1120 issued on 19 June 2026 for DSO & DCD approval of the 1st and 2nd floor offices in Dubai Silicon Oasis at AED 10,000.",
        state: "approved",
        date: "2026-06-19",
      },
      {
        title: "Scope and documents confirmed",
        detail:
          "Client supplies all other existing drawings, documents and green files as the basis for the DSO & DCD approval.",
        state: "pending",
      },
      {
        title: "DSO registration",
        detail:
          "Project registered with Dubai Silicon Oasis Authority; the AED 2,000 registration fee is included in the quotation.",
        state: "pending",
      },
      {
        title: "Drawing modification",
        detail:
          "Fit-out drawings for the 1st and 2nd floor offices prepared and modified for the DSO & DCD approval; the AED 3,000 drawing modification line covers this.",
        state: "pending",
      },
      {
        title: "NOC from DSO & DCD",
        detail:
          "No Objection Certificates obtained from Dubai Silicon Oasis Authority and Dubai Civil Defence; the AED 3,000 NOC line covers this.",
        state: "pending",
      },
      {
        title: "Inspection and completion certificate",
        detail:
          "DSO & DCD inspection conducted and the completion certificate released; the AED 2,000 inspection and completion line covers this.",
        state: "pending",
      },
      {
        title: "Handover and final payment",
        detail:
          "Approved documents handed over and the final 10% payment settled on completion.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "All other existing drawings, documents and green files",
        description:
          "The full existing project drawing and document set supplied by the client, as the basis for the DSO & DCD approval of the two office floors.",
        providedBy: "client",
      },
      {
        document: "Fit-out scope for the 1st and 2nd floor offices",
        description:
          "Confirmation of the fit-out scope and layout intent for the 1st and 2nd floor offices in Dubai Silicon Oasis so the drawing modification work can start.",
        providedBy: "client",
      },
      {
        document: "Premises access for the inspection",
        description:
          "Access to the fitted-out office floors in Dubai Silicon Oasis so the DSO & DCD inspection can be conducted and the completion certificate released.",
        providedBy: "client",
      },
      {
        document: "Modified drawing set",
        description:
          "The fit-out drawings prepared and modified for the DSO & DCD approval of the 1st and 2nd floor offices.",
        providedBy: "wasleen",
      },
      {
        document: "DSO & DCD NOCs",
        description:
          "The No Objection Certificates obtained from Dubai Silicon Oasis Authority and Dubai Civil Defence as the approval proceeds.",
        providedBy: "wasleen",
      },
      {
        document: "Completion certificate",
        description:
          "The completion certificate released after the DSO & DCD inspection of the fitted-out office floors.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "19 June 2026",
      },
      {
        stage: "DSO registration & drawing modification",
        planned: "To be confirmed",
        actual: "—",
        note: "No timeline commitment is stated in quotation LML/QTN/1120",
      },
      {
        stage: "NOC from DSO & DCD",
        planned: "To be confirmed",
        actual: "—",
        note: "No timeline commitment is stated in quotation LML/QTN/1120",
      },
      {
        stage: "Inspection & completion certificate",
        planned: "To be confirmed",
        actual: "—",
        note: "No timeline commitment is stated in quotation LML/QTN/1120",
      },
      {
        stage: "Handover",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DSO & DCD office approval timelines",
      },
    ],
    quotedFee: "AED 10,000",
    feeAmountAED: 10000,
    feeIncluded: [
      "DSO registration fee (AED 2,000)",
      "Drawing modification for the DSO & DCD approval (AED 3,000)",
      "Obtaining the NOC from DSO & DCD (AED 3,000)",
      "Conducting the inspection and releasing the completion certificate (AED 2,000)",
    ],
    proTips: [
      {
        title: "Provide the complete existing drawing and green-file set early",
        body:
          "Quotation LML/QTN/1120 assumes the client supplies all other existing drawings, documents and green files. Handing over a complete set at the start keeps the DSO & DCD approval moving and avoids delay while documents are chased during the registration and NOC stages of the two-floor office project.",
      },
      {
        title: "Plan for exceptional requirements and VAT outside the AED 10,000",
        body:
          "The quotation charges extra for any exceptional approval requirement and for any inspection failure or design revision, and VAT is separate. Confirming the scope up front and resolving drawing comments before inspection keeps the quoted AED 10,000 realistic for the DSO & DCD approval of the office floors.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 10,000" },
      { label: "Approval authorities", value: "DSO & Dubai Civil Defence" },
      { label: "Scope", value: "DSO & DCD approval for 1st & 2nd floor offices" },
    ],
    faqs: [
      {
        question: "What does the AED 10,000 DSO & DCD approval quotation include?",
        answer:
          "Quotation LML/QTN/1120 covers the DSO registration fee, drawing modification for the DSO & DCD approval, obtaining the NOC from DSO & DCD, and conducting the inspection and releasing the completion certificate for the 1st and 2nd floor offices in Dubai Silicon Oasis.",
      },
      {
        question: "Which authorities are involved in this office approval?",
        answer:
          "The approval runs through Dubai Silicon Oasis Authority (DSO) and Dubai Civil Defence (DCD). Dubai Silicon Oasis is a free zone with its own authority, and DCD covers the fire and life-safety elements of the office fit-out scheme.",
      },
      {
        question: "Why do offices in Dubai Silicon Oasis need DSO & DCD approval?",
        answer:
          "Because Dubai Silicon Oasis is a free zone community with its own authority, the office fit-out approval requires DSO's NOC and permitting process together with the DCD approval for fire and life safety before the completion certificate can be released.",
      },
      {
        question: "What does the client need to provide for this approval?",
        answer:
          "The client supplies all other existing drawings, documents and green files, confirms the fit-out scope for the 1st and 2nd floor offices, and provides access to the premises for the inspection. Wasleen handles the DSO registration, drawing modification, NOC from DSO & DCD, and the inspection and completion certificate.",
      },
      {
        question: "Are the drawing modifications included in the quoted fee?",
        answer:
          "Yes. The AED 3,000 drawing modification line in quotation LML/QTN/1120 covers preparing and modifying the fit-out drawings for the DSO & DCD approval of the two office floors.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Quotation LML/QTN/1120 charges extra for exceptional approval requirements and for any inspection failure or design revision, VAT is separate, and any additional works are charged extra, as stated in the limiting conditions.",
      },
      {
        question: "Does the quotation commit to a completion timeline?",
        answer:
          "No. Quotation LML/QTN/1120 does not state a completion window, so the programme depends on the documents supplied by the client and the DSO & DCD review and inspection of the office floors.",
      },
      {
        question: "What is the payment schedule for this quotation?",
        answer:
          "Payment follows a 50% advance upon confirmation, 40% as progressive payments during the work and 10% as the final payment on completion, as stated in quotation LML/QTN/1120.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/dso-dcd-office-approval-dubai-silicon-oasis/hero.webp",
        alt: "Blueprint approval drawings prepared for a DSO & DCD office approval in Dubai Silicon Oasis",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/dso-dcd-office-approval-dubai-silicon-oasis/documents.webp",
        alt: "Blueprint document checklist for the DSO & DCD office approval in Dubai Silicon Oasis",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/free-zone-community-noc-approval-dubai.webp",
        alt: "Free zone community NOC approval for office floors in Dubai Silicon Oasis",
        caption: "DSO & DCD approval for office floors in Dubai Silicon Oasis",
        width: 1376,
        height: 768,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "dubai-silicon-oasis-approval",
      "dubai-civil-defense-approval",
      "interior-fit-out-approval",
    ],
    relatedGuideSlugs: [
      "dso-fit-out-approval-guide",
      "dcd-fire-safety-approval-documents",
      "interior-fit-out-permit-process",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "dda-dcd-approval-business-bay",
      "business-center-dda-dcd-approval",
      "dcd-approval-burlington-tower-3",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-06-19",
    lastUpdated: "2026-09-07",
    publishStatus: "live",
  },
  {
    slug: "dda-dcd-approval-regional-hub-office-dubai",
    projectTitle: "DDA & DCD Approval for Regional Hub Offices in Dubai",
    seoTitle: "DDA & DCD Approval for Offices in Dubai",
    description:
      "AED 10,000 DDA & DCD approval quote for a Dubai regional hub office: drawings, design approval, inspection and completion certificate. Contact us today.",
    sourceRef: "LML/QTN/1126",
    consentGranted: false,
    clientLabel: "Confidential client — Regional hub offices in Dubai",
    projectStatus: "quoted",
    authorities: ["DDA", "Dubai Civil Defence"],
    primaryApprovalSlug: "dda-approval",
    projectType: "DDA & DCD approval",
    location: "Dubai",
    sector: "Commercial",
    directAnswer:
      "This case study covers the quoted DDA & DCD approval for the regional hub offices of a technical services company in Dubai. The AED 10,000 quotation, LML/QTN/1126 issued on 24 June 2026, covers preparing the drawings as per DDA and DCD regulation, obtaining design approval from the Dubai Development Authority (DDA) and Dubai Civil Defence (DCD), and conducting the inspection that releases the completion certificate.",
    stats: [
      { label: "Authorities", value: "DDA & DCD" },
      { label: "Quoted fee", value: "AED 10,000" },
      { label: "Scope", value: "Drawings, approval & inspection" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "This quotation covers the DDA & DCD approval path the client's regional hub offices in Dubai need before the fit-out can be certified. The approval subject combines the Dubai Development Authority (DDA), which issues the design approval for the offices, with Dubai Civil Defence (DCD), which reviews the fire and life-safety aspects of the design, so one drawing set has to satisfy both regulators and be followed by an inspection that releases the completion certificate.\nThe AED 10,000 fee is defined around inputs the client controls. The client supplies all other existing drawings, documents and green files; exceptional approval requirements, an inspection failure or a design revision each carry an additional charge; and VAT is separate. The quotation also notes that where an NOC is required from the building management, the price may differ — so confirming the building-management position early is what keeps the quoted AED 10,000 realistic. No fixed completion timeline is committed in the quotation.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and document review",
        description:
          "Review the existing drawings, documents and green files supplied by the client, and confirm the current condition of the regional hub offices in Dubai.",
      },
      {
        step: 2,
        title: "Confirm building management requirements",
        description:
          "Confirm whether an NOC from the building management is required, since quotation LML/QTN/1126 states the price may differ if it is.",
      },
      {
        step: 3,
        title: "Prepare drawings as per DDA and DCD regulation",
        description:
          "Prepare the drawing set so it meets both Dubai Development Authority and Dubai Civil Defence regulation for the offices.",
      },
      {
        step: 4,
        title: "Obtain design approval from DDA and DCD",
        description:
          "Submit the drawing set and supporting documents, and follow up until design approval is obtained from the DDA and DCD.",
      },
      {
        step: 5,
        title: "Conduct inspection with DDA & DCD",
        description:
          "Arrange and attend the inspection with the DDA and DCD, and resolve any findings so the inspection passes.",
      },
      {
        step: 6,
        title: "Release the completion certificate",
        description:
          "Once the inspection passes, finalise the DDA & DCD documentation and release the completion certificate.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1126 issued on 24 June 2026 for the DDA & DCD approval at AED 10,000.",
        state: "approved",
        date: "2026-06-24",
      },
      {
        title: "Document & drawing review",
        detail:
          "Review the existing drawings, documents and green files supplied by the client.",
        state: "pending",
      },
      {
        title: "Building management requirements",
        detail:
          "Confirm whether an NOC from the building management is required for the regional hub offices in Dubai.",
        state: "pending",
      },
      {
        title: "Drawings prepared",
        detail: "Drawing set prepared as per DDA and DCD regulation.",
        state: "pending",
      },
      {
        title: "Design approval",
        detail:
          "Design approval to be obtained from the Dubai Development Authority and Dubai Civil Defence.",
        state: "pending",
      },
      {
        title: "Inspection",
        detail: "DDA & DCD inspection to be conducted once the drawings are approved.",
        state: "pending",
      },
      {
        title: "Completion",
        detail: "Completion certificate to be released after the inspection passes.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Trade licence",
        description: "Client's valid trade licence for the business occupying the regional hub offices in Dubai.",
        providedBy: "client",
      },
      {
        document: "Title deed or tenancy",
        description:
          "Title deed or tenancy evidence for the regional hub offices in Dubai.",
        providedBy: "client",
      },
      {
        document: "Existing drawings and green files",
        description:
          "Existing drawings, documents and green files required for the DDA & DCD approval.",
        providedBy: "client",
      },
      {
        document: "Building management NOC",
        description:
          "If required by the building management, the NOC is confirmed up front — quotation LML/QTN/1126 notes the price may differ where it is needed.",
        providedBy: "client",
      },
      {
        document: "Drawing set as per DDA and DCD regulation",
        description:
          "Drawings prepared to meet both Dubai Development Authority and Dubai Civil Defence regulation for the regional hub offices.",
        providedBy: "wasleen",
      },
      {
        document: "DDA & DCD applications",
        description:
          "Design approval and inspection applications submitted to the Dubai Development Authority and Dubai Civil Defence.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "24 June 2026",
      },
      {
        stage: "Drawings preparation",
        planned: "To be confirmed",
        actual: "—",
        note: "No timeline commitment is stated in quotation LML/QTN/1126",
      },
      {
        stage: "Design approval (DDA & DCD)",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA & DCD timelines",
      },
      {
        stage: "Inspection (DDA & DCD)",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA & DCD timelines",
      },
      {
        stage: "Completion certificate",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA & DCD timelines",
      },
    ],
    quotedFee: "AED 10,000",
    feeAmountAED: 10000,
    feeIncluded: [
      "Preparing drawings as per DDA and DCD regulation",
      "Obtaining design approval from DDA and DCD",
      "Conducting inspection from DDA & DCD, releasing completion certificate",
    ],
    proTips: [
      {
        title: "Prepare one drawing set to both DDA and DCD regulation",
        body: "The approval subject is DDA & DCD, so the same drawing set must satisfy the Dubai Development Authority and the Dubai Civil Defence fire and life-safety requirements. Aligning the drawings to both regulations before submission avoids a design revision and the additional charge that follows it.",
      },
      {
        title: "Confirm the building management NOC before committing",
        body: "Quotation LML/QTN/1126 states the price may differ if an NOC is required from the building management. Handing over the full existing drawings, documents and green files and confirming the NOC position up front keeps the quoted AED 10,000 fee as close to final as possible.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 10,000" },
      {
        label: "Approval authority",
        value: "Dubai Development Authority (DDA) & Dubai Civil Defence (DCD)",
      },
      {
        label: "Scope",
        value: "Drawings, DDA & DCD design approval & inspection",
      },
    ],
    faqs: [
      {
        question: "What does the AED 10,000 DDA & DCD approval quotation include?",
        answer:
          "The quotation covers preparing the drawings as per DDA and DCD regulation, obtaining design approval from the Dubai Development Authority (DDA) and Dubai Civil Defence (DCD), and conducting the inspection that releases the completion certificate.",
      },
      {
        question: "Which authorities are involved in this Dubai office approval?",
        answer:
          "The Dubai Development Authority (DDA) issues the design approval for the regional hub offices and Dubai Civil Defence (DCD) reviews the fire and life-safety aspects, with both authorities carrying out the inspection that releases the completion certificate, as stated in quotation LML/QTN/1126.",
      },
      {
        question: "Why do the regional hub offices need both DDA and DCD approval?",
        answer:
          "The Dubai Development Authority issues the design approval for the offices within its governed areas in Dubai, while Dubai Civil Defence approval is also required so the fire and life-safety elements of the design are reviewed and signed off before the completion certificate can be released.",
      },
      {
        question: "What does the client need to provide for this approval?",
        answer:
          "The client provides the existing drawings, documents and green files and, where the building management requires it, the building management NOC. Wasleen prepares the drawing set as per DDA and DCD regulation and handles the DDA and DCD approval applications.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, an inspection failure or a design revision, and VAT is separate as stated in the limiting conditions of quotation LML/QTN/1126. The quotation also notes the price may differ if an NOC is required from the building management.",
      },
      {
        question: "Does the quotation commit to a fixed completion timeline?",
        answer:
          "No. Quotation LML/QTN/1126 does not state a completion window, so the programme depends on the documents supplied, the building management NOC position and the DDA and DCD approval process.",
      },
      {
        question: "What is the payment schedule for this DDA & DCD approval quotation?",
        answer:
          "Payment is 50% in advance before starting the work, 40% during work progress and 10% after completion of the work, as stated in quotation LML/QTN/1126.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 24 June 2026 for AED 10,000; the approval scope is engaged and the final approval is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/dda-dcd-approval-regional-hub-office-dubai/hero.webp",
        alt: "Blueprint drawing for a DDA & DCD approval for offices in Dubai",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/dda-dcd-approval-regional-hub-office-dubai/documents.webp",
        alt: "Blueprint document checklist for a DDA & DCD approval for offices in Dubai",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/interior-fit-out-approval-consultants-in-dubai.webp",
        alt: "Interior fit-out approval consultants in Dubai reviewing drawings for a DDA & DCD approval for offices",
        caption: "Preparing a DDA & DCD approval submission for regional hub offices in Dubai",
        width: 2336,
        height: 1760,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "dubai-civil-defense-approval",
      "interior-fit-out-approval",
      "dubai-municipality-completion-certificate",
    ],
    relatedGuideSlugs: [
      "dcd-fire-safety-approval-documents",
      "interior-fit-out-permit-process",
      "cad-drawing-standards-dubai-guide",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "dda-dcd-approval-business-bay",
      "business-center-dda-dcd-approval",
      "dcd-approval-burlington-tower-3",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-06-24",
    lastUpdated: "2026-09-07",
    publishStatus: "live",
  },
  {
    slug: "dda-damac-approval-dubai",
    projectTitle: "DDA & Damac Approval for a Residential Property in Dubai",
    seoTitle: "DDA & Damac Approval in Dubai",
    description:
      "AED 17,000 DDA & Damac approval quote for a property in Dubai: documents and drawings, DDA NOC, work permit and inspection. Get a free quote today.",
    sourceRef: "LML/QTN/1135",
    consentGranted: false,
    clientLabel: "Confidential client — Residential property owner in a Damac-managed community",
    projectStatus: "quoted",
    authorities: ["DDA"],
    primaryApprovalSlug: "dda-approval",
    projectType: "DDA & Damac approval",
    location: "DAMAC, Dubai",
    sector: "Residential",
    directAnswer:
      "This case study covers the quoted DDA & Damac approval for a residential property in a Damac-managed community in Dubai. The AED 17,000 quotation, LML/QTN/1135 issued on 2 July 2026, covers preparing and submitting documents and drawings to Damac and to the Dubai Development Authority (DDA), obtaining the DDA NOC and work permit, and conducting the final inspection from the DDA.",
    stats: [
      { label: "Authorities", value: "DDA & Damac" },
      { label: "Quoted fee", value: "AED 17,000" },
      { label: "Scope", value: "Drawings, NOC, permit & inspection" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "This quotation covers the DDA & Damac approval path a residential property in a Damac-managed community in Dubai needs before the works can be certified. The subject is DDA & Damac approval, so the work is split into two document sets: the documents and drawings are prepared and submitted to Damac, the community manager for the property, and a separate set is prepared and submitted to the Dubai Development Authority (DDA), which then issues the NOC, the work permit and the final inspection.\nThe AED 17,000 fee is defined around inputs the client controls. The client supplies all existing drawings, documents and green files; exceptional approval requirements, an inspection failure or a design revision each carry an additional charge; and VAT is separate. The quotation does not commit to a fixed completion timeline, so confirming the existing documents up front is what keeps the programme and the quoted price realistic.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and document review",
        description:
          "Review the existing drawings, documents and green files supplied by the client, and confirm the current condition of the residential property in the Damac-managed community in Dubai.",
      },
      {
        step: 2,
        title: "Prepare and submit documents and drawings to Damac",
        description:
          "Prepare the document and drawing set for Damac, the community manager for the property, and submit it as the first part of the DDA & Damac approval.",
      },
      {
        step: 3,
        title: "Obtain the NOC from DDA",
        description:
          "Obtain the NOC from the Dubai Development Authority (DDA) required for the property's DDA & Damac approval path.",
      },
      {
        step: 4,
        title: "Prepare and submit documents and drawings to DDA",
        description:
          "Prepare the document and drawing set for the Dubai Development Authority and submit it with the supporting documents.",
      },
      {
        step: 5,
        title: "Obtain the work permit from DDA",
        description:
          "Obtain the work permit from the Dubai Development Authority so the works at the residential property can proceed.",
      },
      {
        step: 6,
        title: "Conduct the final inspection with DDA",
        description:
          "Once the works are complete, arrange and attend the final inspection with the Dubai Development Authority, and resolve any findings so the inspection passes.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1135 issued on 2 July 2026 for the DDA & Damac approval at AED 17,000.",
        state: "approved",
        date: "2026-07-02",
      },
      {
        title: "Damac documents & drawings",
        detail:
          "Prepare and submit the documents and drawings to Damac, the community manager for the property.",
        state: "pending",
      },
      {
        title: "DDA NOC",
        detail:
          "Obtain the NOC from the Dubai Development Authority required for the approval path.",
        state: "pending",
      },
      {
        title: "DDA documents & drawings",
        detail:
          "Prepare and submit the documents and drawings to the Dubai Development Authority.",
        state: "pending",
      },
      {
        title: "Work permit",
        detail:
          "Obtain the work permit from the Dubai Development Authority for the works.",
        state: "pending",
      },
      {
        title: "Final inspection",
        detail:
          "Conduct the final inspection from the DDA once the works are complete.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Trade licence",
        description: "Client's valid trade licence.",
        providedBy: "client",
      },
      {
        document: "Title deed or tenancy",
        description:
          "Title deed or tenancy evidence for the residential property in the Damac-managed community in Dubai.",
        providedBy: "client",
      },
      {
        document: "Existing drawings and green files",
        description:
          "Existing drawings, documents and green files required for the DDA & Damac approval, supplied by the client per the limiting conditions.",
        providedBy: "client",
      },
      {
        document: "Damac documents and drawings",
        description:
          "The document and drawing set prepared and submitted to Damac as the community manager for the property.",
        providedBy: "wasleen",
      },
      {
        document: "DDA documents and drawings",
        description:
          "The document and drawing set prepared and submitted to the Dubai Development Authority.",
        providedBy: "wasleen",
      },
      {
        document: "DDA applications",
        description:
          "The NOC, work permit and final inspection applications handled with the Dubai Development Authority.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "2 July 2026",
      },
      {
        stage: "Damac documents & drawings submission",
        planned: "To be confirmed",
        actual: "—",
        note: "No timeline commitment is stated in quotation LML/QTN/1135",
      },
      {
        stage: "DDA NOC and work permit",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
      {
        stage: "Final inspection (DDA)",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
    ],
    quotedFee: "AED 17,000",
    feeAmountAED: 17000,
    feeIncluded: [
      "Preparing documents and drawings for Damac",
      "Submitting documents and drawings to Damac",
      "Obtaining the NOC from the Dubai Development Authority (DDA)",
      "Preparing documents and drawings for the DDA",
      "Submitting documents and drawings to the DDA",
      "Obtaining the work permit from the DDA",
      "Conducting the final inspection from the DDA",
    ],
    proTips: [
      {
        title: "Prepare the Damac and DDA document sets to match the quoted scope",
        body: "The DDA & Damac approval is split into two document sets in quotation LML/QTN/1135: documents and drawings are prepared and submitted to Damac and to the Dubai Development Authority, which then issues the NOC, the work permit and the final inspection. Confirming which existing drawings and green files the client can supply up front keeps the process aligned to the quoted AED 17,000 scope.",
      },
      {
        title: "Supply the complete existing documents to protect the AED 17,000 fee",
        body: "The limiting conditions charge extra for exceptional approval requirements, an inspection failure or a design revision, with VAT separate. Handing over the full existing drawings, documents and green files up front keeps the quoted AED 17,000 price final.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 17,000" },
      { label: "Approval authority", value: "Dubai Development Authority (DDA) & Damac" },
      {
        label: "Scope",
        value: "Damac and DDA documents & drawings, DDA NOC, work permit & final inspection",
      },
    ],
    faqs: [
      {
        question: "What does the AED 17,000 DDA & Damac approval quotation include?",
        answer:
          "The quotation covers preparing and submitting documents and drawings to Damac and to the Dubai Development Authority (DDA), obtaining the DDA NOC and work permit, and conducting the final inspection from the DDA.",
      },
      {
        question: "Which authorities are involved in this Dubai property approval?",
        answer:
          "Damac is the community manager for the residential property and receives the Damac documents and drawings, while the Dubai Development Authority (DDA) issues the NOC, the work permit and the final inspection, as stated in quotation LML/QTN/1135.",
      },
      {
        question: "Why does this approval require both Damac and DDA?",
        answer:
          "The property is in a Damac-managed community, so Damac reviews the community document and drawing submission, while the Dubai Development Authority (DDA) issues the NOC, the work permit and the final inspection for the works. Quotation LML/QTN/1135 handles both as a single DDA & Damac scope.",
      },
      {
        question: "What does the client need to provide for this approval?",
        answer:
          "The client provides the existing drawings, documents and green files, as set out in the limiting conditions. Wasleen prepares and submits the Damac and DDA document and drawing sets and handles the DDA NOC, work permit and final inspection applications.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, an inspection failure or a design revision, and VAT is separate as stated in the limiting conditions of quotation LML/QTN/1135.",
      },
      {
        question: "Does the quotation commit to a fixed completion timeline?",
        answer:
          "No. Quotation LML/QTN/1135 does not state a completion window, so the programme depends on the documents supplied and the Damac and DDA approval process, which runs through to the final inspection from the DDA.",
      },
      {
        question: "What is the payment schedule for this DDA & Damac approval quotation?",
        answer:
          "Payment is 50% in advance before starting the work, 40% during work progress and 10% after completion of the work, as stated in quotation LML/QTN/1135.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 2 July 2026 for AED 17,000; the approval scope is engaged and the final approval is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/case-studies/dda-damac-approval-dubai/hero.webp",
        alt: "Blueprint drawing for a DDA & Damac approval in Dubai",
        width: 1600,
        height: 900,
        placement: "hero",
      },
      {
        src: "/images/case-studies/dda-damac-approval-dubai/documents.webp",
        alt: "Blueprint document checklist for a DDA & Damac approval in Dubai",
        width: 1200,
        height: 900,
        placement: "documents",
      },
      {
        src: "/images/villa-renovation-approval-dubai.webp",
        alt: "Villa approval process for a residential DDA & Damac approval in Dubai",
        caption: "DDA & Damac approval for a residential property in a Damac-managed community in Dubai",
        width: 1376,
        height: 768,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "damac-properties-approval",
      "interior-fit-out-approval",
      "dubai-municipality-completion-certificate",
    ],
    relatedGuideSlugs: [
      "interior-fit-out-permit-process",
      "cad-drawing-standards-dubai-guide",
      "dcd-fire-safety-approval-documents",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "dda-emaar-approval-arabian-ranches",
      "dda-approval-dubai-contracting-renovation",
      "dda-approval-arabian-ranches-interior-modification",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-07-02",
    lastUpdated: "2026-09-07",
    publishStatus: "live",
  },
  /* ============================================================
     LML/QTN/1119 — Trakhees & DCD approval, Business Bay
     Source: WORK QUOTATION ref LML/QTN/1119 dated 18/06/2026
     (subject "QUOTATION FOR TRAKHEES & DCD APPROVAL"), location
     Business Bay, AED 10,000. projectStatus "quoted" (quotation
     only — no completion claim). publishStatus "live" — owner
     approved publication 2026-09-15 (Part 17.4 policy — same
     discipline as `dda-damac-approval-dubai`).
     Images: existing site library assets (no per-slug binaries),
     dims verified with scripts/get-webp-dims.mjs.
     ============================================================ */
  {
    slug: "trakhees-dcd-approval-business-bay",
    projectTitle: "Trakhees & DCD Approval for a Business Bay Commercial Unit",
    seoTitle: "Trakhees & DCD Approval in Business Bay",
    description:
      "AED 10,000 Trakhees & DCD approval quote for a Business Bay commercial unit: drawings, design approval and completion certificate. Get a free quote today.",
    sourceRef: "LML/QTN/1119",
    consentGranted: false,
    clientLabel: "Confidential client — Commercial unit in Business Bay, Dubai",
    projectStatus: "quoted",
    authorities: ["Trakhees", "Dubai Civil Defence"],
    primaryApprovalSlug: "dubai-civil-defense-approval",
    projectType: "Trakhees & DCD approval",
    location: "Business Bay, Dubai",
    sector: "Commercial",
    directAnswer:
      "This case study covers the quoted Trakhees & DCD approval for a commercial unit in Business Bay, Dubai. The AED 10,000 quotation, LML/QTN/1119 issued on 18 June 2026, covers preparing the drawings as per Trakhees and Dubai Civil Defence (DCD) regulation, obtaining design approval from both authorities, and conducting the inspection that releases the completion certificate.",
    stats: [
      { label: "Authorities", value: "Trakhees & DCD" },
      { label: "Quoted fee", value: "AED 10,000" },
      { label: "Scope", value: "Drawings, approval & inspection" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "This quotation covers the Trakhees & DCD approval path a commercial unit in Business Bay needs before the fit-out can be certified. The subject combines Trakhees, the Department of Planning and Development that issues planning and development approvals in the zones it governs, with Dubai Civil Defence (DCD), which reviews the fire and life-safety aspects of the design, so a single drawing set has to satisfy both regulators and be followed by an inspection that releases the completion certificate.\nThe AED 10,000 fee is defined around inputs the client controls. The client supplies all other existing drawings, documents and green files; exceptional approval requirements, an inspection failure or a design revision each carry an additional charge; and VAT is separate. Quotation LML/QTN/1119 also notes that where an NOC is required from the building management the price may differ, so confirming the building management position early is what keeps the quoted AED 10,000 realistic. No completion timeline is committed in the quotation.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and document review",
        description:
          "Review the existing drawings, documents and green files supplied by the client, and confirm the current condition of the commercial unit in Business Bay.",
      },
      {
        step: 2,
        title: "Confirm building management requirements",
        description:
          "Confirm whether an NOC from the building management is required, since quotation LML/QTN/1119 states the price may differ if it is.",
      },
      {
        step: 3,
        title: "Prepare drawings as per Trakhees and DCD regulation",
        description:
          "Prepare the drawing set so it meets both Trakhees and Dubai Civil Defence regulation for the commercial unit.",
      },
      {
        step: 4,
        title: "Obtain design approval from Trakhees and DCD",
        description:
          "Submit the drawing set and supporting documents, and follow up until design approval is obtained from Trakhees and the Dubai Civil Defence.",
      },
      {
        step: 5,
        title: "Conduct inspection with Trakhees & DCD",
        description:
          "Arrange and attend the inspection with Trakhees and the Dubai Civil Defence, and resolve any findings so the inspection passes.",
      },
      {
        step: 6,
        title: "Release the completion certificate",
        description:
          "Once the inspection passes, finalise the Trakhees & DCD documentation and release the completion certificate.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1119 issued on 18 June 2026 for the Trakhees & DCD approval at AED 10,000.",
        state: "approved",
        date: "2026-06-18",
      },
      {
        title: "Document & drawing review",
        detail:
          "Review the existing drawings, documents and green files supplied by the client.",
        state: "pending",
      },
      {
        title: "Building management requirements",
        detail:
          "Confirm whether an NOC from the building management is required for the commercial unit in Business Bay.",
        state: "pending",
      },
      {
        title: "Drawings prepared",
        detail: "Drawing set prepared as per Trakhees and DCD regulation.",
        state: "pending",
      },
      {
        title: "Design approval",
        detail:
          "Design approval to be obtained from Trakhees and the Dubai Civil Defence.",
        state: "pending",
      },
      {
        title: "Inspection",
        detail:
          "Trakhees & DCD inspection to be conducted once the drawings are approved.",
        state: "pending",
      },
      {
        title: "Completion",
        detail: "Completion certificate to be released after the inspection passes.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Trade licence",
        description:
          "Client's valid trade licence for the business occupying the commercial unit in Business Bay.",
        providedBy: "client",
      },
      {
        document: "Title deed or tenancy",
        description:
          "Title deed or tenancy evidence for the commercial unit in Business Bay.",
        providedBy: "client",
      },
      {
        document: "Existing drawings and green files",
        description:
          "Existing drawings, documents and green files required for the Trakhees & DCD approval.",
        providedBy: "client",
      },
      {
        document: "Building management NOC",
        description:
          "If required by the building management, the NOC is confirmed up front — quotation LML/QTN/1119 notes the price may differ where it is needed.",
        providedBy: "client",
      },
      {
        document: "Drawing set as per Trakhees and DCD regulation",
        description:
          "Drawings prepared to meet both Trakhees and Dubai Civil Defence regulation for the commercial unit.",
        providedBy: "wasleen",
      },
      {
        document: "Trakhees & DCD applications",
        description:
          "Design approval and inspection applications submitted to Trakhees and the Dubai Civil Defence.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "18 June 2026",
      },
      {
        stage: "Drawings preparation",
        planned: "To be confirmed",
        actual: "—",
        note: "No timeline commitment is stated in quotation LML/QTN/1119",
      },
      {
        stage: "Design approval (Trakhees & DCD)",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical Trakhees & DCD timelines",
      },
      {
        stage: "Inspection (Trakhees & DCD)",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical Trakhees & DCD timelines",
      },
      {
        stage: "Completion certificate",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical Trakhees & DCD timelines",
      },
    ],
    quotedFee: "AED 10,000",
    feeAmountAED: 10000,
    feeIncluded: [
      "Preparing drawings as per TRAKHEES and DCD regulation",
      "Obtaining design approval from TRAKHEES and DCD",
      "Conducting inspection from TRAKHEES & DCD, releasing completion certificate",
    ],
    proTips: [
      {
        title: "Prepare one drawing set to both Trakhees and DCD regulation",
        body: "The approval subject is Trakhees & DCD, so the same drawing set must satisfy the Trakhees planning and development requirements and the Dubai Civil Defence fire and life-safety requirements. Aligning the drawings to both regulations before submission avoids a design revision and the additional charge that follows it.",
      },
      {
        title: "Confirm the building management NOC before committing",
        body: "Quotation LML/QTN/1119 states the price may differ if an NOC is required from the building management. Handing over the full existing drawings, documents and green files and confirming the NOC position up front keeps the quoted AED 10,000 fee as close to final as possible.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 10,000" },
      {
        label: "Approval authority",
        value: "Trakhees & Dubai Civil Defence (DCD)",
      },
      {
        label: "Scope",
        value: "Drawings, Trakhees & DCD design approval & inspection",
      },
    ],
    faqs: [
      {
        question: "What does the AED 10,000 Trakhees & DCD approval quotation include?",
        answer:
          "The quotation covers preparing the drawings as per Trakhees and DCD regulation, obtaining design approval from Trakhees and the Dubai Civil Defence (DCD), and conducting the inspection that releases the completion certificate.",
      },
      {
        question: "Which authorities are involved in this Business Bay approval?",
        answer:
          "Trakhees reviews the planning and development submission for the commercial unit while the Dubai Civil Defence (DCD) reviews the fire and life-safety aspects of the design, and both authorities carry out the inspection that releases the completion certificate, as stated in quotation LML/QTN/1119.",
      },
      {
        question: "What is Trakhees and why is it part of this approval?",
        answer:
          "Trakhees is the Department of Planning and Development that issues planning and development approvals in the zones it governs in Dubai. The subject of quotation LML/QTN/1119 is a Trakhees & DCD approval, so the submission has to satisfy both the Trakhees requirements and the Dubai Civil Defence fire and life-safety requirements.",
      },
      {
        question: "What does the client need to provide for this approval?",
        answer:
          "The client provides the existing drawings, documents and green files and, where the building management requires it, the building management NOC. Wasleen prepares the drawing set as per Trakhees and DCD regulation and handles the applications with both authorities.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, an inspection failure or a design revision, and VAT is separate as stated in the limiting conditions of quotation LML/QTN/1119. The quotation also notes the price may differ if an NOC is required from the building management.",
      },
      {
        question: "Does the quotation commit to a fixed completion timeline?",
        answer:
          "No. Quotation LML/QTN/1119 does not state a completion window, so the programme depends on the documents supplied, the building management NOC position and the Trakhees and DCD review and inspection.",
      },
      {
        question: "What is the payment schedule for this Trakhees & DCD approval quotation?",
        answer:
          "Payment is 50% in advance before starting the work, 40% during work progress and 10% after completion of the work, as stated in quotation LML/QTN/1119.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 18 June 2026 for AED 10,000; the approval scope is engaged and the final approval is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/blueprint-drawing-submission-approval-dubai.webp",
        alt: "Blueprint drawing for a Trakhees & DCD approval for a commercial unit in Business Bay, Dubai",
        width: 1376,
        height: 768,
        placement: "hero",
      },
      {
        src: "/images/dcd-fire-safety-noc-dubai-civil-defense.webp",
        alt: "DCD fire and safety document checklist for a Trakhees & DCD approval in Business Bay",
        width: 1584,
        height: 672,
        placement: "documents",
      },
      {
        src: "/images/commercial-office-fit-out-approval-dubai.webp",
        alt: "Commercial unit approval in Business Bay processed for Trakhees and Dubai Civil Defence",
        caption: "Trakhees & DCD approval for a commercial unit in Business Bay, Dubai",
        width: 1376,
        height: 768,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "dubai-civil-defense-approval",
      "interior-fit-out-approval",
      "jebel-ali-free-zone-approval",
    ],
    relatedGuideSlugs: [
      "dcd-fire-safety-approval-documents",
      "interior-fit-out-permit-process",
      "cad-drawing-standards-dubai-guide",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "nakheel-trakhees-approval-palm-jumeirah",
      "dda-dcd-approval-business-bay",
      "dcd-approval-burlington-tower-3",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-06-18",
    lastUpdated: "2026-09-14",
    publishStatus: "live",
  },
  /* ============================================================
     LML/QTN/1139 — DEWA, Trakhees, DCD, NOC & Food Safety
     approval, JVC
     Source: WORK QUOTATION ref LML/QTN/1139 dated 06/07/2026
     (subject "QUOTATION FOR APPROVALS", body "QUOTATION FOR
     DEWA,TRAKHEES,DCD,NOC,FOOD & SAFETY APPROVALS"), location
     JVC, Dubai, UAE, AED 13,500. projectStatus "quoted"
     (quotation only — no completion claim). publishStatus
     "live" after owner approval 2026-09-15 (Part 17.4 policy).
     Images: existing site library assets (no per-slug binaries),
     dims verified with scripts/get-webp-dims.mjs.
     ============================================================ */
  {
    slug: "dewa-trakhees-dcd-food-safety-approval-jvc",
    projectTitle:
      "DEWA, Trakhees, DCD, NOC & Food Safety Approval for a JVC Commercial Unit",
    seoTitle: "DEWA, Trakhees, DCD & Food Safety in JVC",
    description:
      "AED 13,500 DEWA, Trakhees, DCD, NOC and food safety approval quote for a JVC commercial unit: drawings, approvals and inspections. Get a free quote today.",
    sourceRef: "LML/QTN/1139",
    consentGranted: false,
    clientLabel: "Confidential client — Commercial unit in JVC, Dubai",
    projectStatus: "quoted",
    authorities: [
      "DEWA",
      "Trakhees",
      "Dubai Civil Defence",
      "Dubai Municipality",
    ],
    primaryApprovalSlug: "dewa-approval",
    projectType: "DEWA, Trakhees, DCD, NOC & food safety approval",
    location: "JVC, Dubai",
    sector: "Commercial",
    directAnswer:
      "This case study covers the quoted multi-authority approval for a commercial unit in JVC, Dubai, combining DEWA, Trakhees, Dubai Civil Defence (DCD), food and safety certification and the building management NOC. The AED 13,500 quotation, LML/QTN/1139 issued on 6 July 2026, covers preparing the drawings as per each authority's regulation, obtaining the design approvals, installing the DEWA meter, and completing the inspections that release the completion certificates and the NOC. Quotation LML/QTN/1139 does not state a completion timeline.",
    stats: [
      { label: "Authorities", value: "DEWA, Trakhees, DCD & Food Safety" },
      { label: "Quoted fee", value: "AED 13,500" },
      { label: "Scope", value: "Five approvals in one submission" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "This quotation covers five linked approvals for a single commercial unit in JVC: DEWA for the electrical supply and meter, Trakhees for the planning and development submission, the Dubai Civil Defence (DCD) for fire and life-safety, food and safety certification, and the building management NOC. Each authority reviews the same premises against its own regulation, so the drawing set has to be coordinated across all of them rather than produced authority by authority — a set prepared only against one checklist typically comes back for revision from the next.\nThe AED 13,500 fee is defined around inputs the client controls. The client supplies all other existing drawings, documents and green files; exceptional approval requirements, an inspection failure or a design revision each carry an additional charge; government charges are paid by the client; and VAT is separate, as stated in the limiting conditions of quotation LML/QTN/1139. Because the fee is quoted across five submissions including the meter installation, locking the client-supplied drawings and green files early is what keeps the quoted AED 13,500 realistic.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and document review",
        description:
          "Review the existing drawings, documents and green files supplied by the client, and confirm the current condition of the commercial unit in JVC.",
      },
      {
        step: 2,
        title: "Prepare one coordinated drawing set",
        description:
          "Prepare the drawing set as per DEWA, Trakhees, DCD, food and safety and building management regulation so a single coordinated submission serves all five approvals.",
      },
      {
        step: 3,
        title: "DEWA drawing, inspection and meter",
        description:
          "Prepare the drawing as per DEWA regulation, conduct the DEWA inspection and complete the DEWA meter installation.",
      },
      {
        step: 4,
        title: "Trakhees and DCD design approval",
        description:
          "Submit the drawings and supporting documents, and follow up until design approval is obtained from Trakhees and the Dubai Civil Defence.",
      },
      {
        step: 5,
        title: "Inspections and certificates",
        description:
          "Conduct the Trakhees and DCD inspections that release the completion certificates, and prepare the drawing as per food and safety regulation to release the certificate.",
      },
      {
        step: 6,
        title: "Building management NOC",
        description:
          "Prepare the drawing as per the building management requirement and follow up until the NOC is released.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1139 issued on 6 July 2026 for the multi-authority approval at AED 13,500.",
        state: "approved",
        date: "2026-07-06",
      },
      {
        title: "Document & drawing review",
        detail:
          "Review the existing drawings, documents and green files supplied by the client.",
        state: "pending",
      },
      {
        title: "Drawings prepared",
        detail:
          "Coordinated drawing set prepared as per DEWA, Trakhees, DCD, food and safety and building management regulation.",
        state: "pending",
      },
      {
        title: "DEWA drawing & inspection",
        detail:
          "DEWA drawing submitted and the DEWA inspection conducted ahead of the meter installation.",
        state: "pending",
      },
      {
        title: "DEWA meter installation",
        detail: "DEWA meter installation to be completed.",
        state: "pending",
      },
      {
        title: "Trakhees & DCD design approval",
        detail:
          "Design approval to be obtained from Trakhees and the Dubai Civil Defence.",
        state: "pending",
      },
      {
        title: "Inspections, certificate & NOC",
        detail:
          "Trakhees, DCD and food and safety inspections and certificates, followed by the building management NOC.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Trade licence",
        description:
          "Client's valid trade licence for the business occupying the commercial unit in JVC.",
        providedBy: "client",
      },
      {
        document: "Title deed or tenancy",
        description:
          "Title deed or tenancy evidence for the commercial unit in JVC.",
        providedBy: "client",
      },
      {
        document: "Existing drawings and green files",
        description:
          "Existing drawings, documents and green files required for the DEWA, Trakhees, DCD, food and safety and building management submissions.",
        providedBy: "client",
      },
      {
        document: "Building management requirements",
        description:
          "The building management requirements and standards the unit must comply with for the NOC submission.",
        providedBy: "client",
      },
      {
        document:
          "Drawing set as per DEWA, Trakhees, DCD, food and safety and building management regulation",
        description:
          "Coordinated drawings prepared to meet each authority's regulation for the commercial unit.",
        providedBy: "wasleen",
      },
      {
        document: "Authority applications and inspections",
        description:
          "Submissions, follow-up and inspections with DEWA, Trakhees, the Dubai Civil Defence, food and safety and the building management.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "6 July 2026",
      },
      {
        stage: "Drawings preparation",
        planned: "To be confirmed",
        actual: "—",
        note: "No timeline commitment is stated in quotation LML/QTN/1139",
      },
      {
        stage: "DEWA drawing, inspection & meter installation",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DEWA timelines",
      },
      {
        stage: "Trakhees & DCD design approval",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical Trakhees and DCD timelines",
      },
      {
        stage: "Trakhees, DCD & food and safety inspections",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical authority inspection timelines",
      },
      {
        stage: "Building management NOC",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — depends on the building management review",
      },
    ],
    quotedFee: "AED 13,500",
    feeAmountAED: 13500,
    feeIncluded: [
      "Prepare Drawing as per DEWA, Conducting Inspection from DEWA & installing DEWA meter",
      "Prepare Drawing as per TRAKHEES, Conducting Inspection from TRAKHEES and releasing completion certificate",
      "Prepare Drawing as per DCD, Conducting inspection from DCD and releasing completion certificate",
      "Prepare Drawing as per FOOD & SAFETY and releasing certificate",
      "Prepare Drawing as per Building management and releasing NOC",
    ],
    proTips: [
      {
        title: "Coordinate the drawing set across all five approvals first",
        body: "The quotation covers DEWA, Trakhees, DCD, food and safety and the building management NOC on the same premises, so a drawing set that is prepared once and reviewed against every authority's checklist avoids the design revision that carries an additional charge under the limiting conditions of quotation LML/QTN/1139.",
      },
      {
        title: "Hand over every green file and existing drawing before work starts",
        body: "The client supplies all other existing drawings, documents and green files, government charges are paid by the client and VAT is separate. Handing the full set over up front keeps the quoted AED 13,500 fee as close to final as possible and avoids a second round of authority comments.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 13,500" },
      {
        label: "Approval authority",
        value:
          "DEWA, Trakhees, Dubai Civil Defence (DCD), food and safety & building management",
      },
      {
        label: "Scope",
        value:
          "Drawings, design approvals, inspections, DEWA meter, certificates & NOC",
      },
    ],
    faqs: [
      {
        question: "What does the AED 13,500 quotation include?",
        answer:
          "Quotation LML/QTN/1139 covers preparing the drawings as per DEWA, Trakhees, DCD, food and safety and building management regulation, obtaining design approval from Trakhees and the Dubai Civil Defence, conducting the inspections that release the completion certificates, installing the DEWA meter, and releasing the food and safety certificate and the building management NOC.",
      },
      {
        question: "Which authorities are involved in this JVC approval?",
        answer:
          "DEWA handles the electrical drawing, inspection and meter installation, Trakhees reviews the planning and development submission, the Dubai Civil Defence (DCD) reviews the fire and life-safety aspects of the design, the food and safety approval is processed through Dubai Municipality, and the building management releases the NOC, as stated in quotation LML/QTN/1139.",
      },
      {
        question: "What does the DEWA element of the quotation cover?",
        answer:
          "The DEWA element covers preparing the drawing as per DEWA regulation, conducting the DEWA inspection and installing the DEWA meter, as stated in quotation LML/QTN/1139. Government charges are paid by the client.",
      },
      {
        question: "What does the food and safety approval cover?",
        answer:
          "The food and safety element covers preparing the drawing as per food and safety regulation and releasing the certificate, as stated in quotation LML/QTN/1139. In Dubai this food safety certification is administered through Dubai Municipality's food control function.",
      },
      {
        question: "What does the client need to provide for this approval?",
        answer:
          "The client provides all other existing drawings, documents and green files and the building management requirements. Wasleen prepares the drawing set as per DEWA, Trakhees, DCD, food and safety and building management regulation and handles the applications and inspections with each authority.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, an inspection failure or a design revision, government charges are paid by the client and VAT is separate, as stated in the limiting conditions of quotation LML/QTN/1139.",
      },
      {
        question: "Does the quotation commit to a fixed completion timeline?",
        answer:
          "No. Quotation LML/QTN/1139 does not state a completion window, so the programme depends on the drawings and green files supplied, the government charges being settled, and the DEWA, Trakhees, DCD, food and safety and building management review and inspection timelines.",
      },
      {
        question: "What is the payment schedule for this quotation?",
        answer:
          "Payment is 50% in advance before starting the work, 40% during work progress and 10% after completion of the work, as stated in quotation LML/QTN/1139.",
      },
    ],
    images: [
      {
        src: "/images/mep-electrical-mechanical-approval-dubai.webp",
        alt: "MEP and electrical drawings for a DEWA, Trakhees and DCD approval for a commercial unit in JVC, Dubai",
        width: 1376,
        height: 768,
        placement: "hero",
      },
      {
        src: "/images/dewa-electricity-connection-approval.webp",
        alt: "DEWA electricity connection and meter installation documentation for a JVC commercial unit approval",
        width: 1376,
        height: 768,
        placement: "documents",
      },
      {
        src: "/images/restaurant-food-business-approval-dubai.webp",
        alt: "Food and safety approval documentation for a commercial unit in JVC processed alongside DEWA, Trakhees and DCD approvals",
        caption:
          "DEWA, Trakhees, DCD, food and safety and NOC approval for a commercial unit in JVC, Dubai",
        width: 1376,
        height: 768,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "dewa-approval",
      "dewa-meter-installation",
      "food-control-department-approval",
      "interior-fit-out-approval",
      "dubai-municipality-noc",
    ],
    relatedGuideSlugs: [
      "dewa-connection-process-guide",
      "dewa-meter-installation-steps",
      "dubai-food-control-approval-guide",
      "interior-fit-out-permit-process",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "dda-dcd-food-safety-approval-cafe",
      "dewa-load-schedule-request-dubai",
      "trakhees-dcd-approval-business-bay",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-07-06",
    lastUpdated: "2026-09-14",
    publishStatus: "live",
  },
  /* ============================================================
     LML/QTN/1145 — DDA approval, Mudon
     Source: WORK QUOTATION ref LML/QTN/1145 dated 13/07/2026
     (subject "QUOTATION FOR DDA APPROVAL"), location Mudon,
     Dubai, AED 4,500. projectStatus "quoted" (quotation only —
     no completion claim). publishStatus "live" — owner approved
     publication 2026-09-15 (Part 17.4 policy).
     Images: existing site library assets (no per-slug binaries),
     dims verified with scripts/get-webp-dims.mjs.
     ============================================================ */
  {
    slug: "dda-approval-mudon-dubai",
    projectTitle: "DDA Approval for a Property in Mudon, Dubai",
    seoTitle: "DDA Design Approval in Mudon, Dubai",
    description:
      "AED 4,500 DDA approval quote for a property in Mudon, Dubai: drawing preparation, DDA design approval and the completion inspection. Get a free quote today.",
    sourceRef: "LML/QTN/1145",
    consentGranted: false,
    clientLabel: "Confidential client — Property in Mudon, Dubai",
    projectStatus: "quoted",
    authorities: ["DDA"],
    primaryApprovalSlug: "dda-approval",
    projectType: "DDA approval",
    location: "Mudon, Dubai",
    sector: "Residential",
    directAnswer:
      "This case study covers the quoted DDA approval for a property in Mudon, Dubai. The AED 4,500 quotation, LML/QTN/1145 issued on 13 July 2026, covers preparing the drawings as per DDA regulation, obtaining design approval from the Dubai Development Authority (DDA), and conducting the DDA inspection that releases the completion certificate. The quotation does not state a completion timeline.",
    stats: [
      { label: "Authority", value: "Dubai Development Authority (DDA)" },
      { label: "Quoted fee", value: "AED 4,500" },
      { label: "Scope", value: "Drawings, design approval & inspection" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "This quotation covers the DDA approval path a property in Mudon requires. The Dubai Development Authority (DDA) is the planning and development authority that issues approvals for the communities within its jurisdiction, and quotation LML/QTN/1145 confirms the DDA approval route for this property. The drawing set has to be prepared to DDA regulation, submitted for design approval, and then verified on site by a DDA inspection that releases the completion certificate — three stages that follow each other, since the inspection can only be conducted once the design approval is in place.\nThe AED 4,500 fee is defined around inputs the client controls. The client supplies all other existing drawings, documents and green files; exceptional approval requirements, an inspection failure or a design revision each carry an additional charge; government charges are paid by the client; and VAT is separate, as stated in the limiting conditions of quotation LML/QTN/1145. No completion timeline is committed in the quotation.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and document review",
        description:
          "Review the existing drawings, documents and green files supplied by the client, and confirm the current condition of the property in Mudon.",
      },
      {
        step: 2,
        title: "Prepare drawings as per DDA regulation",
        description:
          "Prepare the drawing set so it meets the Dubai Development Authority regulation for the property.",
      },
      {
        step: 3,
        title: "Submit and obtain DDA design approval",
        description:
          "Submit the drawings and supporting documents and follow up until design approval is obtained from the DDA.",
      },
      {
        step: 4,
        title: "Resolve any DDA design comments",
        description:
          "Address any DDA comments on the design so the revision is closed out before the inspection stage.",
      },
      {
        step: 5,
        title: "Conduct the DDA inspection",
        description:
          "Arrange and attend the DDA inspection and resolve any findings so the inspection passes.",
      },
      {
        step: 6,
        title: "Release the completion certificate",
        description:
          "Once the inspection passes, finalise the DDA documentation and release the completion certificate.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1145 issued on 13 July 2026 for the DDA approval at AED 4,500.",
        state: "approved",
        date: "2026-07-13",
      },
      {
        title: "Document & drawing review",
        detail:
          "Review the existing drawings, documents and green files supplied by the client.",
        state: "pending",
      },
      {
        title: "Drawings prepared",
        detail: "Drawing set prepared as per DDA regulation.",
        state: "pending",
      },
      {
        title: "DDA design approval",
        detail: "Design approval to be obtained from the DDA.",
        state: "pending",
      },
      {
        title: "DDA inspection",
        detail: "DDA inspection to be conducted once the design is approved.",
        state: "pending",
      },
      {
        title: "Completion certificate",
        detail: "Completion certificate to be released after the inspection passes.",
        state: "pending",
      },
      {
        title: "Documentation closure",
        detail:
          "Final file documentation assembled for the client after the certificate is released.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Title deed or tenancy contract",
        description:
          "Title deed or tenancy evidence for the property in Mudon, Dubai.",
        providedBy: "client",
      },
      {
        document: "Existing drawings and green files",
        description:
          "Existing drawings, documents and green files required for the DDA approval of the property.",
        providedBy: "client",
      },
      {
        document: "Drawing set as per DDA regulation",
        description:
          "Drawings prepared to meet the Dubai Development Authority regulation for the property.",
        providedBy: "wasleen",
      },
      {
        document: "DDA design approval application",
        description:
          "Application and supporting documents submitted to the DDA for design approval.",
        providedBy: "wasleen",
      },
      {
        document: "DDA inspection request",
        description:
          "Inspection request and site documentation prepared for the DDA inspection that releases the completion certificate.",
        providedBy: "wasleen",
      },
      {
        document: "Completion certificate documentation",
        description:
          "Final documentation assembled so the DDA completion certificate can be released.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "13 July 2026",
      },
      {
        stage: "Drawings preparation",
        planned: "To be confirmed",
        actual: "—",
        note: "No timeline commitment is stated in quotation LML/QTN/1145",
      },
      {
        stage: "DDA design approval",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
      {
        stage: "DDA inspection",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
      {
        stage: "Completion certificate",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA timelines",
      },
    ],
    quotedFee: "AED 4,500",
    feeAmountAED: 4500,
    feeIncluded: [
      "Preparing drawings as per DDA regulation",
      "Obtaining design approval from DDA",
      "Conducting inspection from DDA, releasing completion certificate",
    ],
    proTips: [
      {
        title: "Prepare the drawing set to DDA regulation before submitting",
        body: "The DDA path runs in sequence — drawings, design approval, then the inspection that releases the completion certificate. A design revision carries an additional charge under the limiting conditions of quotation LML/QTN/1145, so aligning the drawings to DDA regulation before submission protects the quoted AED 4,500 and keeps the inspection slot available.",
      },
      {
        title: "Hand over the existing drawings and green files up front",
        body: "The client supplies all other existing drawings, documents and green files, government charges are paid by the client and VAT is separate. Supplying the full set at the start keeps the quoted AED 4,500 fee as close to final as possible and avoids a second round of DDA review comments.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 4,500" },
      { label: "Approval authority", value: "Dubai Development Authority (DDA)" },
      {
        label: "Scope",
        value: "Drawings, DDA design approval & completion inspection",
      },
    ],
    faqs: [
      {
        question: "What does the AED 4,500 DDA approval quotation include?",
        answer:
          "Quotation LML/QTN/1145 covers preparing the drawings as per DDA regulation, obtaining design approval from the Dubai Development Authority (DDA), and conducting the DDA inspection that releases the completion certificate.",
      },
      {
        question: "Which authority issues this Mudon approval?",
        answer:
          "The Dubai Development Authority (DDA) is the authority named on quotation LML/QTN/1145 for the property in Mudon, and the scope covers the DDA design approval and the DDA inspection that releases the completion certificate.",
      },
      {
        question: "What is the Dubai Development Authority (DDA)?",
        answer:
          "The Dubai Development Authority (DDA) is the planning and development authority that issues approvals for the communities within its jurisdiction in Dubai. Quotation LML/QTN/1145 confirms the DDA approval route for this property in Mudon.",
      },
      {
        question: "What does the client need to provide for this DDA approval?",
        answer:
          "The client provides all other existing drawings, documents and green files, and the title deed or tenancy evidence for the property. Wasleen prepares the drawing set as per DDA regulation and handles the design approval application and the inspection with the DDA.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements, an inspection failure or a design revision, government charges are paid by the client and VAT is separate, as stated in the limiting conditions of quotation LML/QTN/1145.",
      },
      {
        question: "Does the quotation commit to a fixed completion timeline?",
        answer:
          "No. Quotation LML/QTN/1145 does not state a completion window, so the programme depends on the drawings and green files supplied, the government charges being settled, and the DDA design review and inspection timelines.",
      },
      {
        question: "What is the payment schedule for this quotation?",
        answer:
          "Payment is 50% in advance before starting the work, 40% during work progress and 10% after completion of the work, as stated in quotation LML/QTN/1145.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 13 July 2026 for AED 4,500; the approval scope is engaged and the final approval is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/dda-fit-out-approval-engineering.webp",
        alt: "DDA approval drawings and engineering documentation for a property in Mudon, Dubai",
        width: 1376,
        height: 768,
        placement: "hero",
      },
      {
        src: "/images/interior-approvals-dubai-muncipality-consultants.webp",
        alt: "Approval submission documentation for a DDA approval in Mudon, Dubai",
        width: 2336,
        height: 1760,
        placement: "documents",
      },
      {
        src: "/images/villa-renovation-approval-dubai.webp",
        alt: "Property approval works processed for a DDA approval in Mudon, Dubai",
        caption: "DDA approval for a property in Mudon, Dubai",
        width: 1376,
        height: 768,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "dda-approval",
      "interior-fit-out-approval",
      "dubai-municipality-completion-certificate",
      "dubai-municipality-noc",
    ],
    relatedGuideSlugs: [
      "cad-drawing-standards-dubai-guide",
      "dm-completion-certificate-steps",
      "interior-fit-out-permit-process",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "dda-damac-approval-dubai",
      "dda-approval-alma-arabian-ranches",
      "dda-emaar-approval-arabian-ranches",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-07-13",
    lastUpdated: "2026-09-14",
    publishStatus: "live",
  },
  /* ============================================================
     LML/QTN/1156 — DCD Final Approval (DCD design approval),
     Dubai
     Source: WORK QUOTATION ref LML/QTN/1156 dated 22/07/2026
     (addressed to ENG HASHEM; SUBJECT "QUOTATION FOR DCD FINAL
     APPROVAL", body heading "QUOTATION FOR DCD DESIGN APPROVAL
     (FINAL APPROVAL)"), LOCATION Dubai, UAE. Price AED 1,800 with
     VAT 5% AED 90.00 and GRAND TOTAL AED 1,890.00.
     The quotation records no premises type, unit or area, so
     `sector` is recorded as "Not specified" instead of being
     inferred. feeAmountAED records the AED 1,800 scope price
     (VAT is shown separately on the quotation), matching the
     pre-VAT basis used by the other entries. projectStatus
     "quoted" (quotation only — no completion claim). The
     quotation states no completion timeline. publishStatus
     "live" — owner approved publication 2026-09-15.
     Images: existing site library assets (no per-slug binaries),
     dims verified with sharp.
     ============================================================ */
  {
    slug: "dcd-final-approval-dubai",
    projectTitle: "DCD Final Approval for a Dubai Project",
    seoTitle: "DCD Final Approval Quotation, Dubai",
    description:
      "AED 1,800 plus 5% VAT DCD final approval quote for a Dubai project: drawings to DCD regulation and the DCD final design approval. Get a free quote today.",
    sourceRef: "LML/QTN/1156",
    consentGranted: false,
    clientLabel: "Confidential client — DCD final approval project in Dubai",
    projectStatus: "quoted",
    authorities: ["Dubai Civil Defence"],
    primaryApprovalSlug: "dubai-civil-defense-approval",
    projectType: "DCD design approval (final approval)",
    location: "Dubai",
    sector: "Not specified",
    directAnswer:
      "This case study documents quotation LML/QTN/1156 for Dubai Civil Defence (DCD) final approval — the DCD design approval (final approval) stage — for a project in Dubai. Issued on 22 July 2026 at AED 1,800 plus 5% VAT (grand total AED 1,890.00), the quote covers preparing drawings as per DCD regulation and obtaining the DCD final approval. The quotation records the location only as Dubai, UAE and states no completion timeline.",
    stats: [
      { label: "Authority", value: "Dubai Civil Defence (DCD)" },
      { label: "Quoted fee", value: "AED 1,800 + 5% VAT" },
      { label: "Scope", value: "DCD-regulation drawings & final approval" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "This quotation covers the DCD final approval stage for a project in Dubai. Dubai Civil Defence (DCD) reviews the fire and life-safety design of a submission, and quotation LML/QTN/1156 confirms the DCD design approval (final approval) route at AED 1,800 plus 5% VAT, a grand total of AED 1,890.00. The quotation records the location only as Dubai, UAE and states no premises type, unit or area.\nThe limiting conditions show where the client controls the outcome. The client supplies all other existing drawings, documents and green files; an additional price applies for exceptional approval requirements; an additional charge applies for inspection failure or design revision; government charges are paid by the client; and VAT is charged separately, as set out in the limiting conditions of quotation LML/QTN/1156. Because the quotation states no completion window, the programme depends on the drawings and green files the client provides, the government charges being settled and DCD's own review times.",
    solutionSteps: [
      {
        step: 1,
        title: "Document review",
        description:
          "We review the existing drawings, documents and green files supplied by the client and confirm the scope of the DCD final approval submission.",
      },
      {
        step: 2,
        title: "Drawings prepared as per DCD regulation",
        description:
          "We prepare the drawing set so that it satisfies DCD regulation, as included in quotation LML/QTN/1156.",
      },
      {
        step: 3,
        title: "Submission to Dubai Civil Defence",
        description:
          "We submit the drawing set and supporting documents to Dubai Civil Defence and track the application.",
      },
      {
        step: 4,
        title: "DCD comments resolved",
        description:
          "We respond to DCD comments on the submission and revise the drawings until they are accepted.",
      },
      {
        step: 5,
        title: "DCD final approval obtained",
        description:
          "We obtain the DCD final approval and hand over the approved documentation.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1156 issued on 22 July 2026 for DCD final approval at AED 1,800 plus 5% VAT (grand total AED 1,890.00).",
        state: "approved",
        date: "2026-07-22",
      },
      {
        title: "Document review",
        detail:
          "Review of the existing drawings, documents and green files supplied by the client.",
        state: "pending",
      },
      {
        title: "Drawings prepared as per DCD regulation",
        detail: "Preparation of the drawing set to satisfy DCD regulation.",
        state: "pending",
      },
      {
        title: "Submission to DCD",
        detail:
          "Submission of the drawing set and supporting documents to Dubai Civil Defence.",
        state: "pending",
      },
      {
        title: "DCD comments resolved",
        detail:
          "Response to DCD comments and revision of the drawings until accepted.",
        state: "pending",
      },
      {
        title: "DCD final approval obtained",
        detail:
          "Receipt of the DCD final approval and handover of the approved documentation.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Existing drawings, documents and green files",
        description:
          "All other existing drawings, documents and green files, which the quotation requires the client to provide.",
        providedBy: "client",
      },
      {
        document: "Premises and project details for the DCD submission",
        description:
          "The premises and project details the DCD final approval submission is prepared from.",
        providedBy: "client",
      },
      {
        document: "Drawing set prepared as per DCD regulation",
        description:
          "Drawings prepared to satisfy DCD regulation, as included in quotation LML/QTN/1156.",
        providedBy: "wasleen",
      },
      {
        document: "DCD final approval application",
        description:
          "Submission and tracking of the DCD design approval (final approval) application.",
        providedBy: "wasleen",
      },
      {
        document: "Approved DCD documentation",
        description:
          "The approved drawings and DCD final approval documentation handed to the client.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "22 July 2026",
      },
      {
        stage: "Drawings as per DCD regulation",
        planned: "To be confirmed",
        actual: "—",
        note: "The quotation states no completion window",
      },
      {
        stage: "DCD final approval",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DCD design review periods",
      },
      {
        stage: "Approved documentation handed over",
        planned: "To be confirmed",
        actual: "—",
        note: "Depends on DCD closing its review",
      },
    ],
    quotedFee: "AED 1,800 + 5% VAT",
    feeAmountAED: 1800,
    feeIncluded: [
      "Preparing drawings as per DCD regulation",
      "Obtaining DCD Final Approval",
    ],
    proTips: [
      {
        title: "Align the drawings to DCD regulation before submitting",
        body: "The quotation prices two things only — drawings as per DCD regulation and the DCD final approval. A design revision carries an additional charge under the limiting conditions of quotation LML/QTN/1156, so aligning the drawing set to DCD regulation before submission protects the quoted AED 1,800 and avoids a second round of review.",
      },
      {
        title: "Hand over the existing drawings and green files up front",
        body: "The client supplies all other existing drawings, documents and green files, government charges are paid by the client and VAT is separate. Supplying the full set at the start keeps the quoted AED 1,800 as close to final as possible and stops avoidable DCD review comments.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 1,800 + 5% VAT" },
      { label: "Approval authority", value: "Dubai Civil Defence (DCD)" },
      {
        label: "Scope",
        value: "DCD-regulation drawings & DCD final approval",
      },
    ],
    faqs: [
      {
        question: "What does the AED 1,800 DCD final approval quotation include?",
        answer:
          "Quotation LML/QTN/1156 covers two items: preparing drawings as per DCD regulation and obtaining the DCD Final Approval from Dubai Civil Defence (DCD). The AED 1,800 is quoted plus 5% VAT of AED 90.00, giving a grand total of AED 1,890.00.",
      },
      {
        question: "Which authority issues this approval?",
        answer:
          "Dubai Civil Defence (DCD) is the authority named on quotation LML/QTN/1156, which covers the DCD design approval stage — described on the quotation as the DCD Final Approval — for a project in Dubai.",
      },
      {
        question: "What is DCD final approval?",
        answer:
          "DCD final approval is the Dubai Civil Defence (DCD) design approval stage in which the fire and life-safety design of a submission is reviewed and approved. Quotation LML/QTN/1156 prices the drawings as per DCD regulation and the DCD final approval for a project in Dubai.",
      },
      {
        question: "What does the client need to provide for this DCD approval?",
        answer:
          "The client provides all other existing drawings, documents and green files, as stated in the limiting conditions of quotation LML/QTN/1156. Wasleen prepares the drawing set as per DCD regulation and handles the DCD final approval application.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements and for an inspection failure or a design revision, government charges are paid by the client and VAT is separate, as stated in the limiting conditions of quotation LML/QTN/1156.",
      },
      {
        question: "Does the quotation commit to a fixed completion timeline?",
        answer:
          "No. Quotation LML/QTN/1156 states no completion window, so the programme depends on the drawings and green files supplied, the government charges being settled and the DCD review timeline.",
      },
      {
        question: "What is the payment schedule for this quotation?",
        answer:
          "Payment is 50% in advance before starting the work, 40% during work progress and 10% after completion of the work, as stated in quotation LML/QTN/1156.",
      },
      {
        question: "What is the project status of this case study?",
        answer:
          "This case study reflects a quotation issued on 22 July 2026 for AED 1,800 plus VAT; the DCD final approval scope is engaged and the approval is not yet claimed.",
      },
    ],
    images: [
      {
        src: "/images/dcd-approval-consultants-in-dubai.webp",
        alt: "Dubai Civil Defence approval drawings and documentation for a DCD final approval project in Dubai",
        width: 2336,
        height: 1760,
        placement: "hero",
      },
      {
        src: "/images/fire-and-safety-approvals-in-dubai-dcd-consultants.webp",
        alt: "Fire and life-safety approval documents prepared for a DCD final approval in Dubai",
        width: 2336,
        height: 1760,
        placement: "documents",
      },
      {
        src: "/images/project-completion-handover-approval-dubai.webp",
        alt: "Approval documentation handed over for a DCD final approval project in Dubai",
        caption: "DCD final approval for a project in Dubai",
        width: 1424,
        height: 752,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "dubai-civil-defense-approval",
      "interior-fit-out-approval",
      "dubai-municipality-civil-defense-noc",
      "dubai-municipality-noc",
    ],
    relatedGuideSlugs: [
      "cad-drawing-standards-dubai-guide",
      "interior-fit-out-permit-process",
      "how-to-avoid-approval-rejection-dubai",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "dcd-approval-burlington-tower-3",
      "fire-fighting-dcd-approval-jebel-ali",
      "dcd-as-built-drawings-showroom-dubai-design-district",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-07-22",
    lastUpdated: "2026-09-14",
    publishStatus: "live",
  },
  /* ============================================================
     LML/QTN/1159 — DDA & DCD approval, Business Bay, Dubai
     Source: WORK QUOTATION ref LML/QTN/1159 dated 23/07/2026
     (addressed to INSTANTFAZ; LOCATION "Business bay"; SUBJECT
     "QUOTATION FOR DDA & DCD APPROVAL", body heading "QUOTATION
     FOR DDA & DCD APPROVAL"). Price AED 7,500 ("SEVEN THOUSAND
     FIVE HUNDRED AED ONLY"). The quotation carries no VAT figure
     because VAT is listed as a separate limiting condition.
     The quotation records no premises type, unit or area, so
     `sector` is recorded as "Not specified" instead of being
     inferred. projectStatus "quoted" (quotation only — no
     completion claim). The quotation states no completion
     timeline. Limiting condition 5 notes that if an NOC is
     required from the building management the price may differ.
     publishStatus "live" — owner approved publication
     2026-09-15 (Part 17.4 policy). Images: existing site
     library assets (no per-slug binaries), dims verified with
     sharp.
     ============================================================ */
  {
    slug: "dda-dcd-approval-instantfaz-business-bay",
    projectTitle: "DDA & DCD Approval for a Property in Business Bay, Dubai",
    seoTitle: "DDA & DCD Approval Quote, Business Bay",
    description:
      "AED 7,500 DDA & DCD approval quote for a Business Bay property: drawings, design approval, inspection and completion certificate. Get a free quote today.",
    sourceRef: "LML/QTN/1159",
    consentGranted: false,
    clientLabel: "Confidential client — DDA & DCD approval in Business Bay, Dubai",
    projectStatus: "quoted",
    authorities: ["DDA", "Dubai Civil Defence"],
    primaryApprovalSlug: "dda-approval",
    projectType: "DDA & DCD approval",
    location: "Business Bay, Dubai",
    sector: "Not specified",
    directAnswer:
      "This case study documents quotation LML/QTN/1159 for the DDA & DCD approval of a property in Business Bay, Dubai. Issued on 23 July 2026 at AED 7,500, the quote covers preparing drawings as per DDA and Dubai Civil Defence (DCD) regulation, obtaining design approval from the Dubai Development Authority (DDA) and Dubai Civil Defence (DCD), and conducting the inspection from DDA and DCD that releases the completion certificate. The quotation records the location only as Business Bay and states no completion timeline.",
    stats: [
      { label: "Authorities", value: "DDA & DCD" },
      { label: "Quoted fee", value: "AED 7,500" },
      { label: "Scope", value: "Drawings, approval & inspection" },
      { label: "Status", value: "Quotation issued" },
    ],
    challenge:
      "Business Bay is a DDA master community of high-rise towers in central Dubai, and this quotation covers the DDA & DCD approval path a property there needs before the fit-out can be certified. The approval subject pairs the Dubai Development Authority (DDA), which governs design approval within the community, with Dubai Civil Defence (DCD), which reviews the fire and life-safety aspects of the design, so one drawing set has to satisfy both regulators and then pass the inspection from DDA and DCD that releases the completion certificate.\nThe AED 7,500 fee is defined around inputs the client controls. The client supplies all other existing drawings, documents and green files; exceptional approval requirements, an inspection failure or a design revision each carry an additional charge; VAT is separate; and government charges are paid by the client. Quotation LML/QTN/1159 also notes that if an NOC is required from the building management the price may differ — so confirming the building-management position early is what keeps the quoted AED 7,500 realistic. No completion timeline is committed in the quotation.",
    solutionSteps: [
      {
        step: 1,
        title: "Site visit and document review",
        description:
          "We review the property's existing drawings, documents and green files and confirm what the DDA and DCD submission will need before any drawings are prepared.",
      },
      {
        step: 2,
        title: "Drawings prepared as per DDA and DCD regulation",
        description:
          "We prepare the drawing set so that it satisfies DDA and DCD regulation, as included in quotation LML/QTN/1159.",
      },
      {
        step: 3,
        title: "Submission to DDA and DCD",
        description:
          "We submit the drawing set to the Dubai Development Authority (DDA) for design approval and to Dubai Civil Defence (DCD) for the fire and life-safety review, and track both applications.",
      },
      {
        step: 4,
        title: "DDA and DCD comments resolved",
        description:
          "We respond to the comments raised by either authority and revise the drawings until design approval is granted.",
      },
      {
        step: 5,
        title: "Inspection and completion certificate",
        description:
          "We arrange the inspection from DDA and DCD and, on a successful inspection, the completion certificate is released.",
      },
    ],
    timeline: [
      {
        title: "Quotation issued",
        detail:
          "Quotation LML/QTN/1159 issued on 23 July 2026 for DDA & DCD approval at AED 7,500.",
        state: "approved",
        date: "2026-07-23",
      },
      {
        title: "Site visit and document review",
        detail:
          "Review of the existing drawings, documents and green files supplied by the client.",
        state: "pending",
      },
      {
        title: "Drawings prepared as per DDA and DCD regulation",
        detail:
          "Preparation of the drawing set to satisfy DDA and DCD regulation.",
        state: "pending",
      },
      {
        title: "Submission to DDA and DCD",
        detail:
          "Submission of the drawing set to the Dubai Development Authority (DDA) and Dubai Civil Defence (DCD).",
        state: "pending",
      },
      {
        title: "DDA and DCD comments resolved",
        detail:
          "Response to the comments raised by either authority and revision of the drawings until design approval is granted.",
        state: "pending",
      },
      {
        title: "Inspection and completion certificate",
        detail:
          "Inspection from DDA and DCD and release of the completion certificate.",
        state: "pending",
      },
    ],
    documentsTable: [
      {
        document: "Existing drawings, documents and green files",
        description:
          "All other existing drawings, documents and green files, which the quotation requires the client to provide.",
        providedBy: "client",
      },
      {
        document: "Property details for the DDA and DCD submissions",
        description:
          "The property and project details the DDA and DCD applications are prepared from.",
        providedBy: "client",
      },
      {
        document: "Drawing set prepared as per DDA and DCD regulation",
        description:
          "Drawings prepared to satisfy DDA and DCD regulation, as included in quotation LML/QTN/1159.",
        providedBy: "wasleen",
      },
      {
        document: "DDA and DCD approval applications",
        description:
          "Submission and tracking of the design approval applications with the Dubai Development Authority (DDA) and Dubai Civil Defence (DCD).",
        providedBy: "wasleen",
      },
      {
        document: "Inspection and completion certificate",
        description:
          "Coordination of the DDA and DCD inspection and release of the completion certificate on a successful inspection.",
        providedBy: "wasleen",
      },
    ],
    timelineTable: [
      {
        stage: "Quotation issued",
        planned: "—",
        actual: "23 July 2026",
      },
      {
        stage: "Drawings as per DDA and DCD regulation",
        planned: "To be confirmed",
        actual: "—",
        note: "The quotation states no completion window",
      },
      {
        stage: "DDA and DCD design approval",
        planned: "To be confirmed",
        actual: "—",
        note: "Indicative — typical DDA and DCD review periods",
      },
      {
        stage: "Inspection from DDA and DCD",
        planned: "To be confirmed",
        actual: "—",
        note: "Depends on design approval being granted first",
      },
      {
        stage: "Completion certificate released",
        planned: "To be confirmed",
        actual: "—",
        note: "Depends on a successful inspection",
      },
    ],
    quotedFee: "AED 7,500",
    feeAmountAED: 7500,
    feeIncluded: [
      "Preparing drawings as per DDA and DCD regulation",
      "Obtaining design approval from DDA and DCD",
      "Conducting inspection from DDA & DCD, releasing completion certificate",
    ],
    proTips: [
      {
        title: "Confirm the building-management NOC position first",
        body: "Quotation LML/QTN/1159 states that if an NOC is required from the building management the price may differ. Checking that position with the tower's management before the drawings are prepared is what keeps the quoted AED 7,500 realistic in a Business Bay tower.",
      },
      {
        title: "Align one drawing set to both DDA and DCD regulation",
        body: "The quotation prices a single scope covering drawings as per DDA and DCD regulation, the design approval from both authorities and the inspection. An inspection failure or a design revision carries an additional charge under the limiting conditions, so aligning the drawing set to both regulators before submission protects the quoted AED 7,500.",
      },
    ],
    outcome: [
      { label: "Quoted fee", value: "AED 7,500" },
      { label: "Approval authorities", value: "DDA & Dubai Civil Defence (DCD)" },
      {
        label: "Scope",
        value: "Drawings, DDA & DCD approval, inspection & completion certificate",
      },
    ],
    faqs: [
      {
        question: "What does the AED 7,500 DDA & DCD approval quotation include?",
        answer:
          "Quotation LML/QTN/1159 covers three items: preparing drawings as per DDA and DCD regulation, obtaining design approval from the Dubai Development Authority (DDA) and Dubai Civil Defence (DCD), and conducting the inspection from DDA and DCD that releases the completion certificate. The total quoted is AED 7,500, with VAT separate.",
      },
      {
        question: "Which authorities issue this approval?",
        answer:
          "The Dubai Development Authority (DDA) and Dubai Civil Defence (DCD) are the authorities named on quotation LML/QTN/1159 for a property in Business Bay, Dubai.",
      },
      {
        question: "What is DDA approval?",
        answer:
          "DDA approval is the design approval issued by the Dubai Development Authority (DDA), which governs development and design within the communities it administers. Quotation LML/QTN/1159 prices the DDA design approval alongside the Dubai Civil Defence (DCD) approval for a property in Business Bay.",
      },
      {
        question: "What does the client need to provide for this DDA & DCD approval?",
        answer:
          "The client provides all other existing drawings, documents and green files, as stated in the limiting conditions of quotation LML/QTN/1159. Wasleen prepares the drawing set as per DDA and DCD regulation and handles both the DDA and the DCD applications and the inspection.",
      },
      {
        question: "When could additional charges apply to this quotation?",
        answer:
          "Additional charges apply for exceptional approval requirements and for an inspection failure or a design revision, government charges are paid by the client and VAT is separate, as stated in the limiting conditions of quotation LML/QTN/1159.",
      },
      {
        question: "Could the price differ if an NOC is required?",
        answer:
          "Yes. Quotation LML/QTN/1159 notes in its limiting conditions that if an NOC is required from the building management the price may differ, so the building-management position should be confirmed before the scope is fixed.",
      },
      {
        question: "Does the quotation commit to a fixed completion timeline?",
        answer:
          "No. Quotation LML/QTN/1159 states no completion window, so the programme depends on the drawings and green files supplied, the government charges being settled and the DDA and DCD review and inspection timelines.",
      },
      {
        question: "What is the payment schedule for this quotation?",
        answer:
          "Payment is 50% in advance before starting the work, 40% during work progress and 10% after completion of the work, as stated in quotation LML/QTN/1159.",
      },
    ],
    images: [
      {
        src: "/images/interior-fit-out-approval-consultants-in-dubai.webp",
        alt: "DDA and DCD approval consultancy for a property in Business Bay, Dubai",
        width: 2336,
        height: 1760,
        placement: "hero",
      },
      {
        src: "/images/2d-drawings-for-dcd-approvals-in-dubai.webp",
        alt: "2D drawings prepared as per DDA and DCD regulation for a Business Bay property in Dubai",
        width: 2336,
        height: 1760,
        placement: "documents",
      },
      {
        src: "/images/blueprint-drawing-submission-approval-dubai.webp",
        alt: "Blueprint drawing submission prepared for DDA and DCD approval in Business Bay, Dubai",
        caption: "DDA & DCD approval for a property in Business Bay, Dubai",
        width: 1376,
        height: 768,
        placement: "photo",
      },
    ],
    relatedApprovalSlugs: [
      "dda-approval",
      "dubai-civil-defense-approval",
      "interior-fit-out-approval",
      "dubai-municipality-completion-certificate",
    ],
    relatedGuideSlugs: [
      "cad-drawing-standards-dubai-guide",
      "interior-fit-out-permit-process",
      "how-to-avoid-approval-rejection-dubai",
    ],
    relatedServiceSlugs: ["2d-drawings", "approval-management", "document-clearing"],
    relatedCaseStudySlugs: [
      "dda-dcd-approval-business-bay",
      "trakhees-dcd-approval-business-bay",
      "dda-damac-approval-dubai",
    ],
    author: {
      name: "Jamsheed Khalid",
      credential: "Senior Fit-Out Consultant & Structural Engineer",
      url: "https://www.linkedin.com/in/jamsheed-khalid-343148b6",
    },
    reviewedBy: {
      name: "Kavya Ramachandran",
      credential: "Interior Designer",
    },
    publishedAt: "2026-07-23",
    lastUpdated: "2026-09-14",
    publishStatus: "live",
  },
];
