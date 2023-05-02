import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { Layout, Card, Row, Col, Space, Dropdown } from "antd";
import { useQuery } from "react-query";
const { Meta } = Card;
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";
import Arrow from "../assets/arrow-down-solid.svg";

export const Home = ({ searchTerm, setSearchTerm }: any) => {
  console.log(searchTerm);

  interface data {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
      id: string;
      name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
  }

  const items: MenuProps["items"] = [
    {
      label: <div onClick={() => sortDataAscending(datas)}>A-Z</div>,
      key: "1",
    },
    {
      label: <div onClick={() => sortDataDescending(datas)}>Z-A</div>,
      key: "0",
    },
  ];

  const { Footer, Content } = Layout;
  const [datas, setDatas] = useState<data[]>([]);

  const apiKey = import.meta.env.VITE_API_KEY;
  const src = "bbc.com";

  const { data: fecthData } = useQuery("dataCache", async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&domains=${src}&apiKey=${apiKey}`);
      return setDatas(response.data.articles);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (fecthData) {
      setDatas(fecthData);
    }
  }, [fecthData]);

  const filteredData = datas.filter((item) => {
    const titleMatch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
    const contentMatch = item.content?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
    const descriptionMatch = item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
    const publishMacth = new Date(item.publishedAt)?.toLocaleDateString().includes(searchTerm.toLowerCase()) ?? false;

    return titleMatch || contentMatch || descriptionMatch || publishMacth;
  });
  const timeFormat = (time: string) => {
    const date = new Date(time);
    const formatter = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      hour12: false,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    const formattedDate = formatter.format(date);
    return formattedDate;
  };

  // const sortDataDescending = (data: data[]) => {
  //   const sortedData = data.slice().sort((a, b) => b.title.localeCompare(a.title));
  //   return setDatas(sortedData);
  // };
  const sortDataDescending = (data: data[]) => {
    const sortedData = data.slice().sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) return 1;
      if (titleA > titleB) return -1;
      return 0;
    });
    setDatas(sortedData);
  };

  const sortDataAscending = (data: data[]) => {
    const sortedData = data.slice().sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA > titleB) return 1;
      if (titleA < titleB) return -1;
      return 0;
    });
    setDatas(sortedData);
  };

  return (
    <>
      <div className="fixed top-0 z-50 w-full">
        <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      </div>
      <Layout>
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <div className="px-36 mt-16 flex justify-end">
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Short By <img src={Arrow} width={"10px"} />
                </Space>
              </a>
            </Dropdown>
          </div>

          <Row justify="center">
            {filteredData
              ? filteredData.map((item) => {
                  return (
                    <Col key={item.publishedAt} sm={{ span: 16 }} md={{ span: 10, offset: 2 }} lg={{ span: 5, offset: 1 }}>
                      <div className="pt-5">
                        <Link to={`${item.url}`}>
                          <Card style={{ width: 300 }} cover={<img alt="example" src={`${item.urlToImage}`} />}>
                            <Meta title={`${item.title}`} description={`${item.description}`} />
                            <div className="pt-3">
                              <p>Publish : {`${timeFormat(item.publishedAt)}`}</p>
                            </div>
                          </Card>
                        </Link>
                      </div>
                    </Col>
                  );
                })
              : datas &&
                datas.map((item) => {
                  return (
                    <Col key={item.publishedAt} sm={{ span: 16 }} md={{ span: 10, offset: 2 }} lg={{ span: 5, offset: 1 }}>
                      <div className="pt-5">
                        <Link to={`${item.url}`}>
                          <Card style={{ width: 300 }} cover={<img alt="example" src={`${item.urlToImage}`} />}>
                            <Meta title={`${item.title}`} description={`${item.description}`} />
                            <div className="pt-3">
                              <p>Publish: {`${timeFormat(item.publishedAt)}`}</p>
                            </div>
                          </Card>
                        </Link>
                      </div>
                    </Col>
                  );
                })}
          </Row>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          News Api ©2023 Created by Achyar Bagus Pambudi
        </Footer>
      </Layout>
    </>
  );
};
