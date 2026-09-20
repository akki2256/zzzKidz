import { siteConfig } from "@/content/site";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.productName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    image: `${siteConfig.url}${siteConfig.logo}`,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: `+${siteConfig.contact.phoneE164}`,
    slogan: siteConfig.slogan,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.youtube,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
