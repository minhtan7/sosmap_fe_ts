import React from "react";

interface TodayRequestProps {
  todayPosts: {
    todaySend: number;
    todayReceive: number;
    yesterdaySend: number;
    yesterdayReceive: number;
  };
  type: string;
}

const TodayRequest: React.FC<TodayRequestProps> = (props) => {
  const { todayPosts, type } = props;

  return (
    <div>
      <div className="header">
        <h1 className="title" style={{ fontSize: 23 }}>
          {" "}
          {type === "send"
            ? todayPosts.todaySend
            : todayPosts.todayReceive}{" "}
          requests{" "}
        </h1>
      </div>
    </div>
  );
};

export default TodayRequest;
