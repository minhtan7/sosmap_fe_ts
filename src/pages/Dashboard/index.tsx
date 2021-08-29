import React, { useState, useEffect } from "react";
import "./SideBar.css";
import "antd/dist/antd.css";
import { Layout, Menu, Row, Col, Card } from "antd";

import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import StatisticStatus from "../../components/StatisticStatus";
import BarChart from "../../components/BarChart";
import Block from "../../components/Block";
import BarChartOne from "../../components/BarChartOne";
import DonutChart from "../../components/DonutChart";

import MostRequestItem from "../../components/MostRequestItem";
import "./SideBar.css";

import TodayRequest from "../../components/TodayRequest";

const { Header, Content, Sider } = Layout;

const BE_API = process.env.REACT_APP_BACKEND_API;

interface TodayPost {
  todaySend: number;
  todayReceive: number;
  yesterdaySend: number;
  yesterdayReceive: number;
}

export const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [posts, setPosts] = useState<TodayPost>({
    todaySend: 1,
    todayReceive: 1,
    yesterdaySend: 1,
    yesterdayReceive: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      let url = `${BE_API}/charts/todayPosts`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setPosts(data.data);
    };
    fetchData();
  }, []);
  console.log(posts);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Overview
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Progress
          </Menu.Item>
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
                  <Block todayPosts={posts} type={"receive"} />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title="Today´s Donations"
                  bordered={false}
                  className="infoCard"
                >
                  <Block todayPosts={posts} type={"send"} />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title="Today´s Most Requested Item"
                  bordered={false}
                  className="infoCard"
                >
                  <MostRequestItem />
                </Card>
              </Col>
            </Row>
          </div>
          <br />
          <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col span={16}>
                <Card>
                  <BarChartOne />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <DonutChart />
                  <br />
                </Card>
              </Col>
            </Row>
          </div>
          <br />
          <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col span={24}>
                <Card>
                  <BarChart />
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
