import React, { useState, useEffect } from "react";
import { Select, Card, Row, Col, Button, Input, Space, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { getArticleList } from "../api/article";
import { getCategoryList } from "../api/category";
import type { SearchProps } from "antd/es/input/Search";

import banner3 from "./../assets/images/banner/3.jpg";

const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Record<string, any>[]>([]);
  const [page, setPage] = useState<number>(1);
  const limit = 6;
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [category, setCategory] = useState<Record<string, any>[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [categoryValue, setCategoryValue] = useState<string>("");

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    searchHandle(value, categoryValue);
  };

  useEffect(() => {
    getArticles();
    getCategory();
    return () => {};
  }, []);

  const getCategory = () => {
    getCategoryList({ page: 1, limit: 99999 })
      .then((res) => {
        setCategory(res.list);
      })
      .catch((err) => {});
  };

  const getArticles = (keyword?: string, categorys?: string) => {
    setLoading(true);
    getArticleList({ page: page, limit: limit, keyword: keyword, category: categorys })
      .then((res) => {
        setArticles([...articles, ...res.list]);
        setTotal(res.total);
        setPage(page + 1);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const searchHandle = (keyword?: string, categorys?: string) => {
    setLoading(true);
    getArticleList({ page: 1, limit: limit, keyword: keyword, category: categorys })
      .then((res) => {
        setArticles(res.list);
        setTotal(res.total);
        setPage(2);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const onChange = (value: string) => {
    value = value == "0" ? "" : value;
    setCategoryValue(value);
    searchHandle(keyword, value);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="sticky top-[12px] z-20">
        <Space.Compact>
          <Select
            style={{ minWidth: "100px" }}
            defaultValue="0"
            onChange={(e) => {
              onChange(e);
            }}>
            <Option value="0">全部</Option>
            {category.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
          <Search
            placeholder="快速搜索"
            allowClear
            size="middle"
            style={{ width: `${searchFocus ? "350" : "300"}px`, transition: "all ease 0.3s" }}
            enterButton={"搜索"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setKeyword(e.target.value);
            }}
            onSearch={onSearch}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
          />
        </Space.Compact>
      </div>
      <Row className="w-full" gutter={[16, 16]}>
        {articles.length > 0 ? (
          articles.map((item) => {
            return (
              <Col span={8} key={item.id}>
                <Card
                  className="border-none overflow-hidden"
                  style={{ cursor: "pointer" }}
                  hoverable
                  cover={
                    <div
                      className="w-full h-[200px] bg-center"
                      style={{ backgroundImage: `url(${item.poster})`, backgroundSize: "100%" }}></div>
                  }
                  onClick={() => {
                    navigate(`/detail/${item.id}`);
                  }}>
                  <Meta title={item.title} description={item.brief} />
                </Card>
              </Col>
            );
          })
        ) : (
          <div className="w-full flex-1 flex justify-center items-center p-8">
            <Empty />
          </div>
        )}
      </Row>

      {articles.length < total ? (
        <div className="loadmore">
          <Button
            type="primary"
            ghost
            loading={loading}
            onClick={() => {
              getArticles();
            }}>
            {loading ? "正在加载" : "加载更多"}
          </Button>
        </div>
      ) : (
        <div className="text-gray-400 text-sm py-4">到底啦</div>
      )}
    </div>
  );
};

export default Home;
