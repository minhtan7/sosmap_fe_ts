import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const BE_API = process.env.REACT_APP_BACKEND_API;

interface Bar {
  receive: [number];
  send: [number];
}

const BarChartOne = () => {
  const [total, setTotal] = useState<Bar>({
    receive: [1],
    send: [1],
  });

  useEffect(() => {
    const fetchData = async () => {
      let url = `${BE_API}/charts/bar`;

      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setTotal(data.data);
    };
    fetchData();
  }, []);
  console.log(total);
  const data = {
    labels: ["Three weeks ago", "Two weeks ago", "One weeks ago", "Latest"],

    datasets: [
      {
        backgroundColor: `rgba(220, 99, 135, 0.2)`,
        data: total.receive,
        label: "Total Receive",
      },
      {
        backgroundColor: `rgba(255, 99, 132, 1)`,
        data: total.send,
        label: "Total Send",
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
        <h1 className="title">Weekly Tickets Trend</h1>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartOne;
