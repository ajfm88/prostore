"use client";

import { useToast } from "@/hooks/use-toast";
import { promoDefaultValues } from "@/lib/constants";
import { insertPromoSchema, updatePromoSchema } from "@/lib/validators";
import { Promo } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPromo, updatePromo } from "@/lib/actions/promo.actions";

// Turn a stored date into the value a datetime-local input expects (local time)
const toLocalInput = (value: string | Date) => {
  const date = new Date(value);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
};

const PromoForm = ({
  type,
  promo,
  promoId,
}: {
  type: "Create" | "Update";
  promo?: Promo;
  promoId?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof insertPromoSchema>>({
    resolver: (type === "Update"
      ? zodResolver(updatePromoSchema)
      : zodResolver(insertPromoSchema)) as Resolver<
      z.infer<typeof insertPromoSchema>
    >,
    defaultValues:
      promo && type === "Update"
        ? {
            code: promo.code,
            percentage: promo.percentage,
            count: promo.count,
            minimumOrderValue: String(promo.minimumOrderValue),
            startsAt: toLocalInput(promo.startsAt),
            endsAt: toLocalInput(promo.endsAt),
          }
        : promoDefaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof insertPromoSchema>> = async (
    values,
  ) => {
    // On Create
    if (type === "Create") {
      const res = await createPromo(values);

      if (!res.success) {
        toast({ variant: "destructive", description: res.message });
      } else {
        toast({ description: res.message });
        router.push("/admin/promos");
      }
    }

    // On Update
    if (type === "Update") {
      if (!promoId) {
        router.push("/admin/promos");
        return;
      }

      const res = await updatePromo({ ...values, id: promoId });

      if (!res.success) {
        toast({ variant: "destructive", description: res.message });
      } else {
        toast({ description: res.message });
        router.push("/admin/promos");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="flex flex-col md:flex-row gap-5">
          {/* Code */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. SUMMER10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Percentage */}
          <FormField
            control={form.control}
            name="percentage"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Discount %</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Count */}
          <FormField
            control={form.control}
            name="count"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Remaining redemptions</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Minimum order value */}
          <FormField
            control={form.control}
            name="minimumOrderValue"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Minimum order value</FormLabel>
                <FormControl>
                  <Input placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Starts at */}
          <FormField
            control={form.control}
            name="startsAt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Starts at</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Ends at */}
          <FormField
            control={form.control}
            name="endsAt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Ends at</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 w-full"
          >
            {form.formState.isSubmitting ? "Submitting" : `${type} Promo`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PromoForm;
