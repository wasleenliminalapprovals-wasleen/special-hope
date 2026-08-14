/**
 * Arabic blog index — mirrors the EN 11-zone page (plan §5, ZONE 1 → 11) +
 * ZONE 1b marquee, fully in Arabic (C-AR §9).
 *
 * Same architecture as `src/app/blog/page.tsx`: server-rendered, server-driven
 * category filter via real `<Link>`s to `/ar/blog?category={slug}`, and a
 * single inline IIFE driving slideshow / FAQ / load-more / scroll reveals /
 * WhatsApp newsletter. All content comes from the Arabic merge layer
 * (`@/lib/blog-ar`). JSON-LD uses the `"ar"` locale.
 *
 * @see src/app/blog/page.tsx (EN source)
 * @see plans/blog-pre-build-plan.md §5 (zones) + §0 finding #9 (filtering)
 */

import type { Metadata } from "next";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import BlogMarquee from "@/components/blog/BlogMarquee";
import BlogHeroArabic from "@/components/blog/ar/BlogHeroArabic";
import BlogCategoryNavArabic from "@/components/blog/ar/BlogCategoryNavArabic";
import FeaturedCardArabic from "@/components/blog/ar/FeaturedCardArabic";
import BlogCategoryGridArabic from "@/components/blog/ar/BlogCategoryGridArabic";
import BentoGridArabic from "@/components/blog/ar/BentoGridArabic";
import TrendingSectionArabic from "@/components/blog/ar/TrendingSectionArabic";
import SiloBlocksArabic from "@/components/blog/ar/SiloBlocksArabic";
import AuthorSectionArabic from "@/components/blog/ar/AuthorSectionArabic";
import NewsletterSectionArabic, {
  NL_MESSAGE_AR,
} from "@/components/blog/ar/NewsletterSectionArabic";
import ServicesBridgeArabic from "@/components/blog/ar/ServicesBridgeArabic";
import BlogFAQArabic from "@/components/blog/ar/BlogFAQArabic";
import { filterArabicPosts, getVisibleArabicPosts } from "@/lib/blog-ar";
import { AR, NAP, SITE } from "@/lib/constants";
import { blogIndexSchemaStack } from "@/lib/blog-schema";
import { hreflangAlternates } from "@/lib/locale";

const PAGE_DESCRIPTION =
  "مدونة احترافية عن موافقات دبي — بلدية دبي والدفاع المدني وهيئة دبي للتطوير وديوا والمناطق الحرة: الجداول والرسوم وقوائم المستندات. تحديثات جديدة للجهات أسبوعياً.";

