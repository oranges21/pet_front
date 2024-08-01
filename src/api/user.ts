import http from "../utils/http";

export const login = (data: {
  account: string;
  password: string;
}): Promise<{ token: string; user: Record<string, any> }> => {
  return http.post("/user/login", data);
};

export const create = (data: { username: string; account: string; password: string }): Promise<any> => {
  return http.post("/user/register", data);
};

/**
 * 更新用户信息
 */
export const updateInfo = (data: Record<string, any>) => {
  return http.post("/user/update", data);
};
