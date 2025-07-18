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
  try {
    const response = await fetch(
      `${BASE_API_URL}/Items/GetAllItemIsMoreSales`,
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
        cache: "no-store",
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch main category: ${response.status} - ${errorText}`
      );
    }
    const data = await response.json();
    return data;
  } catch {}
};

export const GetSingleProduct = async (id: string) => {
  const response = await fetch(
    `${BASE_API_URL}/Items/GetItemById?itemId=${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listRelatedObjects: [
          "ViewImgs",
          "NormalImgs",
          "itemSize",
          "itemColor",
          "_3DImgs",
        ],
        paginationInfo: {
          pageIndex: 0,
          pageSize: 0,
        },
      }),
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch product: ${response.status} - ${errorText}`
    );
  }
  const data = await response.json();
  return data;
};
