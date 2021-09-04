import React, { useState, useEffect } from "react";
import "./SideBar.css";
import "antd/dist/antd.css";
import { Layout, Menu, Row, Col, Card } from "antd";
import tickets from "../../data/territorytree.json";

import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import PieChartGroup from "../../components/PieChartGroup";

import Block from "../../components/Block";
import BarChartOne from "../../components/BarChartOne";

import { Post } from "../../typs";
import MostRequestItem from "../../components/MostRequestItem";
import "./SideBar.css";
import { allDataType } from "../../typs";
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const BE_API = process.env.REACT_APP_BACKEND_API;

export const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [allData, setAllData] = useState<allDataType>({
    allData: {
      todayPosts: {
        todaySend: 1,
        todayReceive: 1,
        yesterdaySend: 1,
        yesterdayReceive: 1,
      },
      pies: [
        {
          _id: "Hành Tỏi Ớt",
          items: [
            {
              type: "receive",
              total: 5,
            },
          ],
        },
      ],
      mostWanted: {
        _id: "send",
        name: "Bao tay",
        biggest: 44,
        percent: 0.1,
      },
      barChart: {
        receive: [0],
        send: [0],
        finish: [0],
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      let url = `${BE_API}/charts/all/hochiminh/quan-5`;
      const res = await fetch(url);
      const data = await res.json();
      setAllData(data.data);
    };
    fetchData();
  }, []);

  const handleOnClick = ({
    province,
    district,
  }: {
    province: string;
    district: string;
  }) => {
    const fetchData = async () => {
      let url = `${BE_API}/charts/all/${province.toLowerCase()}/${district}`;
      const res = await fetch(url);
      const data = await res.json();
      setAllData(data.data);
    };
    fetchData();
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <SubMenu key="sub1" icon={<TeamOutlined />} title="Tổ chức">
            {tickets?.map((ticket) => (
              <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                <SubMenu
                  key={`${ticket.province.slug}`}
                  icon={<UserOutlined />}
                  title={`${ticket.province.name}: ${ticket.province.totalTicket}`}
                >
                  {ticket.districts.map((district) => (
                    <Menu.Item
                      key={`${district.slug}`}
                      onClick={() =>
                        handleOnClick({
                          province: ticket.province.slug,
                          district: district.slug,
                        })
                      }
                    >{`${district.name}: ${district.totalTicket}`}</Menu.Item>
                  ))}
                </SubMenu>
              </Menu>
            ))}
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "#edf0f5" }}
        />
        <Content style={{ margin: "0 16px" }}>
          <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col span={8}>
                <Card
                  title="Today´s Requests"
                  bordered={false}
                  className="infoCard"
                >
                  <Block
                    todayPosts={allData.allData.todayPosts}
                    type={"receive"}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title="Today´s Donations"
                  bordered={false}
                  className="infoCard"
                >
                  <Block
                    todayPosts={allData.allData.todayPosts}
                    type={"send"}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title="Today´s Most Requested Item"
                  bordered={false}
                  className="infoCard"
                >
                  <MostRequestItem data={allData.allData.mostWanted} />
                </Card>
              </Col>
            </Row>
          </div>
          <br />
          <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col span={24}>
                <Card>
                  <BarChartOne data={allData.allData.barChart} />
                </Card>
              </Col>
              {/* <Col span={8}>
                <Card>
                  <DonutChart />
                  <br />
                </Card>
              </Col> */}
            </Row>
          </div>
          <br />

          <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col span={24}>
                <Card>
                  <PieChartGroup data={allData.allData.pies} />
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
