import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingBag, MessageCircle } from "lucide-react";
import { AddToCartForm } from "@/components/AddToCartForm";
import { formatNaira, getProducts } from "@/lib/products";
import { policyPages, site } from "@/lib/site";

export default async function Home() {
  const products = await getProducts();
  const featured = products.find((product) => product.featured) ?? products[0];

  return (
    <>
      <div className="top-strip">Lagos streetwear - WhatsApp orders available</div>
      <nav className="nav">
        <Link className="brand" href="/">
          <Image src="/images/bushmilli-logo.jpeg" alt="BushMilli logo" width={88} height={88} />
          <span>BushMilli</span>
        </Link>
        <div className="nav-actions">
          <Link className="icon-button hide-mobile" href="#shop" aria-label="Search">
            <Search size={23} />
          </Link>
          <Link className="icon-button" href="/cart" aria-label="Cart">
            <ShoppingBag size={23} />
          </Link>
          <a
            className="icon-button"
            href={`https://wa.me/${site.whatsappInternational}`}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <MessageCircle size={23} />
          </a>
          <button className="icon-button" aria-label="Menu">
            <Menu size={27} />
          </button>
        </div>
      </nav>

      <main>
        <section className="hero">
          <Image
            src="/images/bushmilli-black-back.jpeg"
            alt="BushMilli black graphic tee"
            width={834}
            height={1280}
            priority
          />
          <div className="hero-content">
            <span className="eyebrow">Introducing</span>
            <h1>BushMilli</h1>
            <p>
              Graphic-heavy Lagos streetwear built around bold tees, red-black artwork,
              oversized fits, and culture-first drops.
            </p>
            <Link className="button acid" href="#shop">
              Shop now
            </Link>
          </div>
        </section>

        <section className="section" id="shop">
          <div className="section-header">
            <h2>New Arrivals</h2>
            <a href={`https://wa.me/${site.whatsappInternational}`} target="_blank" rel="noreferrer">
              Order on WhatsApp
            </a>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <Link className="product-media" href={`/products/${product.id}`}>
                  <Image src={product.image} alt={product.name} width={900} height={1100} />
                </Link>
                <div className="product-info">
                  <span className="product-status">{product.status}</span>
                  <h3>
                    <Link href={`/products/${product.id}`}>{product.name}</Link>
                  </h3>
                  <div className="product-row">
                    <span className="price">{formatNaira(product.price)}</span>
                    <AddToCartForm product={product} compact />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {featured ? (
          <section className="feature-band">
            <Image src={featured.gallery[0] ?? featured.image} alt={featured.name} width={900} height={900} />
            <div className="feature-copy">
              <span className="eyebrow">Featured drop</span>
              <h2>{featured.name}</h2>
              <p>{featured.description}</p>
              <Link className="button" href="#shop">
                Explore products
              </Link>
            </div>
          </section>
        ) : null}

        <section className="section">
          <div className="section-header">
            <h2>Store Info</h2>
            <Link href="/policies/contact">Contact</Link>
          </div>
          <div className="info-grid">
            <div className="info-block">
              <h3>About BushMilli</h3>
              <p>Independent Lagos streetwear label focused on graphic tees and limited concepts.</p>
            </div>
            <div className="info-block">
              <h3>WhatsApp</h3>
              <p>{site.whatsapp} for product questions, sizing, and order confirmation.</p>
            </div>
            <div className="info-block">
              <h3>Payment</h3>
              <p>{site.bank.bankName} transfer is available after WhatsApp order confirmation.</p>
            </div>
            <div className="info-block">
              <h3>Delivery</h3>
              <p>Lagos delivery and nationwide dispatch can be confirmed before payment.</p>
            </div>
          </div>
        </section>
      </main>

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
    </>
  );
}
