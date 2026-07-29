/**
 * ServiceCategoriesArabic — Arabic version of ServiceCategories.
 *
 * All text in Arabic, all links point to /ar/ paths.
 *
 * @see /plans/fix-arabic-100-percent-non-english-plan.md (Issue 2B)
 */

import Image from "next/image";
import Card from "@/components/ui/Card";
import {
  Building2,
  Building,
  Home,
  FileText,
  Zap,
  UtensilsCrossed,
  PencilRuler,
  ScrollText,
} from "lucide-react";

interface CategoryDef {
  title: string;
  slug: string;
  count: number;
  icon: React.ElementType;
  description: string;
  authorityLogo?: string;
}

const categories: CategoryDef[] = [
  {
    title: "الحكومية والتنظيمية",
    slug: "government-regulatory",
    count: 12,
    icon: Building2,
    description: "موافقات بلدية دبي والدفاع المدني وهيئة الطرق والمواصلات",
    authorityLogo: "DubaiMuncipalityLogo.png",
  },
  {
    title: "المناطق الحرة",
    slug: "free-zone",
    count: 8,
    icon: Building,
    description: "تصاريح واحة دبي للسيليكون ودبي الجنوب وتيكوم",
    authorityLogo: "dubai-silicon-oasis-authority-thumb.png",
  },
  {
    title: "المطورين والمجتمعات",
    slug: "developer-community",
    count: 6,
    icon: Home,
    description: "موافقات إعمار ونخيل والمطورين",
    authorityLogo: "EMAAR@4x-thumb.png",
  },
  {
    title: "العقارات والتسجيل",
    slug: "property-registration",
    count: 4,
    icon: ScrollText,
    description: "سندات الملكية والتسجيل والمستندات العقارية",
    authorityLogo: "logo-DDA-colour.svg",
  },
  {
    title: "الفنية والمرافق",
    slug: "technical-utility",
    count: 7,
    icon: Zap,
    description: "ديوا وتبريد المناطق وتوصيلات البنية التحتية",
    authorityLogo: "dewalogo2024.webp",
  },
  {
    title: "التجارة والأغذية والضيافة",
    slug: "trade-food-hospitality",
    count: 5,
    icon: UtensilsCrossed,
    description: "السلامة الغذائية والرخص التجارية وتصاريح الفنادق",
    authorityLogo: "DET-DED-Logo.svg",
  },
  {
    title: "التشطيبات والبناء",
    slug: "fit-out-construction",
    count: 6,
    icon: PencilRuler,
    description: "التشطيبات الداخلية والتجديد وتصاريح البناء",
    authorityLogo: "DCDLogo.png",
  },
  {
    title: "الرسومات والوثائق",
    slug: "drawing-documentation",
    count: 4,
    icon: FileText,
    description: "الرسومات ثنائية وثلاثية الأبعاد وتقديمات CAD",
    authorityLogo: "DubaiMuncipalityLogo.png",
  },
];

export default function ServiceCategoriesArabic() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-h2 font-montserrat text-heading-text mb-3">
            خدمات الموافقات التي نقدمها
          </h2>
          <p className="text-body-lg text-body-text max-w-2xl mx-auto">
            من التصاريح الحكومية إلى الرسومات الفنية — ندير كل موافقة يحتاجها مشروعك في دبي.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card
                key={cat.slug}
                icon={<Icon size={24} strokeWidth={1.75} />}
                secondaryIcon={
                  cat.authorityLogo ? (
                    <Image
                      src={`/logos/${cat.authorityLogo}`}
                      alt={`شعار ${cat.title}`}
                      width={28}
                      height={28}
                      className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      style={{ maxHeight: "28px" }}
                    />
                  ) : undefined
                }
                title={cat.title}
                description={cat.description}
                badge={`${cat.count}+ موافقة`}
                href={`/ar/approvals?category=${cat.slug}`}
                className=""
              />
            );
          })}
        </div>

        <div className="text-center mt-8">
          <a
            href="/ar/approvals"
            className="inline-flex items-center gap-2 text-body font-medium text-link-blue hover:text-brand-blue-hover transition-colors"
          >
            عرض جميع أنواع الموافقات الـ 52+ ←
          </a>
        </div>
      </div>
    </section>
  );
}
