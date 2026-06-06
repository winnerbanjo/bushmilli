import { promises as fs } from "fs";
import path from "path";
import { Order } from "./types";

const ordersPath = path.join(process.cwd(), "data", "orders.json");

export async function getOrders(): Promise<Order[]> {
  const file = await fs.readFile(ordersPath, "utf8");
  return JSON.parse(file) as Order[];
}

export async function saveOrders(orders: Order[]) {
  await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));
}

export async function getOrder(id: string) {
  const orders = await getOrders();
  return orders.find((order) => order.id === id);
}

export function createOrderId() {
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `BM-${Date.now().toString().slice(-6)}-${suffix}`;
}
