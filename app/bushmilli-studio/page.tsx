import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { formatNaira, getProducts } from "@/lib/products";
import {
  createProductAction,
  deleteProductAction,
  logoutAction,
  updateProductAction
} from "./actions";

type AdminPageProps = {
  searchParams: Promise<{ success?: string; error?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  if (!(await isAdmin())) {
    redirect("/bushmilli-studio/login");
  }

  const params = await searchParams;
  const products = await getProducts();

  return (
    <main className="admin-shell">
      <nav className="nav" style={{ position: "static" }}>
        <Link className="brand" href="/">
          BushMilli
        </Link>
        <form action={logoutAction}>
          <button className="button" type="submit">
            Logout
          </button>
        </form>
      </nav>

      <section>
        <span className="eyebrow">Admin</span>
        <h1>Products</h1>
      </section>

      {params.success ? <div className="notice">Product changes saved.</div> : null}
      {params.error ? <div className="error">Please check the product details and try again.</div> : null}

      <section className="admin-panel">
        <div className="section-header">
          <h2>Add Product</h2>
        </div>
        <form className="admin-grid" action={createProductAction}>
          <label className="field">
            <span>Name</span>
            <input name="name" required placeholder="BushMilli Graphic Tee" />
          </label>
          <label className="field">
            <span>Price</span>
            <input name="price" required type="number" min="0" placeholder="45000" />
          </label>
          <label className="field">
            <span>Category</span>
            <input name="category" defaultValue="T-Shirts" />
          </label>
          <label className="field">
            <span>Status</span>
            <input name="status" defaultValue="New release" />
          </label>
          <label className="field">
            <span>Sizes</span>
            <input name="sizes" defaultValue="S,M,L,XL" />
          </label>
          <label className="field">
            <span>Image</span>
            <input name="image" type="file" accept="image/*" />
          </label>
          <label className="field full">
            <span>Description</span>
            <textarea name="description" required placeholder="Describe the fit, artwork, and drop." />
          </label>
          <label className="field">
            <span>Featured</span>
            <input name="featured" type="checkbox" />
          </label>
          <button className="button full" type="submit">
            Add product
          </button>
        </form>
      </section>

      <section className="admin-panel">
        <div className="section-header">
          <h2>Manage Products</h2>
        </div>
        <div className="admin-list">
          {products.map((product) => (
            <details className="admin-panel" key={product.id}>
              <summary className="admin-item">
                <Image src={product.image} alt={product.name} width={148} height={148} />
                <span>
                  <strong>{product.name}</strong>
                  <br />
                  {formatNaira(product.price)} - {product.status}
                </span>
                <span>Edit</span>
              </summary>
              <form className="admin-grid" action={updateProductAction}>
                <input type="hidden" name="id" value={product.id} />
                <label className="field">
                  <span>Name</span>
                  <input name="name" defaultValue={product.name} required />
                </label>
                <label className="field">
                  <span>Price</span>
                  <input name="price" defaultValue={product.price} required type="number" min="0" />
                </label>
                <label className="field">
                  <span>Category</span>
                  <input name="category" defaultValue={product.category} />
                </label>
                <label className="field">
                  <span>Status</span>
                  <input name="status" defaultValue={product.status} />
                </label>
                <label className="field">
                  <span>Sizes</span>
                  <input name="sizes" defaultValue={product.sizes.join(",")} />
                </label>
                <label className="field">
                  <span>Replace image</span>
                  <input name="image" type="file" accept="image/*" />
                </label>
                <label className="field full">
                  <span>Description</span>
                  <textarea name="description" defaultValue={product.description} />
                </label>
                <label className="field">
                  <span>Featured</span>
                  <input name="featured" type="checkbox" defaultChecked={product.featured} />
                </label>
                <button className="button full" type="submit">
                  Save product
                </button>
              </form>
              <form action={deleteProductAction}>
                <input type="hidden" name="id" value={product.id} />
                <button className="button danger" type="submit">
                  Delete product
                </button>
              </form>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
