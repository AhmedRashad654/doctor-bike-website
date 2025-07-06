import { BASE_API_URL } from "@/lib/constants";

export const GetSubCategoryByMainId = async (mainId: string) => {
  const response = await fetch(
    `${BASE_API_URL}/SupCategorys/GetSupCategoriesByIdMain?MainId=${mainId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      `Failed to fetch sub category: ${response.status} - ${errorText}`
    );
  }
  const data = await response.json();
  return data;
};
