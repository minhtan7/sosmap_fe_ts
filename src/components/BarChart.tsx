import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const BE_API = process.env.REACT_APP_BACKEND_API;

interface BarChart {
  send: [{ _id: string; count: number }];
  receive: [{ _id: string; count: number }];
}

const BarChart: React.FC = () => {
  const [items, setItems] = useState<BarChart>({
    send: [{ _id: "gạo", count: 1 }],
    receive: [{ _id: "gạo", count: 1 }],
  });

  useEffect(() => {
    const fetchData = async () => {
      let url = `${BE_API}/charts/item`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setItems(data.data.data[0]);
    };
    fetchData();
  }, []);
  console.log(items);
  let labels: any = [];
  let totalSend: any = [];
  let totalReceive: any = [];
  let data;

  items.receive?.forEach((r) => {
    labels.push(r._id);
    totalReceive.push(r.count);
  });
  totalSend = items.send?.map((s) => s.count);

  data = {
    labels: labels,
    datasets: [
      {
        backgroundColor: `rgba(2, 99, 135, 1)`,
        data: totalSend,
        label: "Total Donated  ",
      },
      {
        backgroundColor: `rgba(210, 99, 132, 1)`,
        data: totalReceive,
        label: "Total Requested",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <div className="header">
        <h1 className="title">Goods requested vs. Goods donated</h1>
      </div>
      {Object.keys(items).length === 0 ? (
        <h1>loading</h1>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default BarChart;
