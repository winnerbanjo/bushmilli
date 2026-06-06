import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { placeOrderAction } from "@/app/shop-actions";
import { cartSubtotal, enrichCart, getCart } from "@/lib/cart";
import { formatNaira, getProducts } from "@/lib/products";
import { site } from "@/lib/site";

type CheckoutPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const [cart, products, params] = await Promise.all([getCart(), getProducts(), searchParams]);
  const lines = enrichCart(cart, products);

  if (!lines.length) {
    redirect("/cart");
  }

  const subtotal = cartSubtotal(lines);
  const defaultDelivery = 3000;

  return (
    <main className="checkout-shell">
      <nav className="policy-nav">
        <Link className="brand" href="/">
          BushMilli
        </Link>
        <Link className="button" href="/cart">
          Cart
        </Link>
      </nav>

      <section className="policy-hero">
        <span className="eyebrow">Secure checkout</span>
        <h1>Checkout</h1>
        <p>Enter delivery and payment details. Your order will be saved for BushMilli to confirm.</p>
      </section>

      {params.error ? <div className="error">Please enter your name, phone number, and delivery address.</div> : null}

      <div className="checkout-layout">
        <form className="checkout-form" action={placeOrderAction}>
          <div className="admin-grid">
            <label className="field">
              <span>Full name</span>
              <input name="name" required placeholder="Customer name" />
            </label>
            <label className="field">
              <span>Phone</span>
              <input name="phone" required placeholder="0916..." />
            </label>
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" placeholder="customer@email.com" />
            </label>
            <label className="field">
              <span>City</span>
              <input name="city" defaultValue="Lagos" />
            </label>
            <label className="field">
              <span>State</span>
              <input name="state" defaultValue="Lagos" />
            </label>
            <label className="field">
              <span>Delivery method</span>
              <select name="deliveryMethod" defaultValue="Lagos delivery">
                <option>Lagos delivery</option>
                <option>Nationwide delivery</option>
                <option>Pickup</option>
              </select>
            </label>
            <label className="field">
              <span>Payment method</span>
              <select name="paymentMethod" defaultValue="Bank transfer">
                <option>Bank transfer</option>
                <option>Pay on delivery</option>
              </select>
            </label>
            <label className="field full">
              <span>Delivery address</span>
              <textarea name="address" required placeholder="House number, street, area, landmark" />
            </label>
            <label className="field full">
              <span>Order notes</span>
              <textarea name="notes" placeholder="Sizing notes, delivery instructions, or pickup timing" />
            </label>
          </div>

          <div className="payment-box">
            <h2>Bank transfer details</h2>
            <p>
              {site.bank.accountName} - {site.bank.accountNumber} - {site.bank.bankName}
            </p>
            <p>After placing the order, send payment proof on WhatsApp for confirmation.</p>
          </div>

          <button className="button acid full" type="submit">
            Place order
          </button>
        </form>

        <aside className="order-summary">
          <h2>Order summary</h2>
          {lines.map((line) => (
            <div className="summary-product" key={`${line.productId}-${line.size}`}>
              <Image src={line.product.image} alt={line.product.name} width={64} height={80} />
              <span>
                {line.product.name}
                <br />
                Size {line.size} x {line.quantity}
              </span>
              <strong>{formatNaira(line.lineTotal)}</strong>
            </div>
          ))}
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatNaira(subtotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Lagos delivery estimate</span>
            <strong>{formatNaira(defaultDelivery)}</strong>
          </div>
          <div className="summary-row total">
            <span>Total estimate</span>
            <strong>{formatNaira(subtotal + defaultDelivery)}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}
