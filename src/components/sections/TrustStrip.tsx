/**
 * TrustStrip — Authority logo strip with real images.
 *
 * Shows two tiers:
 * 1. Primary authorities (8) in a static responsive grid
 * 2. Secondary authorities in a CSS marquee (infinite scroll)
 *
 * All logos start in grayscale with hover-to-color effect.
 * Uses next/image for optimized loading.
 *
 * @see /plans/website-edits-optimizations-plan.md (Task 5)
 */

import Image from "next/image";

/* ============================================================
   Type
   ============================================================ */

interface AuthorityLogo {
  name: string;
  filename: string;
  width: number;
  height: number;
}

/* ============================================================
   Primary Authorities — static grid (most recognized)
   ============================================================ */

const primaryAuthorities: AuthorityLogo[] = [
  { name: "Dubai Municipality", filename: "DubaiMuncipalityLogo.png", width: 120, height: 48 },
  { name: "Dubai Civil Defense", filename: "DCDLogo.png", width: 100, height: 48 },
  { name: "DEWA", filename: "dewalogo2024.webp", width: 110, height: 48 },
  { name: "Dubai Development Authority", filename: "logo-DDA-colour.svg", width: 100, height: 48 },
  { name: "RTA", filename: "dubai-roads-transport-authority-emirates-seeklogo.png", width: 110, height: 48 },
  { name: "Dubai Police", filename: "dubai-police-thumb.png", width: 90, height: 48 },
  { name: "Dubai South", filename: "Dubai%20South.svg", width: 110, height: 48 },
  { name: "Dubai Silicon Oasis", filename: "dubai-silicon-oasis-authority-thumb.png", width: 110, height: 48 },
];

/* ============================================================
   Secondary Authorities — marquee carousel
   ============================================================ */

const secondaryAuthorities: AuthorityLogo[] = [
  { name: "DET/DED", filename: "DET-DED-Logo.svg", width: 100, height: 40 },
  { name: "DHA", filename: "DHALOGO60.svg", width: 80, height: 40 },
  { name: "DMCC", filename: "Dubai-Multi-Commodities-Centre-(DMCC)-thumb.png", width: 90, height: 40 },
  { name: "DIFC", filename: "Dubai-International-Financial-Centre-(DIFC)-thumb.png", width: 90, height: 40 },
  { name: "JAFZA", filename: "Jabel-Ali-Free-Zone-(Jafza)-thumb.png", width: 90, height: 40 },
  { name: "DAFZ", filename: "Dubai-Airport-Free-Zone-Authority@4x-thumb.png", width: 90, height: 40 },
  { name: "DWTC", filename: "Dubai_World_Trade_Centre_id8lzd5xVn_0.png", width: 90, height: 40 },
  { name: "Dubai Chamber", filename: "Dubai-Chamber-Commerce-thumb.png", width: 90, height: 40 },
  { name: "Dubai Customs", filename: "Dubai-Customs@4x-thumb.png", width: 90, height: 40 },
  { name: "DFSA", filename: "Dubai-Financial-Services-Authority-(DFSA)-thumb.png", width: 90, height: 40 },
  { name: "Dubai Holding", filename: "Dubai_Holding_Community_Management_idMRPWGmix_0.png", width: 90, height: 40 },
  { name: "Dubai Media Office", filename: "Dubai%20Media%20Office.png", width: 90, height: 40 },
  { name: "KHDA", filename: "KHDA-Proud-of-UAE-Logo1.png", width: 90, height: 40 },
  { name: "MOHRE", filename: "MOHRELogo.png", width: 90, height: 40 },
  { name: "Expo City Dubai", filename: "Dubai%20expo.png", width: 90, height: 40 },
  { name: "Meydan Free Zone", filename: "Meydan%20free%20zone.webp", width: 90, height: 40 },
  { name: "Concordia", filename: "logo-concordia.png", width: 90, height: 40 },
  { name: "Port & Customs", filename: "port-and-customs.svg", width: 90, height: 40 },
  { name: "UAE MOEdu", filename: "UAE-MOEdu-Brandmark-Vertical@4x-thumb.png", width: 80, height: 40 },
  { name: "IFZA", filename: "IFZA_Global_idC2gHhgL9_1.svg", width: 80, height: 40 },
  { name: "Nakheel", filename: "Nakheel_idBSCaoKfO_1.svg", width: 90, height: 40 },
  { name: "Emaar", filename: "EMAAR@4x-thumb.png", width: 90, height: 40 },
  { name: "DAMAC", filename: "DAMAC_Properties_id6Z_6MgkL_1.png", width: 90, height: 40 },
  { name: "UAE Emblem", filename: "UAE_EMBLEM.png", width: 60, height: 40 },
];

/* ============================================================
   Helper: render a single authority logo Image
   ============================================================ */

function AuthorityImage({ auth }: { auth: AuthorityLogo }) {
  return (
    <div
      className="flex items-center justify-center"
      title={auth.name}
    >
      <Image
        src={`/logos/${auth.filename}`}
        alt={`${auth.name} logo`}
        width={auth.width}
        height={auth.height}
        className="object-contain"
        loading="lazy"
        style={{ maxHeight: `${auth.height}px` }}
      />
    </div>
  );
}

/* ============================================================
   Component
   ============================================================ */

export default function TrustStrip() {
  return (
    <section className="bg-light-bg border-y border-border-light">
      <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 md:py-12">
        {/* ── Section heading ── */}
        <p className="text-caption font-medium text-body-text/80 text-center uppercase tracking-wider mb-8">
          Approved by Dubai&rsquo;s Leading Authorities
        </p>

        {/* ── Primary Authorities: Static Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-10">
          {primaryAuthorities.map((auth) => (
            <div
              key={auth.name}
              className="flex items-center justify-center bg-white rounded-md border border-border-light shadow-card px-3 py-4 transition-all duration-300 hover:shadow-dropdown hover:-translate-y-0.5"
            >
              <AuthorityImage auth={auth} />
            </div>
          ))}
        </div>

        {/* ── Secondary Authorities: CSS Marquee ── */}
        <div className="relative overflow-hidden">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-light-bg to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-light-bg to-transparent pointer-events-none" />

          {/* Marquee track — scrolls left, then resets via duplicate set */}
          <div className="flex overflow-hidden">
            <div className="flex shrink-0 gap-6 items-center animate-marquee-left">
              {secondaryAuthorities.map((auth) => (
                <div
                  key={auth.name}
                  className="flex items-center justify-center bg-white rounded-md border border-border-light shadow-card px-3 py-2.5 shrink-0 transition-all duration-300 hover:shadow-dropdown"
                >
                  <AuthorityImage auth={auth} />
                </div>
              ))}
            </div>

            {/* Duplicate set for seamless loop */}
            <div className="flex shrink-0 gap-6 items-center animate-marquee-left" aria-hidden="true">
              {secondaryAuthorities.map((auth) => (
                <div
                  key={`dup-${auth.name}`}
                  className="flex items-center justify-center bg-white rounded-md border border-border-light shadow-card px-3 py-2.5 shrink-0 transition-all duration-300 hover:shadow-dropdown"
                >
                  <AuthorityImage auth={auth} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
