import Image from "next/image";
import Link from "next/link";
import { Menu, MessageCircle, Search, ShoppingBag } from "lucide-react";
import { site } from "@/lib/site";

export function StoreHeader() {
  return (
    <>
      <div className="top-strip">
        <span>Lagos streetwear</span>
        <span>Checkout now live</span>
        <span>WhatsApp support available</span>
      </div>
      <nav className="nav">
        <Link className="brand" href="/">
          <Image src="/images/bushmilli-logo.jpeg" alt="BushMilli logo" width={88} height={88} />
          <span>BushMilli</span>
        </Link>
        <div className="nav-actions">
          <Link className="icon-button hide-mobile" href="/#shop" aria-label="Search">
            <Search size={23} />
          </Link>
          <Link className="icon-button cart-icon" href="/cart" aria-label="Cart">
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
          <Link className="icon-button" href="/#shop" aria-label="Menu">
            <Menu size={27} />
          </Link>
        </div>
      </nav>
    </>
  );
}
