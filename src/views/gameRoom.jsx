import React from "react";
import { Row, Col } from "antd";

import Canvas from "../components/canvas/canvas";
import Comments from "../components/comments/comments";
import Rank from "../components/rank/rank";



// 自己的ID
// 这个ID会在游戏开始时发放给每个用户，用来标识自己在排行榜里的位置
const ID = 1;
const NAME = "小明";
// 当前画画的人的ID
const CURRENT = 1;

// 身份
// const isDrawer = ID === CURRENT;


const Gameroom = ({userList}) => {
  return (
    <>
      <Row justify="space-around">
        <Col xs={{ span: 6 }}>
          <Rank userList={userList} ID={ID} current={CURRENT} />
        </Col>

        <Col xs={{ span: 15 }}>
          <Canvas />
          <Comments userId={ID} name={NAME} />
        </Col>
      </Row>
    </>
  );
};

export default Gameroom;
