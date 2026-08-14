/**
 * NewsletterSectionArabic — Arabic variant of ZONE 9 (plan §5, C-AR §9).
 *
 * Mirrors `NewsletterSection.tsx`: WhatsApp capture form. Exports
 * `NL_MESSAGE_AR` — the Arabic pre-filled subscribe message the index IIFE
 * appends the typed name to (same `data-wa-form` / `data-wa-input` /
 * `data-wa-submit` contract as the EN version).
 *
 * @see src/components/blog/NewsletterSection.tsx (EN source)
 */

export const NL_MESSAGE_AR = `مرحباً وسلين ليمينال لاستشارات الموافقات، أرغب في الاشتراك في نشرتكم الشهرية لتحديثات موافقات دبي.`;

export default function NewsletterSectionArabic() {
  return (
    <section className="newsletter-zone" aria-labelledby="newsletter-heading">
      <div className="blog-container">
        <div className="newsletter blog-glass fade-in">
          <div className="nl-stars" aria-hidden="true">
            <span>✦</span>
            <span>✦</span>
            <span>✦</span>
          </div>

          <div className="zone-head reveal">
            <p className="blog-eyebrow">النشرة البريدية</p>
            <h2 id="newsletter-heading" className="zone-title">
              تحديثات الموافقات، شهرياً
            </h2>
          </div>

          <p className="nl-lead">
            رسالة واحدة شهرياً تغطي أخبار موافقات دبي وتغيّرات الرسوم وتحديثات السلامة
            الإنشائية لقانون رقم 3 لسنة 2026. اشترك عبر واتساب واحصل على العدد القادم
            مباشرة على هاتفك.
          </p>

          <form className="nl-form" data-wa-form>
            <input
              className="nl-input"
              type="text"
              name="name"
              placeholder="اسمك"
              aria-label="اسمك"
              autoComplete="name"
              data-wa-input
            />
            <button className="nl-submit" type="submit" data-wa-submit>
              اشترك عبر واتساب
            </button>
          </form>

          <p className="nl-hint">
            لا رسائل مزعجة — رسالة واحدة شهرياً، ويمكنك إلغاء الاشتراك في أي وقت.
          </p>
        </div>
      </div>
    </section>
  );
}
