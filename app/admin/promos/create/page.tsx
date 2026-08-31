import { Metadata } from "next";
import PromoForm from "@/components/admin/promo-form";
import { requireAdmin } from "@/lib/auth-guard";

export const metadata: Metadata = {
  title: "Create Promo",
};

const CreatePromoPage = async () => {
  await requireAdmin();
  return (
    <>
      <h2 className="h2-bold">Create Promo</h2>
      <div className="my-8">
        <PromoForm type="Create" />
      </div>
    </>
  );
};

export default CreatePromoPage;
