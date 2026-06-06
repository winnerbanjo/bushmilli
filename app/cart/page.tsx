import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { clearCartAction, updateCartAction } from "@/app/shop-actions";
import { StoreFooter } from "@/components/StoreFooter";
import { StoreHeader } from "@/components/StoreHeader";
import { cartSubtotal, enrichCart, getCart } from "@/lib/cart";
import { formatNaira, getProducts } from "@/lib/products";

export default async function CartPage() {
  const [cart, products] = await Promise.all([getCart(), getProducts()]);
  const lines = enrichCart(cart, products);
  const subtotal = cartSubtotal(lines);

  return (
    <>
      <StoreHeader />
      <main className="checkout-shell">
      <section className="policy-hero">
        <span className="eyebrow">Your bag</span>
        <h1>Cart</h1>
        <p>Review your items, sizes, and quantities before checkout.</p>
      </section>

      {lines.length ? (
        <div className="checkout-layout">
          <section className="cart-lines">
            {lines.map((line) => (
              <article className="cart-line" key={`${line.productId}-${line.size}`}>
                <Image src={line.product.image} alt={line.product.name} width={180} height={220} />
                <div>
                  <h2>{line.product.name}</h2>
                  <p>
                    Size {line.size} - {formatNaira(line.product.price)}
                  </p>
                  <form className="quantity-form" action={updateCartAction}>
                    <input type="hidden" name="productId" value={line.productId} />
                    <input type="hidden" name="size" value={line.size} />
                    <input name="quantity" type="number" min="0" defaultValue={line.quantity} aria-label="Quantity" />
                    <button className="button" type="submit">
                      Update
                    </button>
                  </form>
                </div>
                <strong>{formatNaira(line.lineTotal)}</strong>
              </article>
            ))}
          </section>

          <aside className="order-summary">
            <h2>Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatNaira(subtotal)}</strong>
            </div>
            <p>Delivery is calculated at checkout based on Lagos, nationwide delivery, or pickup.</p>
            <Link className="button acid" href="/checkout">
              Checkout
            </Link>
            <form action={clearCartAction}>
              <button className="text-button" type="submit">
                <Trash2 size={16} />
                Clear cart
              </button>
            </form>
          </aside>
        </div>
      ) : (
        <section className="empty-state">
          <ShoppingBag size={38} />
          <h2>Your cart is empty</h2>
          <p>Add a BushMilli drop to begin checkout.</p>
          <Link className="button acid" href="/#shop">
            Shop products
          </Link>
        </section>
      )}
      </main>
      <StoreFooter />
    </>
  );
}
