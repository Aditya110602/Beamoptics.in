import IndustriesPage from "@/routes/IndustriesPage";
import { notFound } from "next/navigation";
import { buildMetadata, SITE_URL } from "@/lib/seo";

const INDUSTRY_META = {
  dairy: {
    title: "Dairy Industry",
    name: "Dairy",
    description:
      "BeamOptics dairy workflows support adulteration checks and quality assurance at milk collection and processing stages.",
    keywords: ["dairy testing", "milk adulteration detection", "FTIR milk analysis"],
  },
  "food-products": {
    title: "Food Products Industry",
    name: "Food Products",
    description:
      "Rapid screening support for food product safety, contamination checks, and quality surveillance workflows.",
    keywords: ["food safety testing", "contamination screening", "food quality analytics"],
  },
  veterinary: {
    title: "Veterinary Industry",
    name: "Veterinary",
    description:
      "Veterinary diagnostics support for animal health programs, early disease screening, and rural deployment models.",
    keywords: ["veterinary diagnostics", "animal health screening", "somatic cell testing"],
  },
  pharmaceutical: {
    title: "Pharmaceutical Industry",
    name: "Pharmaceutical",
    description:
      "Pharmaceutical solvent and impurity risk screening workflows designed for safer pre-release quality checks.",
    keywords: ["pharmaceutical screening", "DEG impurity detection", "solvent quality analysis"],
  },
  "public-health": {
    title: "Public Health Industry",
    name: "Public Health",
    description:
      "Portable frontline diagnostics for public-health screening programs including anemia and diabetes monitoring.",
    keywords: ["public health diagnostics", "anemia screening", "HbA1c monitoring"],
  },
};

const INDUSTRY_IDS = Object.keys(INDUSTRY_META);

async function resolveIndustryId(params) {
  const resolvedParams = await params;
  return (resolvedParams?.industryId || "").toLowerCase().trim();
}

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRY_IDS.map((industryId) => ({ industryId }));
}

export async function generateMetadata({ params }) {
  const industryId = await resolveIndustryId(params);
  const current = INDUSTRY_META[industryId];

  if (!current) {
    return buildMetadata({
      title: "Industries",
      description:
        "Explore BeamOptics industry-specific deployment models across healthcare, dairy, food safety, and pharmaceuticals.",
      path: "/industries",
      keywords: ["industry diagnostics", "quality control instrumentation"],
    });
  }

  return buildMetadata({
    title: current.title,
    description: current.description,
    path: `/industries/${industryId}`,
    keywords: current.keywords,
  });
}

function buildIndustrySchema(industryId, current) {
  const pageUrl = `${SITE_URL}/industries/${industryId}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: current.title,
    url: pageUrl,
    description: current.description,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries` },
        { "@type": "ListItem", position: 3, name: current.name, item: pageUrl },
      ],
    },
  };
}

export default async function Page({ params }) {
  const industryId = await resolveIndustryId(params);
  const current = INDUSTRY_META[industryId];

  if (!current) {
    notFound();
  }

  const industrySchema = buildIndustrySchema(industryId, current);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(industrySchema) }}
      />
      <IndustriesPage />
    </>
  );
}
