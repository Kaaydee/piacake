// 'use client'
// export default function Homepage(props:{
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
// 	data: any
// }){
// 	console.log(JSON.parse(props.data))
// 	return (
// 		<>
// 			Homepage
// 		</>
// 	)
// }

'use client';

import Link from "next/link";

export default function Homepage(props: { data: string }) {
  let parsedData = null;

  try {
    // Cố gắng parse chuỗi JSON nếu có
    parsedData = JSON.parse(props.data);
  } catch (error) {
    console.error("Error parsing data:", error);
  }

  console.log(parsedData); // Kiểm tra dữ liệu sau khi parse
  return (
    <>
      <h1>Đây là trang chủ của cửa hàng </h1>
      <p>Hãy tham khảo các <Link className={'text-indigo-600 underline'} href={'/products'}>sản phẩm</Link> của chúng tôi</p>
    </>
  );
}