export const metadata: Metadata = {
  title: "مدونة موافقات دبي وتحديثات الجهات",
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: `${SITE.url}/ar/blog`,
    languages: hreflangAlternates(SITE.url, "/ar/blog"),
  },
  openGraph: {
    title: "مدونة موافقات دبي وتحديثات الجهات",
    description: PAGE_DESCRIPTION,
    url: `${SITE.url}/ar/blog`,
    type: "website",
    locale: "ar_AE",
    siteName: AR.siteName,
    images: [
      {
        url: "/logos/og-image-blog-authority-updates.jpg",
        width: 1200,
        height: 630,
        alt: "مدونة موافقات دبي وتحديثات الجهات — وسلين ليمينال لاستشارات الموافقات",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "مدونة موافقات دبي وتحديثات الجهات",
    description: PAGE_DESCRIPTION,
    images: ["/logos/og-image-blog-authority-updates.jpg"],
  },
};

/** wa.me links use digits only — strip the "+" prefix from NAP.whatsapp. */
const WA_DIGITS = NAP.whatsapp.replace(/\D/g, "");

interface BlogIndexPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ArabicBlogIndexPage({
  searchParams,
}: BlogIndexPageProps) {
  const params = await searchParams;
  const requested = typeof params?.category === "string" ? params.category : undefined;
  const initialCategory = requested && requested !== "all" ? requested : "all";
  const filteredPosts = filterArabicPosts(initialCategory);

  const allVisible = getVisibleArabicPosts();

  /** ZONE 1b — real headlines from the newest visible posts (DNA RULE 2). */
  const marqueeItems = allVisible.slice(0, 10).map((post) => post.title);

  /** WebPage dateModified — newest visible post's lastUpdated (real, never bumped). */
  const dateModified = allVisible[0]?.lastUpdated ?? "2026-08-13";

  /** Blog + WebPage + FAQPage + BreadcrumbList (plan §9), Arabic locale. */
  const schemas = blogIndexSchemaStack(
    {
      url: "/ar/blog",
      title: "مدونة موافقات دبي وتحديثات الجهات",
      description: PAGE_DESCRIPTION,
      dateModified,
      posts: filteredPosts,
      breadcrumbs: [
        { position: 1, name: AR.breadcrumb.home, slug: "/ar" },
        { position: 2, name: AR.nav.blog, slug: "/ar/blog" },
      ],
    },
    "ar",
  );

  const indexScript = `(function () {
  "use strict";
  var prefersReduced = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* ZONE 1 — hero slideshow: 4500ms auto-advance, manual dots, reduced-motion aware */
  (function () {
    var slideshow = document.querySelector("[data-hero-slideshow]");
    if (!slideshow) return;
    var slides = Array.prototype.slice.call(slideshow.querySelectorAll("[data-hero-slide]"));
    var dots = Array.prototype.slice.call(document.querySelectorAll("[data-hero-dot]"));
    if (slides.length === 0) return;

    function show(index) {
      slides.forEach(function (slide, i) {
        var on = i === index;
        slide.classList.toggle("is-active", on);
        slide.setAttribute("aria-hidden", on ? "false" : "true");
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
        dot.setAttribute("aria-selected", i === index ? "true" : "false");
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { show(i); });
    });

    show(0);

    if (!prefersReduced) {
      var current = 0;
      window.setInterval(function () {
        current = (current + 1) % slides.length;
        show(current);
      }, 4500);
    }
  })();

  /* ZONE 11 — FAQ accordion (one-at-a-time) */
  (function () {
    var toggles = Array.prototype.slice.call(document.querySelectorAll("[data-faq-toggle]"));
    if (toggles.length === 0) return;
    toggles.forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        var item = toggle.closest(".faq-item");
        if (!item) return;
        var wasOpen = toggle.getAttribute("aria-expanded") === "true";

        toggles.forEach(function (other) {
          other.setAttribute("aria-expanded", "false");
          other.classList.remove("is-open");
          var otherItem = other.closest(".faq-item");
          var otherAnswer = otherItem && otherItem.querySelector("[data-faq-a]");
          if (otherAnswer) otherAnswer.classList.remove("is-open");
        });

        if (!wasOpen) {
          toggle.setAttribute("aria-expanded", "true");
          toggle.classList.add("is-open");
          var answer = item.querySelector("[data-faq-a]");
          if (answer) answer.classList.add("is-open");
        }
      });
    });
  })();

  /* ZONE 5 — load more: reveal hidden grid, update label, disable button */
  (function () {
    var button = document.querySelector("[data-load-more]");
    if (!button) return;
    button.addEventListener("click", function () {
      var moreGrid = document.getElementById("bento-more-grid");
      if (moreGrid) moreGrid.hidden = false;
      var count = button.getAttribute("data-hidden-count");
      button.textContent = count ? "تم عرض جميع المقالات (" + count + ")" : "تم عرض جميع المقالات";
      button.disabled = true;
    });
  })();

  /* Scroll reveals — fade-in / reveal via a single IntersectionObserver */
  (function () {
    var targets = Array.prototype.slice.call(document.querySelectorAll(".fade-in, .reveal"));
    if (targets.length === 0) return;
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (t) { t.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (t) { io.observe(t); });
  })();

  /* ZONE 9 — newsletter: WhatsApp with prefilled Arabic message + typed name */
  (function () {
    var form = document.querySelector("[data-wa-form]");
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var input = form.querySelector("[data-wa-input]");
      var name = input ? input.value.trim() : "";
      var message = ${JSON.stringify(NL_MESSAGE_AR)};
      if (name) message += " اسمي " + name + ".";
      window.open("https://wa.me/${WA_DIGITS}?text=" + encodeURIComponent(message), "_blank", "noopener");
    });
  })();
})();`;

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="blog-container">
        <BlogBreadcrumbs
          items={[
            { name: AR.breadcrumb.home, href: "/ar" },
            { name: AR.nav.blog, href: "/ar/blog" },
          ]}
        />
      </div>

      {/* ZONE 1 */}
      <BlogHeroArabic />

      {/* ZONE 1b — full-width headline marquee */}
      <BlogMarquee items={marqueeItems} />

      {/* ZONE 2 */}
      <BlogCategoryNavArabic activeCategory={initialCategory} />

      {/* ZONE 3 */}
      <FeaturedCardArabic />

      {/* ZONE 4 */}
      <BlogCategoryGridArabic />

      {/* ZONE 5 */}
      <BentoGridArabic posts={filteredPosts} />

      {/* ZONE 6 */}
      <TrendingSectionArabic />

      {/* ZONE 7 */}
      <SiloBlocksArabic />

      {/* ZONE 8 */}
      <AuthorSectionArabic />

      {/* ZONE 9 */}
      <NewsletterSectionArabic />

      {/* ZONE 10 */}
      <ServicesBridgeArabic />

      {/* ZONE 11 */}
      <BlogFAQArabic />

      {/* Single inline IIFE — all index interactions (slideshow, FAQ, load-more,
          scroll reveals, WhatsApp newsletter). No client components. */}
      <script dangerouslySetInnerHTML={{ __html: indexScript }} />
    </>
  );
}
