import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router";
import { Route, Switch, Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import { getUserList } from "./network/get";

import ReadyRoom from "./views/readyRoom";
import GameRoom from "./views/gameRoom";
import Test from './views/test';

const ws = new WebSocket("ws://localhost:8081");
ws.onopen = function () {
  //验证是否达成连接
  ws.send(JSON.stringify({ code: 0, data: "are you ok ?" }));
};

export const websocketStatus = React.createContext();

function App() {
  const history = useHistory();
  const [userList, setUserList] = useState([]);
  const user = JSON.parse(
    sessionStorage.getItem("user") === "undefined"
      ? null
      : sessionStorage.getItem("user")
  );
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
  // 根据数据库返回的ID决定谁是房主（或者在数组的位置，索引0为房主）
  const addUser = (newUser) => {
    const isBlock = userList.some((e) => e.locate === newUser.locate); //所选座位是否已经被占
    const playerIndex = userList.findIndex((e) => e.id === newUser.id) ?? -1;

    if (isBlock) return;
    if (playerIndex !== -1) {
      userList.splice(playerIndex, 1, newUser); //不要改变数组原来的位置
      setUserList([...userList]);
    } else {
      setUserList([...userList, newUser]);
    }
  };

  // 开始游戏
  const startGame = () => {
    history.push("/game");
  };

  // 广播事件map
  const boardCastMap = {
    99: addUser,
    250: startGame,
  };

  //监听服务器信息
  ws.onmessage = function (event) {
    const { code, data } = JSON.parse(event.data);
    const boardHandle = boardCastMap[code];
    boardHandle && boardHandle(data);
  };

  return (
    <div className="App">
      <websocketStatus.Provider value={ws}>
        <Switch>
          <Route path="/" exact component={Test}  />
          {/* <Route
            path="/"
            exact
            render={(props) => <ReadyRoom user={user} userList={userList} />}
          />
          <Route
            path="/game"
            render={(props) => (
              <GameRoom
                user={user}
                userList={userList}
                setUserList={setUserList}
              />
            )}
          /> */}

          <Redirect to="/not-found" render={() => <h1>没有页面</h1>} />
        </Switch>
      </websocketStatus.Provider>
    </div>
  );
}

export default App;
