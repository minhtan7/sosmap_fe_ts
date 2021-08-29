import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Progress } from "antd";

// import { getTodayPost } from "../../redux/actions/barChart.actions";

interface Chart {
  send: [{ _id: string; count: number }];
  receive: [{ _id: string; count: number }];
}

export const Dashboard = () => {
  const [itemChart, setItemChart] = useState<Chart>();

  useEffect(() => {
    const fetchData = async () => {
      let url = `http://localhost:5000/charts/todayPosts`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setItemChart(data.data);
    };
    fetchData();
  }, []);
  console.log(itemChart);
  // const MostRequestItem = "fdf";
  // const MostWanna = "dd";
  itemChart?.receive?.sort(
    (a: { count: number }, b: { count: number }) => b.count - a.count
  );
  const total = itemChart?.receive?.reduce(
    (total: number, current: { count: number }) => total + current.count,
    0
  );
  console.log(total);
  let percent;
  if (total && itemChart !== undefined && itemChart.receive !== undefined)
    percent = Math.ceil((itemChart?.receive[0].count / total) * 100);
  console.log(percent);
  return (
    <div>
      <div className="header">
        <p className="title">
          <span style={{ color: "red", fontSize: "20px" }}>
            {itemChart?.receive !== undefined && itemChart?.receive[0]._id}{" "}
          </span>
          - {itemChart?.receive !== undefined && itemChart?.receive[0].count}{" "}
          units requested.
        </p>
      </div>
      <div>
        <Progress percent={percent} size="small" /> of total requests
      </div>
    </div>
  );
};
