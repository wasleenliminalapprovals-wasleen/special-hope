/**
 * Blog index — 11-zone page (plan §5, ZONE 1 → 11) + ZONE 1b marquee.
 *
 * Server-rendered (no client components). Category filtering is server-driven
 * (plan §0 finding #9): every pill is a real `<Link>` to `/blog?category={slug}`,
 * the active category is read from `await searchParams`, and `filterPosts` runs
 * server-side so the bento grid (ZONE 5) re-renders the current set.
 *
 * All interactive behaviour — slideshow auto-advance, one-at-a-time FAQ
 * accordion, load-more reveal, scroll reveals, WhatsApp newsletter — lives in a
 * single inline IIFE at the end of the page (no client components, no extra JS
 * bundles). Reduced-motion is respected throughout.
 *
 * @see plans/blog-pre-build-plan.md §5 (zones) + §0 finding #9 (filtering)
 */

import type { Metadata } from "next";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import BlogMarquee from "@/components/blog/BlogMarquee";
import BlogHero from "@/components/blog/BlogHero";
import BlogCategoryNav from "@/components/blog/BlogCategoryNav";
import FeaturedCard from "@/components/blog/FeaturedCard";
import BlogCategoryGrid from "@/components/blog/BlogCategoryGrid";
import BentoGrid from "@/components/blog/BentoGrid";
import TrendingSection from "@/components/blog/TrendingSection";
import SiloBlocks from "@/components/blog/SiloBlocks";
import AuthorSection from "@/components/blog/AuthorSection";
import NewsletterSection, { NL_MESSAGE } from "@/components/blog/NewsletterSection";
import ServicesBridge from "@/components/blog/ServicesBridge";
import BlogFAQ from "@/components/blog/BlogFAQ";
import { filterPosts, getVisiblePosts } from "@/lib/blog";
import { NAP, SITE } from "@/lib/constants";
import { hreflangAlternates } from "@/lib/locale";
import { blogIndexSchemaStack } from "@/lib/blog-schema";

const PAGE_DESCRIPTION =
  "Expert blog on Dubai approvals — Dubai Municipality, DCD, DDA, DEWA and freezone timelines, fees and document checklists. New authority updates weekly.";

export const metadata: Metadata = {
  title: "Dubai Approvals Blog & Updates",
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "https://www.dubaiapprovalconsultants.com/blog",
    languages: hreflangAlternates(SITE.url, "/blog"),
  },
  openGraph: {
    title: "Dubai Approvals Blog & Updates",
    description: PAGE_DESCRIPTION,
    url: `${SITE.url}/blog`,
    type: "website",
    siteName: SITE.name,
    images: [
      {
        url: "/logos/og-image-blog-authority-updates.jpg",
        width: 1200,
        height: 630,
        alt: "Dubai Approvals Blog & Updates — Wasleen Liminal Approval Consultants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dubai Approvals Blog & Updates",
    description: PAGE_DESCRIPTION,
    images: ["/logos/og-image-blog-authority-updates.jpg"],
  },
};

/** wa.me links use digits only — strip the "+" prefix from NAP.whatsapp. */
const WA_DIGITS = NAP.whatsapp.replace(/\D/g, "");

interface BlogIndexPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const params = await searchParams;
  const requested = typeof params?.category === "string" ? params.category : undefined;
  const initialCategory = requested && requested !== "all" ? requested : "all";
  const filteredPosts = filterPosts(initialCategory);

  const allVisible = getVisiblePosts();

  /** ZONE 1b — real headlines from the newest visible posts (DNA RULE 2). */
  const marqueeItems = allVisible.slice(0, 10).map((post) => post.title);

  /** WebPage dateModified — newest visible post's lastUpdated (real, never bumped). */
  const dateModified = allVisible[0]?.lastUpdated ?? "2026-08-13";

  /** Blog + WebPage + FAQPage + BreadcrumbList (plan §9). */
  const schemas = blogIndexSchemaStack({
    url: "/blog",
    title: "Dubai Approvals Blog & Updates",
    description: PAGE_DESCRIPTION,
    dateModified,
    posts: filteredPosts,
    breadcrumbs: [
      { position: 1, name: "Home", slug: "/" },
      { position: 2, name: "Blog", slug: "/blog" },
    ],
  });

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
      button.textContent = count ? "All posts shown (" + count + " loaded)" : "All posts shown";
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

  /* ZONE 9 — newsletter: WhatsApp with prefilled message + typed name */
  (function () {
    var form = document.querySelector("[data-wa-form]");
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var input = form.querySelector("[data-wa-input]");
      var name = input ? input.value.trim() : "";
      var message = ${JSON.stringify(NL_MESSAGE)};
      if (name) message += " My name is " + name + ".";
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
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
          ]}
        />
      </div>

      {/* ZONE 1 */}
      <BlogHero />

      {/* ZONE 1b — full-width headline marquee */}
      <BlogMarquee items={marqueeItems} />

      {/* ZONE 2 */}
      <BlogCategoryNav activeCategory={initialCategory} />

      {/* ZONE 3 */}
      <FeaturedCard />

      {/* ZONE 4 */}
      <BlogCategoryGrid />

      {/* ZONE 5 */}
      <BentoGrid posts={filteredPosts} />

      {/* ZONE 6 */}
      <TrendingSection />

      {/* ZONE 7 */}
      <SiloBlocks />

      {/* ZONE 8 */}
      <AuthorSection />

      {/* ZONE 9 */}
      <NewsletterSection />

      {/* ZONE 10 */}
      <ServicesBridge />

      {/* ZONE 11 */}
      <BlogFAQ />

      {/* Single inline IIFE — all index interactions (slideshow, FAQ, load-more,
          scroll reveals, WhatsApp newsletter). No client components. */}
      <script dangerouslySetInnerHTML={{ __html: indexScript }} />
    </>
  );
}
