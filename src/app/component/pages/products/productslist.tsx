import base from "@/app/ultils/airtable";
import Link from "next/link";
import Image from "next/image";

// ✅ Nhận prop data từ component cha
export default function ProductsList({ data }: { data: string }) {
  let parsedData;

  try {
    parsedData = JSON.parse(data); // ✅ Chuyển đổi JSON string thành object
  } catch (error) {
    console.error("Error parsing data:", error);
    return <p>Invalid data format</p>;
  }

  // ✅ Kiểm tra dữ liệu trước khi render
  if (!parsedData || !parsedData.records || !Array.isArray(parsedData.records)) {
    return <p>No products available</p>;
  }

  return (
    <div className="items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {parsedData.records.map((record: any) => {
        const product = record.fields;

        return (
          <div key={record.id} className="flex flex-col items-center justify-center border p-4 rounded-lg shadow-lg text-center">
            <Link href={`/products/${record.id}`}>
              {product.image && Array.isArray(product.image) && product.image.length > 0 ? (
                <Image src={product.image[0].url} alt={product.name ?? "Product"} width={300} height={200} />
              ) : (
                <p>No Image Available</p>
              )}
              <h2 className="items-center text-xl font-bold mt-2">{product.name ?? "No name available"}</h2>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
