import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { Order, ShippingAddress } from "@/types";

export const metadata: Metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;

  const { id } = params;

  const order = (await getOrderById(id)) as Order | null;
  if (!order) notFound();

  return (
    <OrderDetailsTable
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
      }}
      paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
    />
  );
};

export default OrderDetailsPage;
