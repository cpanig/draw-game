import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const OnlineItem = ({ item }) => (
  <Card hoverable className="online-items">
    {item.name ? (
      <div>占位</div>
    ) : (
      <PlusOutlined
        style={{
          fontSize: 30,
        }}
      />
    )}
  </Card>
);

const ReadyRoom = ({ userList }) => {
  const [onLineList, setOnlineList] = useState([]);

  useEffect(() => {
    let list = [];
    for (let i = 0; i < 8; i++) {
      userList[i]
        ? (list[i] = userList[i])
        : (list[i] = {
            id: i + 1,
            name: "",
            score: 0,
          });
    }
    setOnlineList(list);
  }, [userList]);

  return (
    <>
      <Button type="primary">加入游戏</Button>
      <div className="ready-container">
        {onLineList && onLineList.map((item) => <OnlineItem key={item.id} item={item} />)}
      </div>
    </>
  );
};

export default ReadyRoom;
