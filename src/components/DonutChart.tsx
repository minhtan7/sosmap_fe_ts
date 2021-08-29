import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

const BE_API = process.env.REACT_APP_BACKEND_API;

interface Donut {
  completed: number;
  pending: number;
}

const DonutChart: React.FC = () => {
  const [donut, setDonut] = useState<Donut>({
    completed: 1,
    pending: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      let url = `${BE_API}/charts/donut`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setDonut(data.data);
    };
    fetchData();
  }, []);

  const data = {
    labels: ["Total Completed Tickets", "Total Pending Tickets"],
    datasets: [
      {
        label: "Ratio of completed/pending tickets",
        data: [donut.completed, donut.pending],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className="header">
        <h1 className="title">Pending vs. Complete Tickets</h1>
        <div className="links"></div>
      </div>
      <Doughnut data={data} />
    </>
  );
};

export default DonutChart;
