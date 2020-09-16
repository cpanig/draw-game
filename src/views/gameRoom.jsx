import React from "react";
import { Row, Col } from "antd";

import Canvas from "../components/canvas/canvas";
import Comments from "../components/comments/comments";
import Rank from "../components/rank/rank";



// 自己的ID
// 这个ID会在游戏开始时发放给每个用户，用来标识自己在排行榜里的位置
const user = JSON.parse(sessionStorage.getItem('user')) ?? { userId : 2};
// const NAME = "小明";
// 当前画画的人的ID,暂时写死
const current = 2;

const isDrawer = user.userId === current;

const Gameroom = (props) => {
  return (
    <>
      <Row justify="space-around">
        <Col xs={{ span: 6 }}>
          <Rank {...props} userId={user.userId} current={current} />
        </Col>

        <Col xs={{ span: 15 }}>
          <Canvas isDrawer={isDrawer}  />
          <Comments {...props} userId={user.userId} name={user.name} />
        </Col>
      </Row>
    </>
  );
};

export default Gameroom;
