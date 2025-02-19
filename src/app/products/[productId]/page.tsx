import base from "@/app/ultils/airtable";
import Link from "next/link";
import Image from "next/image";
import { marked } from "marked";
import { Fragment } from "react";
import { resolveRichText } from "@/app/ultils/product_utils";
import ProductVariantSelection from "@/app/component/pages/products/product-variant-selection";

// ✅ Chỉnh sửa PageProps để params là Promise
interface PageProps {
  params: Promise<{ productId: string }>;
}

// ✅ Cập nhật cách xử lý params
export default async function SingleProduct({ params }: PageProps) {
  const resolvedParams = await params; // ✅ Giải quyết Promise
  const { productId } = resolvedParams;

  if (!productId) {
    return <p>Product ID is missing</p>;
  }

  try {
    const records = await base("products")
      .select({
        filterByFormula: `RECORD_ID() = '${productId}'`,
      })
      .all();

    if (records.length === 0) {
      return <p>Product not found</p>;
    }

    const product = records[0].fields;

    return (
      <div className="container my-6">
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="sticky top-24">
              <ProductImageThumbnails product={product} />
            </div>
          </div>
          <div className="flex-grow flex gap-6">
            <div className="w-1/2 flex-shrink-0">
              <ProductImage product={product} />
            </div>
            <div className="flex-grow">
              {/* ✅ Ép kiểu tránh lỗi */}
              <h1 className="my-4 text-4xl text-center">
                {typeof product.name === "string" ? product.name : "No name available"}
              </h1>
              <ProductVariantSelection product={JSON.stringify(product)} />
              <div
                dangerouslySetInnerHTML={{
                  __html: marked.parse(
                    typeof product.discription === "string" ? resolveRichText(product.discription) : ""
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return <p>Error loading product</p>;
  }
}

// ✅ Hiển thị ảnh nhỏ của sản phẩm
const ProductImageThumbnails = ({ product }: { product: any }) => {
  if (!product?.image || !Array.isArray(product.image)) {
    return <p>No Image Available</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {product.image.map((image: any) => (
        <Link
          href={`#${image.id}`}
          key={image.id}
          className="border p-2 rounded-lg shadow items-center"
        >
          <Image src={image.url} alt={product.name ?? ""} width={150} height={150} quality={75} />
        </Link>
      ))}
    </div>
  );
};

// ✅ Hiển thị ảnh lớn của sản phẩm
const ProductImage = ({ product }: { product: any }) => {
  if (!product?.image || !Array.isArray(product.image)) {
    return <p>No Image Available</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {product.image.map((image: any) => (
        <Fragment key={image.id}>
          <Image
            className="w-full border p-4 rounded-lg shadow items-center"
            src={image.url}
            alt={typeof product.name === "string" ? product.name : ""}
            width={image.width}
            height={image.height}
            quality={75}
            id={image.id}
          />
        </Fragment>
      ))}
    </div>
  );
};
