import React, { useEffect, useState, useContext } from "react";
import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { websocketStatus } from "../App";
import AddUser from "../components/addUser/addUser";

// 座位
const OnlineItem = ({ item, addUser }) => {
  return (
    <>
      <Card hoverable className="online-items">
        {item.id ? (
          <div>
            <img src={item.avatar} alt="" />
            <p style={{ textAlign: "center" }}>{item.name}</p>
          </div>
        ) : (
          <PlusOutlined
            onClick={addUser}
            style={{
              fontSize: 30,
            }}
          />
        )}
      </Card>
    </>
  );
};

const ReadyRoom = ({ userList, user }) => {
  const ws = useContext(websocketStatus);
  const [current, setCurrent] = useState(-1); //当前选择的座位
  const [onLineList, setOnlineList] = useState([]); //已在坐席中的数组
  const [showForm, setShowForm] = useState(false);
  // const isLeader = userList[0].id === user.id; //userlist[0]为房主
  const isLeader = true;
  useEffect(() => {
    let list = [];
    for (let i = 0; i < 8; i++) {
      list.push({});
    }
    // 根据locate分到对应位置
    userList.map((item) => (list[item.locate - 1] = item));
    setOnlineList(list);
  }, [userList]);

  const addUser = (index) => {
    // 两种情况：
    // 1.未注册，则先注册，再广播到指定位置
    // 2.已注册，换位置，则直接广播
    // 3.我设计了一个退出座位按钮，这时已注册，但是locate为-1
    // const user = sessionStorage.getItem("user");
    if (!user) {
      setCurrent(index);
      setShowForm(true);
    } else {
      ws.send(JSON.stringify({ code: 99, data: user }));
    }
  };

  const startGame = () =>{
    if(userList.length < 2) return;
    ws.send(JSON.stringify({ code : 250 }))
  }

  return (
    <div className="ready-room-container">
      {/* 座位 */}
      <div className="ready-container">
        {onLineList &&
          onLineList.map((item, index) => <OnlineItem key={index} addUser={() => addUser(index)} item={item} />)}
      </div>
      {/* 按钮 
        * 先不写准备，只有房主有开始按钮，即current === userList[0].id
      
      */}
      {isLeader && <Button type="primary" onClick={startGame} >开始游戏</Button>}
      {/* 对话框 */}
      <AddUser
        current={current}
        setOnlineList={setOnlineList}
        onLineList={onLineList}
        showForm={showForm}
        setShowForm={setShowForm}
      />
    </div>
  );
};

export default ReadyRoom;
