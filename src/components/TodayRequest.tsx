import React from "react";

interface TodayRequestProps {
  todayPosts: {
    todayRequest: [{ _id: string; count: number }];
    yesterdayRequest: [{ _id: string; count: number }];
  };
}

const TodayRequest: React.FC<TodayRequestProps> = (props) => {
  const todayPosts = props.todayPosts;
  let totalReceivePost;
  totalReceivePost = todayPosts.todayRequest.filter(
    (request) => request._id === "receive"
  );
  console.log(totalReceivePost);
  return (
    <div>
      <div className="header">
        <h1 className="title" style={{ fontSize: 23 }}>
          {" "}
          {totalReceivePost !== undefined && totalReceivePost[0]?.count}{" "}
          requests{" "}
        </h1>
      </div>
    </div>
  );
};

export default TodayRequest;
