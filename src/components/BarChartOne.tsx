import React from "react";
import { Bar } from "react-chartjs-2";

interface BarProps {
  data: { receive: [number]; send: [number]; finish: [number] };
}

const BarChartOne: React.FC<BarProps> = (props) => {
  // const [total, setTotal] = useState<Bar>({
  //   receive: [1],
  //   send: [1],
  //   finish: [1],
  // });
  // const [week, setWeek] = useState(4);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let url = `${BE_API}/charts/bar/${week}`;

  //     const res = await fetch(url);
  //     const data = await res.json();
  //     console.log(data);
  //     setTotal(data.data);
  //   };
  //   fetchData();
  // }, []);
  // console.log(total);
  let week = 4;
  let labels = [];
  for (let i = 0; i < week; i++) {
    if (i === week - 1) {
      labels.push("Latest");
    } else {
      labels.push(`${week - i} weeks ago`);
    }
  }
  console.log(labels);
  const data = {
    labels: labels,
    datasets: [
      {
        backgroundColor: `rgba(220, 99, 135, 0.2)`,
        data: props.data.receive,
        label: "Total Receive",
      },
      {
        backgroundColor: `rgba(255, 99, 132, 1)`,
        data: props.data.send,
        label: "Total Send",
      },
      {
        backgroundColor: `rgba(255, 139, 150, 1)`,
        data: props.data.finish,
        label: "Total Finish",
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
