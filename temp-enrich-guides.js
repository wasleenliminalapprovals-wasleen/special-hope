const fs = require('fs');

// Read file
let content = fs.readFileSync('src/data/guides.ts', 'utf-8');
const hasCRLF = content.includes('\r\n');
content = content.replace(/\r\n/g, '\n');

// Backup
fs.writeFileSync('src/data/guides-backup.ts', hasCRLF ? content.replace(/\n/g, '\r\n') : content);
console.log('Backup saved to src/data/guides-backup.ts\n');

// ============================================================
// EXPANDED DESCRIPTIONS per guide slug
// ============================================================

const expandedDescriptions = {
  "complete-guide-dubai-building-approvals": 
    "Everything you need to know about building approvals in Dubai — from DM permits and DCD approvals to DEWA connections and developer NOCs. Covers all 8 approval categories including government-regulatory, free zone, developer community, property registration, technical utility, trade-food-hospitality, fit-out construction, and drawing documentation. Includes realistic timelines, fee ranges, required documents, and common pitfalls. Expert guidance from Wasleen approval consultants with years of experience navigating Dubai's multi-authority approval landscape for residential, commercial, and industrial projects.",
  
  "how-to-avoid-approval-rejection-dubai":
    "Learn the most common reasons Dubai building approval applications get rejected and how to avoid them. Covers the top 3 causes of rejection — incomplete documentation, non-compliant drawings, and expired or incorrect NOCs — plus zoning non-compliance, incorrect fee calculation, missing signatures, and incomplete structural calculations. Expert tips from Wasleen approval consultants on getting first-time approval through pre-submission audits, document checklist verification, and direct coordination with authority reviewers. Reduce your rejection risk by up to 90% with proper preparation.",
  
  "dubai-approval-fees-guide":
    "Comprehensive breakdown of approval fees in Dubai for building permits, DCD approvals, DEWA connections, developer NOCs, and more. Covers Dubai Municipality permit fees (0.1%–0.5% of project value), DCD fire safety fees (AED 500–3,000), DEWA connection fees, developer NOC fees across Emaar, Nakheel, TECOM, and DMCC, plus Ejari registration, title deed transfers, and RERA permits. Includes indicative cost ranges for all 8 approval categories with minimum and maximum fee estimates. Transparent fixed-fee packages from Wasleen with no hidden charges.",

  "approval-timelines-dubai-guide":
    "Realistic timelines for all Dubai building approvals — from DM permits and DCD NOCs to DEWA connections and developer approvals. Covers standard processing times for Dubai Municipality building permits (5–15 business days), DCD fire safety approval (5–10 business days), DEWA connection NOCs (3–7 business days), developer NOCs (3–10 business days), Ejari registration (1–2 business days), and completion certificates (10–20 business days). Total end-to-end timeline estimates for villa renovations, commercial fit-outs, and new construction projects with expert tips to expedite processing.",

  "how-long-does-dm-building-permit-take":
    "Complete guide to DM building permit processing times. Standard permits take 5–15 business days depending on project complexity and documentation quality. Learn how preliminary permits process faster at 3–7 business days, what factors affect processing speed including documentation completeness, project complexity, authority workload, and seasonal variations. Discover how to expedite your application through DM's Al Nakheel express service and how pre-submission audits by experienced consultants ensure first-time approval, eliminating resubmission delays.",
  
  "dcd-fire-safety-approval-documents":
    "Complete checklist of documents needed for Dubai Civil Defense (DCD) approval — the mandatory fire safety clearance for all building projects in Dubai. Includes fire safety design drawings showing escape routes and fire compartmentation, active fire protection system specifications for sprinklers and alarms, passive fire protection details for fire-rated walls and doors, emergency evacuation plans, DCD application forms stamped by approved fire safety consultants, DM building permit references, and developer civil defense NOCs. Additional requirements for high-risk buildings and high-rises explained.",
  
  "dm-noc-for-renovation-guide":
    "Complete guide covering when Dubai Municipality NOCs are required for renovation projects, how to apply, required documents, and processing timelines. Explains the distinction between DM NOCs and building permits, when NOCs are mandatory (structural changes, facade alterations, MEP modifications, building envelope changes) versus when they are not needed (minor cosmetic renovations). Covers the full application process including developer NOC prerequisites, required documents like title deeds and renovation drawings, processing times of 3–7 business days, validity periods of 6–12 months, and common pitfalls that cause rejection.",
  
  "rta-approval-commercial-projects":
    "Everything you need to know about RTA (Roads and Transport Authority) approval for commercial projects in Dubai. Covers when RTA approval is mandatory — new commercial buildings, projects generating significant traffic, changes to vehicular access points, additional parking provisions, and developments near metro stations. Explains the traffic impact study (TIS) process, parking demand assessment per DM parking code, access point design standards for sight distances and turning radii, and special requirements for projects near public transport. Processing takes 7–15 business days with complete documentation.",
  
  "dm-completion-certificate-steps":
    "Complete step-by-step guide to obtaining a Dubai Municipality Completion Certificate — the final approval confirming your building is constructed per approved plans and safe for occupancy. Covers all 8 stages from completing construction per approved drawings through collecting all required NOCs from DCD, DEWA, RTA, and developers, submitting as-built drawings, requesting DM final inspection, passing structural/MEP/fire safety inspections, clearing violations, paying outstanding fees, and receiving the certificate. Processing takes 10–20 business days after inspection request with common delay factors explained.",

  "dso-fit-out-approval-guide":
    "Complete guide to obtaining fit-out approval in Dubai Silicon Oasis (DSO). Covers DSO's design review process including NOC application, fit-out drawing submission requirements for architectural, MEP, and fire safety plans, contractor registration requirements, and design guidelines for facade alterations, signage, AC condenser placement, and working hours. Explains the full process from DSO NOC issuance through DM building permit application with processing times of 3–7 business days for standard fit-outs. Includes contractor working hour restrictions and community compliance requirements.",
  
  "dubai-south-design-guidelines":
    "Comprehensive guide to Dubai South design guidelines and approval process for residential and commercial projects within this major free zone development. Covers architectural style requirements emphasizing contemporary Gulf architecture, building height and setback restrictions by zone, minimum 20% landscape coverage mandates, sustainable design practices including LEED certification encouragement, and the full approval process from preliminary design concept submission through design review by Dubai South planning department to final NOC issuance. Processing takes 5–10 business days per review cycle.",
  
  "tecom-business-setup-approvals":
    "Complete guide to TECOM (Dubai Internet City, Media City, Knowledge Park) business setup approvals covering fit-out permits, signage approvals, and operational licenses. Explains the multi-step approval process including business license from TECOM, office space lease registration, fit-out design review by TECOM's design team, TECOM NOC for DM building permit, signage approval, and Civil Defense coordination. Covers design guidelines for office partitioning, ceiling systems, floor loading, and HVAC modifications. Fit-out design review takes 3–7 business days with contractor registration requirements.",
  
  "dmcc-free-zone-approval-process":
    "Complete guide to DMCC (Dubai Multi Commodities Centre) free zone approvals for business setup, fit-out permits, and operational licensing in Jumeirah Lakes Towers and Almas Tower. Covers the full approval process from DMCC business license application through office lease registration, fit-out design submission with architectural/MEP/fire safety drawings, DMCC NOC issuance, Civil Defense coordination, and final DMCC inspection. Explains JLT-specific restrictions including no structural modifications, standard ceiling heights of 2.7m minimum, fire-rated partition requirements, and specific HVAC zone requirements. Fit-out design review takes 3–5 business days.",

  "nakheel-renovation-approval-process":
    "Step-by-step guide to obtaining Nakheel renovation approval for properties in The Palm Jumeirah, Jumeirah Islands, Al Furjan, and other Nakheel communities. Explains the full process from submitting renovation drawings to Nakheel Community Management through design review (7–10 business days), NOC issuance valid for 6 months, DM building permit application, DCD approval coordination, and final Nakheel inspection. Covers strict design guidelines for external facade colors with pre-approved palettes, boundary wall heights, pool positioning, landscape modifications, and service area screening plus special Palm Jumeirah frond-specific requirements.",
  
  "emaar-community-design-guidelines":
    "Complete guide to Emaar community design guidelines and approval process for properties in Dubai Marina, Arabian Ranches, Downtown Dubai, Emirates Hills, and other Emaar communities. Explains how guidelines vary by community covering architectural style consistency, pre-approved facade color palettes, boundary treatments, landscape design, pool specifications, and service area screening. Details the approval process from design drawing submission through Emaar Community Management review (5–10 business days), NOC issuance, DM building permit application, and final Emaar inspection. Covers specific restrictions for Dubai Marina apartments, Arabian Ranches villas, and Emirates Hills luxury properties.",
  
  "dubai-properties-noc-process":
    "Step-by-step guide to obtaining Dubai Properties NOC for renovations and fit-outs in Business Bay, Jumeirah Beach Residence (JBR), Mudon, Villa Lantana, and other Dubai Properties communities. Covers the full approval process from drawing submission to DP Community Management through design review (5–10 business days), NOC issuance, DM building permit application, DCD approval coordination, and final DP inspection with compliance certificate. Explains community-specific guidelines for Business Bay commercial standards, JBR beachfront facade consistency requirements, and villa community landscape and height restrictions with milestone inspection requirements.",

  "ejari-registration-complete-guide":
    "Everything you need to know about Ejari registration in Dubai — the mandatory tenancy contract registration system operated by Dubai Land Department. Covers the complete step-by-step process from document preparation (original tenancy contract, Emirates ID, passport copy, title deed, DEWA bill) through visiting authorized typing centers or using Dubai REST app, paying registration fees (AED 155–220 residential, AED 220–550 commercial), and receiving your Ejari certificate. Explains why Ejari is essential for DEWA connection, district cooling registration, resident visa applications, and RERA dispute resolution with annual renewal requirements.",
  
  "title-deed-transfer-dubai":
    "Complete guide to transferring a title deed in Dubai through the Dubai Land Department (DLD). Covers the full process from obtaining a developer NOC (AED 500–5,000 depending on developer) through attending DLD appointment at a Trustee Office, submitting original title deed and identification documents, paying DLD transfer fee of 2% of property value plus AED 580 administrative fee and AED 4,000 registration fee. Explains off-plan property transfers through RERA and Oqood registration, mortgage property requirements, and post-transfer obligations including DEWA, Ejari, and community management updates. Processing takes 3–7 business days.",
  
  "rera-permit-requirements-guide":
    "Complete guide to RERA (Real Estate Regulatory Authority) permits in Dubai covering off-plan property sales permits, rental increase verification, service charge regulation, and real estate advertising requirements. Explains the five main permit types: off-plan sales permits requiring master plan approval and escrow account setup (AED 100,000–200,000 per phase), the Rental Increase Calculator for landlords, real estate advertising permits for all property listings (AED 150–500 per ad), broker registration requiring RERA exam, and property snapshot certificates for handovers. Processing takes 10–20 business days for off-plan permits.",

  "dewa-connection-process-guide":
    "Complete step-by-step guide to DEWA (Dubai Electricity and Water Authority) connection for new buildings and renovations in Dubai. Covers the full application process through DEWA website or app including required documents (Emirates ID, title deed or tenancy contract, building completion certificate for new builds), fee payment (AED 300 residential, AED 500 commercial), inspection scheduling (2–5 business days), meter installation, and connection activation (1–3 business days after inspection). Explains temporary power connections for construction sites (2–4 business days) and load enhancement procedures with electrical load calculation requirements. Total timeline: 3–10 business days.",
  
  "district-cooling-connection-guide":
    "Complete guide to district cooling connections in Dubai covering connection process with providers like Empower, Emirates District Cooling (EDC), and Tabreed. Explains how to identify your building's district cooling provider, submit connection applications with building drawings and load calculations, review capacity availability, sign connection agreements, and pay connection fees (AED 5,000–50,000 depending on capacity). Covers mandatory district cooling areas including Downtown Dubai, Dubai Marina, Business Bay, JLT, and Dubai Silicon Oasis where individual chillers are not permitted. Monthly charges explained: capacity charge plus consumption charge in RT-hours.",
  
  "dewa-meter-installation-steps":
    "Complete step-by-step guide to DEWA meter installation for residential and commercial properties in Dubai. Covers the full process from ensuring DM completion certificate readiness through submitting meter installation applications, providing electrical load certificates from registered consultants, scheduling DEWA inspections of meter rooms, paying installation fees (AED 500–2,000 depending on meter size), and DEWA installation and sealing. Explains smart meter standards for new installations, temporary meters for construction sites (AED 2,000–5,000 refundable deposit), and meter replacement or upgrade procedures. Installation timeline: 3–7 business days from application.",

  "dubai-food-control-approval-guide":
    "Complete guide to obtaining Dubai Municipality Food Control Department (FCD) approval for restaurants, cafés, food trucks, and food manufacturing facilities. Covers the full approval process from food business registration through kitchen design drawing submission for food safety compliance review (5–10 business days), fit-out execution per approved plans, FCD inspection covering sanitation, equipment compliance, waste management, pest control, and staff facilities, and final food establishment permit issuance. Explains HACCP-compliant kitchen layout requirements, stainless steel food contact surfaces (grade 304 minimum), proper ventilation, grease traps, three-sink dishwashing systems, and staff hygiene facility requirements.",
  
  "dtcm-tourism-license-requirements":
    "Complete guide to obtaining a DTCM (Dubai Department of Economy and Tourism) tourism license for hotels, tourist attractions, travel agencies, and tourism-related businesses. Covers the full approval process from trade license acquisition with tourism activity through premises meeting DTCM classification standards, design drawing submission for DTCM review, qualified staff with tourism certifications, insurance coverage requirements, DTCM inspection and classification, and licensing fee payment (AED 10,000–50,000 for hotels, AED 3,000–10,000 for travel agencies). Processing takes 15–30 business days with annual renewal requirements. Explains hotel star rating classification across 10 assessment categories.",
  
  "dha-healthcare-approval-guide":
    "Complete guide to obtaining Dubai Health Authority (DHA) approval for healthcare facilities, clinics, medical centers, and pharmacies in Dubai. Covers the full approval process from health facility registration through facility design drawing submission for DHA Engineering Review (10–15 business days), fit-out execution meeting strict clinical space requirements (consultation rooms minimum 12m², treatment rooms minimum 15m²), DHA inspection covering infection control, equipment calibration, waste management, and accessibility, and final health facility license issuance. Explains DHA staff licensing requirements including Prometric examinations, equipment maintenance contract requirements, and facility-specific fee ranges of AED 15,000–50,000.",

  "interior-fit-out-permit-process":
    "Complete step-by-step guide to obtaining interior fit-out permits in Dubai covering DM permits, developer NOCs, DCD approvals, and contractor requirements for commercial and residential fit-outs. Explains the full 8-step process from developer NOC application (3–10 business days) through DM building permit issuance (5–15 business days), DCD NOC coordination (if fire safety affected), contractor registration with DM, fit-out execution per approved drawings, DM milestone inspections at key stages, and final fit-out completion certificate. Total timeline: 4–8 weeks for standard commercial fit-outs with required documents including title deed, original building permit drawings, and fit-out design drawings.",
  
  "change-of-usage-permit-guide":
    "Everything you need to know about obtaining a change of usage permit in Dubai for converting property usage types — residential to commercial, warehouse to showroom, or retail to restaurant. Covers the full approval process from verifying DM zoning regulations permit the proposed change through submitting change of usage applications with structural feasibility reports from registered engineers, obtaining developer NOCs for the usage change, DM review (10–20 business days), detailed fit-out drawing submission for the new usage type, and obtaining all relevant NOCs including DCD, DEWA, and RTA. Fees: AED 2,000–10,000 depending on usage type and building size. Not all usage changes are permitted — residential-to-commercial conversions in villa areas are often restricted.",
  
  "structural-modification-approval-guide":
    "Complete guide to obtaining structural modification approval in Dubai for structural alterations, building extensions, slab openings, and load-bearing wall modifications. Covers the full approval process from engaging a registered structural engineer through submitting structural modification drawings with calculations to DM for structural review (10–15 business days), obtaining developer NOCs confirming modifications are permitted, executing structural works per approved drawings, DM structural inspections at critical stages (foundation, steel erection, concrete pour), and receiving structural completion certificate. Required documents include original structural drawings, soil investigation reports for extensions, material test certificates, and contractor qualifications. Fees: AED 3,000–15,000 depending on modification scale.",

  "cad-drawing-standards-dubai-guide":
    "Complete guide to CAD drawing standards required by Dubai Municipality for all building approval submissions. Covers DM's adoption of AIA layer naming conventions with local modifications (A-WALL, A-DOOR, S-COLS, E-LITE, M-SUPP), standard pen assignments for cut elements (0.50–0.70mm), visible edges (0.25–0.35mm), and dimension lines (0.10–0.18mm), text style requirements using Romans or Arial font with specific heights for titles (3.5mm), dimensions (2.5mm), and notes (2.0mm), DM-standardized title block format, and the mandatory CAD standards compliance checklist. Non-compliant CAD drawings are the #1 reason for drawing submission rejection.",
  
  "as-built-drawing-requirements":
    "Everything you need to know about as-built drawing requirements in Dubai for DM completion certificate applications. Covers DM standards for showing actual constructed conditions versus approved designs, revision cloud and tag requirements for documenting field changes, mandatory CAD standards compliance (layer naming, line weights, text styles), consultant certification requirements from original design consultants or DM-registered consultants, and submission format requirements (.dwg files plus plotted PDF sets). Processing takes 3–7 business days for standard reviews. Common rejection reasons include missing revision clouds, undocumented field changes, dimensional discrepancies, and incomplete consultant certification.",
  
  "3d-design-submission-guide":
    "Complete guide to 3D design submissions for Dubai Municipality and developer approvals covering viewpoint requirements, rendering standards, and the submission process. Explains when 3D submissions are required — heritage areas like Al Fahidi and Shindagha, coastal zones including JBR and Palm Jumeirah, high-profile corridors like Sheikh Zayed Road, and major development zones. Covers viewpoint requirements including bird's-eye views, street-level perspectives, and contextual views, material representation accuracy standards, shadow studies at different times and seasons, night-time illumination studies for commercial buildings, and developer-specific requirements for Nakheel, Emaar, and DMCC submissions. Processing: 3–7 business days.",
};

