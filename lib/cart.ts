import { cookies } from "next/headers";
import { CartItem, Product } from "./types";

const cartCookie = "bushmilli_cart";

export async function getCart(): Promise<CartItem[]> {
  const store = await cookies();
  const rawCart = store.get(cartCookie)?.value;

  if (!rawCart) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawCart) as CartItem[];
    return parsed.filter((item) => item.productId && item.quantity > 0);
  } catch {
    return [];
  }
}

export async function saveCart(items: CartItem[]) {
  const store = await cookies();
  store.set(cartCookie, JSON.stringify(items), {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14
  });
}

export async function clearCart() {
  const store = await cookies();
  store.delete(cartCookie);
}

export function enrichCart(items: CartItem[], products: Product[]) {
  return items
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);

      if (!product) {
        return null;
      }

      return {
        ...item,
        product,
        lineTotal: product.price * item.quantity
      };
    })
    .filter(Boolean) as Array<CartItem & { product: Product; lineTotal: number }>;
}

export function cartSubtotal(lines: Array<{ lineTotal: number }>) {
  return lines.reduce((total, item) => total + item.lineTotal, 0);
}
