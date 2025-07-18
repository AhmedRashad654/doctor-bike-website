import { request } from "@/axios/axios";
import { IOrder } from "@/types/order/IOrder";

export const CheckOnDiscountCodeApi = async (code: string, userId: string) => {
  try {
    const response = await request.post(
      `/DiscoundCodes/GetByDiscoundCode?code=${code}&userid=${userId}`
    );
    return response;
  } catch {
    console.log("error on check code discount");
  }
};

export const CreateOrderApi = async (order: IOrder) => {
  try {
    const response = await request.post(`/Orders/ManageOrder`, order);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const GetMyOrdersByStatus = async (
  status: string,
  userId: string,
  page: string | number
) => {
  try {
    const response = await request.post(
      `/Orders/GetAllOrdersByUserId?statusOrder=${status}&userId=${userId}`,
      {
        listRelatedObjects: ["OrderDetails", "items"],
        paginationInfo: {
          pageIndex: page,
          pageSize: 10,
        },
      }
    );
    return response;
  } catch {
    console.log("error on get order user");
  }
};

export const EditOnStatusOrder = async (newData: unknown) => {
  try {
    const response = await request.post(`/Orders/ManageOrder`, newData);
    console.log(response);
    return response;
  } catch {
    console.log("error on edit status order");
    return null;
  }
};
