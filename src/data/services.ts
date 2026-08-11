/**
 * All 5 service definitions for Wasleen Approvals.
 *
 * Each entry maps to a page at /services/{slug} and describes a specific
 * service offering such as 2D drawings, 3D design, CAD drafting, etc.
 *
 * @see src/types/index.ts for the ServiceData interface
 */

import type { ServiceData } from "@/types";

export const services: ServiceData[] = [
  /* ------------------------------------------------------------------
     2D Drawings
     ------------------------------------------------------------------ */
  {
    slug: "2d-drawings",
    name: "2D Drawings",
    tagline: "Professional 2D architectural & engineering drawings for DM submissions",
    primaryKeyword: "2D drawings Dubai approval",
    secondaryKeywords: [
      "2D architectural drawings Dubai",
      "2D engineering drawings for DM",
      "2D floor plan drawings Dubai",
      "2D drawing submission Dubai Municipality",
    ],
    directAnswer:
      "We prepare professional 2D architectural and engineering drawings for Dubai Municipality submissions. Our 2D drawing service covers floor plans, elevations, sections, MEP layouts, and structural drawings — all compliant with DM CAD standards. Typical turnaround: 2–5 business days per drawing set.",
    description:
      "Our 2D drawing service provides comprehensive architectural and engineering documentation for all types of building approval submissions in Dubai. Whether you need floor plans for a villa renovation, elevation drawings for a commercial fit-out, or detailed MEP layouts for a new building, our team of experienced CAD technicians produces accurate, DM-compliant drawings that get approved first time. We follow Dubai Municipality CAD standards for layer naming, line weights, text styles, and dimensioning, ensuring your submission package meets all requirements from day one.",
    features: [
      "Architectural drawings: floor plans, elevations, sections, and detailed drawings",
      "Structural drawings: foundation plans, beam/column layouts, reinforcement details",
      "MEP drawings: electrical layouts, plumbing schematics, HVAC ducting and zoning",
      "Fire safety drawings: fire escape routes, suppression systems, detection layouts",
      "As-built drawings: accurate documentation of completed construction",
      "CAD standards compliance: all drawings follow DM layer naming, line weights, and title block standards",
    ],
    process: [
      { step: 1, title: "Initial Consultation", description: "We discuss your project requirements, review existing documentation, and determine the scope of 2D drawings needed." },
      { step: 2, title: "Site Survey (if needed)", description: "Our team conducts on-site measurements and verification to ensure accurate base drawings." },
      { step: 3, title: "Drafting", description: "Experienced CAD technicians prepare 2D drawings following DM CAD standards and your specific requirements." },
      { step: 4, title: "Quality Review", description: "Senior team reviews all drawings for accuracy, completeness, and DM standards compliance." },
      { step: 5, title: "Delivery", description: "Final drawings delivered in .dwg and .pdf formats, ready for submission." },
    ],
    faqs: [
      { question: "What CAD software do you use for 2D drawings?", answer: "We use AutoCAD (latest versions) for all 2D drawings, ensuring compatibility with DM's .dwg format requirements. We can also work with drawings exported from Revit, ArchiCAD, or other BIM software." },
      { question: "How long does it take to prepare 2D drawings?", answer: "Typical turnaround is 2–5 business days per drawing set. Complex projects or large drawing sets may require 7–10 business days. Rush service available for urgent submissions." },
      { question: "Do your drawings meet DM CAD standards?", answer: "Yes, all our drawings follow Dubai Municipality CAD standards for layer naming (AIA-based), line weights, text styles, dimensioning, and title block format. We include the DM CAD compliance checklist with every submission." },
      { question: "Can you work from my existing drawings?", answer: "Absolutely. If you have existing drawings in any format, we can update, modify, or redraw them to DM standards. We also accept hand-drawn sketches and convert them to professional CAD drawings." },
      { question: "What file formats do you deliver?", answer: "We deliver final drawings in .dwg (AutoCAD) and .pdf formats. Additional formats available on request." },
    ],
    relatedSlugs: ["cad-documentation", "3d-design-visualization"],
    image: {
      src: "/images/2d-drawings-for-dcd-approvals-in-dubai.webp",
      alt: "2D architectural drawings prepared for Dubai Municipality and DCD approval submission",
      caption: "2D drawings prepared for Dubai approval submissions",
      width: 2336,
      height: 1760,
    },
    processImage: {
      src: "/images/blueprint-drawing-submission-approval-dubai.webp",
      alt: "Blueprint drawing set ready for building approval submission in Dubai",
      caption: "Blueprint drawings submitted for approval in Dubai",
      width: 1376,
      height: 768,
    },
    lastUpdated: "2026-07-01",
  },

  /* ------------------------------------------------------------------
     3D Design & Visualization
     ------------------------------------------------------------------ */
  {
    slug: "3d-design-visualization",
    name: "3D Design & Visualization",
    tagline: "Photorealistic 3D renderings & visualizations for DM & developer submissions",
    primaryKeyword: "3D design visualization Dubai approval",
    secondaryKeywords: [
      "3D rendering services Dubai",
      "architectural visualization Dubai",
      "3D design for DM submission",
      "3D visualization for developer approval",
    ],
    directAnswer:
      "We produce high-quality 3D renderings and visualizations for Dubai Municipality and developer design review submissions. Our service includes photorealistic exterior and interior renderings, contextual massing studies, shadow analysis, and material visualization. Turnaround: 3–7 business days per view set.",
    description:
      "Our 3D Design & Visualization service helps architects, developers, and property owners present their projects in the best possible light for approval submissions. We produce photorealistic 3D renderings that accurately represent the proposed design while meeting all authority requirements for visual impact assessment. Our team uses industry-leading rendering software to create images that are both visually compelling and technically accurate — ensuring reviewers can clearly assess the design within its context. We specialize in DM and developer design review submissions, including contextual studies, shadow analysis, and material visualization.",
    features: [
      "Photorealistic exterior renderings from multiple viewpoints",
      "Interior renderings for fit-out and renovation submissions",
      "Contextual massing studies showing the project within its surroundings",
      "Shadow analysis for height and solar impact assessment",
      "Material and finish visualization boards",
      "Night-time illumination studies for commercial and landmark projects",
      "Animation and walkthrough videos for major developments",
    ],
    process: [
      { step: 1, title: "Project Brief", description: "We review your design drawings, understand the approval requirements, and determine the specific views needed." },
      { step: 2, title: "3D Modeling", description: "Create detailed 3D model from your architectural drawings with accurate geometry and proportions." },
      { step: 3, title: "Context Integration", description: "Insert the model into its actual surroundings using site photography or GIS data for accurate contextual views." },
      { step: 4, title: "Material & Lighting Setup", description: "Apply accurate materials, textures, and lighting based on your specifications for photorealistic output." },
      { step: 5, title: "Rendering", description: "Produce high-resolution renderings from all required viewpoints with appropriate settings." },
      { step: 6, title: "Post-Production & Delivery", description: "Final touch-up, annotation (if required), and delivery in formats suitable for DM/developer submission." },
    ],
    faqs: [
      { question: "What viewpoints are typically required for DM submissions?", answer: "Standard submissions require 4–8 views including bird's-eye, street-level perspective, contextual massing, and elevation views. Heritage areas and coastal zones may require additional viewpoints." },
      { question: "Can you provide shadow studies?", answer: "Yes, we provide comprehensive shadow studies showing solar impact at different times (9AM, 12PM, 3PM) and seasons (summer/winter solstice). This is often required for projects in sensitive zones." },
      { question: "What is the typical turnaround time?", answer: "Standard rendering packages (4–6 views) take 5–7 business days. Complex projects with multiple views or animations may require 10–15 business days." },
      { question: "Do you provide material specification sheets with renderings?", answer: "Yes, we include material and finish specification sheets cross-referenced with the renderings, showing exactly which materials are represented in each view." },
    ],
    relatedSlugs: ["2d-drawings", "cad-documentation"],
    image: {
      src: "/images/commercial-interior-fit-out-approval-service-dubai.webp",
      alt: "3D visualization of a commercial interior space for a Dubai design review submission",
      caption: "3D design visualization for Dubai approvals",
      width: 1200,
      height: 1200,
    },
    processImage: {
      src: "/images/1773527788836.webp",
      alt: "Dubai skyline context used for 3D massing and visualization studies",
      caption: "Contextual visualization for Dubai projects",
      width: 1408,
      height: 768,
    },
    lastUpdated: "2026-07-01",
  },

  /* ------------------------------------------------------------------
     CAD Documentation
     ------------------------------------------------------------------ */
  {
    slug: "cad-documentation",
    name: "CAD Documentation",
    tagline: "Comprehensive CAD documentation services for Dubai approvals",
    primaryKeyword: "CAD documentation Dubai approval services",
    secondaryKeywords: [
      "CAD drawing services Dubai",
      "CAD documentation for DM",
      "CAD drafting services UAE",
      "CAD documentation for building permits",
    ],
    directAnswer:
      "We offer end-to-end CAD documentation services including drawing preparation, CAD standards certification, drawing conversion, and as-built documentation. All drawings are DM CAD standards compliant. Turnaround: 2–7 business days depending on scope.",
    description:
      "Our CAD Documentation service provides complete drawing management solutions for Dubai approval submissions. From creating new drawing sets from scratch to converting existing documentation to DM standards, we handle all aspects of CAD documentation. Our team is expert in DM CAD standards including layer naming conventions, line weight assignments, text and dimension styles, and title block formats. We also offer CAD standards certification — verifying that your existing drawings comply with DM requirements before submission. For completed projects, we provide comprehensive as-built documentation services including field verification, redline markups, and final as-built CAD production.",
    features: [
      "Full drawing set creation for new projects",
      "CAD standards compliance review and certification",
      "Drawing conversion between formats and software platforms",
      "As-built drawing production from field surveys",
      "Drawing numbering and revision management systems",
      "Bulk drawing processing for large-scale projects",
    ],
    process: [
      { step: 1, title: "Needs Assessment", description: "We evaluate your documentation needs — new drawings, standards certification, conversion, or as-built production." },
      { step: 2, title: "Standards Baseline", description: "Establish or verify DM CAD standards compliance baseline for the project." },
      { step: 3, title: "Documentation Production", description: "Produce or process drawings per the agreed scope with quality checks at each milestone." },
      { step: 4, title: "Compliance Verification", description: "Senior CAD technician verifies all drawings against DM CAD standards checklist." },
      { step: 5, title: "Delivery & Support", description: "Deliver final set with compliance certificate and provide post-delivery support for any submission queries." },
    ],
    faqs: [
      { question: "What is CAD standards certification?", answer: "CAD standards certification verifies that your drawings comply with Dubai Municipality's CAD manual requirements for layer naming, line weights, text styles, dimensioning, and title block format. A compliance checklist is included with the certified set." },
      { question: "Can you handle large drawing sets?", answer: "Yes, we regularly handle sets of 50–200+ drawings for large commercial and residential projects. Our streamlined process ensures consistent quality across all sheets." },
      { question: "Do you offer as-built documentation?", answer: "Yes, we provide full as-built documentation services including site surveys, redline markups, and final CAD production. Our team coordinates with your consultants to ensure accuracy." },
      { question: "What if my drawings are in Revit or ArchiCAD format?", answer: "We accept drawings from all major CAD and BIM platforms. We can work natively or convert to .dwg format as needed. For complex BIM-to-CAD conversions, we verify all converted drawings for accuracy." },
    ],
    relatedSlugs: ["2d-drawings", "approval-management"],
    image: {
      src: "/images/blueprint-drawing-submission-approval-dubai.webp",
      alt: "CAD documentation set prepared to Dubai Municipality CAD standards",
      caption: "CAD documentation for Dubai approvals",
      width: 1376,
      height: 768,
    },
    processImage: {
      src: "/images/2d-drawings-for-dcd-approvals-in-dubai.webp",
      alt: "2D CAD drawings verified against Dubai Municipality CAD standards",
      caption: "CAD standards compliant drawings in Dubai",
      width: 2336,
      height: 1760,
    },
    lastUpdated: "2026-07-01",
  },

  /* ------------------------------------------------------------------
     Approval Management
     ------------------------------------------------------------------ */
  {
    slug: "approval-management",
    name: "Approval Management",
    tagline: "End-to-end approval management for Dubai construction & renovation projects",
    primaryKeyword: "approval management Dubai service",
    secondaryKeywords: [
      "Dubai building approval management",
      "approval consultant Dubai",
      "permit management service Dubai",
      "approval coordination Dubai",
    ],
    directAnswer:
      "We provide complete approval management for Dubai construction and renovation projects. From initial document preparation through final completion certificate, we handle all authority submissions, NOC collections, and inspection coordination. Our end-to-end service covers DM, DCD, DEWA, developer, RTA, and all other Dubai authorities.",
    description:
      "Our Approval Management service is the cornerstone of what we do at Wasleen. We manage the entire approval lifecycle for your construction or renovation project — from the initial feasibility assessment to the final completion certificate. Our team of experienced approval consultants understands the specific requirements of every Dubai authority: Dubai Municipality, Dubai Civil Defense, DEWA, RTA, developer community management, and all free zone authorities. We coordinate with your architect, engineer, and contractor to ensure documentation is complete and correct before each submission, dramatically reducing the risk of rejection and delay. With Wasleen managing your approvals, you can focus on your project while we handle the bureaucracy.",
    features: [
      "Initial feasibility assessment and approval roadmap",
      "Document preparation, review, and submission management",
      "NOC collection from developers, authorities, and utility providers",
      "Submission tracking and status updates throughout the process",
      "Inspection coordination with all relevant authorities",
      "Issue resolution and rejection management",
      "Completion certificate and final approval documentation",
    ],
    process: [
      { step: 1, title: "Project Assessment", description: "We review your project scope, identify all required approvals, and create a customized approval roadmap with timeline and budget." },
      { step: 2, title: "Document Preparation", description: "We coordinate with your design team to ensure all drawings and documents are complete and compliant before submission." },
      { step: 3, title: "NOC Collection", description: "We manage the collection of all required NOCs from developers, authorities, and utility providers." },
      { step: 4, title: "Submission & Tracking", description: "We submit applications to each authority and track progress, proactively addressing any queries or requests for additional information." },
      { step: 5, title: "Inspection Coordination", description: "We schedule and coordinate all authority inspections, ensuring your site is prepared and documentation is ready." },
      { step: 6, title: "Final Approvals", description: "We collect all approved documents, completion certificates, and ensure your project is fully compliant and approved." },
    ],
    faqs: [
      { question: "What types of projects do you manage?", answer: "We manage approvals for all project types: villa renovations, apartment fit-outs, commercial office fit-outs, retail and F&B outlets, new construction, industrial facilities, and free zone projects." },
      { question: "How long does the full approval process take?", answer: "Typical end-to-end timelines: villa renovation 4–8 weeks, commercial fit-out 8–16 weeks, new construction 3–6 months. Timelines depend on project complexity and documentation readiness." },
      { question: "Do you handle rejection and resubmission?", answer: "Yes, we manage the entire rejection resolution process — analyzing the rejection reason, coordinating required corrections, and ensuring the resubmission is complete and correct for first-time re-approval." },
      { question: "What is included in your approval management fee?", answer: "Our fee covers: initial assessment, document preparation and review, NOC coordination, submission management, inspection coordination, and status reporting. Authority fees and third-party consultant fees are separate." },
      { question: "Can you handle approvals for existing buildings without original drawings?", answer: "Yes, we specialize in regularizing approvals for existing buildings. We can work with as-built surveys and coordinated drawings to bring your project into compliance." },
    ],
    relatedSlugs: ["document-clearing", "cad-documentation"],
    image: {
      src: "/images/dubai-approval-consultants-consultation.webp",
      alt: "Wasleen approval consultant managing Dubai permit approvals with a client",
      caption: "End-to-end approval management in Dubai",
      width: 1376,
      height: 768,
    },
    processImage: {
      src: "/images/dm-building-permit-dubai-municipality.webp",
      alt: "Dubai Municipality building permit documents issued through approval management",
      caption: "DM building permit delivered through Wasleen approval management",
      width: 1200,
      height: 896,
    },
    lastUpdated: "2026-07-01",
  },

  /* ------------------------------------------------------------------
     Document Clearing
     ------------------------------------------------------------------ */
  {
    slug: "document-clearing",
    name: "Document Clearing",
    tagline: "Fast & reliable document clearing services for Dubai authorities",
    primaryKeyword: "document clearing Dubai service",
    secondaryKeywords: [
      "document clearance Dubai",
      "government document clearing UAE",
      "document processing Dubai",
      "authority document submission Dubai",
    ],
    directAnswer:
      "Our document clearing service handles the submission, tracking, and collection of documents with all Dubai government authorities. We act as your authorized representative for DM, DCD, DEWA, DLD, RTA, and other authority submissions. Typical processing: 1–3 business days per document.",
    description:
      "Our Document Clearing service provides fast, reliable handling of all your government and authority document submissions in Dubai. Our dedicated team physically submits documents to authority counters, tracks processing status, follows up on queries, and collects approved documents on your behalf. We maintain relationships with key personnel across Dubai Municipality, Dubai Civil Defense, DEWA, Dubai Land Department, RTA, and other authorities, enabling us to navigate the system efficiently. With Wasleen handling your document clearing, you eliminate the need for your team to spend hours at government service centers.",
    features: [
      "Physical document submission to all Dubai authorities",
      "Online submission management through authority portals",
      "Document status tracking and proactive follow-up",
      "Collection and delivery of approved documents",
      "Translation and attestation coordination",
      "Urgent/express processing for time-sensitive documents",
    ],
    process: [
      { step: 1, title: "Document Review", description: "We review your documents for completeness and correctness before submission." },
      { step: 2, title: "Submission", description: "Our team submits documents to the relevant authority — either online through their portal or physically at the service center." },
      { step: 3, title: "Tracking & Follow-up", description: "We track processing status and follow up proactively to ensure timely processing." },
      { step: 4, title: "Query Resolution", description: "If the authority requests additional information or corrections, we coordinate with your team to respond promptly." },
      { step: 5, title: "Collection & Delivery", description: "We collect approved documents and deliver them to your preferred location or digital upload." },
    ],
    faqs: [
      { question: "Which authorities do you handle submissions for?", answer: "We handle submissions for all Dubai government authorities including Dubai Municipality, Dubai Civil Defense, DEWA, Dubai Land Department, RTA, Dubai Economy & Tourism, DHA, and all free zone authorities." },
      { question: "How do you track document status?", answer: "We provide real-time status updates through our tracking system. You will receive notifications at each milestone — submission, under review, query raised, and approval issued." },
      { question: "Do you offer express document clearing?", answer: "Yes, we offer express processing for urgent documents. Express service reduces processing time by 30–50% depending on the authority and document type. Additional fees apply for express service." },
      { question: "What documents can you clear on my behalf?", answer: "We can clear a wide range of documents: building permit applications, NOC applications, completion certificate applications, Ejari registrations, title deed transfers, trade license renewals, and more." },
    ],
    relatedSlugs: ["approval-management", "cad-documentation"],
    image: {
      src: "/images/1773525851355.webp",
      alt: "Document clearing consultants reviewing permit documents for Dubai authority submission",
      caption: "Document clearing services in Dubai",
      width: 1312,
      height: 768,
    },
    processImage: {
      src: "/images/1773527415014.webp",
      alt: "Client meeting to confirm document clearing requirements with Dubai authorities",
      caption: "Document clearing consultation in Dubai",
      width: 1408,
      height: 768,
    },
    lastUpdated: "2026-07-01",
  },

  /* ------------------------------------------------------------------
     Project Management
     ------------------------------------------------------------------ */
  {
    slug: "project-management",
    name: "Project Management",
    tagline: "End-to-end approval project management for Dubai construction & fit-out projects",
    primaryKeyword: "approval project management Dubai",
    secondaryKeywords: [
      "construction approval management Dubai",
      "permit project management",
      "approval coordination service Dubai",
      "Dubai permit management service",
    ],
    directAnswer:
      "Our Project Management service provides end-to-end coordination of all approvals for your Dubai construction or fit-out project. From initial feasibility assessment through final completion certificate, we manage every permit, NOC, and submission across all relevant authorities. Typical project timeline: 4–12 weeks depending on scope.",
    description:
      "Our Project Management service takes the complexity out of Dubai's multi-authority approval landscape. We act as your single point of contact for all approval-related activities across your project lifecycle. From initial feasibility assessment and authority coordination through design review, permit submissions, inspection scheduling, and final completion, our experienced project managers ensure every milestone is met on time and within budget. We coordinate across Dubai Municipality, Dubai Civil Defense, DEWA, RTA, Dubai Police, free zone authorities, developer communities, and all other relevant stakeholders. Our project management service is ideal for complex fit-outs, new building construction, and multi-phase development projects where coordination between multiple authorities and consultants is critical.",
    features: [
      "Full project lifecycle management from feasibility to completion certificate",
      "Multi-authority coordination across DM, DCD, DEWA, RTA, Dubai Police, and others",
      "Permit milestone planning and critical path management",
      "Design review coordination between architects, engineers, and authorities",
      "Inspection scheduling and site visit coordination",
      "Document management and version control for all submissions",
      "Regular progress reporting and status updates",
      "Issue resolution and escalation management",
    ],
    process: [
      { step: 1, title: "Initial Assessment", description: "We review your project scope, identify all required permits and NOCs, and develop a comprehensive approval roadmap." },
      { step: 2, title: "Feasibility & Authority Review", description: "Our team conducts preliminary authority checks to identify potential issues before design finalization." },
      { step: 3, title: "Design Coordination", description: "We coordinate with your design team to ensure drawings meet authority requirements before submission." },
      { step: 4, title: "Permit Submission Management", description: "We manage all permit applications, NOC requests, and submissions across all relevant authorities." },
      { step: 5, title: "Inspection Coordination", description: "Schedule and coordinate all authority inspections throughout construction." },
      { step: 6, title: "Completion & Handover", description: "Manage final inspections, completion certificate applications, and project handover documentation." },
    ],
    faqs: [
      { question: "What does approval project management include?", answer: "Our service covers the full scope of approval management: feasibility assessment, authority coordination, permit application management, inspection scheduling, and completion certificate processing." },
      { question: "How many authorities do you coordinate with?", answer: "We coordinate with all relevant Dubai authorities including Dubai Municipality, Dubai Civil Defense, DEWA, RTA, Dubai Police, Dubai Economy & Tourism, free zone authorities, and developer community management." },
      { question: "Do you work with our existing consultants and contractors?", answer: "Yes, we integrate seamlessly with your existing project team including architects, structural engineers, MEP consultants, and main contractors." },
      { question: "How long does a typical project take?", answer: "Project timelines vary based on scope. A standard commercial fit-out approval process takes 4–8 weeks. Complex new building projects may take 8–16 weeks." },
    ],
    relatedSlugs: ["approval-management", "document-clearing"],
    image: {
      src: "/images/project-completion-handover-approval-dubai.webp",
      alt: "Project completion and handover approval delivered through end-to-end project management in Dubai",
      caption: "Project completion and handover approvals in Dubai",
      width: 1424,
      height: 752,
    },
    processImage: {
      src: "/images/1773529249805.webp",
      alt: "Approval project manager explaining the multi-authority approval process in Dubai",
      caption: "Approval project management coordination in Dubai",
      width: 1306,
      height: 768,
    },
    lastUpdated: "2026-07-01",
  },

  /* ------------------------------------------------------------------
     Fit-Outs
     ------------------------------------------------------------------ */
  {
    slug: "fit-outs",
    name: "Fit-Out Approval Services",
    tagline: "Complete fit-out permit management for commercial & residential spaces in Dubai",
    primaryKeyword: "fit-out approval Dubai",
    secondaryKeywords: [
      "commercial fit-out permit Dubai",
      "office fit-out approval",
      "retail fit-out permit",
      "fit-out NOC Dubai",
      "interior fit-out approval services",
    ],
    directAnswer:
      "Our Fit-Out Approval service manages the complete permit process for commercial and residential fit-out projects in Dubai. We handle everything from initial NOC collection through building permit application to final inspection coordination. Typical timeline: 2–6 weeks depending on project scope.",
    description:
      "Our Fit-Out Approval service is a specialized end-to-end solution for obtaining all permits and approvals required for fit-out projects in Dubai. Whether you're setting up a new office, opening a retail store, renovating a villa, or building out a restaurant, we manage the complete approval process. Our service covers all fit-out types including commercial offices, retail spaces, medical clinics, educational facilities, F&B outlets, and residential properties. We work across all jurisdictions — Dubai Municipality mainland, free zones (TECOM, DIFC, DMCC, JAFZA, etc.), and developer communities (Emaar, Nakheel, Dubai Holding, etc.). Our team coordinates with all relevant authorities to ensure your fit-out is approved quickly and without unnecessary delays.",
    features: [
      "Complete NOC collection from landlords, developers, and community management",
      "DM building permit application for fit-out works",
      "DCD fire safety approval for fit-out fire protection systems",
      "DEWA electrical and plumbing connection coordination",
      "Free zone fit-out permit management (TECOM, DIFC, DMCC, JAFZA, etc.)",
      "Developer community approval (Emaar, Nakheel, Dubai Holding, etc.)",
      "Restaurant and F&B fit-out permit coordination with DM Food Control",
      "Post-completion inspection scheduling and follow-up",
    ],
    process: [
      { step: 1, title: "Fit-Out Assessment", description: "We assess your fit-out scope, identify jurisdiction and authority requirements, and provide a clear permit roadmap." },
      { step: 2, title: "NOC Collection", description: "We collect all required NOCs from landlord, building management, developer, or community management." },
      { step: 3, title: "Drawing & Design Coordination", description: "We review your fit-out drawings against authority requirements and coordinate any necessary revisions." },
      { step: 4, title: "Permit Application", description: "We submit complete permit applications to all relevant authorities simultaneously." },
      { step: 5, title: "Approval Management", description: "We track applications, respond to queries, and manage revisions until all permits are issued." },
      { step: 6, title: "Inspection & Completion", description: "We schedule and coordinate final inspections and manage completion certificate applications." },
    ],
    faqs: [
      { question: "What types of fit-outs do you handle?", answer: "We handle all fit-out types: commercial offices, retail stores, restaurants and cafes, medical clinics and healthcare facilities, educational institutions, warehouses and industrial spaces, and residential villas and apartments." },
      { question: "Do you work with free zone fit-outs?", answer: "Yes, we manage fit-out permits for all major free zones including TECOM (DSO, IMPZ, Dubai Knowledge Park), DIFC, DMCC, JAFZA, Dubai South, and others." },
      { question: "How long does fit-out approval take?", answer: "Standard fit-out approval takes 2–4 weeks for simple projects. Complex fit-outs with multiple authority requirements may take 4–6 weeks." },
      { question: "What documents do I need to provide?", answer: "Basic requirements include your fit-out design drawings, tenancy contract or title deed, and contractor details. We handle the rest including applications, NOCs, and coordination." },
    ],
    relatedSlugs: ["approval-management", "project-management"],
    image: {
      src: "/images/commercial-office-fit-out-approval-dubai.webp",
      alt: "Commercial office fit-out approval and permit management in Dubai",
      caption: "Office fit-out approvals in Dubai",
      width: 1376,
      height: 768,
    },
    processImage: {
      src: "/images/dcd-fire-safety-noc-dubai-civil-defense.webp",
      alt: "Dubai Civil Defense fire safety NOC for a commercial fit-out approval",
      caption: "DCD fire safety NOC for fit-out approvals",
      width: 1584,
      height: 672,
    },
    lastUpdated: "2026-07-01",
  },
];
