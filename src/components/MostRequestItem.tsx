import React from "react";
import { Progress } from "antd";

// const BE_API = process.env.REACT_APP_BACKEND_API;

// interface BarChart {
//   send: [{ _id: string; count: number }];
//   receive: [{ _id: string; count: number }];
// }
interface MostWanted {
  data: { _id: string; biggest: number; name: string; percent: number };
}

const MostRequestIteam: React.FC<MostWanted> = (props) => {
  // const [items, setItems] = useState<BarChart>({
  //   send: [{ _id: "gạo", count: 1 }],
  //   receive: [{ _id: "gạo", count: 1 }],
  // });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let url = `${BE_API}/charts/item`;

  //     const res = await fetch(url);
  //     const data = await res.json();
  //     console.log(data);
  //     setItems(data.data.data[0]);
  //   };
  //   fetchData();
  // }, []);
  // items?.receive?.sort((a, b) => b.count - a.count);
  // const total = items?.receive?.reduce(
  //   (total, current) => total + current.count,
  //   0
  // );
  // let percent;
  // if (total) percent = Math.ceil((items?.receive[0].count / total) * 100);

  return (
    <div>
      <div className="header">
        <p className="title" style={{ fontSize: "14px" }}>
          <span style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}>
            {props.data.name}{" "}
          </span>
          - {props.data.biggest} units requested.
        </p>
      </div>
      <div>
        <Progress percent={props.data.percent * 100} size="small" /> of total
        requests
      </div>
      ,
    </div>
  );
};

export default MostRequestIteam;
