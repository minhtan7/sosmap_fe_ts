import React from "react";

interface TodayRequestProps {
  todayPosts: {
    todayRequest: [{ _id: string; count: number }];
    yesterdayRequest: [{ _id: string; count: number }];
  };
  type: string;
}

const TodayRequest: React.FC<TodayRequestProps> = (props) => {
  const { todayPosts, type } = props;
  let totalReceivePost;
  let totalSendPost;
  // totalReceivePost = todayPosts.todayRequest.filter(
  //   (request) => request._id === "receive"
  // );

  // totalReceivePost = todayPosts.todayRequest.filter(
  //   (request) => request._id === "send"
  // );
  todayPosts.todayRequest.forEach((request) => {
    if (request._id === "receive") totalReceivePost = request.count;
    if (request._id === "send") totalSendPost = request.count;
  });

  return (
    <div>
      <div className="header">
        <h1 className="title" style={{ fontSize: 23 }}>
          {" "}
          {totalReceivePost !== undefined && type === "send"
            ? totalSendPost
            : totalReceivePost}{" "}
          requests{" "}
        </h1>
      </div>
    </div>
  );
};

export default TodayRequest;
