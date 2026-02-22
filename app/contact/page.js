import ContactPage from "@/routes/ContactPage";
import { buildMetadata, SITE_URL } from "@/lib/seo";

const pageDescription =
  "Contact BeamOptics for diagnostic and analytical product information, deployment planning, support, and partnerships.";

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact BeamOptics",
  url: `${SITE_URL}/contact`,
  description: pageDescription,
  mainEntity: {
    "@type": "Organization",
    name: "BeamOptics Scientific Pvt. Ltd.",
    url: SITE_URL,
    email: "info@beamoptics.in",
    telephone: "+91-9975568458",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "info@beamoptics.in",
      telephone: "+91-9975568458",
      areaServed: "IN",
      availableLanguage: "en",
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "BeamOptics Scientific Pvt. Ltd.",
  url: SITE_URL,
  email: "info@beamoptics.in",
  telephone: "+91-9975568458",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress:
        "Pap J 188, J Block, 2nd Floor, Near Quality Forum Circle, Gawali Mata Chowk, Bhosari",
      addressLocality: "Pune",
      postalCode: "411026",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "301 Vishnu Commercial Complex, Plot No. 36, Sector 15, CBD Belapur",
      addressLocality: "Navi Mumbai",
      postalCode: "400614",
      addressCountry: "IN",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
  ],
};

export const metadata = buildMetadata({
  title: "Contact Us",
  description: pageDescription,
  path: "/contact",
  keywords: ["BeamOptics contact", "diagnostics support India", "analytical instruments inquiry"],
});

export default function Page() {
  const schemas = [contactSchema, localBusinessSchema, breadcrumbSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`contact-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ContactPage />
    </>
  );
}
