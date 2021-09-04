import React from "react";
import PieChart from "./PieChart";

import { Row, Col } from "antd";

interface PieProps {
  data: [
    {
      _id: string;
      items: [
        {
          type: string;
          total: number;
        }
      ];
    }
  ];
}

const DonutChart: React.FC<PieProps> = (props) => {
  // const [pies, setPies] = useState<PieType[]>([
  //   {
  //     _id: "Gạo",
  //     items: [
  //       {
  //         type: "send",
  //         total: 36,
  //       },
  //       {
  //         type: "receive",
  //         total: 49,
  //       },
  //     ],
  //   },
  // ]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let url = `${BE_API}/charts/pie`;
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     console.log(data);
  //     setPies(data.data.data);
  //   };
  //   fetchData();
  // }, []);
  // console.log(pies);
  return (
    <>
      <div className="header">
        <h1 className="title">Send vs. Receive</h1>
        <div className="links"></div>
      </div>
      <Row gutter={[36, 48]}>
        {props.data.map((pie) => (
          <>
            <Col span={6} className="pie-content">
              <div>{pie._id}</div>
            </Col>
            <Col span={6}>
              <PieChart pie={pie} />
            </Col>
          </>
        ))}
      </Row>
    </>
  );
};

export default DonutChart;
