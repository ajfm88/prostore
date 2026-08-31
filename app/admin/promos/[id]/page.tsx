import PromoForm from "@/components/admin/promo-form";
import { getPromoById } from "@/lib/actions/promo.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth-guard";
import { Promo } from "@/types";

export const metadata: Metadata = {
  title: "Update Promo",
};

const AdminPromoUpdatePage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  await requireAdmin();

  const { id } = await props.params;

  const promo = await getPromoById(id);

  if (!promo) return notFound();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h1 className="h2-bold">Update Promo</h1>

      <PromoForm
        type="Update"
        promo={promo as unknown as Promo}
        promoId={promo.id}
      />
    </div>
  );
};

export default AdminPromoUpdatePage;
