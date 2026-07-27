/**
 * TrustStrip — Authority logos strip (grayscale, reduced opacity).
 *
 * Shows the key Dubai authorities whose approvals Wasleen handles.
 * Used on homepage above-the-fold to build trust via recognized logos.
 *
 * @see /plans/complete-build-plan.md (Phase 6.2 — Trust Strip)
 */

const authorities = [
  {
    name: "Dubai Municipality",
    abbr: "DM",
  },
  {
    name: "Dubai Development Authority",
    abbr: "DDA",
  },
  {
    name: "DEWA",
    abbr: "DEWA",
  },
  {
    name: "Dubai Civil Defense",
    abbr: "DCD",
  },
  {
    name: "Dubai Silicon Oasis Authority",
    abbr: "DSO",
  },
  {
    name: "Trakhees",
    abbr: "Trakhees",
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-light-bg border-y border-border-light">
      <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 md:py-10">
        <p className="text-caption font-medium text-body-text/60 text-center uppercase tracking-wider mb-6">
          Approved by Dubai's Leading Authorities
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {authorities.map((authority) => (
            <div
              key={authority.abbr}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-border-light opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              {/* Authority badge placeholder — actual logo images in Phase 12 */}
              <div className="w-8 h-8 rounded bg-card-bg flex items-center justify-center shrink-0">
                <span className="text-caption font-montserrat font-bold text-brand-blue">
                  {authority.abbr}
                </span>
              </div>
              <span className="text-body-sm font-medium text-body-text">
                {authority.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
