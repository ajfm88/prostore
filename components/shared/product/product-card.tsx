import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";
import { Product } from "@/types";
import Rating from "./rating";
import WishlistButton from "./wishlist-button";

const ProductCard = ({
  product,
  wishlistIds,
}: {
  product: Product;
  wishlistIds?: string[];
}) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center relative">
        <Link href={`/product/${product.slug}`}>
          <Image
            priority={true}
            src={product.images![0]}
            alt={product.name}
            className="aspect-square object-cover rounded"
            height={300}
            width={300}
          />
        </Link>
        <WishlistButton
          productId={product.id}
          initialIsInWishlist={wishlistIds?.includes(product.id)}
          className="absolute top-2 right-2 bg-background/80 backdrop-blur"
        />
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-sm font-medium">{product.name}</h2>
        </Link>
        <div className="flex-between gap-4">
          <Rating value={Number(product.rating)} />
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className="text-destructive">Out Of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
