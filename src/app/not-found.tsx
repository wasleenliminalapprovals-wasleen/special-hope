/**
 * Not Found — Custom 404 page.
 *
 * Displays a helpful message with navigation options when a page is not found.
 * Uses the same header/footer as the rest of the site via root layout.
 *
 * @see /plans/complete-build-plan.md (Phase 5.3 — Not Found)
 */

import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { Home, Search, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for doesn't exist or has been moved. Browse our approval services or contact us for assistance.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${SITE.url}/not-found`,
  },
};

export default function NotFoundPage() {
  return (
    <section className="bg-white px-4 py-20 md:px-8 md:py-32">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 visual */}
        <div className="text-[8rem] md:text-[10rem] font-montserrat font-black text-brand-blue/10 leading-none mb-4 select-none">
          404
        </div>

        <h1 className="text-h1 font-montserrat text-heading-text mb-4">
          Page Not Found
        </h1>

        <p className="text-body-lg text-body-text max-w-lg mx-auto mb-10 leading-relaxed">
          The page you're looking for doesn't exist or has been
          moved. Let us help you find what you need.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            href="/"
            className="text-body font-semibold px-8 py-4"
          >
            <Home size={20} strokeWidth={1.75} />
            Go Home
          </Button>

          <Button
            variant="outline"
            href="/approvals"
            className="text-body font-semibold px-8 py-4"
          >
            <Search size={20} strokeWidth={1.75} />
            Browse Approvals
          </Button>

          <Button
            variant="ghost"
            href="/contact-us"
            className="text-body font-semibold px-8 py-4"
          >
            <ArrowLeft size={20} strokeWidth={1.75} />
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
