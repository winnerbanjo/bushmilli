import Image from "next/image";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { StoreFooter } from "@/components/StoreFooter";
import { StoreHeader } from "@/components/StoreHeader";
import { getOrder } from "@/lib/orders";
import { formatNaira } from "@/lib/products";
import { site } from "@/lib/site";

type OrderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(
    `Hello BushMilli, I just placed order ${order.id}. My name is ${order.customer.name}.`
  );

  return (
    <>
      <StoreHeader />
      <main className="checkout-shell">
      <section className="confirmation">
        <span className="eyebrow">Order received</span>
        <h1>{order.id}</h1>
        <p>
          Thanks, {order.customer.name}. Your order is saved as {order.status}. Send payment proof
          on WhatsApp so BushMilli can confirm and dispatch.
        </p>
        <a
          className="button acid"
          href={`https://wa.me/${site.whatsappInternational}?text=${whatsappMessage}`}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={17} />
          Send proof on WhatsApp
        </a>
      </section>

      <section className="order-receipt">
        <h2>Receipt</h2>
        {order.items.map((item) => (
          <div className="summary-product" key={`${item.productId}-${item.size}`}>
            <Image src={item.image} alt={item.name} width={64} height={80} />
            <span>
              {item.name}
              <br />
              Size {item.size} x {item.quantity}
            </span>
            <strong>{formatNaira(item.price * item.quantity)}</strong>
          </div>
        ))}
        <div className="summary-row">
          <span>Subtotal</span>
          <strong>{formatNaira(order.subtotal)}</strong>
        </div>
        <div className="summary-row">
          <span>Delivery</span>
          <strong>{formatNaira(order.deliveryFee)}</strong>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <strong>{formatNaira(order.total)}</strong>
        </div>
      </section>
      </main>
      <StoreFooter />
    </>
  );
}
