/**
 * All 30+ guide / Q&A definitions for Wasleen Approvals.
 *
 * Each entry maps to a page at /guides/{slug} and may be either a "hub" guide
 * (multi-topic article) or a "qa" page (single question + answer).
 *
 * @see src/types/index.ts for the GuideData interface
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md for AI-search content rules
 */

import type { GuideData } from "@/types";

/* ============================================================
   HELPER — generates stable related guide slugs by category
   ============================================================ */

function guideRelated(category: string, exclude: string): string[] {
  const map: Record<string, string[]> = {
    "government-regulatory": [
      "how-long-does-dm-building-permit-take",
      "dcd-fire-safety-approval-documents",
      "dm-noc-for-renovation-guide",
      "rta-approval-commercial-projects",
      "dm-completion-certificate-steps",
    ],
    "free-zone": [
      "dso-fit-out-approval-guide",
      "dubai-south-design-guidelines",
      "tecom-business-setup-approvals",
      "dmcc-free-zone-approval-process",
    ],
    "developer-community": [
      "nakheel-renovation-approval-process",
      "emaar-community-design-guidelines",
      "dubai-properties-noc-process",
    ],
    "property-registration": [
      "ejari-registration-complete-guide",
      "title-deed-transfer-dubai",
      "rera-permit-requirements-guide",
    ],
    "technical-utility": [
      "dewa-connection-process-guide",
      "district-cooling-connection-guide",
      "dewa-meter-installation-steps",
    ],
    "trade-food-hospitality": [
      "dubai-food-control-approval-guide",
      "dtcm-tourism-license-requirements",
      "dha-healthcare-approval-guide",
    ],
    "fit-out-construction": [
      "interior-fit-out-permit-process",
      "change-of-usage-permit-guide",
      "structural-modification-approval-guide",
    ],
    "drawing-documentation": [
      "cad-drawing-standards-dubai-guide",
      "as-built-drawing-requirements",
      "3d-design-submission-guide",
    ],
    general: [
      "complete-guide-dubai-building-approvals",
      "how-to-avoid-approval-rejection-dubai",
      "dubai-approval-fees-guide",
      "approval-timelines-dubai-guide",
    ],
  };
  return (map[category] ?? []).filter((s) => s !== exclude);
}

/* ============================================================
   GUIDES
   ============================================================ */

