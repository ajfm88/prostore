"use client";

import { Button } from "@/components/ui/button";
import { Heart, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toggleWishlist } from "@/lib/actions/wishlist.actions";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";

const WishlistButton = ({
  productId,
  initialIsInWishlist = false,
  className,
}: {
  productId: string;
  initialIsInWishlist?: boolean;
  className?: string;
}) => {
  const { toast } = useToast();
  const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const res = await toggleWishlist(productId);

      if (!res.success) {
        toast({ variant: "destructive", description: res.message });
        return;
      }

      setIsInWishlist(res.isInWishlist);
      toast({ description: res.message });
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      disabled={isPending}
      onClick={handleToggle}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      className={className}
    >
      {isPending ? (
        <Loader className="animate-spin" />
      ) : (
        <Heart className={cn(isInWishlist && "fill-red-500 text-red-500")} />
      )}
    </Button>
  );
};

export default WishlistButton;
