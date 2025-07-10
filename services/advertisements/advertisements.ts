import { BASE_API_URL } from "@/lib/constants";

export const GetAdvertisments = async () => {
  const response = await fetch(
    `${BASE_API_URL}/OnlineAds/GetAllAds?StatusShow=Show`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
      next: {
        revalidate: 300,
      },
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch  advertisments : ${response.status} - ${errorText}`
    );
  }
  const data = await response.json();
  return data;
};
