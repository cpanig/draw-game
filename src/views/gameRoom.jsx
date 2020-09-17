import React, { useState } from "react";
import { Row, Col } from "antd";

import Canvas from "../components/canvas/canvas";
import Comments from "../components/comments/comments";
import Rank from "../components/rank/rank";

// 开始游戏时，需要做的事
// 1.广播答案（DRAWER）和提示（GUESSER）
// 2.开始计时器，计时器每到达一个时间，增加一个提示词（GUESSER）
// 3.弹出提示框，“由 XXX 作答， 如果是用户自己，则加一个 （你）”

// 4.开始收集答案，如果没答对，正常广播；如果答对了，则广播“XXX答对了！，+X（根据顺序）分”，同时广播新分数
// 5.计时结束，弹窗遮挡整个画面，统计得分，并在读秒完成后，切换到下一轮





const Gameroom = ({user,...props}) => {
  const [current,setCurrent] = useState(0);   // 当前画画的人的ID,开始游戏后由后台发放
  const isDrawer = user.id === current;
  return (
    <>
      <Row justify="space-around">
        <Col xs={{ span: 4 }}>
          <Rank {...props} userId={user.id} current={current} />
        </Col>

        <Col xs={{ span: 13 }}>
          <Canvas isDrawer={isDrawer}  />
        </Col>

        <Col xs={{ span: 6 }}>
          <Comments {...props} userId={user.id} name={user.name} />
        </Col>
      </Row>
    </>
  );
};

export default Gameroom;
