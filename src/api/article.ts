import http from "../utils/http";

export const getArticleList = (data: {
  page?: number;
  limit?: number;
  keyword?: string;
  category?: string;
}): Promise<{ page: number; limit: number; total: number; list: any[] }> => {
  return http.get("/article/findAll", { params: data });
};

export const getArticleDetail = (id: number): Promise<any> => {
  return http.get("/article/find", { params: { id } });
};

export const setCollect = (type: "1" | "2", article_id: number): Promise<any> => {
  return http.post("/user/setCollect", { type, article_id });
};

export const getCollectList = (page?: number, limit?: number): Promise<any> => {
  return http.get("/user/getCollect", { params: { page, limit } });
};

export const getCommend = () => {
  return http.get('/article/getCommend')
}

export const insertCommend = (data: any) => {
  // console.log(data);
  return http.post('/article/insertCommend',data)
}
