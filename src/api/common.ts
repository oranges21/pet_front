import type { UploadFile } from "antd";
import http from "../utils/http";

export const upload = (file: UploadFile): Promise<any> => {
  return http.post(
    "/article/upload",
    { file: file },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
