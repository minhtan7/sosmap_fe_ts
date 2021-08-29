import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Progress } from "antd";

import { Store } from "../../redux/types";
import { getTodayPost } from "../../redux/actions/barChart.actions";

export const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodayPost());
  }, [dispatch]);

  const itemChart = useSelector((state: Store) => state.barchart.itemChart);

  const MostRequestItem = "fdf";
  const MostWanna = "dd";
  itemChart?.receive?.sort(
    (a: { count: number }, b: { count: number }) => b.count - a.count
  );
  const total = itemChart?.receive.reduce(
    (total: number, current: { count: number }) => total + current.count,
    0
  );
  console.log(total);
  let percent;
  if (total) percent = Math.ceil((itemChart?.receive[0].count / total) * 100);
  console.log(percent);
  return (
    <div>
      <div className="header">
        <p className="title">
          <span style={{ color: "red", fontSize: "20px", fontWeight: " bold" }}>
            {Object.keys(itemChart).length && itemChart.receive[0]._id}{" "}
          </span>
          - {Object.keys(itemChart).length && itemChart.receive[0].count} units
          requested.
        </p>
      </div>
      <div>
        <Progress percent={percent} size="small" /> of total requests
      </div>
      ,
    </div>
  );
};
