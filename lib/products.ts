import { promises as fs } from "fs";
import path from "path";
import { Product } from "./types";

const dataPath = path.join(process.cwd(), "data", "products.json");

export async function getProducts(): Promise<Product[]> {
  const file = await fs.readFile(dataPath, "utf8");
  return JSON.parse(file) as Product[];
}

export async function saveProducts(products: Product[]) {
  await fs.writeFile(dataPath, JSON.stringify(products, null, 2));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(value);
}
