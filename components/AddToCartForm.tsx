import { Plus } from "lucide-react";
import { addToCartAction } from "@/app/shop-actions";
import { Product } from "@/lib/types";

type AddToCartFormProps = {
  product: Product;
  compact?: boolean;
};

export function AddToCartForm({ product, compact = false }: AddToCartFormProps) {
  return (
    <form className={compact ? "quick-cart-form" : "cart-form"} action={addToCartAction}>
      <input type="hidden" name="productId" value={product.id} />
      <label className="sr-only" htmlFor={`${product.id}-size`}>
        Size
      </label>
      <select id={`${product.id}-size`} name="size" defaultValue={product.sizes[0] ?? "M"} aria-label="Size">
        {product.sizes.map((size) => (
          <option value={size} key={size}>
            {size}
          </option>
        ))}
      </select>
      {!compact ? (
        <input name="quantity" type="number" min="1" defaultValue="1" aria-label="Quantity" />
      ) : (
        <input name="quantity" type="hidden" value="1" />
      )}
      <button className={compact ? "mini-button" : "button"} type="submit" aria-label={`Add ${product.name} to cart`}>
        <Plus size={18} />
        {!compact ? "Add to cart" : null}
      </button>
    </form>
  );
}
