import http from "../utils/http";

export const getCategoryList = (data: {
  page: number;
  limit: number;
}): Promise<{ page: number; limit: number; total: number; list: any[] }> => {
  return http.get("/category/findAll", { params: data });
};
