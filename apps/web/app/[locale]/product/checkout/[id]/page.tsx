"use client";

import { getProduct } from "@app/actions/product";
import Button from "@app/components/Button";
import Loading from "@app/components/Loading";
import useJwt from "@app/hooks/useJwt";
import { capitalizeWords } from "@app/utils/text";
import { useQuery } from "@tanstack/react-query";

type Props = {
  params: {
    id: string;
  };
};

export default function CheckoutProductPage({ params: { id } }: Props) {
  // Hooks
  const jwt = useJwt();
  // Queries
  const { data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id, jwt as string),
    enabled: Boolean(jwt),
  });

  if (!product) return <Loading />;

  return (
    <form
      action={`/product/checkout/${id}/payment`}
      method="POST"
      className="w-full flex-auto p-6 flex flex-col gap-6"
    >
      <h2 className="text-3xl font-bold">
        Order <span className="text-primary-1">#{product.id}</span>
      </h2>
      <div className="bg-black border-primary-1 border-2 text-white rounded-md p-6">
        <h3 className="text-2xl font-bold">Product details</h3>
        <div className="w-full flex flex-row gap-5 flex-wrap justify-center items-center py-5">
          <ProductDetail label="Type:" value={product.type} />
          <ProductDetail label="Width:" value={product.patchWidth} />
          <ProductDetail label="Height:" value={product.patchHeight} />
          <ProductDetail label="Quantity:" value={product.quantity} />
          <ProductDetail
            label="Backing Type:"
            value={capitalizeWords(product.backingType as string)}
          />
          {product.type === "text" ? (
            <>
              <ProductDetail label="Text:" value={product.text} />
              <ProductDetail
                label="Border Color:"
                value={product.borderColor}
              />
              <ProductDetail label="Text Color:" value={product.textColor} />
              <ProductDetail
                label="Background Color:"
                value={product.backgroundColor}
              />
            </>
          ) : undefined}
          <ProductDetail label="Price:" value={product.price + "€"} />
        </div>
      </div>
      <Button className="bg-primary-1 text-black">Pay</Button>
      <input hidden name="jwt" value={jwt || undefined} />
    </form>
  );
}

export type ProductDetailProps = {
  label: string;
  value?: string | number;
};

function ProductDetail({ label, value }: ProductDetailProps) {
  return (
    <div className="flex items-center justify-center gap-2 bg-white p-3 rounded-md text-black">
      <strong>{label}</strong>
      <p className="text-primary-1 font-semibold">{value}</p>
    </div>
  );
}
