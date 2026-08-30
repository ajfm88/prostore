import { Metadata } from "next";
import ProductList from "@/components/shared/product/product-list";
import { getMyWishlist } from "@/lib/actions/wishlist.actions";

export const metadata: Metadata = {
  title: "My Wishlist",
};

export default async function WishlistPage() {
  const products = await getMyWishlist();
  // Everything shown here is saved, so every heart starts filled
  const wishlistIds = products.map((product) => product.id);

  return (
    <ProductList data={products} title="My Wishlist" wishlistIds={wishlistIds} />
  );
}
