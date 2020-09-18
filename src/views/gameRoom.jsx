import React, { useState } from "react";
import { Row, Col } from "antd";

import Canvas from "../components/canvas/canvas";
import Comments from "../components/comments/comments";
import Rank from "../components/rank/rank";


// 自己的ID
// 这个ID会在游戏开始时发放给每个用户，用来标识自己在排行榜里的位置
const user = sessionStorage.getItem('user') ?? { id : 2 };



const Gameroom = (props) => {
  const [current,setCurrent] = useState(2);   // 当前画画的人的ID
  const isDrawer = user.id === current;
  return (
    <>
      <Row justify="space-around">
        <Col xs={{ span: 6 }}>
          <Rank {...props} userId={user.id} current={current} />
        </Col>

        <Col xs={{ span: 15 }}>
          <Canvas isDrawer={isDrawer}  />
          <Comments {...props} userId={user.id} name={user.name} />
        </Col>
      </Row>
    </>
  );
};

export default Gameroom;
