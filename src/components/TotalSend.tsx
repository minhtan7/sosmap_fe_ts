interface TodayRequestProps {
  todayPosts: {
    todayRequest: [{ _id: string; count: number }];
    yesterdayRequest: [{ _id: string; count: number }];
  };
}

const TotalSend: React.FC<TodayRequestProps> = (props) => {
  const todayPosts = props.todayPosts;

  let totalReceivePost;
  if (Object.keys(todayPosts).length) {
    totalReceivePost = todayPosts.todayRequest.filter(
      (request) => request._id === "send"
    );
  }
  console.log(totalReceivePost);
  return (
    <div>
      <div className="header">
        <h1 className="title" style={{ fontSize: 23 }}>
          {totalReceivePost !== undefined && totalReceivePost[0]?.count}{" "}
          donations{" "}
        </h1>
      </div>
    </div>
  );
};

export default TotalSend;
