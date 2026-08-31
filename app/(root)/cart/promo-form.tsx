"use client";
import { useState, useTransition } from "react";
import { Loader, Tag, X } from "lucide-react";
import { applyPromo, removePromo } from "@/lib/actions/cart.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";

const PromoForm = ({
  promoCode,
  discountPrice,
}: {
  promoCode?: string | null;
  discountPrice: string;
}) => {
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleApply = () => {
    startTransition(async () => {
      const res = await applyPromo(code);
      toast({
        variant: res.success ? "default" : "destructive",
        description: res.message,
      });
      if (res.success) setCode("");
    });
  };

  const handleRemove = () => {
    startTransition(async () => {
      const res = await removePromo();
      toast({
        variant: res.success ? "default" : "destructive",
        description: res.message,
      });
    });
  };

  // A code is already applied — show it with a remove button
  if (promoCode) {
    return (
      <div className="flex items-center justify-between rounded-md border p-3 text-sm">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4" />
          <span className="font-medium">{promoCode}</span>
          {Number(discountPrice) > 0 && (
            <span className="text-muted-foreground">
              (-{formatCurrency(discountPrice)})
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          disabled={isPending}
          onClick={handleRemove}
        >
          {isPending ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <X className="w-4 h-4" />
          )}
        </Button>
      </div>
    );
  }

  // No code yet — show the entry field
  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Promo code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleApply();
          }
        }}
      />
      <Button
        type="button"
        variant="outline"
        disabled={isPending || !code.trim()}
        onClick={handleApply}
      >
        {isPending ? <Loader className="w-4 h-4 animate-spin" /> : "Apply"}
      </Button>
    </div>
  );
};

export default PromoForm;
