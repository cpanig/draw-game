import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import { getUserList } from "./network/get";

import ReadyRoom from "./views/readyRoom";
import GameRoom from "./views/gameRoom";

const ws = new WebSocket("ws://localhost:8081");
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
  const [commentList, setCommentList] = useState([
    { id: 5, name: "小刚", value: "为什么" },
  ]);

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
  // 根据locate确定座位,如果位置已被占，会停止插入
  const addUser = (newUser) => {
    const playerIdx = userList.findIndex(e => e.id === newUser.id) ?? -1; //防止重复入席
    const isBlock = userList.some(e => e.locate === newUser.locate); //防止入席冲突
    if(isBlock) return;
    if(playerIdx !== -1){
      userList.splice(playerIdx,1);
    }
    
    setUserList([...userList, newUser]);
    
  };

  // 广播评论
  const addComment = (newAnswer) => {
    setCommentList([...commentList, newAnswer]);
  };

  // 换位或者入席
  // 如果在座位上，则换位
  // 如果之前因为座位冲突而没有入席，可以调用此方法再次入席
  const setTrans = (player) =>{
    const isInit = userList.some(e => e.locate = player.locate)
  }

  // 广播事件map
  const boardCastMap = {
    99: addUser,
    300: addComment,
    101: setTrans
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
          <Route
            path="/ready"
            exact
            render={(props) => <ReadyRoom userList={userList} />}
          />
          <Route
            path="/game"
            render={(props) => (
              <GameRoom commentList={commentList} userList={userList} />
            )}
          />

          <Redirect to="/not-found" render={() => <h1>没有页面</h1>} />
        </Switch>
      </websocketStatus.Provider>
    </div>
  );
}

export default App;
