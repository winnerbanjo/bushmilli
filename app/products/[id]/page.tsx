import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartForm } from "@/components/AddToCartForm";
import { formatNaira, getProducts } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find((entry) => entry.id === id);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} | BushMilli`,
    description: product.description
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find((entry) => entry.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="product-shell">
      <nav className="policy-nav">
        <Link className="brand" href="/">
          BushMilli
        </Link>
        <Link className="button" href="/cart">
          Cart
        </Link>
      </nav>

      <section className="product-detail">
        <div className="product-gallery">
          {(product.gallery.length ? product.gallery : [product.image]).map((image) => (
            <Image src={image} alt={product.name} width={900} height={1100} key={image} />
          ))}
        </div>
        <div className="product-buybox">
          <span className="eyebrow">{product.status}</span>
          <h1>{product.name}</h1>
          <strong className="detail-price">{formatNaira(product.price)}</strong>
          <p>{product.description}</p>
          <AddToCartForm product={product} />
          <div className="product-meta">
            <span>Category: {product.category}</span>
            <span>Sizes: {product.sizes.join(", ")}</span>
            <span>Checkout supports bank transfer, Lagos delivery, nationwide delivery, and pickup.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