export const guides: GuideData[] = [
  /* ------------------------------------------------------------------
     General / Hub
     ------------------------------------------------------------------ */
  {
    slug: "complete-guide-dubai-building-approvals",
    type: "hub",
    title: "Complete Guide to Dubai Building Approvals (2026)",
    description:
      "Everything you need to know about building approvals in Dubai — from DM permits and DCD approvals to DEWA connections and developer NOCs. Covers all 8 approval categories, timelines, fees, and common pitfalls.",
    primaryKeyword: "Dubai building approvals guide",
    secondaryKeywords: [
      "Dubai construction permits guide",
      "building approval process Dubai",
      "Dubai municipality approval guide 2026",
      "complete guide to Dubai approvals",
    ],
    content: [
      "Dubai's building approval landscape is governed by multiple authorities, each responsible for specific aspects of construction and renovation. Understanding which approvals your project needs and the order in which to obtain them is critical to avoiding delays and cost overruns.",
      "Dubai Municipality (DM) is the primary regulatory authority overseeing all construction activities. Depending on your project location, you may also need approvals from the Dubai Civil Defense (DCD), Dubai Electricity and Water Authority (DEWA), Roads and Transport Authority (RTA), and your community developer.",
      "The approval process typically follows this sequence: (1) Preliminary design approval, (2) Detailed drawing submission, (3) Civil Defense NOC, (4) DEWA connection approval, (5) Building permit issuance, (6) Construction, (7) Inspection milestones, and (8) Completion certificate.",
      "Free zone projects have a simplified process through authorities like Dubai Silicon Oasis, Dubai South, TECOM, JAFZA, DMCC, and others. Developer communities (Emaar, Nakheel, Dubai Properties, Damac, Meraas, Sobha) require additional NOCs before DM submissions.",
      "Timelines vary by project complexity. A standard villa renovation may take 4–8 weeks for approvals, while a commercial fit-out could take 8–16 weeks. Major new construction projects may require 3–6 months for full approval.",
      "Costs include authority fees (AED 500–10,000+ depending on project value), consultant fees, and document preparation costs. Working with an experienced approval consultant like Wasleen can reduce both timelines and costs by ensuring first-time submissions.",
    ],
    relatedSlugs: guideRelated("general", "complete-guide-dubai-building-approvals"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "how-to-avoid-approval-rejection-dubai",
    type: "hub",
    title: "How to Avoid Approval Rejection in Dubai: Common Pitfalls",
    description:
      "Learn the most common reasons Dubai building approval applications get rejected and how to avoid them. Expert tips from Wasleen approval consultants on getting first-time approval.",
    primaryKeyword: "avoid approval rejection Dubai",
    secondaryKeywords: [
      "Dubai building permit rejection reasons",
      "how to get approval first time Dubai",
      "common approval mistakes Dubai",
      "approval rejection solutions Dubai",
    ],
    content: [
      "Approval rejection is one of the most common frustrations in Dubai's construction and renovation landscape. Understanding why applications are rejected — and how to prevent it — can save weeks of delays and thousands in additional fees.",
      "The #1 cause of rejection is incomplete documentation. Dubai Municipality and other authorities have specific document requirements that vary by project type. Missing a single form, NOC, or certified drawing can result in immediate rejection.",
      "The #2 cause is non-compliant drawings. CAD drawings must follow DM standards for layer naming, line weights, title blocks, and dimensioning. 3D renderings must show accurate materials and context. Design drawings must comply with community design guidelines.",
      "The #3 cause is expired or incorrect NOCs. Many NOCs have validity periods (typically 6–12 months). Using an expired NOC or one that doesn't match the project scope will result in rejection.",
      "Other common causes include: incorrect fee calculation, missing signatures or stamps, zoning non-compliance, exceeding height or FAR limits, incomplete structural calculations, and environmental non-compliance.",
      "Working with an experienced approval consultant like Wasleen reduces rejection risk by 90% through pre-submission audits, document checklist verification, and direct coordination with authority reviewers.",
    ],
    relatedSlugs: guideRelated("general", "how-to-avoid-approval-rejection-dubai"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "dubai-approval-fees-guide",
    type: "hub",
    title: "Dubai Approval Fees Guide: Costs for Permits & Certificates (2026)",
    description:
      "Comprehensive breakdown of approval fees in Dubai for building permits, DCD approvals, DEWA connections, developer NOCs, and more. Includes indicative cost ranges for all 8 approval categories.",
    primaryKeyword: "Dubai approval fees guide",
    secondaryKeywords: [
      "Dubai building permit fees 2026",
      "approval costs Dubai",
      "DM approval fees schedule",
      "Dubaiti approval cost breakdown",
    ],
    content: [
      "Understanding the fee structure for Dubai building approvals helps you budget accurately and avoid surprises. Fees vary by authority, project type, and valuation. Below is a category-by-category breakdown of typical fee ranges.",
      "Dubai Municipality building permit fees are based on project valuation, typically 0.1%–0.5% of the project value. Minimum fees start at AED 500 for minor works. Additional fees apply for plan checking, inspection, and issuance.",
      "Dubai Civil Defense (DCD) approval fees range from AED 500–3,000 depending on project size and fire safety complexity. High-risk buildings (high-rises, warehouses, industrial) incur higher fees.",
      "DEWA connection fees include the connection application (AED 300–500), meter installation (AED 500–2,000 depending on meter size), and security deposits (refundable). Load enhancement fees vary by capacity increase.",
      "Developer NOC fees vary widely. Emaar and Nakheel typically charge AED 500–2,000 for residential NOCs. Commercial NOCs through developers like TECOM or DMCC may cost AED 1,000–5,000.",
      "Ejari registration costs AED 220–550 depending on the property type. Title deed transfers cost 2% of property value plus administrative fees. RERA permits for off-plan property transfers cost AED 2,000–4,000.",
      "Consultant fees for managing the approval process typically range from AED 3,000–15,000 depending on project complexity. Wasleen offers transparent fixed-fee packages with no hidden charges.",
    ],
    relatedSlugs: guideRelated("general", "dubai-approval-fees-guide"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "approval-timelines-dubai-guide",
    type: "hub",
    title: "Dubai Approval Timelines Guide: How Long Each Permit Takes",
    description:
      "Realistic timelines for all Dubai building approvals. From DM permits and DCD NOCs to DEWA connections and developer approvals — know exactly how long each step takes.",
    primaryKeyword: "Dubai approval timelines guide",
    secondaryKeywords: [
      "how long do Dubai approvals take",
      "Dubai building permit processing time",
      "approval timeline Dubai 2026",
      "DM approval duration guide",
    ],
    content: [
      "Timelines are one of the most critical factors in project planning. Dubai approval timelines vary by authority, project complexity, and submission quality. Below are realistic estimates for each approval type.",
      "Dubai Municipality building permits: 5–15 business days for standard projects. Preliminary permits take 3–7 days. Full building permits with complete documentation take 7–15 days. Complex projects may require 15–25 days.",
      "Dubai Civil Defense (DCD) approval: 5–10 business days for standard submissions. Fire safety engineering reviews for complex buildings may take 10–20 days. Express service available for an additional fee.",
      "DEWA connection NOC: 3–7 business days for standard connections. Load enhancement requests take 5–10 days. Temporary power connections are fastest at 2–4 business days.",
      "Developer NOCs: 3–10 business days depending on the developer. Emaar and Nakheel typically process within 5–7 days. Some free zone authorities process within 3–5 days.",
      "Ejari registration: 1–2 business days (online) or same day (typing center). Title deed transfers: 3–7 business days after Dubai Land Department appointment.",
      "Completion certificates: 10–20 business days after final inspection. Requires all previous approvals to be in order and as-built drawings approved.",
      "Total end-to-end timeline for a typical villa renovation: 4–8 weeks. Commercial fit-out: 8–16 weeks. New construction: 3–6 months. These estimates assume complete, correct documentation at each submission.",
    ],
    relatedSlugs: guideRelated("general", "approval-timelines-dubai-guide"),
    lastUpdated: "2026-07-01",
  },

  /* ------------------------------------------------------------------
     Government & Regulatory Q&A Guides
     ------------------------------------------------------------------ */
  {
    slug: "how-long-does-dm-building-permit-take",
    type: "qa",
    title: "How Long Does a Dubai Municipality Building Permit Take?",
    description:
      "Complete guide to DM building permit processing times. Standard permits take 5–15 business days. Learn what factors affect processing speed and how to expedite your application.",
    primaryKeyword: "how long does Dubai Municipality building permit take",
    secondaryKeywords: [
      "DM building permit processing time",
      "Dubai building permit duration",
      "how long for DM permit",
      "Dubai Municipality permit timeline",
    ],
    question:
      "How long does a Dubai Municipality building permit take to process?",
    answer:
      "A standard Dubai Municipality building permit takes 5–15 business days to process, assuming complete and correct documentation. Preliminary permits are faster at 3–7 business days, while complex projects may require 15–25 business days. Factors affecting processing speed include: completeness of documentation (missing documents are the #1 cause of delay), project complexity (high-rises and specialized buildings take longer), current authority workload (peak seasons like Q4 may be slower), and whether the application qualifies for express processing. Working with an experienced approval consultant who can pre-audit your submission reduces processing time by ensuring first-time approval.",
    content: [
      "Dubai Municipality building permit processing varies by project type and documentation quality. Standard residential permits typically process in 5–10 business days, while commercial and industrial projects may take 10–15 business days.",
      "Preliminary building permits (concept design stage) are faster at 3–7 business days since they require fewer documents. Full building permits require complete structural, architectural, and MEP drawings and take longer.",
      "Expedited processing is available through DM's Al Nakheel service for an additional fee, reducing standard timelines by approximately 30–40%. This is recommended for time-sensitive projects.",
      "The clock starts when all required documents are submitted — not when the application is initiated. Missing NOCs, uncertified drawings, or incomplete forms pause the process until rectified.",
    ],
    parentApprovalSlug: "dubai-municipality-building-permit",
    relatedSlugs: guideRelated("government-regulatory", "how-long-does-dm-building-permit-take"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "dcd-fire-safety-approval-documents",
    type: "qa",
    title: "Documents Required for DCD Fire Safety Approval in Dubai",
    description:
      "Complete checklist of documents needed for Dubai Civil Defense (DCD) approval. Includes fire safety drawings, active/passive systems specifications, and emergency evacuation plans.",
    primaryKeyword: "DCD fire safety approval documents Dubai",
    secondaryKeywords: [
      "Dubai Civil Defense documents required",
      "DCD approval checklist Dubai",
      "fire safety documents DCD",
      "DCD submission requirements",
    ],
    question:
      "What documents are required for Dubai Civil Defense (DCD) fire safety approval?",
    answer:
      "DCD approval requires: (1) Fire safety design drawings (architectural fire safety plans, showing escape routes, fire compartmentation, and fire-fighting access), (2) Active fire protection system specifications (sprinklers, fire alarms, smoke management), (3) Passive fire protection details (fire-rated walls, doors, glazing), (4) Emergency evacuation plan, (5) DCD application form completed and stamped by an approved fire safety consultant, (6) DM building permit reference number, (7) Civil defense NOC from the developer (if applicable). Additional documents may be required for high-risk buildings, high-rises, or special occupancy types.",
    content: [
      "Fire safety drawings are the most critical component of a DCD submission. These include floor plans showing fire escape routes, assembly points, fire hose reel locations, extinguisher positions, and fire-fighting access routes.",
      "Active fire protection documents must specify the type and model of sprinkler systems, fire alarm control panels, smoke detectors, heat detectors, and emergency lighting. Dubai Civil Defense requires these to comply with UAE Fire and Life Safety Code (UAE FLS Code) specifications.",
      "Passive fire protection documentation includes specifications for fire-rated walls, floors, doors, glazing, and firestop systems. Each passive element must have a certification demonstrating its fire resistance rating as per UAE FLS Code.",
      "Emergency evacuation plans must show clear evacuation routes, assembly points, and must include calculations for evacuation time. Buildings over 7 floors typically require a fire engineering strategy report.",
      "All DCD submissions must be prepared or reviewed by an approved fire safety consultant registered with Dubai Civil Defense. The consultant stamps and signs the application, taking responsibility for compliance.",
    ],
    parentApprovalSlug: "dubai-civil-defense-approval",
    relatedSlugs: guideRelated("government-regulatory", "dcd-fire-safety-approval-documents"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "dm-noc-for-renovation-guide",
    type: "qa",
    title: "DM NOC for Renovation: Complete Guide 2026",
    description:
      "Do you need a Dubai Municipality NOC for your renovation? Complete guide covering when NOCs are required, how to apply, required documents, and processing timelines.",
    primaryKeyword: "DM NOC for renovation Dubai",
    secondaryKeywords: [
      "Dubai Municipality renovation NOC",
      "NOC for villa renovation Dubai",
      "DM NOC requirements renovation",
      "renovation permit Dubai NOC",
    ],
    question:
      "When is a Dubai Municipality NOC required for renovation projects?",
    answer:
      "A Dubai Municipality NOC (No Objection Certificate) is required for most renovation projects in Dubai that involve structural changes, facade alterations, MEP modifications, or changes to the building envelope. Minor cosmetic renovations (painting, flooring replacement with same material) typically do not require an NOC. You also need a developer NOC from your community management before applying for the DM NOC. The process takes 3–7 business days with complete documentation. Required documents include: title deed, original DM approval drawings, developer NOC, contractor license, and renovation drawings highlighting proposed changes.",
    content: [
      "The DM NOC confirms that the municipality has no objection to your proposed renovation based on the submitted plans. It is distinct from a building permit — the NOC comes first, then the building permit is issued upon detailed submission.",
      "For villa renovations in freehold communities, you typically need: (1) Developer NOC from community management, (2) DM NOC application with renovation drawings, (3) Structural calculation report if structural changes are involved, (4) Contractor registration with DM, (5) Dubai Civil Defense NOC if fire safety systems are affected.",
      "Common pitfalls include: applying without a developer NOC (results in immediate rejection), incomplete drawings (missing dimensions or structural details), and discrepancies between submitted drawings and actual site conditions.",
      "The DM NOC is valid for 6–12 months depending on project scope. If your renovation takes longer, you may need to renew the NOC. Wasleen handles the entire NOC process from document preparation to final issuance.",
    ],
    parentApprovalSlug: "dubai-municipality-noc",
    relatedSlugs: guideRelated("government-regulatory", "dm-noc-for-renovation-guide"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "rta-approval-commercial-projects",
    type: "qa",
    title: "RTA Approval for Commercial Projects: Complete Guide",
    description:
      "Everything you need to know about RTA (Roads and Transport Authority) approval for commercial projects in Dubai. Traffic impact studies, parking requirements, and access permits.",
    primaryKeyword: "RTA approval commercial projects Dubai",
    secondaryKeywords: [
      "RTA traffic impact study Dubai",
      "commercial project RTA approval",
      "Dubai RTA parking requirements",
      "RTA NOC for commercial buildings",
    ],
    question:
      "What is RTA approval and when is it required for commercial projects?",
    answer:
      "RTA (Roads and Transport Authority) approval is required for commercial projects in Dubai that affect traffic flow, parking, or access to public roads. It is mandatory for: new commercial buildings, projects generating significant traffic (shopping malls, offices, hotels), changes to vehicular access points, projects requiring additional parking provisions, and developments near metro stations or public transport routes. The RTA approval process includes a traffic impact study (TIS), parking demand assessment, and access design review. Processing takes 7–15 business days. Required documents include: architect drawings showing access points, traffic impact study report, parking layout plans, and DM preliminary approval reference.",
    content: [
      "Traffic Impact Studies (TIS) are the core of RTA approval. A qualified traffic consultant assesses how the proposed development will affect surrounding road networks, intersection capacity, and traffic flow during peak hours.",
      "Parking requirements follow Dubai Municipality's parking code, which specifies minimum parking spaces based on building type and Gross Floor Area (GFA). RTA reviews parking adequacy and may require additional parking for high-traffic developments.",
      "Access point design must comply with RTA standards for sight distances, turning radii, and lane widths. Each vehicular access point requires separate RTA approval. Residential villa accesses are typically exempt from full RTA review.",
      "Projects near metro stations (within 500m) may require additional RTA coordination for pedestrian access, drop-off zones, and integration with public transport infrastructure.",
    ],
    parentApprovalSlug: "rta-approval",
    relatedSlugs: guideRelated("government-regulatory", "rta-approval-commercial-projects"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "dm-completion-certificate-steps",
    type: "qa",
    title: "DM Completion Certificate: Step-by-Step Process",
    description:
      "Complete guide to obtaining a Dubai Municipality Completion Certificate. Includes inspection stages, required NOCs, as-built drawings, and common reasons for rejection.",
    primaryKeyword: "Dubai Municipality completion certificate steps",
    secondaryKeywords: [
      "DM completion certificate process",
      "building completion certificate Dubai",
      "how to get completion certificate DM",
      "Dubai completion certificate requirements",
    ],
    question:
      "What are the steps to obtain a Dubai Municipality Completion Certificate?",
    answer:
      "Obtaining a DM Completion Certificate involves: (1) Complete all construction works per approved drawings, (2) Obtain all required NOCs (DCD, DEWA, developer, RTA, etc.), (3) Submit as-built drawings reflecting actual construction, (4) Request DM final inspection through the building permit system, (5) Pass DM inspection (structural, MEP, fire safety, and general compliance), (6) Clear any inspection violations, (7) Pay all outstanding fees, (8) Receive Completion Certificate. The process takes 10–20 business days after inspection request. Critical prerequisites: all consultant supervision reports must be filed, contractor completion report submitted, and all authorities' NOCs collected.",
    content: [
      "The DM Completion Certificate (also called Building Completion Certificate or Certificate of Completion) is the final approval document confirming your building is constructed per approved plans and is safe for occupancy.",
      "Before applying for final inspection, ensure you have collected NOCs from: Dubai Civil Defense, DEWA, RTA (if applicable), developer/community management, Dubai Municipality - Health & Safety (for commercial), and any other project-specific authorities.",
      "As-built drawings are critical — they must accurately reflect the actual constructed condition. Any deviation from approved drawings must be documented with revision clouds and certified by the original design consultant.",
      "The final DM inspection covers: structural integrity, fire safety systems compliance, MEP systems functionality, accessibility compliance, parking implementation, and general conformance to approved drawings.",
      "Common delays include: incomplete NOC collection, as-built drawings not matching site conditions, outstanding contractor violations, unpaid municipality fees, and missing consultant supervision reports.",
    ],
    parentApprovalSlug: "dubai-municipality-completion-certificate",
    relatedSlugs: guideRelated("government-regulatory", "dm-completion-certificate-steps"),
    lastUpdated: "2026-07-01",
  },

  /* ------------------------------------------------------------------
     Free Zone Q&A Guides
     ------------------------------------------------------------------ */
  {
    slug: "dso-fit-out-approval-guide",
    type: "qa",
    title: "Dubai Silicon Oasis (DSO) Fit-Out Approval Guide",
    description:
      "Complete guide to obtaining fit-out approval in Dubai Silicon Oasis. Covers design guidelines, NOC requirements, submission process, and timelines for commercial and residential fit-outs.",
    primaryKeyword: "Dubai Silicon Oasis fit-out approval guide",
    secondaryKeywords: [
      "DSO fit-out permit",
      "Dubai Silicon Oasis NOC process",
      "DSO design guidelines approval",
      "DSO fit-out requirements",
    ],
    question:
      "How do I get fit-out approval in Dubai Silicon Oasis (DSO)?",
    answer:
      "Dubai Silicon Oasis (DSO) fit-out approval requires: (1) Tenant/Building Owner completes the DSO NOC application form, (2) Submit fit-out drawings (architectural, MEP, fire safety) along with contractor registration documents, (3) DSO reviews drawings for compliance with their design guidelines and community standards, (4) Upon approval, DSO issues an NOC allowing you to proceed to DM for building permit application. Processing takes 3–7 business days for standard fit-outs. DSO has specific design guidelines covering facade alterations, signage, AC condenser placement, and contractor working hours. A registered contractor with DSO approval is required for all fit-out works.",
    content: [
      "DSO (Dubai Silicon Oasis) is a free zone authority with its own design review process. Before DM building permit can be issued, DSO must approve the fit-out design and issue an NOC confirming compliance with community guidelines.",
      "DSO design guidelines cover: facade modifications (external appearance must remain consistent), signage (size, placement, illumination), AC condenser locations (must be screened), service area access, and waste disposal provisions.",
      "Contractors working in DSO must be registered with the authority. Proof of contractor registration and valid trade license must be submitted with the fit-out application. Unregistered contractors will not be approved.",
      "Working hours for fit-out contractors in DSO are typically 8:00 AM – 6:00 PM Sunday to Thursday, with no weekend or public holiday work unless specifically permitted. Noise restrictions apply during prayer times and after 7:00 PM.",
    ],
    parentApprovalSlug: "dubai-silicon-oasis-approval",
    relatedSlugs: guideRelated("free-zone", "dso-fit-out-approval-guide"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "dubai-south-design-guidelines",
    type: "qa",
    title: "Dubai South Design Guidelines & Approval Process",
    description:
      "Comprehensive guide to Dubai South design guidelines and approval process for residential and commercial projects within the Dubai South free zone.",
    primaryKeyword: "Dubai South design guidelines approval",
    secondaryKeywords: [
      "Dubai South approval process",
      "Dubai South design review",
      "Dubai South NOC requirements",
      "Dubai South building guidelines",
    ],
    question:
      "What are the Dubai South design guidelines and how do I get approval?",
    answer:
      "Dubai South (formerly Dubai World Central) has comprehensive design guidelines covering architectural style, building heights, setbacks, parking, landscaping, and signage. The approval process involves: (1) Preliminary design concept submission, (2) Design review by Dubai South planning department, (3) Issue of design compliance NOC, (4) Detailed drawing submission for full approval. Processing takes 5–10 business days per review cycle. Dubai South guidelines emphasize contemporary Gulf architecture, consistent building lines, and sustainable design practices. Guidelines also specify minimum glazing ratios, external material palettes, and landscape coverage percentages.",
    content: [
      "Dubai South is one of Dubai's largest free zone developments, encompassing residential, commercial, logistics, and aviation zones. Each zone has specific design guidelines that projects must comply with.",
      "Architectural style guidelines require contemporary Gulf architecture with clean lines, neutral color palettes, and integration of traditional elements like mashrabiya screens or shading devices. Facade materials must be high-quality and durable.",
      "Building height and setback guidelines vary by zone. Residential villa communities have strict height limits (typically G+1), while commercial and mixed-use zones allow higher densities with specific setback requirements.",
      "Landscaping is a key requirement — minimum 20% of the plot must be landscaped, with drought-tolerant native species preferred. Irrigation plans must be submitted as part of the landscape design package.",
      "Sustainability is increasingly important. Dubai South encourages LEED certification or Dubai Municipality Green Building regulations compliance. Energy modeling and sustainability reports may be required for larger projects.",
    ],
    parentApprovalSlug: "dubai-south-approval",
    relatedSlugs: guideRelated("free-zone", "dubai-south-design-guidelines"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "tecom-business-setup-approvals",
    type: "qa",
    title: "TECOM Business Setup: Approvals & Permits Guide",
    description:
      "Complete guide to TECOM (Dubai Internet City, Media City, Knowledge Park) business setup approvals. Covers fit-out permits, signage approvals, and operational licenses.",
    primaryKeyword: "TECOM business setup approvals Dubai",
    secondaryKeywords: [
      "Dubai Internet City fit-out approval",
      "Dubai Media City setup permits",
      "TECOM NOC process",
      "TECOM design review guidelines",
    ],
    question:
      "What approvals are needed to set up a business in TECOM free zones?",
    answer:
      "Setting up a business in a TECOM free zone (Dubai Internet City, Media City, Knowledge Park, etc.) requires: (1) Business license from TECOM, (2) Office space lease registration, (3) Fit-out design approval from TECOM design review team, (4) TECOM NOC for DM building permit (if structural changes are involved), (5) Signage approval from TECOM, (6) Civil Defense approval (if fire safety systems are affected). The fit-out design review takes 3–7 business days. TECOM has strict design guidelines regarding office partitioning, ceiling systems, floor loading, and signage placement. All fit-out contractors must be TECOM-approved and registered.",
    content: [
      "TECOM free zones are within Dubai's master-planned communities and have specific design guidelines that all tenants must follow. These cover partitioning systems (glass partitions preferred), ceiling heights, floor finishes, and HVAC modifications.",
      "Signage approval is a separate process. TECOM controls the size, placement, illumination, and content of all business signage. Typically, only building-mounted signage is permitted (no ground signs). Illuminated signage must comply with light pollution guidelines.",
      "Contractor registration is mandatory — only TECOM-approved contractors are permitted to execute fit-out works. The approved contractor list is maintained by TECOM and updated quarterly. Using an unregistered contractor results in immediate work stoppage.",
      "TECOM conducts periodic inspections during fit-out to ensure compliance. Key inspection milestones include: after demolition, after MEP rough-in, before ceiling closure, and at project completion.",
      "After fit-out completion, TECOM issues a final compliance certificate which is required for business license renewal and operational handover.",
    ],
    parentApprovalSlug: "tecom-approvals",
    relatedSlugs: guideRelated("free-zone", "tecom-business-setup-approvals"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "dmcc-free-zone-approval-process",
    type: "qa",
    title: "DMCC Free Zone Approval Process: Fit-Out & License Guide",
    description:
      "Complete guide to DMCC (Dubai Multi Commodities Centre) free zone approvals for business setup, fit-out permits, and operational licensing in Jumeirah Lakes Towers and Almas Tower.",
    primaryKeyword: "DMCC free zone approval process",
    secondaryKeywords: [
      "DMCC fit-out approval",
      "DMCC business setup permit",
      "JLT fit-out approval DMCC",
      "DMCC NOC requirements",
    ],
    question:
      "What is the DMCC approval process for fit-out and business setup?",
    answer:
      "The DMCC approval process involves: (1) DMCC business license application, (2) Office space lease registration with DMCC, (3) Fit-out design submission to DMCC for design review (architectural, MEP, fire safety drawings), (4) DMCC NOC issuance for DM building permit application, (5) Civil Defense approval coordination, (6) Fit-out execution under DMCC supervision, (7) Final DMCC inspection and compliance certificate. Fit-out design review takes 3–5 business days. DMCC has specific guidelines for JLT towers including: no structural modifications, standard ceiling heights (2.7m minimum), fire-rated partitions for offices over 100m², and specific HVAC zone requirements.",
    content: [
      "DMCC is one of Dubai's largest free zones, headquartered in Almas Tower and encompassing the Jumeirah Lakes Towers (JLT) development. It has its own design review department that must approve all fit-out works.",
      "JLT towers have specific structural constraints — no slab cutting, core drilling limited to approved zones, and no modifications to building facade. All MEP connections must tie into building-managed systems.",
      "DMCC requires all fit-out contractors to be registered and approved. The contractor registration process includes verification of trade license, DEWA certification, and proof of insurance coverage.",
      "Fire safety is a priority in high-rise JLT towers. DMCC requires comprehensive fire safety drawings showing compliance with UAE Fire and Life Safety Code, including compartmentation, smoke management, and evacuation plans.",
      "After fit-out completion, DMCC conducts a joint inspection with building management to verify compliance. A compliance certificate is issued which is required for DMCC license renewal and sub-tenant occupation.",
    ],
    parentApprovalSlug: "dmcc-approval",
    relatedSlugs: guideRelated("free-zone", "dmcc-free-zone-approval-process"),
    lastUpdated: "2026-07-01",
  },

  /* ------------------------------------------------------------------
     Developer & Community Q&A Guides
     ------------------------------------------------------------------ */
  {
    slug: "nakheel-renovation-approval-process",
    type: "qa",
    title: "Nakheel Renovation Approval Process: Complete Guide",
    description:
      "Step-by-step guide to obtaining Nakheel renovation approval for properties in The Palm Jumeirah, Jumeirah Islands, Al Furjan, and other Nakheel communities.",
    primaryKeyword: "Nakheel renovation approval process",
    secondaryKeywords: [
      "Nakheel NOC for renovation",
      "Palm Jumeirah renovation approval",
      "Nakheel design guidelines",
      "Nakheel community approval process",
    ],
    question:
      "How do I get Nakheel renovation approval for my villa?",
    answer:
      "Nakheel renovation approval requires: (1) Submit renovation drawings and scope of work to Nakheel Community Management, (2) Nakheel design review (7–10 business days) checking compliance with community design guidelines, (3) Upon approval, receive Nakheel NOC (valid for 6 months), (4) Use Nakheel NOC to apply for DM building permit, (5) Obtain DCD approval if fire safety systems are affected, (6) Execute renovation under Nakheel supervision guidelines, (7) Final Nakheel inspection and compliance certificate. Nakheel has strict design guidelines covering: external facade colors (pre-approved palettes only), boundary wall heights, pool positioning, landscape modifications, and service area screening. The Palm Jumeirah has additional guidelines for shoreline properties.",
    content: [
      "Nakheel communities (The Palm Jumeirah, Jumeirah Islands, Al Furjan, Jumeirah Village Circle, Discovery Gardens, etc.) each have unique design guidelines. Always check your specific community's guideline booklet before starting design.",
      "Facade alterations are the most scrutinized aspect. Nakheel maintains strict control over external appearances — only pre-approved color palettes are permitted, and any external structure (pergola, canopy, extension) requires specific approval.",
      "Landscape modifications require separate approval from Nakheel's landscape department. Tree removal, hardscape changes, pool placement, and irrigation modifications are all subject to review.",
      "Palm Jumeirah villa owners have additional requirements: frond-specific guidelines (the frond you're on affects what's permitted), shoreline protection restrictions (for beachfront properties), and height limitations due to flight path considerations.",
      "Contractor access to Nakheel communities requires prior registration with community security. Working hours are typically 8:00 AM – 6:00 PM Saturday to Thursday, with no Sunday or public holiday work.",
    ],
    parentApprovalSlug: "nakheel-developer-approval",
    relatedSlugs: guideRelated("developer-community", "nakheel-renovation-approval-process"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "emaar-community-design-guidelines",
    type: "qa",
    title: "Emaar Community Design Guidelines & Approval Guide",
    description:
      "Complete guide to Emaar community design guidelines and approval process for properties in Dubai Marina, Arabian Ranches, Downtown Dubai, and other Emaar communities.",
    primaryKeyword: "Emaar community design guidelines",
    secondaryKeywords: [
      "Emaar renovation approval",
      "Emaar NOC process",
      "Dubai Marina fit-out approval",
      "Emaar community guidelines Dubai",
    ],
    question:
      "What are Emaar's design guidelines and how do I get renovation approval?",
    answer:
      "Emaar's design guidelines vary by community but generally cover: architectural style consistency, facade colors (pre-approved palette), boundary treatments, landscape design, pool specifications, and service area screening. To get renovation approval: (1) Submit design drawings to Emaar Community Management, (2) Design review takes 5–10 business days, (3) Emaar issues NOC upon compliance verification, (4) Submit Emaar NOC with DM building permit application, (5) Execute renovation per approved plans, (6) Final Emaar inspection. Emaar is particularly strict about: external color changes (must match approved palette), visible AC units (must be screened), satellite dishes (must be concealed or in approved locations), and any changes to the building envelope.",
    content: [
      "Emaar communities include Dubai Marina, Arabian Ranches, Emirates Hills, The Meadows, The Springs, Downtown Dubai, Dubai Creek Harbour, and many others. Each has a specific Design Guideline document that residents must follow.",
      "Dubai Marina apartment fit-outs have specific restrictions: no structural changes to the building core, MEP modifications limited to within the unit, fire safety compliance mandatory, and contractor access through service elevators only.",
      "Arabian Ranches and villa communities require: architectural consistency with community theme, pre-approved color palettes for external paint, specific roof tile specifications, and landscape design compliance with community standards.",
      "Emirates Hills, being a luxury villa community, has the most stringent guidelines. External changes require multiple approvals including the Emirates Hills Architectural Committee. Pool design, landscape density, and facade materials are all closely regulated.",
      "The Emaar NOC is valid for 6 months and can be renewed once. If construction is not completed within this period, a fresh application must be submitted. Wasleen handles the entire Emaar NOC process end-to-end.",
    ],
    parentApprovalSlug: "emaar-community-approval",
    relatedSlugs: guideRelated("developer-community", "emaar-community-design-guidelines"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "dubai-properties-noc-process",
    type: "qa",
    title: "Dubai Properties NOC Process: Complete Guide 2026",
    description:
      "Step-by-step guide to obtaining Dubai Properties NOC for renovations and fit-outs in Business Bay, Jumeirah Beach Residence, and other Dubai Properties communities.",
    primaryKeyword: "Dubai Properties NOC process",
    secondaryKeywords: [
      "Dubai Properties renovation approval",
      "Business Bay fit-out NOC",
      "JBR renovation approval",
      "Dubai Properties design review",
    ],
    question:
      "How do I get a Dubai Properties NOC for renovation or fit-out?",
    answer:
      "Dubai Properties (DP) NOC process: (1) Submit renovation/fit-out drawings to DP Community Management, (2) DP design review (5–10 business days) checking compliance with community guidelines, (3) Receive DP NOC upon approval, (4) Submit DP NOC plus drawings to DM for building permit, (5) Obtain DCD approval if fire safety affected, (6) Execute works per approved plans, (7) DP final inspection and compliance certificate. Dubai Properties manages Business Bay, Jumeirah Beach Residence, Mudon, Villa Lantana, and other communities. Each has specific guidelines — JBR focuses on facade consistency and public access, Business Bay emphasizes commercial design standards, and villa communities have strict landscape and height restrictions.",
    content: [
      "Dubai Properties is one of Dubai's largest master developers, with communities ranging from high-density commercial (Business Bay) to luxury residential (JBR, Villa Lantana). Each community's guidelines reflect its unique character.",
      "Business Bay is primarily commercial/mixed-use. Fit-out guidelines emphasize: ceiling height compliance (3m minimum for commercial), floor loading limits, fire compartmentation, parking allocation, and service yard access.",
      "Jumeirah Beach Residence (JBR) has specific guidelines for its beachfront location: facade alterations require special approval, balcony modifications are strictly controlled, and contractor access is limited to service entrances during specified hours.",
      "Villa communities (Mudon, Villa Lantana) follow typical master community guidelines with emphasis on: architectural style consistency, external color palettes, boundary wall treatments, and landscape design.",
      "DP conducts milestone inspections during construction — typically after demolition, after MEP rough-in, and at completion. Each inspection must be passed before proceeding to the next stage.",
    ],
    parentApprovalSlug: "dubai-properties-approval",
    relatedSlugs: guideRelated("developer-community", "dubai-properties-noc-process"),
    lastUpdated: "2026-07-01",
  },

  /* ------------------------------------------------------------------
     Property & Registration Q&A Guides
     ------------------------------------------------------------------ */
  {
    slug: "ejari-registration-complete-guide",
    type: "qa",
    title: "Ejari Registration: Complete Guide for Dubai Tenants 2026",
    description:
      "Everything you need to know about Ejari registration in Dubai. Step-by-step process, required documents, fees, and renewal procedures for residential and commercial tenancy contracts.",
    primaryKeyword: "Ejari registration complete guide Dubai",
    secondaryKeywords: [
      "how to register Ejari Dubai",
      "Ejari documents required",
      "Ejari online registration",
      "Ejari renewal process Dubai",
    ],
    question:
      "How do I register an Ejari tenancy contract in Dubai?",
    answer:
      "Ejari registration is mandatory for all tenancy contracts in Dubai. The process: (1) Prepare required documents (original tenancy contract, Emirates ID, passport copy, title deed copy, DEWA bill), (2) Visit an authorized Ejari typing center or use the Dubai REST app, (3) Pay the registration fee (AED 155–220 for residential, AED 220–550 for commercial), (4) Receive Ejari certificate instantly (online) or within 1–2 business days (typing center). Ejari must be renewed annually with the tenancy contract. Without a valid Ejari, you cannot: activate DEWA connection, register for district cooling, apply for resident visas, or access certain government services. Ejari is also required for the Dubai Rental Increase Calculator and any RERA dispute cases.",
    content: [
      "Ejari (Arabic for 'My Rent') is the Dubai Land Department's online system for registering tenancy contracts. It provides legal protection for both landlords and tenants and is the official record of tenancy in Dubai.",
      "Documents required: original signed tenancy contract (two copies), passport copies of all tenants, Emirates ID of all tenants, title deed copy (from landlord), DEWA bill (proof of premises), and Ejari registration form (completed at typing center).",
      "For commercial Ejari, additional documents may be required: trade license, tenancy contract registered with the relevant free zone (if applicable), and proof of business registration.",
      "Ejari disputes are handled by RERA's Rental Dispute Settlement Centre. A registered Ejari is required to file a complaint or access the Rental Increase Calculator to verify rent increase legality.",
      "Your Ejari is automatically linked to your DEWA account. If your Ejari expires, DEWA may disconnect service. Always renew your Ejari before the tenancy contract expiration date.",
    ],
    parentApprovalSlug: "ejari-registration",
    relatedSlugs: guideRelated("property-registration", "ejari-registration-complete-guide"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "title-deed-transfer-dubai",
    type: "qa",
    title: "Title Deed Transfer in Dubai: Process, Fees & Timeline 2026",
    description:
      "Complete guide to transferring a title deed in Dubai. Covers the Dubai Land Department transfer process, fees (2% + administrative), required documents, and step-by-step procedure.",
    primaryKeyword: "title deed transfer Dubai process",
    secondaryKeywords: [
      "Dubai Land Department title deed transfer",
      "how to transfer property title Dubai",
      "Dubai property transfer fees",
      "title deed transfer process DLD",
    ],
    question:
      "What is the process for transferring a title deed in Dubai?",
    answer:
      "Title deed transfer in Dubai is processed through the Dubai Land Department (DLD). The process: (1) Obtain a No Objection Certificate (NOC) from the developer (AED 500–5,000 depending on developer), (2) Attend DLD appointment at Trustee Office or service center, (3) Submit original title deed, passport copies, Emirates IDs, and previous sale agreement, (4) Pay DLD transfer fee (2% of property value + AED 580 administrative fee + AED 4,000 registration fee), (5) New title deed issued within 3–7 business days. Off-plan property transfers require a separate process through RERA and Oqood registration. Both buyer and seller (or their authorized representatives) must be present for the transfer.",
    content: [
      "DLD transfer fee is 2% of the property value (not the purchase price — DLD uses their own valuation if it differs from the sale price). Additional fees include AED 580 for the Trustee Office service and AED 4,000 for registration.",
      "The developer NOC is the first step and its cost varies significantly: Emaar charges AED 5,000, Nakheel AED 3,150, Damac AED 2,000–5,000, and smaller developers may charge AED 500–2,000. The NOC confirms the developer has no objection to the transfer and no outstanding service charges.",
      "Both parties must attend the DLD appointment in person or through a legal representative with a notarized power of attorney. Original passports and Emirates IDs are required for verification.",
      "For mortgage properties, the bank's NOC is also required. The bank will coordinate with DLD to register the new mortgage in the buyer's name during the transfer process.",
      "After the transfer, the new title deed is registered in the buyer's name and linked to their Emirates ID. The buyer is responsible for updating DEWA, Ejari, and community management with the new ownership details.",
    ],
    parentApprovalSlug: "title-deed-registration",
    relatedSlugs: guideRelated("property-registration", "title-deed-transfer-dubai"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "rera-permit-requirements-guide",
    type: "qa",
    title: "RERA Permit Requirements: Complete Guide 2026",
    description:
      "Complete guide to RERA permits in Dubai for off-plan property sales, rental increases, service charges, and real estate advertising. Requirements, fees, and processing times.",
    primaryKeyword: "RERA permit requirements Dubai",
    secondaryKeywords: [
      "RERA off-plan permit",
      "RERA rental increase calculator",
      "RERA service charge guide",
      "RERA permit for real estate advertising",
    ],
    question:
      "What permits does RERA require and how do I obtain them?",
    answer:
      "RERA (Real Estate Regulatory Authority) issues several permit types: (1) Off-plan sales permit — required for developers selling off-plan, costs AED 100,000–200,000 per project phase, (2) Rental Increase Calculator — available online to verify legal rent increases, (3) Real estate advertising permit — required for all property advertisements, costs AED 150–500 per ad, (4) Broker registration — all property brokers must be RERA-registered and pass the RERA exam, (5) Property snapshot certificate — required for property handovers and transfers. Off-plan permit applications require: master plan approval, escrow account setup, construction timeline, and financial guarantees. Processing takes 10–20 business days.",
    content: [
      "RERA was established in 2007 to regulate the Dubai real estate sector. It operates under the Dubai Land Department and oversees all real estate-related activities including development, sales, rentals, and broker services.",
      "The off-plan sales permit is the most significant RERA permit. Developers must: (1) Register the project with RERA, (2) Open an escrow account with a RERA-approved bank, (3) Submit financial guarantees, (4) Provide construction timeline and completion guarantee, (5) Pay the permit fee (AED 100,000–200,000 per phase).",
      "Real estate advertising permits are required for every property advertisement — online listings, print ads, social media posts, and billboards. Each ad needs a unique RERA permit number that must be displayed on the advertisement.",
      "RERA also regulates the relationship between landlords and tenants through the Rental Increase Calculator, which landlords must use before demanding any rent increase. The calculator considers current rent vs. average market rent for similar properties.",
      "Service charges are regulated by RERA through the Service Charge Index, which sets maximum annual increases. Developers and building owners must submit service charge breakdowns to RERA for approval.",
    ],
    parentApprovalSlug: "rera-permit",
    relatedSlugs: guideRelated("property-registration", "rera-permit-requirements-guide"),
    lastUpdated: "2026-07-01",
  },

  /* ------------------------------------------------------------------
     Technical & Utility Q&A Guides
     ------------------------------------------------------------------ */
  {
    slug: "dewa-connection-process-guide",
    type: "qa",
    title: "DEWA Connection Process: Complete Step-by-Step Guide 2026",
    description:
      "Complete guide to DEWA connection for new buildings and renovations in Dubai. Application process, required documents, fees, timeline, and inspection requirements.",
    primaryKeyword: "DEWA connection process Dubai guide",
    secondaryKeywords: [
      "how to get DEWA connection",
      "DEWA new connection application",
      "DEWA connection fees Dubai",
      "DEWA inspection process",
    ],
    question:
      "How do I get a DEWA connection for my property in Dubai?",
    answer:
      "DEWA connection process: (1) Submit application through DEWA website or app with Emirates ID, title deed/tenancy contract, and building completion certificate (for new builds), (2) Pay connection fee (AED 300 for standard residential, AED 500 for commercial), (3) Schedule DEWA inspection (2–5 business days), (4) Pass inspection confirming meter location, load capacity, and wiring compliance, (5) DEWA installs meter and activates connection (1–3 business days after inspection). For temporary power connections, process is faster (2–4 business days). Load enhancement applications require additional documentation including electrical load calculations and consultant certification. Total timeline: 3–10 business days for standard connections.",
    content: [
      "DEWA (Dubai Electricity and Water Authority) is the sole provider of electricity and water in Dubai. Every building — residential, commercial, or industrial — requires a DEWA connection before occupation.",
      "For new buildings, the DEWA connection requires: (1) Building completion certificate from DM, (2) Electrical as-built drawings, (3) Load calculation report certified by a registered electrical engineer, (4) NOC from district cooling provider (if applicable).",
      "For existing buildings needing additional load (load enhancement): submit electrical load study, certified by a registered electrical consultant, showing existing vs. required load capacity. DEWA may require transformer upgrade at owner's cost.",
      "DEWA meter sizes determine connection capacity: standard residential = 60A/100A, commercial units = 100A/200A, industrial = 200A+. Larger meters require higher security deposits and connection fees.",
      "DEWA offers a temporary power connection option for construction sites, taking 2–4 business days. The temporary connection is converted to permanent upon building completion.",
    ],
    parentApprovalSlug: "dewa-approval",
    relatedSlugs: guideRelated("technical-utility", "dewa-connection-process-guide"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "district-cooling-connection-guide",
    type: "qa",
    title: "District Cooling Connection Guide: Dubai (2026)",
    description:
      "Complete guide to district cooling connections in Dubai. Covers connection process, fees, required documents, and coordination with providers like Empower, Emirates District Cooling, and Tabreed.",
    primaryKeyword: "district cooling connection Dubai guide",
    secondaryKeywords: [
      "district cooling connection process",
      "Empower district cooling connection",
      "Emirates District Cooling guide",
      "district cooling fees Dubai",
    ],
    question:
      "How do I connect to district cooling in Dubai?",
    answer:
      "District cooling connection process: (1) Identify your building's district cooling provider (Empower, Emirates District Cooling, Tabreed, or others), (2) Submit connection application with building drawings, load calculation, and DM approval, (3) Provider reviews capacity availability and issues connection offer, (4) Sign connection agreement and pay connection fees (AED 5,000–50,000 depending on capacity), (5) Provider installs connection from district cooling plant to building, (6) Commissioning and testing, (7) Connection activated. Processing takes 2–4 weeks. District cooling is mandatory in many Dubai master communities (Downtown Dubai, Dubai Marina, Business Bay, JLT, etc.) — individual chillers are not permitted in these areas.",
    content: [
      "District cooling is a centralized cooling system that provides chilled water to multiple buildings from a central plant. It is more energy-efficient and environmentally friendly than individual building chillers.",
      "In Dubai, district cooling is mandatory in most master-planned communities including: Downtown Dubai (Empower), Dubai Marina (Empower/EDC), Business Bay (Empower/Tabreed), JLT (Empower), Dubai Silicon Oasis (Tabreed), and Expo City Dubai (Noor Mawarid).",
      "Connection fees are calculated based on the cooling capacity required (RT — Refrigeration Tons). Typical residential apartments require 1–3 RT, villas 5–10 RT, and commercial spaces vary based on area and occupancy.",
      "Monthly cooling charges consist of: (1) Capacity charge — fixed fee based on connected load, (2) Consumption charge — variable fee based on actual usage measured in RT-hours. Rates are regulated by RERA.",
      "Before connecting, verify the provider has available capacity in your area. Some areas may have waiting lists during peak season (April–October). Early application is recommended for projects with tight timelines.",
    ],
    parentApprovalSlug: "district-cooling-approval",
    relatedSlugs: guideRelated("technical-utility", "district-cooling-connection-guide"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "dewa-meter-installation-steps",
    type: "qa",
    title: "DEWA Meter Installation: Step-by-Step Process 2026",
    description:
      "Complete guide to DEWA meter installation for residential and commercial properties. Requirements, process, fees, timeline, and common issues.",
    primaryKeyword: "DEWA meter installation steps Dubai",
    secondaryKeywords: [
      "how to install DEWA meter",
      "DEWA meter installation fee",
      "DEWA meter replacement process",
      "DEWA meter upgrade Dubai",
    ],
    question:
      "How do I get a DEWA meter installed in Dubai?",
    answer:
      "DEWA meter installation process: (1) Ensure building has DM completion certificate or renovation completion certificate, (2) Submit meter installation application through DEWA website, (3) Provide electrical load certificate from registered consultant, (4) Schedule DEWA inspection of meter room/panel, (5) Pay installation fee (AED 500–2,000 depending on meter size), (6) DEWA installs meter and seals it (1–3 business days after payment), (7) Submit meter reading for billing commencement. Standard residential meters (60A–100A) cost AED 500–1,000. Three-phase meters for commercial/industrial cost AED 1,500–2,000. Installation timeline: 3–7 business days from application. Replacement meters (due to damage or upgrade) follow a simplified process taking 2–4 business days.",
    content: [
      "DEWA meter installation requires a dedicated meter room or panel that meets DEWA's technical specifications. The meter room must be: weatherproof, ventilated, accessible 24/7, properly earthed, and located at the building boundary or approved location.",
      "Smart meters are now standard for all new DEWA installations. These enable remote reading, real-time consumption monitoring, and automatic disconnection/reconnection. Smart meters are installed at no additional cost.",
      "For villa communities with shared meter rooms, coordination with community management may be required for meter room access and space allocation.",
      "Temporary meters for construction sites require a separate application and deposit (AED 2,000–5,000, refundable upon meter removal and account closure).",
      "If your meter is damaged or needs upgrade: contact DEWA for assessment, submit a replacement/upgrade application, pay the required fee, and schedule installation. During replacement, temporary power disruption of 2–4 hours is normal.",
    ],
    parentApprovalSlug: "dewa-meter-installation",
    relatedSlugs: guideRelated("technical-utility", "dewa-meter-installation-steps"),
    lastUpdated: "2026-07-01",
  },

  /* ------------------------------------------------------------------
     Trade, Food & Hospitality Q&A Guides
     ------------------------------------------------------------------ */
  {
    slug: "dubai-food-control-approval-guide",
    type: "qa",
    title: "Dubai Food Control Department Approval Guide 2026",
    description:
      "Complete guide to obtaining Dubai Municipality Food Control Department approval for restaurants, cafés, food trucks, and food manufacturing facilities in Dubai.",
    primaryKeyword: "Dubai Food Control Department approval guide",
    secondaryKeywords: [
      "DM food control approval",
      "restaurant approval Dubai Municipality",
      "food safety permit Dubai",
      "Dubai food establishment license",
    ],
    question:
      "How do I get Dubai Municipality Food Control Department approval?",
    answer:
      "Dubai Municipality Food Control Department (FCD) approval process: (1) Submit food business registration application with trade license and premises details, (2) Submit kitchen/ food preparation area design drawings for approval (compliance with food safety code), (3) FCD reviews drawings for food safety compliance (5–10 business days), (4) Upon approval, proceed with fit-out per approved drawings, (5) Request FCD inspection after fit-out completion, (6) Pass inspection covering: sanitation, equipment compliance, waste management, pest control, and staff facilities, (7) FCD issues food establishment permit. Requirements include: HACCP-compliant kitchen layout, stainless steel food contact surfaces, proper ventilation, grease traps, three-sink dishwashing system, separate storage for raw/cooked foods, and staff hygiene facilities. Fees: AED 500–3,000 depending on establishment type.",
    content: [
      "Dubai Municipality's Food Control Department regulates all food establishments in Dubai including restaurants, cafés, bakeries, food trucks, catering services, and food manufacturing facilities.",
      "Kitchen design must follow DM Food Code specifications: food contact surfaces must be stainless steel (grade 304 minimum), floor drains required throughout, walls must have smooth washable finishes up to 2m height, and proper ventilation hoods over cooking equipment.",
      "The HACCP (Hazard Analysis Critical Control Point) plan is mandatory for all food establishments. The plan documents: food flow from receipt to service, critical control points, temperature monitoring procedures, cleaning schedules, and staff hygiene protocols.",
      "Staff requirements: all food handlers must have a valid Dubai Municipality food handler certificate, medical fitness certificate, and complete the DM Food Safety Training program.",
      "Annual renewal is required with updated documents including: valid trade license, staff health certificates, pest control service contract, and waste management agreement.",
    ],
    parentApprovalSlug: "food-control-department-approval",
    relatedSlugs: guideRelated("trade-food-hospitality", "dubai-food-control-approval-guide"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "dtcm-tourism-license-requirements",
    type: "qa",
    title: "DTCM Tourism License: Requirements & Approval Process 2026",
    description:
      "Complete guide to obtaining a DTCM (Dubai Department of Economy and Tourism) tourism license for hotels, tourist attractions, travel agencies, and tourism-related businesses.",
    primaryKeyword: "DTCM tourism license requirements Dubai",
    secondaryKeywords: [
      "Dubai tourism license application",
      "DTCM hotel classification approval",
      "travel agency license Dubai",
      "DTCM approval process tourism",
    ],
    question:
      "What are the requirements for a DTCM tourism license in Dubai?",
    answer:
      "DTCM (Dubai Department of Economy and Tourism) tourism license requirements: (1) Valid trade license with tourism activity, (2) Premises meeting DTCM classification standards (for hotels: star rating requirements; for travel agencies: office space minimum 50m²), (3) Submit premises design/ fit-out drawings for DTCM review, (4) Qualified staff with relevant tourism certifications, (5) Insurance coverage as per DTCM requirements, (6) DTCM inspection and classification (for hotels: star rating assessment), (7) Pay licensing fee (AED 10,000–50,000 for hotels depending on classification, AED 3,000–10,000 for travel agencies). Processing takes 15–30 business days for standard applications. Annual renewal is required with updated documentation.",
    content: [
      "DTCM (formerly Dubai Tourism) regulates all tourism-related activities in Dubai including hotels, hotel apartments, travel agencies, tour operators, tourist attractions, and event organizers.",
      "Hotel classification (star rating) is a separate process under DTCM. The hotel must meet specific criteria across 10 categories: building architecture, room size and amenities, F&B facilities, guest services, housekeeping standards, and more.",
      "Travel agencies must have: an office of minimum 50m² in a commercial area, a DTCM-qualified manager, professional indemnity insurance (minimum AED 2 million coverage), and a bond or bank guarantee.",
      "Tourist attractions require: safety compliance certification, accessibility compliance, DTCM-approved operational plan, and periodic safety inspections. Theme parks and adventure attractions have additional safety requirements.",
      "All DTCM-licensed establishments must comply with Dubai's tourism code of conduct, including guest privacy, alcohol service regulations, dress code requirements, and cultural sensitivity guidelines.",
    ],
    parentApprovalSlug: "dtcm-tourism-approval",
    relatedSlugs: guideRelated("trade-food-hospitality", "dtcm-tourism-license-requirements"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "dha-healthcare-approval-guide",
    type: "qa",
    title: "DHA Healthcare Approval: License & Facility Guide 2026",
    description:
      "Complete guide to obtaining Dubai Health Authority (DHA) approval for healthcare facilities, clinics, medical centers, and pharmacies in Dubai.",
    primaryKeyword: "DHA healthcare approval Dubai guide",
    secondaryKeywords: [
      "DHA clinic license Dubai",
      "Dubai Health Authority approval process",
      "healthcare facility license Dubai",
      "DHA medical center approval",
    ],
    question:
      "How do I get DHA approval for a healthcare facility in Dubai?",
    answer:
      "DHA (Dubai Health Authority) approval process: (1) Submit health facility registration application with trade license and premises details, (2) Submit facility design drawings (clinical layout per DHA standards — minimum clinic size 100m², specific room dimensions for consultation, treatment, and diagnostic areas), (3) DHA Engineering Review of drawings (10–15 business days), (4) Upon design approval, proceed with fit-out, (5) Request DHA inspection after fit-out, (6) Pass inspection covering: infection control, equipment calibration, waste management, accessibility, and staffing, (7) DHA issues health facility license. Staff requirements: DHA-licensed doctors, nurses, and technicians must be registered with DHA before facility license issuance. Fees: AED 15,000–50,000 depending on facility type.",
    content: [
      "DHA regulates all healthcare facilities in Dubai including hospitals, medical centers, clinics (general and specialized), pharmacies, diagnostic centers, and alternative medicine facilities.",
      "Clinical space requirements are strict: consultation rooms minimum 12m², treatment rooms minimum 15m², waiting areas at least 8m², and separate male/female waiting where applicable. All clinical rooms must have hand-wash basins.",
      "Infection control is a primary focus of DHA inspections. Requirements include: separate clean/dirty utility rooms, proper waste segregation (clinical vs. general), autoclave facilities (if surgical procedures performed), and air handling with HEPA filtration for certain procedures.",
      "Equipment requirements vary by facility type but typically include: calibrated medical equipment with maintenance contracts, emergency equipment (crash cart, defibrillator), and diagnostic equipment as per scope of services.",
      "Staff licensing: all healthcare professionals must pass DHA's eligibility verification, Prometric/ dataflow examination, and obtain a DHA professional license. The facility license cannot be issued until all staff are individually licensed.",
    ],
    parentApprovalSlug: "dubai-health-authority-approval",
    relatedSlugs: guideRelated("trade-food-hospitality", "dha-healthcare-approval-guide"),
    lastUpdated: "2026-07-01",
  },

  /* ------------------------------------------------------------------
     Fit-Out & Construction Q&A Guides
     ------------------------------------------------------------------ */
  {
    slug: "interior-fit-out-permit-process",
    type: "qa",
    title: "Interior Fit-Out Permit Process: Complete Dubai Guide 2026",
    description:
      "Complete step-by-step guide to obtaining interior fit-out permits in Dubai. Covers DM permits, developer NOCs, DCD approvals, and contractor requirements for commercial and residential fit-outs.",
    primaryKeyword: "interior fit-out permit process Dubai",
    secondaryKeywords: [
      "Dubai fit-out permit requirements",
      "commercial fit-out approval Dubai",
      "fit-out permit process steps",
      "residential fit-out permit Dubai",
    ],
    question:
      "What is the complete process for obtaining an interior fit-out permit in Dubai?",
    answer:
      "The interior fit-out permit process in Dubai: (1) Obtain developer/community NOC (3–10 business days), (2) Submit fit-out drawings to Dubai Municipality for building permit (architectural, MEP, fire safety), (3) Obtain DCD NOC (if fire safety systems are affected — 5–10 business days), (4) DM issues fit-out building permit (5–15 business days), (5) Register contractor with DM and obtain contractor NOC, (6) Execute fit-out per approved drawings, (7) DM milestone inspections at key stages, (8) Obtain fit-out completion certificate. Total timeline: 4–8 weeks for standard commercial fit-outs. Required documents: title deed/tenancy contract, original building permit drawings, fit-out design drawings, contractor registration, and all NOCs.",
    content: [
      "The fit-out permit is a specific type of DM building permit for interior works only. It is faster and less expensive than a full building permit but still requires complete documentation.",
      "Developer NOC is typically the first step and often the most time-consuming. Each developer has specific requirements and processing times. Start this application early in the process.",
      "Contractor registration is mandatory — only DM-registered contractors can execute fit-out works. The contractor must have a valid trade license with relevant activity, DM classification, and insurance coverage.",
      "DM milestone inspections typically include: after demolition (verify no structural damage), after MEP rough-in (before ceiling closure), and final completion (before occupancy). Each inspection must be passed before proceeding.",
      "Common delays include: incomplete drawings, missing NOCs, unregistered contractors, and discrepancies between submitted drawings and site conditions. A pre-submission audit by an experienced consultant can prevent these issues.",
    ],
    parentApprovalSlug: "interior-fit-out-approval",
    relatedSlugs: guideRelated("fit-out-construction", "interior-fit-out-permit-process"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "change-of-usage-permit-guide",
    type: "qa",
    title: "Change of Usage Permit Dubai: Complete Guide 2026",
    description:
      "Everything you need to know about obtaining a change of usage permit in Dubai. Process, requirements, fees, and restrictions for changing property usage from residential to commercial or vice versa.",
    primaryKeyword: "change of usage permit Dubai guide",
    secondaryKeywords: [
      "change of property usage Dubai",
      "residential to commercial conversion Dubai",
      "Dubai Municipality change of use permit",
      "usage change permit requirements Dubai",
    ],
    question:
      "How do I get a change of usage permit in Dubai?",
    answer:
      "Change of usage permit process in Dubai: (1) Verify if the proposed usage change is permitted in your zone (check DM zoning regulations), (2) Submit change of usage application to Dubai Municipality with justification, (3) Provide structural feasibility report (registered structural engineer certifying the building can accommodate the new usage), (4) Obtain developer/community NOC for the usage change, (5) DM reviews application (10–20 business days), (6) Upon approval, submit detailed fit-out drawings for the new usage type, (7) Obtain all relevant NOCs (DCD, DEWA, RTA if applicable), (8) Execute modifications and obtain completion certificate. Fees: AED 2,000–10,000 depending on usage type and building size. Not all usage changes are permitted — residential-to-commercial conversions in villa areas are often restricted.",
    content: [
      "Change of usage permits are required when converting a property from one use type to another — e.g., residential villa to commercial office, warehouse to showroom, or retail to restaurant.",
      "Zoning restrictions are the primary gatekeeper. Dubai Municipality's zoning map determines which areas allow which usage types. Heritage areas, villa communities, and certain master-planned areas have strict usage restrictions.",
      "Structural feasibility is a key requirement. The change may impose different floor loading requirements (e.g., restaurant vs. residential), different fire safety standards, different parking requirements, and different accessibility standards.",
      "Community NOC is often the most challenging step. Many residential communities (Emaar, Nakheel, etc.) restrict commercial activities within residential areas. Even home office licenses (Tajer) have limitations.",
      "If the usage change is permitted, the fit-out must comply with the new usage type's specific regulations — restaurant fit-out standards for F&B conversion, DHA standards for medical conversion, etc.",
    ],
    parentApprovalSlug: "change-of-usage-permit",
    relatedSlugs: guideRelated("fit-out-construction", "change-of-usage-permit-guide"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "structural-modification-approval-guide",
    type: "qa",
    title: "Structural Modification Approval Guide: Dubai 2026",
    description:
      "Complete guide to obtaining structural modification approval in Dubai. Process for structural alterations, extensions, slab openings, and load-bearing wall modifications.",
    primaryKeyword: "structural modification approval Dubai guide",
    secondaryKeywords: [
      "structural alteration permit Dubai",
      "building extension approval Dubai",
      "load-bearing wall removal approval",
      "slab opening permit Dubai",
    ],
    question:
      "How do I get structural modification approval in Dubai?",
    answer:
      "Structural modification approval process: (1) Engage a registered structural engineer to assess existing structure and design modifications, (2) Submit structural modification drawings to Dubai Municipality with structural calculations, (3) Obtain developer/community NOC confirming structural modifications are permitted in the community, (4) DM structural review (10–15 business days) — may require peer review for complex modifications, (5) Upon approval, proceed with structural works per approved drawings, (6) DM structural inspection at key milestones (foundation/pile installation, steel erection, concrete pour), (7) Structural completion certificate. Required documents: original structural drawings, soil investigation report (for extensions), structural calculations, material test certificates, and contractor qualification documents. Fees: AED 3,000–15,000 depending on modification scale.",
    content: [
      "Structural modifications include: removing or adding load-bearing walls, creating openings in slabs, adding mezzanine floors, building extensions, underpinning foundations, and adding heavy equipment that affects structural loading.",
      "All structural designs must be prepared by a registered structural engineer with a valid DM classification. The engineer takes responsibility for the structural integrity of the modification.",
      "Peer review is required for complex modifications: buildings over 10 floors, modifications in high-seismic zones, buildings with unusual structural systems, or modifications exceeding certain size thresholds.",
      "Developer NOC for structural modifications may have additional restrictions. Some communities (especially villas) permit certain structural changes while others prohibit them entirely. Check community guidelines before designing modifications.",
      "During construction, DM requires structural inspections at critical stages: before concrete pour (reinforcement check), after concrete cure (quality testing), and at completion (load testing if required).",
    ],
    parentApprovalSlug: "structural-modification-permit",
    relatedSlugs: guideRelated("fit-out-construction", "structural-modification-approval-guide"),
    lastUpdated: "2026-07-01",
  },

  /* ------------------------------------------------------------------
     Drawing & Documentation Q&A Guides
     ------------------------------------------------------------------ */
  {
    slug: "cad-drawing-standards-dubai-guide",
    type: "qa",
    title: "CAD Drawing Standards Dubai: Complete Guide 2026",
    description:
      "Complete guide to CAD drawing standards required by Dubai Municipality. Layer naming, line weights, text styles, title blocks, and submission requirements for DM approval.",
    primaryKeyword: "CAD drawing standards Dubai guide",
    secondaryKeywords: [
      "Dubai Municipality CAD standards",
      "DM CAD layer naming conventions",
      "CAD drawing submission requirements Dubai",
      "Dubai CAD drawing standards 2026",
    ],
    question:
      "What are the CAD drawing standards required by Dubai Municipality?",
    answer:
      "Dubai Municipality CAD standards cover: (1) File format — .dwg format (AutoCAD 2018 or later), (2) Layer naming — AIA layer naming convention with DM-specific modifications (e.g., A-WALL for architectural walls, S-COLS for structural columns), (3) Line weights — standard pen assignments for different elements (thick lines for cut elements, medium for visible edges, thin for dimensions/text), (4) Text styles — Romans or Arial font, specific heights for different text types (titles: 3.5mm, dimensions: 2.5mm, notes: 2.0mm), (5) Title blocks — standard DM title block format with project name, drawing title, scale, date, revision number, and consultant stamp, (6) Dimension styles — DM-standard dimension format with arrows or ticks, specific text placement, and precision levels. All submissions must include a CAD standards compliance checklist signed by the consultant.",
    content: [
      "DM adopted the AIA (American Institute of Architects) layering standard with local modifications. Key layers include: A-WALL (architectural walls), A-DOOR (doors), A-WIND (windows), S-COLS (structural columns), S-BEAM (structural beams), E-LITE (electrical lighting), E-POWR (electrical power), M-SUPP (mechanical supply) — each with specific color, line type, and line weight assignments.",
      "Pen assignments (line weights) follow DM standard: cut elements (walls, slabs in section) = 0.50–0.70mm, visible edges (elevations) = 0.25–0.35mm, hidden/dimension lines = 0.10–0.18mm, hatching/pattern fills = 0.05–0.10mm.",
      "Title blocks must follow DM's standardized format showing: project name and location, consultant name and stamp, drawing title and number, scale(s), date of issue, revision history with cloud markups, and DM-issued project reference number.",
      "The CAD standards compliance checklist must be submitted with every drawing set. The checklist verifies: correct layer naming, proper pen assignments, standard text styles, complete title blocks, correct dimension styles, and file format compliance.",
      "Non-compliant CAD drawings are the #1 reason for drawing submission rejection. Using Wasleen's pre-submission CAD audit service ensures your drawings meet DM standards before official submission.",
    ],
    parentApprovalSlug: "cad-drawing-certification",
    relatedSlugs: guideRelated("drawing-documentation", "cad-drawing-standards-dubai-guide"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "as-built-drawing-requirements",
    type: "qa",
    title: "As-Built Drawing Requirements in Dubai: Complete Guide 2026",
    description:
      "Everything you need to know about as-built drawing requirements in Dubai. DM standards, submission process, common rejection reasons, and how to get approval.",
    primaryKeyword: "as-built drawing requirements Dubai",
    secondaryKeywords: [
      "as-built drawing DM requirements",
      "as-built CAD submission Dubai",
      "as-built drawing approval process",
      "Dubai as-built drawing standards",
    ],
    question:
      "What are Dubai's requirements for as-built drawings?",
    answer:
      "Dubai's as-built drawing requirements: (1) As-built drawings must show the actual constructed condition versus the approved design, (2) All deviations from approved drawings must be clearly marked with revision clouds, numbered tags, and a revision schedule, (3) As-built drawings must follow the same CAD standards as the original submission (DM CAD standards for layer naming, line weights, text styles, title blocks), (4) Must be certified by the original design consultant (or a DM-registered consultant), (5) Format: .dwg files plus plotted PDF sets stamped and signed, (6) Submit through DM building permit system with completion certificate application. Processing: 3–7 business days for standard reviews. Common rejection reasons: missing revision clouds, undocumented field changes, dimensional discrepancies, and incomplete consultant certification.",
    content: [
      "As-built drawings are the definitive record of what was actually built. They are critical for: completion certificate issuance, facility management, future renovation planning, property transactions, and building safety compliance.",
      "The as-built set must include ALL drawing disciplines: architectural, structural, MEP (mechanical, electrical, plumbing), fire safety, and any specialist drawings (IT, security, audio-visual).",
      "Field verification is essential — the drawings must reflect actual site measurements, not design intent. Wasleen conducts comprehensive site surveys to ensure as-built accuracy before submission.",
      "Revision management is critical: each change must have a unique revision cloud, revision number, date, and description in the revision schedule. Disorganized or incomplete revision tracking is a common rejection reason.",
      "Digital submission requirements: .dwg files in DM-compatible version, plotted PDFs with consultant stamps and signatures, and a completed DM as-built checklist confirming all requirements are met.",
    ],
    parentApprovalSlug: "as-built-drawing-approval",
    relatedSlugs: guideRelated("drawing-documentation", "as-built-drawing-requirements"),
    lastUpdated: "2026-07-01",
  },
  {
    slug: "3d-design-submission-guide",
    type: "qa",
    title: "3D Design Submission Guide: Dubai Municipality & Developers 2026",
    description:
      "Complete guide to 3D design submissions for Dubai Municipality and developer approvals. Requirements, viewpoints, rendering standards, and submission process.",
    primaryKeyword: "3D design submission guide Dubai",
    secondaryKeywords: [
      "3D rendering submission DM Dubai",
      "3D design approval requirements Dubai",
      "3D submission for developer approval",
      "3D visualization standards Dubai",
    ],
    question:
      "How do I prepare a 3D design submission for approval in Dubai?",
    answer:
      "3D design submission requirements: (1) High-quality 3D renderings from multiple viewpoints (typically 4–8 views depending on authority requirements), (2) Contextual massing model showing the proposed building within its surroundings, (3) Material and color specification sheet, (4) Shadow study (required for projects above certain height or in sensitive zones), (5) Night-time illumination study (may be required for commercial or landmark buildings), (6) Submit through DM or developer design review portal. Key requirements: renderings must be photorealistic but accurate — no misleading representations, materials must match actual specifications, and context must be accurate. Processing: 3–7 business days. DM requires 3D submissions for projects in heritage areas, coastal zones, high-profile developments, and certain free zones.",
    content: [
      "3D design submissions are required by DM for projects in visually sensitive zones: heritage areas (Al Fahidi, Shindagha, Al Shindagha), coastal zones (JBR, Palm Jumeirah, Dubai Marina waterfront), high-profile corridors (Sheikh Zayed Road, Dubai Water Canal), and major development zones (Dubai Creek Harbour, Expo City).",
      "Viewpoint requirements: standard submissions include bird's-eye view (showing roofscape and massing), street-level perspective (pedestrian view), contextual view (showing integration with neighboring buildings), and elevation views from all four sides.",
      "Shadow studies must show the proposed building's shadow impact on surrounding properties at different times of day (typically 9 AM, 12 PM, 3 PM) and different seasons (summer and winter solstices).",
      "Material representation must be accurate — avoid 'over-rendering' with unrealistic materials or finishes. DM reviewers compare renderings against submitted material specifications. Discrepancies cause rejection.",
      "Developer-specific requirements vary: Nakheel requires contextual views from key Palm Jumeirah vantage points, Emaar requires integration studies with master plan context, and DMCC requires views from specific JLT vantage points.",
    ],
    parentApprovalSlug: "3d-design-approval",
    relatedSlugs: guideRelated("drawing-documentation", "3d-design-submission-guide"),
    lastUpdated: "2026-07-01",
  },
];
