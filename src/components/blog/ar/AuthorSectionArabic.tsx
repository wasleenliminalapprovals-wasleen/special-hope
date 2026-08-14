/**
 * AuthorSectionArabic — Arabic variant of ZONE 8 (plan §5, C-AR §9).
 *
 * Mirrors `AuthorSection.tsx`: E-E-A-T signal with the licensed consultants.
 * Uses the Arabic author fields (`arabicName`, `titleAr`) from
 * `AUTHOR_REGISTRY`, Arabic role-descriptive bios (no fabricated stats) and
 * the DED licence badge. Internal links point to the Arabic pages.
 *
 * @see src/components/blog/AuthorSection.tsx (EN source)
 * @see plans/gsc-qa-author-schema-fix-plan.md §3.2 (author rules)
 */

import Link from "next/link";
import { AUTHOR_REGISTRY, type GuideAuthorId } from "@/data/authors";
import { LICENSE } from "@/lib/constants";

interface AuthorCardData {
  id: GuideAuthorId;
  monogram: string;
  bio: string;
  internalHref?: string;
  internalLabel?: string;
}

const AUTHOR_CARDS: AuthorCardData[] = [
  {
    id: "jamsheed-khalid",
    monogram: "JK",
    bio: "مستشار أول للتشطيبات ومهندس إنشائي. يراجع جميع محتويات السلامة الإنشائية لبلدية دبي والدفاع المدني وقانون رقم 3 لسنة 2026 في هذه المدونة.",
  },
  {
    id: "kavya-ramachandran",
    monogram: "KR",
    bio: "مصممة داخلية تغطي تصاريح التشطيب وشهادات عدم الممانعة للتجديد وموافقات مرحلة الرسومات لهيئة دبي للتطوير والمناطق الحرة.",
  },
  {
    id: "organization",
    monogram: "WL",
    bio: `وسلين ليمينال لاستشارات الموافقات — الاستشارة المرخصة من دائرة التنمية الاقتصادية لموافقات دبي (رخصة رقم ${LICENSE.licenseNumber}) خلف كل دليل في هذه المدونة.`,
    internalHref: "/ar/about-us",
    internalLabel: "عن الشركة",
  },
];

function profileLabel(url: string): string {
  if (url.includes("linkedin.com")) return "لينكد إن";
  return "الملف الشخصي";
}

export default function AuthorSectionArabic() {
  return (
    <section className="author-section" aria-labelledby="authors-heading">
      <div className="blog-container">
        <div className="zone-head reveal">
          <p className="blog-eyebrow">E-E-A-T</p>
          <h2 id="authors-heading" className="zone-title">
            كتبه استشاريون مرخصون
          </h2>
        </div>

        <p className="eeat-badge fade-in">
          <span aria-hidden="true">✓</span>
          رخصة تجارية من دائرة التنمية الاقتصادية رقم {LICENSE.licenseNumber} · استشارات
          موافقات دبي
        </p>

        <div className="author-grid fade-in">
          {AUTHOR_CARDS.map((card) => {
            const author = AUTHOR_REGISTRY[card.id];
            return (
              <article key={card.id} className="author-card">
                <div className="blog-avatar-ring author-photo" aria-hidden="true">
                  <span className="author-monogram">{card.monogram}</span>
                </div>
                <div className="author-info">
                  <h3 className="author-name">{author.arabicName}</h3>
                  <p className="author-title">{author.titleAr}</p>
                  <p className="author-bio">{card.bio}</p>

                  {author.sameAs && author.sameAs.length > 0 ? (
                    <ul className="author-links">
                      {author.sameAs.map((url) => (
                        <li key={url}>
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            {profileLabel(url)}
                            <span aria-hidden="true"> ↗</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : card.internalHref && card.internalLabel ? (
                    <Link className="author-links-internal" href={card.internalHref}>
                      {card.internalLabel}
                      <span aria-hidden="true"> ←</span>
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
