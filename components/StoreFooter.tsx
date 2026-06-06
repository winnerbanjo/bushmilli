import Link from "next/link";
import { policyPages, site } from "@/lib/site";

export function StoreFooter() {
  return (
    <footer className="footer">
      <div>
        <strong>BushMilli</strong>
        <p>Premium graphic streetwear from Lagos, Nigeria.</p>
      </div>
      <div className="footer-links" aria-label="Store policies">
        {policyPages.map((page) => (
          <Link href={`/policies/${page.slug}`} key={page.slug}>
            {page.title}
          </Link>
        ))}
      </div>
      <a className="button" href={`https://wa.me/${site.whatsappInternational}`} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
    </footer>
  );
}
