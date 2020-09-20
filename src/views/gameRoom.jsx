import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "antd";
// import { websocketStatus } from "../App";

import ModelTips from "../components/modelTips/modelTips";
import Canvas from "../components/canvas/canvas";
import Comments from "../components/comments/comments";
import Rank from "../components/rank/rank";

// 开始游戏时，需要做的事
// 1.广播答案（DRAWER）和提示（GUESSER）
// 2.弹出提示框，“由 XXX 作答， 如果是用户自己，则加一个 （你）”
// 3.此h时先遮罩，计时5秒后开始游戏
// 4.开始计时器，计时器每到达一个时间，增加一个提示词（GUESSER）

// 4.开始收集答案，如果没答对，正常广播；如果答对了，则广播“XXX答对了！，+X（根据顺序）分”，同时广播新分数
// 5.计时结束，弹窗遮挡整个画面，统计得分，并在读秒完成后，切换到下一轮

// 6.一轮结束后（）

const Gameroom = ({ user, userList, ...props }) => {
  // const ws = useContext(websocketStatus);
  const [current, setCurrent] = useState(-1); // 当前画画的人的ID,开始游戏后由后台发放
  const [rankList,setRankList] = useState([]);
  const isDrawer = user.id === current;

  useEffect(() =>{
    const list = [...userList];
    setRankList(list.sort((a,b) =>{
      return a.locate > b.locate ? 1 : -1
    }))
  },[userList])

  useEffect(() =>{
   !!rankList.length &&  setCurrent(rankList[0].id)
  },[rankList])

  // const boardCastMap = {};

  // //监听服务器信息
  // ws.onmessage = function (event) {
  //   const { code, data } = JSON.parse(event.data);
  //   const boardHandle = boardCastMap[code];
  //   boardHandle && boardHandle(data);
  // };

  return (
    <>
      <Row justify="space-around">
        <Col xs={{ span: 4 }}>
          <Rank {...props} user={user} userList={rankList} current={current} />
        </Col>

        <Col xs={{ span: 13 }}>
          <Canvas isDrawer={isDrawer} current={current} />
        </Col>

        <Col xs={{ span: 6 }}>
          <Comments isDrawer={isDrawer} userList={userList} {...props} user={user} />
        </Col>
      </Row>

      {current !== -1 && (
        <ModelTips
          user={user}
          {...props}
          userList={rankList}
          current={current}
          setCurrent={setCurrent}
          isDrawer={isDrawer}
        />
      )}
    </>
  );
};

export default Gameroom;
