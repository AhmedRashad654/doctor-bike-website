import { BASE_API_URL } from "@/lib/constants";

export const GetProductsBySubId = async (
  subId: string,
  page: string | string[]
) => {
  const response = await fetch(
    `${BASE_API_URL}/Items/GetAllShowItemsBySupCatId?supCategoryId=${subId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listRelatedObjects: ["ViewImgs"],
        paginationInfo: {
          pageIndex: page,
          pageSize: 10,
        },
      }),
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch product category: ${response.status} - ${errorText}`
    );
  }
  const data = await response.json();
  return data;
};

export const GetProductMoreSales = async (page: string | string[]) => {
  const response = await fetch(`${BASE_API_URL}/Items/GetAllItemIsMoreSales`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      listRelatedObjects: ["ViewImgs"],
      paginationInfo: {
        pageIndex: page,
        pageSize: 10,
      },
    }),
    next: {
      revalidate: 300,
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch main category: ${response.status} - ${errorText}`
    );
  }
  const data = await response.json();
  return data;
};
