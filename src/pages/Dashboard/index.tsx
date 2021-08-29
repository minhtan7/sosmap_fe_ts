import React, { useState, useEffect } from "react";
import "./SideBar.css";
import "antd/dist/antd.css";
import { Layout, Menu, Row, Col, Card } from "antd";

import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import StatisticStatus from "../../components/StatisticStatus";
import BarChart from "../../components/BarChart";
import BarChartOne from "../../components/BarChartOne";
import DonutChart from "../../components/DonutChart";

import MostRequestItem from "../../components/MostRequestItem";
import "./SideBar.css";

import TodayRequest from "../../components/TodayRequest";

const { Header, Content, Sider } = Layout;

const BE_API = process.env.REACT_APP_BACKEND_API;

interface TodayPost {
  todayRequest: [{ _id: string; count: number }];
  yesterdayRequest: [{ _id: string; count: number }];
}

export const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [todayPosts, setTodayPosts] = useState<TodayPost>({
    todayRequest: [{ _id: "gạo", count: 2 }],
    yesterdayRequest: [{ _id: "gạo", count: 2 }],
  });

  useEffect(() => {
    const fetchData = async () => {
      let url = `${BE_API}/charts/todayPosts`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setTodayPosts(data.data);
    };
    fetchData();
  }, []);
  console.log(todayPosts);
  let sendPercentage: { percent?: number; trend?: string } = {
    percent: 0,
    trend: "equal",
  };
  let receivePercentage: { percent: number; trend: string } = {
    percent: 0,
    trend: "equal",
  };

  let tSend: number = 1;
  let ySend: number = 1;
  let tReceive: number = 1;
  let yReceive: number = 1;

  todayPosts.todayRequest.forEach((today) => {
    tSend = today._id === "send" ? today.count : 1;
    tReceive = today._id === "receive" ? today.count : 1;
  });

  todayPosts.yesterdayRequest.forEach((yesterday) => {
    ySend = yesterday._id === "send" ? yesterday.count : 1;
    yReceive = yesterday._id === "receive" ? yesterday.count : 1;
  });

  //COMMENT what this code do?
  sendPercentage.percent = tSend / ySend;
  if (sendPercentage.percent > 1) {
    sendPercentage.percent = sendPercentage.percent - 1;
    sendPercentage.trend = "increase";
  } else if (sendPercentage.percent < 1) {
    sendPercentage.trend = "descrease";
  } else {
    sendPercentage.trend = "equal";
  }

  //COMMENT what this code do?
  receivePercentage.percent = tReceive / yReceive;
  if (receivePercentage.percent > 1) {
    receivePercentage.percent = receivePercentage.percent - 1;
    receivePercentage.trend = "increase";
  } else if (receivePercentage.percent < 1) {
    receivePercentage.trend = "descrease";
  } else {
    receivePercentage.trend = "equal";
  }

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
                  <TodayRequest todayPosts={todayPosts} type={"receive"} />
                  {receivePercentage !== undefined ? (
                    <StatisticStatus
                      value={receivePercentage.percent}
                      trend={receivePercentage.trend}
                    />
                  ) : (
                    <h1>Loading</h1>
                  )}
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title="Today´s Donations"
                  bordered={false}
                  className="infoCard"
                >
                  <TodayRequest todayPosts={todayPosts} type={"send"} />

                  {sendPercentage !== undefined ? (
                    <StatisticStatus
                      value={sendPercentage.percent}
                      trend={sendPercentage.trend}
                    />
                  ) : (
                    <h1>Loading</h1>
                  )}
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
