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
];
