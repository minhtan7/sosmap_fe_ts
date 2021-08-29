import React from "react";
import { Statistic } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
} from "@ant-design/icons";

export type StatisticProps = {
  value: number;
  trend: string;
};

const StatisticStatus: React.FC<StatisticProps> = (props) => {
  const { value, trend } = props;
  return (
    <Statistic
      title={`${trend}`}
      value={value * 100}
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
