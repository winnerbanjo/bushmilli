export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  gallery: string[];
  description: string;
  status: string;
  sizes: string[];
  featured: boolean;
};

export type CartItem = {
  productId: string;
  quantity: number;
  size: string;
};

export type OrderItem = CartItem & {
  name: string;
  price: number;
  image: string;
};

export type Order = {
  id: string;
  createdAt: string;
  status: "Pending payment" | "Paid" | "Processing" | "Dispatched" | "Completed" | "Cancelled";
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    notes: string;
  };
  paymentMethod: "Bank transfer" | "Pay on delivery";
  deliveryMethod: "Lagos delivery" | "Nationwide delivery" | "Pickup";
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
};
