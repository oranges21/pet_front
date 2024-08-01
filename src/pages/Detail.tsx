import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { FloatButton, message, Button, Segmented, Tooltip, Input } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  ClockCircleOutlined,
  CommentOutlined,
} from "@ant-design/icons";

import {
  getArticleDetail,
  setCollect,
  getCommend,
  insertCommend,
} from "./../api/article";

const ArticleDetail: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<Record<string, any>>({});
  const [tabType, setTabType] = useState<string>("新评论");
  const [isShowCommand, setisShowCommand] = useState<boolean>(false);
  const [commendValue, setcommendValue] = useState<string>("");
  const [commendList, setCommendList] = useState([]);

  const collectHandle = (type: "1" | "2") => {
    setCollect(type, data.id)
      .then((res) => {
        const newData = JSON.parse(JSON.stringify(data));
        newData.isCollect = !newData.isCollect;
        setData(newData);
        message.success(type === "1" ? "收藏成功" : "取消收藏");
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (id) {
      getArticleDetail(Number(id))
        .then((res) => {
          setData(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    console.log("查看data的值：", data);
    getCommend().then((res: any) => {
      console.log("评论：", res);
      let tempcommendList: any = [];
      res?.forEach((item: any) => {
        if (item?.article_id === data?.id) {
          tempcommendList.push(item);
        }
      });
      setCommendList(tempcommendList);
      console.log(tempcommendList);
      
    });
  }, [data]);

  const submitCommend =  () => {
    var value = localStorage.getItem('__user__');
    value = JSON.parse(value as any)
    const username = (value as any).username
    const account = (value as any).account
     insertCommend({
      article_id: data?.id,
      username: username,
      account: account,
      content: commendValue,
    }).then((res) => {
      getCommend().then((res: any) => {
        console.log("评论：", res);
        let tempcommendList: any = [];
        res?.forEach((item: any) => {
          if (item?.article_id === data?.id) {
            tempcommendList.push(item);
          }
        }
        );
        setCommendList(tempcommendList);
        console.log(tempcommendList);
      });
      message.success("发布成功");
    });
  };

  return (
    <div className="bg-white p-8">
      <div className="text-2xl font-bold pb-2">{data.title}</div>
      <div
        className="mb-8 pb-4 text-gray-400 items-center flex gap-2"
        style={{ borderBottom: "1px dashed #eee" }}
      >
        <ClockCircleOutlined />
        {new Date(data.created_time).toLocaleString()}
      </div>
      <div style={{ wordBreak: "break-word" }}>
        {data.content && parse(data.content)}
      </div>
      {/* <FloatButton
        onClick={() => collectHandle(data.isCollect ? "2" : "1")}
        icon={
          data.isCollect ? (
            <HeartFilled style={{ color: "#ff6868" }} />
          ) : (
            <HeartOutlined style={{ color: "#797979" }} />
          )
        }
      /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <div style={{ marginLeft: "10px" }}>
          <CommentOutlined
            onClick={() => {
              setisShowCommand(!isShowCommand);
            }}
          />
        </div>
        <div onClick={() => collectHandle(data.isCollect ? "2" : "1")}>
          {data.isCollect ? (
            <HeartFilled style={{ color: "#ff6868" }} />
          ) : (
            <HeartOutlined style={{ color: "#797979" }} />
          )}
        </div>
      </div>
      {isShowCommand ? (
        <div style={{ marginLeft: "600px" }}>
          <Segmented
            options={["新评论", "已发布"]}
            onChange={(val) => {
              setTabType(val);
            }}
          ></Segmented>
          {tabType === "新评论" ? (
            <div style={{ width: "300px", marginTop: "10px" }}>
              <Input.TextArea
                value={commendValue}
                onChange={(val) => {
                  console.log("评论val:", val);
                  setcommendValue(val.target.value);
                }}
              ></Input.TextArea>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <Button
                  onClick={() => {
                    setcommendValue("");
                  }}
                >
                  重置
                </Button>
                <Button onClick={submitCommend}>提交</Button>
              </div>
            </div>
          ) : (
            ""
          )}
          {tabType === "已发布" ? (
            <div>
              {commendList?.map((item: any, index) => {
                return (
                  <div style={{ display: "flex", alignContent: "center" }}>
                    <div style={{ flex: 2 }}>
                      {/* <span>评论{index + 1}：</span> */}
                      <span>{item.username}：</span>
                    </div>
                    <div
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        flex: 5,
                        marginLeft: "-7px",
                        width: "50px",
                      }}
                    >
                      <Tooltip title={item?.content} placement="top">
                        <div>{item?.content}</div>
                      </Tooltip>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ArticleDetail;
