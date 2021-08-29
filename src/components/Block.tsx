import React from "react";
import TodayRequest from "./TodayRequest";
import StatisticStatus from "./StatisticStatus";

interface BlockProps {
  todayPosts: {
    todaySend: number;
    todayReceive: number;
    yesterdaySend: number;
    yesterdayReceive: number;
  };
  type: string;
}

const Block: React.FC<BlockProps> = (props) => {
  const { todayPosts, type } = props;
  console.log(props);
  return (
    <>
      <TodayRequest todayPosts={todayPosts} type={type} />
      <StatisticStatus todayPosts={todayPosts} type={type} />
    </>
  );
};

export default Block;
