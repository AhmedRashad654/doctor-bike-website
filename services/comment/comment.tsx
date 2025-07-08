import { request } from "@/axios/axios";
import { IComment } from "@/types/product/IProduct";

export const GetCommentForProduct = async (id: string | string[]) => {
  const response = await request.post(
    `/api/Comments/GetAllCommentsToItem?ItemId=${id}`,
    {
      paginationInfo: {
        pageIndex: 0,
        pageSize: 0,
      },
    }
  );
  return response?.data;
};

export const CreateComment = async (dataComment: IComment) => {
  try {
    const response = await request.post(
      `/api/Comments/ManageComment`,
      dataComment
    );
    return response?.data;
  } catch {
    console.log("faild to create comment");
  }
};