// ============================================================
// EXPANDED QA ANSWERS (for those <100 words)
// ============================================================

const expandedAnswers = {
  "how-long-does-dm-building-permit-take":
    "A standard Dubai Municipality building permit takes 5–15 business days to process, assuming complete and correct documentation is submitted. Preliminary permits are faster at 3–7 business days since they require fewer documents at the concept design stage. Complex projects, such as high-rise buildings or specialized commercial facilities, may require 15–25 business days due to additional structural, MEP, and fire safety reviews. Key factors that affect processing speed include: completeness of documentation (missing documents are the #1 cause of delay), project complexity, current authority workload (peak seasons like Q4 may be slower), and whether the application qualifies for express processing. DM's Al Nakheel express service reduces standard timelines by approximately 30–40% for an additional fee. Working with an experienced approval consultant who can pre-audit your submission significantly reduces processing time by ensuring first-time approval without resubmission delays.",
  
  "dcd-fire-safety-approval-documents":
    "DCD approval requires a comprehensive set of fire safety documents to demonstrate compliance with UAE Fire and Life Safety Code (UAE FLS Code) specifications. The primary documents include: (1) Fire safety design drawings showing architectural fire safety plans including escape routes, fire compartmentation, and fire-fighting access routes throughout the building, (2) Active fire protection system specifications detailing sprinkler systems, fire alarm control panels, smoke detectors, heat detectors, and emergency lighting with specific model numbers and compliance certifications, (3) Passive fire protection details for fire-rated walls, floors, doors, glazing, and firestop systems each with certified fire resistance ratings, (4) Emergency evacuation plan showing clear evacuation routes, assembly points, and evacuation time calculations, (5) DCD application form completed and stamped by an approved fire safety consultant registered with Dubai Civil Defense, (6) DM building permit reference number, and (7) Civil defense NOC from the developer if applicable. Additional documents including fire engineering strategy reports are required for high-risk buildings, buildings over 7 floors, or special occupancy types.",

  "dm-noc-for-renovation-guide":
    "A Dubai Municipality NOC (No Objection Certificate) is required for most renovation projects in Dubai that involve structural changes, facade alterations, MEP modifications, or changes to the building envelope. Minor cosmetic renovations such as painting, flooring replacement with the same material, or cabinet refacing typically do not require an NOC. Before applying for the DM NOC, you must first obtain a developer NOC from your community management confirming they have no objection to the proposed works. The full process takes 3–7 business days with complete documentation. Required documents include: title deed proving ownership, original DM approval drawings showing the existing approved condition, developer NOC from community management, contractor trade license and DM registration, and renovation drawings clearly highlighting proposed changes with dimension annotations and structural details if applicable.",

  "rta-approval-commercial-projects":
    "RTA (Roads and Transport Authority) approval is required for commercial projects in Dubai that affect traffic flow, parking, or access to public roads. It is mandatory for: new commercial buildings of any size, projects generating significant traffic such as shopping malls, offices, and hotels, any changes to vehicular access points including new driveways or modified entry/exit configurations, projects requiring additional parking provisions beyond existing capacity, and developments near metro stations or public transport routes within 500 meters. The RTA approval process includes a traffic impact study (TIS) conducted by a qualified traffic consultant assessing the proposed development's effect on surrounding road networks during peak hours, a parking demand assessment based on DM's parking code considering building type and Gross Floor Area, and access design review ensuring compliance with RTA standards for sight distances, turning radii, and lane widths. Processing takes 7–15 business days. Required documents include architect drawings showing access points, the traffic impact study report, parking layout plans, and DM preliminary approval reference.",

  "dm-completion-certificate-steps":
    "Obtaining a DM Completion Certificate involves a structured 8-step process after all construction works are completed per approved drawings. Step 1: Complete all construction works strictly per approved drawings with no unapproved deviations. Step 2: Obtain all required NOCs from Dubai Civil Defense (fire safety compliance), DEWA (utility connection confirmation), RTA (if applicable for traffic impact), developer or community management confirming no outstanding issues, Dubai Municipality Health & Safety for commercial properties, and any other project-specific authorities. Step 3: Submit as-built drawings accurately reflecting actual construction with all field changes documented using revision clouds. Step 4: Request DM final inspection through the building permit system online. Step 5: Pass DM inspection covering structural integrity, fire safety systems compliance, MEP systems functionality, accessibility compliance, parking implementation, and general conformance to approved drawings. Step 6: Clear any inspection violations or non-compliance items identified during inspection. Step 7: Pay all outstanding municipality fees including inspection and issuance fees. Step 8: Receive the Completion Certificate. The process takes 10–20 business days after inspection request. Critical prerequisites include all consultant supervision reports being filed, contractor completion report submitted, and all authorities' NOCs collected before inspection.",

  "dso-fit-out-approval-guide":
    "Dubai Silicon Oasis (DSO) fit-out approval requires a multi-step process before DM building permit can be issued. Step 1: The tenant or building owner completes the DSO NOC application form available from DSO community management. Step 2: Submit comprehensive fit-out drawings including architectural plans showing proposed partitions and finishes, MEP drawings for mechanical, electrical, and plumbing modifications, and fire safety drawings demonstrating compliance with UAE Fire Code. Include contractor registration documents proving the contractor is registered with DSO. Step 3: DSO design review team reviews all drawings for compliance with DSO design guidelines and community standards covering facade alterations, signage placement, AC condenser locations (must be screened), service area access, and waste disposal provisions. Step 4: Upon approval, DSO issues an NOC allowing you to proceed to Dubai Municipality for building permit application. Processing takes 3–7 business days for standard fit-outs. All contractors must be registered with DSO authority with proof of valid trade license submitted with the fit-out application. Working hours for fit-out contractors in DSO are typically 8:00 AM – 6:00 PM Sunday to Thursday with no weekend or public holiday work unless specifically permitted. Noise restrictions apply during prayer times and after 7:00 PM.",

  "dubai-south-design-guidelines":
    "Dubai South (formerly Dubai World Central) has comprehensive design guidelines that all residential and commercial projects must comply with. The guidelines cover: architectural style requiring contemporary Gulf architecture with clean lines, neutral color palettes, and integration of traditional elements like mashrabiya screens or shading devices with high-quality durable facade materials; building height and setback restrictions varying by zone with residential villa communities limited to G+1 while commercial and mixed-use zones allow higher densities with specific setback requirements; minimum 20% landscape coverage using drought-tolerant native species with irrigation plans submitted as part of the landscape design package; and sustainability requirements encouraging LEED certification or Dubai Municipality Green Building regulations compliance with energy modeling for larger projects. The approval process involves: (1) Preliminary design concept submission, (2) Design review by Dubai South planning department checking compliance with all guidelines, (3) Issue of design compliance NOC confirming concept approval, (4) Detailed drawing submission for full approval and final NOC. Processing takes 5–10 business days per review cycle.",

  "tecom-business-setup-approvals":
    "Setting up a business in a TECOM free zone (Dubai Internet City, Media City, Knowledge Park, etc.) requires a coordinated approval process covering business licensing and physical fit-out. Step 1: Obtain a business license from TECOM authorizing your business activity within the free zone. Step 2: Register your office space lease with TECOM confirming the premises details and tenancy terms. Step 3: Submit fit-out design drawings to TECOM's design review team including architectural plans for office partitioning (glass partitions preferred), ceiling system specifications, floor finishes, and HVAC modification details. Step 4: Upon design approval, TECOM issues an NOC required for DM building permit application (if structural changes are involved). Step 5: Obtain signage approval from TECOM covering size, placement, illumination, and content — typically only building-mounted signage permitted with no ground signs. Step 6: Obtain Civil Defense approval if fire safety systems are affected by the fit-out. The fit-out design review takes 3–7 business days. All fit-out contractors must be TECOM-approved and registered on the official contractor list maintained by TECOM and updated quarterly. Using an unregistered contractor results in immediate work stoppage. TECOM conducts periodic inspections during fit-out at key milestones including after demolition, after MEP rough-in, before ceiling closure, and at project completion.",

  "dmcc-free-zone-approval-process":
    "The DMCC (Dubai Multi Commodities Centre) approval process involves a structured sequence of steps for business setup and fit-out in Jumeirah Lakes Towers and Almas Tower. Step 1: Apply for a DMCC business license authorizing your trading or service activity. Step 2: Register your office space lease with DMCC confirming the unit details in the specific JLT tower. Step 3: Submit fit-out design drawings to DMCC for design review including architectural plans, MEP drawings, and fire safety documentation — with specific attention to JLT tower constraints including no structural modifications, core drilling limited to approved zones, no building facade modifications, and all MEP connections tied into building-managed systems. Step 4: DMCC issues an NOC allowing you to proceed to DM building permit application. Step 5: Coordinate Civil Defense approval for fire safety compliance. Step 6: Execute fit-out under DMCC supervision with approved contractors only. Step 7: Final DMCC joint inspection with building management and compliance certificate issuance. Fit-out design review takes 3–5 business days. DMCC requires all fit-out contractors to be registered and approved with verification of trade license, DEWA certification, and insurance coverage. Fire safety is a priority in high-rise JLT towers requiring comprehensive fire safety drawings showing compliance with UAE Fire and Life Safety Code including compartmentation, smoke management, and evacuation plans.",

  "rera-permit-requirements-guide":
    "RERA (Real Estate Regulatory Authority) issues several permit types that are essential for different aspects of Dubai's real estate market. The five main permit types are: (1) Off-plan sales permit required for developers selling properties before construction completion — application requires master plan approval, escrow account setup with a RERA-approved bank, construction timeline and financial guarantees, and payment of permit fee (AED 100,000–200,000 per project phase) with processing taking 10–20 business days. (2) Rental Increase Calculator available online through RERA's system allowing landlords to verify legal rent increases based on current rent versus average market rent for similar properties — mandatory before any rent increase can be demanded. (3) Real estate advertising permit required for every property advertisement including online listings, print ads, social media posts, and billboards with a unique RERA permit number displayed on each advertisement costing AED 150–500 per ad. (4) Broker registration requiring all property brokers to be RERA-registered and pass the RERA examination. (5) Property snapshot certificate required for property handovers and transfers documenting the property condition at the time of transaction.",

  "dewa-connection-process-guide":
    "The DEWA (Dubai Electricity and Water Authority) connection process follows a structured sequence to ensure safe and compliant utility connections. Step 1: Submit an application through the DEWA website or mobile app providing Emirates ID for individual applicants or trade license for commercial entities, title deed for property owners or tenancy contract for tenants, and building completion certificate from DM for new constructions. Step 2: Pay the connection fee based on connection type — AED 300 for standard residential connections and AED 500 for standard commercial connections. Step 3: Schedule a DEWA inspection of the premises to verify meter location accessibility, load capacity adequacy based on submitted load calculations, and electrical wiring compliance with DEWA standards — inspection typically scheduled within 2–5 business days. Step 4: Pass the DEWA inspection confirming all requirements are met. Step 5: DEWA installs the meter and activates the connection within 1–3 business days after successful inspection. For temporary power connections needed during construction, the process is faster at 2–4 business days. Load enhancement applications for properties needing increased capacity require additional documentation including electrical load calculations certified by a registered electrical consultant. Total timeline for standard connections: 3–10 business days from complete application submission.",

  "district-cooling-connection-guide":
    "The district cooling connection process in Dubai involves coordination with the specific provider serving your building's area. Step 1: Identify your building's designated district cooling provider — in Dubai this is typically Empower (serving Downtown Dubai, Dubai Marina, JLT, and other areas), Emirates District Cooling or EDC (serving various communities), Tabreed (serving Dubai Silicon Oasis and other areas), or Noor Mawarid (serving Expo City Dubai). Step 2: Submit a connection application including building drawings showing proposed cooling load distribution, detailed load calculation in Refrigeration Tons (RT) prepared by a registered mechanical engineer, and DM building approval confirming the project is authorized. Step 3: The provider reviews available capacity in the local district cooling plant and issues a connection offer specifying connection terms and capacity allocation. Step 4: Sign the connection agreement and pay connection fees ranging from AED 5,000 for small residential connections to AED 50,000 for large commercial connections depending on required cooling capacity. Step 5: The provider installs the connection infrastructure from the district cooling plant to your building including piping, valves, and metering equipment. Step 6: Commissioning and testing of the connection to verify proper operation and cooling delivery. Step 7: Connection activated for regular use. Total processing takes 2–4 weeks from application. District cooling is mandatory in many Dubai master communities including Downtown Dubai, Dubai Marina, Business Bay, JLT, and Dubai Silicon Oasis — individual chillers are not permitted in these areas. Monthly charges consist of a fixed capacity charge based on connected load plus a variable consumption charge based on actual usage measured in RT-hours, both regulated by RERA.",

  "dtcm-tourism-license-requirements":
    "DTCM (Dubai Department of Economy and Tourism) tourism license requirements vary by business type but follow a standard approval framework. Step 1: Obtain a valid trade license with the relevant tourism activity classification from Department of Economy and Tourism or relevant free zone authority. Step 2: Secure premises that meet DTCM classification standards — for hotels this means meeting specific star rating requirements across 10 assessment categories including building architecture, room size and amenities, F&B facilities, guest services, and housekeeping standards; for travel agencies, the office must be minimum 50m² in a commercial area. Step 3: Submit premises design and fit-out drawings for DTCM review to verify compliance with operational standards. Step 4: Ensure qualified staff with relevant tourism certifications are in place including a DTCM-qualified manager for travel agencies. Step 5: Obtain insurance coverage as per DTCM requirements including professional indemnity insurance of minimum AED 2 million for travel agencies. Step 6: Undergo DTCM inspection and classification assessment — for hotels this determines the official star rating. Step 7: Pay the licensing fee ranging from AED 10,000–50,000 for hotels depending on classification to AED 3,000–10,000 for travel agencies. Processing takes 15–30 business days for standard applications with annual renewal required with updated documentation.",
};

