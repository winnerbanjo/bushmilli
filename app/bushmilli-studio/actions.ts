"use server";

import { promises as fs } from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clearAdminCookie, isAdmin, setAdminCookie, validateAdmin } from "@/lib/auth";
import { getOrders, saveOrders } from "@/lib/orders";
import { getProducts, saveProducts, slugify } from "@/lib/products";
import { Order, Product } from "@/lib/types";

export type LoginState = {
  error: string;
};

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!validateAdmin(email, password)) {
    return { error: "Invalid admin email or password." };
  }

  await setAdminCookie();
  redirect("/bushmilli-studio");
}

export async function logoutAction() {
  await clearAdminCookie();
  redirect("/bushmilli-studio/login");
}

async function saveUploadedImage(file: File | null) {
  if (!file || file.size === 0) {
    return "";
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const extension = path.extname(file.name) || ".jpg";
  const fileName = `${Date.now()}-${slugify(file.name.replace(extension, ""))}${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, fileName), bytes);

  return `/uploads/${fileName}`;
}

function parseProduct(formData: FormData, imagePath: string, existing?: Product): Product {
  const name = String(formData.get("name") ?? "").trim();
  const id = String(formData.get("id") ?? "") || slugify(name);
  const sizes = String(formData.get("sizes") ?? "S,M,L,XL")
    .split(",")
    .map((size) => size.trim())
    .filter(Boolean);

  return {
    id,
    name,
    price: Number(formData.get("price") ?? 0),
    category: String(formData.get("category") ?? "T-Shirts"),
    image: imagePath || existing?.image || "/images/bushmilli-black-front.jpeg",
    gallery: imagePath
      ? [imagePath, ...(existing?.gallery ?? []).filter((item) => item !== imagePath)]
      : existing?.gallery ?? [],
    description: String(formData.get("description") ?? ""),
    status: String(formData.get("status") ?? "New release"),
    sizes,
    featured: formData.get("featured") === "on"
  };
}

export async function createProductAction(formData: FormData) {
  if (!(await isAdmin())) {
    redirect("/bushmilli-studio/login");
  }

  const imagePath = await saveUploadedImage(formData.get("image") as File | null);
  const products = await getProducts();
  const product = parseProduct(formData, imagePath);

  if (!product.name || !product.price) {
    redirect("/bushmilli-studio?error=missing-product-fields");
  }

  await saveProducts([product, ...products.filter((item) => item.id !== product.id)]);
  revalidatePath("/");
  revalidatePath("/bushmilli-studio");
  redirect("/bushmilli-studio?success=created");
}

export async function updateProductAction(formData: FormData) {
  if (!(await isAdmin())) {
    redirect("/bushmilli-studio/login");
  }

  const products = await getProducts();
  const id = String(formData.get("id") ?? "");
  const existing = products.find((product) => product.id === id);

  if (!existing) {
    redirect("/bushmilli-studio?error=missing-product");
  }

  const imagePath = await saveUploadedImage(formData.get("image") as File | null);
  const updated = parseProduct(formData, imagePath, existing);
  await saveProducts(products.map((product) => (product.id === id ? updated : product)));
  revalidatePath("/");
  revalidatePath("/bushmilli-studio");
  redirect("/bushmilli-studio?success=updated");
}

export async function deleteProductAction(formData: FormData) {
  if (!(await isAdmin())) {
    redirect("/bushmilli-studio/login");
  }

  const id = String(formData.get("id") ?? "");
  const products = await getProducts();
  await saveProducts(products.filter((product) => product.id !== id));
  revalidatePath("/");
  revalidatePath("/bushmilli-studio");
  redirect("/bushmilli-studio?success=deleted");
}

export async function updateOrderStatusAction(formData: FormData) {
  if (!(await isAdmin())) {
    redirect("/bushmilli-studio/login");
  }

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "Pending payment") as Order["status"];
  const orders = await getOrders();

  await saveOrders(orders.map((order) => (order.id === id ? { ...order, status } : order)));
  revalidatePath("/bushmilli-studio");
  redirect("/bushmilli-studio?success=order-updated");
}
