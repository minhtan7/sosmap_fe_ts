import React from "react";
import { Statistic } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
} from "@ant-design/icons";

export type StatisticProps = {
  todayPosts: {
    todaySend: number;
    todayReceive: number;
    yesterdaySend: number;
    yesterdayReceive: number;
  };
  type: string;
};

const StatisticStatus: React.FC<StatisticProps> = (props) => {
  const { todayPosts, type } = props;
  const {
    todaySend,
    todayReceive,
    yesterdaySend,
    yesterdayReceive,
  } = todayPosts;

  let percent: number = 1;
  let trend: string = "equal";

  if (type === "send") {
    if (todaySend === yesterdaySend) {
      trend = "equal";
    } else if (todaySend > yesterdaySend) {
      percent = todaySend / yesterdaySend - 1;
      trend = "increase";
    } else {
      percent = 1 - todaySend / yesterdaySend;
      trend = "decrease";
    }
  } else {
    if (todayReceive === yesterdayReceive) {
      trend = "equal";
    } else if (todayReceive > yesterdayReceive) {
      percent = todayReceive / yesterdayReceive - 1;
      trend = "increase";
    } else {
      percent = 1 - todayReceive / yesterdayReceive;
      trend = "decrease";
    }
  }

  return (
    <Statistic
      title={`${trend}`}
      value={percent * 100}
      precision={2}
      valueStyle={
        trend === "increase"
          ? { color: "#3f8600" }
          : trend === "decrease"
          ? { color: "#cf1322" }
          : { color: "#3f8600" }
      }
      prefix={
        trend === "increase" ? (
          <ArrowUpOutlined />
        ) : trend === "decrease" ? (
          <ArrowDownOutlined />
        ) : (
          <MinusOutlined />
        )
      }
      suffix="%"
    />
  );
};
export default StatisticStatus;
