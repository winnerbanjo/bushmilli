import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { StoreFooter } from "@/components/StoreFooter";
import { StoreHeader } from "@/components/StoreHeader";
import { getPolicy, policyPages, site } from "@/lib/site";

type PolicyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return policyPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PolicyPageProps) {
  const { slug } = await params;
  const page = getPolicy(slug);

  if (!page) {
    return {};
  }

  return {
    title: `${page.title} | BushMilli`,
    description: page.summary
  };
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { slug } = await params;
  const page = getPolicy(slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <StoreHeader />
      <main className="policy-shell">
      <section className="policy-hero">
        <span className="eyebrow">Store policy</span>
        <h1>{page.title}</h1>
        <p>{page.summary}</p>
      </section>

      <section className="policy-content">
        {page.sections.map((section) => (
          <article className="policy-section" key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section className="policy-contact">
        <div>
          <h2>Need help?</h2>
          <p>
            Contact {site.name} on WhatsApp at {site.whatsapp} or email {site.email}.
          </p>
        </div>
        <a className="button acid" href={`https://wa.me/${site.whatsappInternational}`} target="_blank" rel="noreferrer">
          <MessageCircle size={17} />
          WhatsApp
        </a>
      </section>
      </main>
      <StoreFooter />
    </>
  );
}
