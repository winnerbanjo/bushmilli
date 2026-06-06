"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clearCart, getCart, saveCart } from "@/lib/cart";
import { getOrders, saveOrders, createOrderId } from "@/lib/orders";
import { getProducts } from "@/lib/products";
import { Order, OrderItem } from "@/lib/types";

export async function addToCartAction(formData: FormData) {
  const productId = String(formData.get("productId") ?? "");
  const size = String(formData.get("size") ?? "M");
  const quantity = Math.max(1, Number(formData.get("quantity") ?? 1));
  const cart = await getCart();
  const existing = cart.find((item) => item.productId === productId && item.size === size);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, size, quantity });
  }

  await saveCart(cart);
  revalidatePath("/");
  revalidatePath("/cart");
  redirect("/cart");
}

export async function updateCartAction(formData: FormData) {
  const productId = String(formData.get("productId") ?? "");
  const size = String(formData.get("size") ?? "");
  const quantity = Math.max(0, Number(formData.get("quantity") ?? 0));
  const cart = await getCart();
  const nextCart = cart
    .map((item) => (item.productId === productId && item.size === size ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);

  await saveCart(nextCart);
  revalidatePath("/");
  revalidatePath("/cart");
  redirect("/cart");
}

export async function clearCartAction() {
  await clearCart();
  revalidatePath("/");
  revalidatePath("/cart");
  redirect("/cart");
}

export async function placeOrderAction(formData: FormData) {
  const cart = await getCart();

  if (!cart.length) {
    redirect("/cart?error=empty");
  }

  const products = await getProducts();
  const items = cart
    .map((cartItem): OrderItem | null => {
      const product = products.find((entry) => entry.id === cartItem.productId);

      if (!product) {
        return null;
      }

      return {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        size: cartItem.size,
        name: product.name,
        price: product.price,
        image: product.image
      };
    })
    .filter(Boolean) as OrderItem[];

  if (!items.length) {
    redirect("/cart?error=empty");
  }

  const deliveryMethod = String(formData.get("deliveryMethod") ?? "Lagos delivery") as Order["deliveryMethod"];
  const deliveryFee = deliveryMethod === "Pickup" ? 0 : deliveryMethod === "Lagos delivery" ? 3000 : 6000;
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const order: Order = {
    id: createOrderId(),
    createdAt: new Date().toISOString(),
    status: "Pending payment",
    customer: {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      address: String(formData.get("address") ?? "").trim(),
      city: String(formData.get("city") ?? "").trim(),
      state: String(formData.get("state") ?? "").trim(),
      notes: String(formData.get("notes") ?? "").trim()
    },
    paymentMethod: String(formData.get("paymentMethod") ?? "Bank transfer") as Order["paymentMethod"],
    deliveryMethod,
    items,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee
  };

  if (!order.customer.name || !order.customer.phone || !order.customer.address) {
    redirect("/checkout?error=missing");
  }

  const orders = await getOrders();
  await saveOrders([order, ...orders]);
  await clearCart();
  revalidatePath("/");
  revalidatePath("/cart");
  revalidatePath("/bushmilli-studio");
  redirect(`/order/${order.id}`);
}
