import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Tabs,
  message,
  Button,
  Input,
  Form,
  Upload,
  Tag,
  List,
  Pagination,
  type FormProps,
  type GetProp,
  type UploadProps,
} from "antd";
import { logoutHandle, type AuthState } from "../stores/modules/user";
import { useNavigate } from "react-router-dom";
import { getCollectList, setCollect } from "./../api/article";
import { updateInfo } from "./../api/user";
import { upload } from "../api/common";
import { setInfo } from "./../stores/modules/user";

type FieldType = {
  avatar?: string;
  account?: string;
  username?: string;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const beforeUpload = (file: FileType) => {
  console.log(file);
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error("文件大小必须小于5MB");
  }
  return isLt2M;
};

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: AuthState) => (state.user as Record<string, any>).user);

  const [fileList, setFileList] = useState<FileType[]>([]);
  const [userInfo, setUserInfo] = useState({
    avatar: user.avatar,
    account: user.account,
    role: user.role,
    username: user.username,
  });
  const [collectList, setCollectList] = useState<Record<string, any>[]>([]);
  const [total, setTotal] = useState<number>(0);
  const handleChange: UploadProps["onChange"] = (info) => {
    const file = info.file.originFileObj;
    file &&
      upload(file)
        .then((res) => {
          updateInfo({ id: user.id, avatar: res.fileUrl }).then((resp) => {
            let newData = JSON.parse(JSON.stringify(user));
            newData.avatar = res.originUrl;
            console.log(newData);
            dispatch(setInfo({ user: newData }));
            message.success("修改成功");
          });
        })
        .catch((err) => {
          message.error(err.message);
        });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    updateInfo({ id: user.id, username: values.username }).then((res: any) => {
      dispatch(setInfo({ user: res }));
      message.success("修改成功");
    });
  };

  useEffect(() => {
    getCollects(1);
  }, []);

  const getCollects = (page: number, clear?: boolean) => {
    if (clear) {
      return getCollectList(page).then((res) => {
        setCollectList(res);
        setTotal(res.length);
      });
    }
    getCollectList(page).then((res) => {
      setCollectList([...collectList, ...res]);
      setTotal(res.length);
    });
  };

  return (
    <div className="bg-white p-8 rounded-md">
      <Tabs
        defaultActiveKey="1"
        tabPosition={"top"}
        items={[
          {
            label: "个人资料",
            key: "1",
            children: (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 p-4 rounded-md">
                  <div className="border-b-zinc-200 border-b-dashed">
                    <Avatar
                      src={<img src={user.avatar} alt="avatar" />}
                      className="cursor-pointer"
                      style={{ backgroundColor: "#6E48C2" }}
                      size={60}></Avatar>
                  </div>
                  <div>
                    <div className="text-base flex gap-2 items-center">
                      {user.username}
                      {user.roles.map((item: Record<string, any>) => {
                        return <Tag key={item.id}>{item.name}</Tag>;
                      })}
                    </div>
                    <div className="text-base text-gray-500">{user.account}</div>
                  </div>
                </div>
                <div>
                  <Button
                    type="primary"
                    onClick={() => {
                      message.success("已退出", 1.5, () => {
                        dispatch(logoutHandle());
                        navigate("/login");
                      });
                    }}>
                    退出登录
                  </Button>
                </div>
              </div>
            ),
          },
          {
            label: "修改资料",
            key: "2",
            children: (
              <Form
                name="basic"
                layout="horizontal"
                labelAlign="left"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                style={{ maxWidth: 350 }}
                onFinish={onFinish}
                autoComplete="off">
                <Form.Item<FieldType> label="头像" name="avatar">
                  <Upload
                    accept="image/*"
                    fileList={fileList}
                    showUploadList={false}
                    customRequest={() => {}}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}>
                    <Avatar
                      src={<img src={user.avatar} alt="avatar" />}
                      className="cursor-pointer"
                      style={{ backgroundColor: "#6E48C2" }}
                      size={60}></Avatar>
                  </Upload>
                </Form.Item>
                <Form.Item<FieldType> label="用户名" name="username">
                  <Input defaultValue={userInfo.username} />
                </Form.Item>
                <Form.Item<FieldType> label="账号" name="account">
                  <Input disabled defaultValue={userInfo.account} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                </Form.Item>
              </Form>
            ),
          },
          {
            label: "我的收藏",
            key: "3",
            children: (
              <List
                footer={
                  <Pagination
                    defaultCurrent={1}
                    pageSize={10}
                    total={total}
                    onChange={(e) => {
                      setCollectList([]);
                      getCollects(e);
                    }}
                  />
                }
                bordered
                dataSource={collectList}
                renderItem={(item) => (
                  <List.Item>
                    <div className="w-full flex items-center justify-between">
                      <div
                        className="truncate cursor-pointer"
                        onClick={() => {
                          navigate(`/detail/${item.id}`);
                        }}>
                        {item.title}
                      </div>
                      <Button
                        type="link"
                        danger
                        onClick={() => {
                          setCollect("2", item.id)
                            .then((res) => {
                              message.success("已移除");
                              getCollects(1, true);
                            })
                            .catch((err) => {});
                        }}>
                        移除
                      </Button>
                    </div>
                  </List.Item>
                )}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default Profile;
