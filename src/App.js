import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import { getUserList } from "./network/get";

import ReadyRoom from "./views/readyRoom";
import GameRoom from "./views/gameRoom";

const ws = new WebSocket("ws://192.168.0.123:8081");
ws.onopen = function () {
  //验证是否达成连接
  ws.send(JSON.stringify({ code: 0, data: "are you ok ?" }));
};

export const websocketStatus = React.createContext();

function App() {
  // 玩家列表
  // 第一个进入这个数组里的为房主
  // 在开始游戏之后，先进行一次降序排列，得出正确的排位信息
  const [userList, setUserList] = useState([]);
  // 评论列表
  const [commentList, setCommentList] = useState([]);

  // 进入该页面后，先获取一个在线玩家列表
  useEffect(() => {
    const getUser = async () => {
      try {
        const list = await getUserList();
        setUserList(list);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  // 广播玩家列表
  // 根据locate确定座位
  const addUser = (newUser) => {
    setUserList([...userList, newUser]);
  };

  // 广播评论
  const addComment = (newAnswer) => {
    setCommentList([...commentList, newAnswer]);
  };

  // 广播事件map
  const boardCastMap = {
    99: addUser,
    300: addComment,
  };

  //监听服务器信息
  ws.onmessage = function (event) {
    console.log(JSON.parse(event.data));
    const { code, data } = JSON.parse(event.data);
    const boardHandle = boardCastMap[code];
    boardHandle && boardHandle(data);
  };

  return (
    <div className="App">
      <websocketStatus.Provider value={ws}>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => <ReadyRoom userList={userList} />}
          />
          <Route
            path="/game"
            render={(props) => (
              <GameRoom
                commentList={commentList}
                userList={userList}
              />
            )}
          />
          <Redirect to="/not-found" render={() => <h1>没有页面</h1>} />
        </Switch>
      </websocketStatus.Provider>
    </div>
  );
}

export default App;
