"use client";
import ProductById from "@/modules/productId/ui/productbyid";

import { useParams } from "next/navigation";

export default function ProductByIdPage() {
    const params = useParams();
    const id = params.id as string;
  return (
    <>
        <ProductById id={id as string} />
    </>
  );
}