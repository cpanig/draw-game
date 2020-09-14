import React, { useEffect, useState } from "react";
import { Route,Switch,Redirect } from 'react-router-dom';
import "antd/dist/antd.css";
import "./App.css";
import { getUserList } from "./network/get";

import ReadyRoom from './views/readyRoom'
import GameRoom from './views/gameRoom'

const ws = new WebSocket("ws://192.168.1.107:8081");
ws.onopen = function () {
  //验证是否达成连接
  ws.send(JSON.stringify({ code: 0, test: "are you ok ?" }));
};
export const websocket = React.createContext();
export const statusContext = React.createContext();


// 需要广播的事件
const addUser = (newUser,list,set) => {
  set([...list, newUser]);
};

const boardCastMap = {
  99: addUser,
};

function App() {
  // 玩家列表
  const [userList, setUserList] = useState([]);

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
    // getUser();
  }, []);

  // //监听服务器信息
  ws.onmessage = function (event) {
    const { code, data } = JSON.parse(event.data);
    const boardHandle = boardCastMap[code];
    boardHandle(data,userList,setUserList);
  };

  // 加入游戏
  const joinInGame = async () => {
    // 如果本地有ID，则将本地ID发给后台
    // 如果本地没有ID，则由后台创建一个ID，并加入游戏
    // const user = localStorage.getItem("user");
    // if (!user) {
    //   ws.send(JSON.stringify({ code: 99 }));
    // }
  };

  return (
    <div className="App">
      <statusContext.Provider>
        <websocket.Provider value={ws}>
          <Switch>
            <Route path="/" exact render={(props) => <ReadyRoom userList={userList} /> } />
            <Route path="/game" render={(props) => <GameRoom userList={userList} /> }  />
            <Redirect to="/not-found" render={() => <h1>没有页面</h1>} />
          </Switch>
        </websocket.Provider>
      </statusContext.Provider>
    </div>
  );
}

export default App;
