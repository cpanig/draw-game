import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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

const ReadyRoom = ({ userList }) => {
  const [current, setCurrent] = useState(-1); //当前选择的座位
  const [onLineList, setOnlineList] = useState([]); //
  const [showForm, setShowForm] = useState(false);
  const isLeader = false; //是否是房主 ？ 开始游戏 ：准备
  const isAllReady = true; //房主，是否全部准备

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
    // 1 .未加入，则加入到指定位置
    // 2.已加入，换位置，则更改locate
    setCurrent(index);
    setShowForm(true);
  };

  return (
    <div className="ready-room-container">
      {/* 座位 */}
      <div className="ready-container">
        {onLineList &&
          onLineList.map((item, index) => (
            <OnlineItem
              key={index}
              addUser={() => addUser(index)}
              item={item}
            />
          ))}
      </div>
      {/* 按钮 
        * 先不写准备，只有房主有开始按钮，即current === userList[0].id
      
      */}
      {isLeader ? (
        <Button type="primary" disabled={isAllReady}>
          开始游戏
        </Button>
      ) : (
        <Button type="primary">准备</Button>
      )}

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