// ============================================================
// PROCESSING - Use regex to find and replace description/answer values
// ============================================================

let changes = [];

// --- Process descriptions ---
for (const [slug, newDesc] of Object.entries(expandedDescriptions)) {
  const slugMarker = `slug: "${slug}"`;
  const slugPos = content.indexOf(slugMarker);
  if (slugPos === -1) {
    console.log(`❌ Slug not found: ${slug}`);
    continue;
  }

  // Find entry bounds - look for next slug: " after this one
  const afterSlug = content.substring(slugPos + slugMarker.length);
  const nextSlugMatch = afterSlug.match(/\n\s{4}slug:\s*"/);
  const entryEnd = nextSlugMatch ? slugPos + slugMarker.length + nextSlugMatch.index : content.length;
  const entryContent = content.substring(slugPos, entryEnd);

  // Match: description:\n      "OLD_TEXT",
  // [^]*? matches any characters non-greedily, stopping at first " followed by optional ,
  const descMatch = entryContent.match(/\n    description:\n(\s{6}")([^]*?)(",?)\s*$/m);
  if (!descMatch) {
    console.log(`❌ description pattern not matched for: ${slug}`);
    continue;
  }

  const oldFull = descMatch[0];
  const newFull = `\n    description:\n${descMatch[1]}${newDesc}${descMatch[3]}`;

  // Find position in full content and replace
  const localPos = entryContent.indexOf(oldFull);
  const globalPos = slugPos + localPos;

  if (content.substring(globalPos, globalPos + oldFull.length) === oldFull) {
    content = content.substring(0, globalPos) + newFull + content.substring(globalPos + oldFull.length);
    changes.push({ slug, field: 'description' });
    console.log(`✅ ${slug}: description expanded`);
  } else {
    console.log(`❌ ${slug}: description value mismatch at position ${globalPos}`);
  }
}

// --- Process answers ---
for (const [slug, newAnswer] of Object.entries(expandedAnswers)) {
  const slugMarker = `slug: "${slug}"`;
  const slugPos = content.indexOf(slugMarker);
  if (slugPos === -1) {
    console.log(`❌ Slug not found: ${slug}`);
    continue;
  }

  const afterSlug = content.substring(slugPos + slugMarker.length);
  const nextSlugMatch = afterSlug.match(/\n\s{4}slug:\s*"/);
  const entryEnd = nextSlugMatch ? slugPos + slugMarker.length + nextSlugMatch.index : content.length;
  const entryContent = content.substring(slugPos, entryEnd);

  // Match: answer:\n      "OLD_TEXT",
  const answerMatch = entryContent.match(/\n    answer:\n(\s{6}")([^]*?)(",?)\s*$/m);
  if (!answerMatch) {
    console.log(`❌ answer pattern not matched for: ${slug}`);
    continue;
  }

  const oldFull = answerMatch[0];
  const newFull = `\n    answer:\n${answerMatch[1]}${newAnswer}${answerMatch[3]}`;

  const localPos = entryContent.indexOf(oldFull);
  const globalPos = slugPos + localPos;

  if (content.substring(globalPos, globalPos + oldFull.length) === oldFull) {
    content = content.substring(0, globalPos) + newFull + content.substring(globalPos + oldFull.length);
    changes.push({ slug, field: 'answer' });
    console.log(`✅ ${slug}: answer expanded`);
  } else {
    console.log(`❌ ${slug}: answer value mismatch`);
  }
}

// --- Handle thin content hub: how-to-avoid-approval-rejection-dubai ---
// Add one more paragraph to reach 200+ words
const thinSlug = "how-to-avoid-approval-rejection-dubai";
const thinMarker = `slug: "${thinSlug}"`;
const thinPos = content.indexOf(thinMarker);
if (thinPos !== -1) {
  const afterThin = content.substring(thinPos + thinMarker.length);
  const nextSlugMatch = afterThin.match(/\n\s{4}slug:\s*"/);
  const thinEnd = nextSlugMatch ? thinPos + thinMarker.length + nextSlugMatch.index : content.length;
  const thinContent = content.substring(thinPos, thinEnd);

  // Find the content array end: last "TEXT", before relatedSlugs
  const contentEndMatch = thinContent.match(/(\n\s{6}"[^"]*",)\n\s{4}relatedSlugs:/);
  if (contentEndMatch) {
    const lastItemWithComma = contentEndMatch[1]; // e.g., '\n      "Working with...",'
    const localInsertPos = thinContent.indexOf(lastItemWithComma) + lastItemWithComma.length;
    const globalInsertPos = thinPos + localInsertPos;

    const newParagraph = `\n      "Working with an experienced approval consultant like Wasleen significantly reduces rejection risk. Our pre-submission audit service reviews your complete application package — documents, drawings, NOCs, and fee calculations — identifying and resolving issues before official submission. This ensures your application is complete and compliant, dramatically increasing the chances of first-time approval and saving you weeks of resubmission delays."`;

    content = content.substring(0, globalInsertPos) + newParagraph + content.substring(globalInsertPos);
    changes.push({ slug: thinSlug, field: 'content' });
    console.log(`✅ ${thinSlug}: content paragraph added`);
  } else {
    console.log(`❌ ${thinSlug}: could not find content array closing pattern`);
  }
}

// Write output
const output = hasCRLF ? content.replace(/\n/g, '\r\n') : content;
fs.writeFileSync('src/data/guides.ts', output);

console.log(`\n=== ENRICHMENT SUMMARY ===`);
console.log(`Descriptions expanded: ${changes.filter(c => c.field === 'description').length}`);
console.log(`Answers expanded: ${changes.filter(c => c.field === 'answer').length}`);
console.log(`Content expanded: ${changes.filter(c => c.field === 'content').length}`);
console.log(`\nDone!`);
