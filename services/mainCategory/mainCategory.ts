import { BASE_API_URL } from "@/lib/constants";

export const GetMainCategory = async () => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/MainCategorys/GetAllShowMainCategories`,
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
        `Failed to fetch main category: ${response.status} - ${errorText}`
      );
    }
    const data = await response.json();
    return data;
  } catch {}
};
