import React, { useEffect, useState,useRef } from "react";
import { Card, Form, Input, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const OnlineItem = ({ item, addUser }) => {
  return (
    <>
      <Card onClick={addUser} hoverable className="online-items">
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
    </>
  );
};

const ReadyRoom = ({ userList }) => {
  const formRef = useRef();
  const [onLineList, setOnlineList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const isLeader = false; //是否是房主 ？ 开始游戏 ：准备
  const isAllReady = true; //房主，是否全部准备

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

  const addUser = (index) =>{
    console.log(index)
    setShowForm(true)
  }

  // 获取用户输入的名称
  const joinInGame = (index) => {
    const { username } = formRef.current.getFieldValue();
    console.log(username)
  };


  return (
    <div className="ready-room-container">

      {/* 座位 */}
      <div className="ready-container">
        {onLineList &&
          onLineList.map((item, index) => (
            <OnlineItem key={item.id} addUser={() => addUser(index)} item={item}  />
          ))}
      </div>
      {/* 按钮 */}
      {isLeader ? (
        <Button type="primary" disabled={isAllReady}>
          开始游戏
        </Button>
      ) : (
        <Button type="primary">准备</Button>
      )}
      

      {/* 对话框 */}
      <Modal 
        title="输入昵称" 
        okText="确定"
        cancelText="取消"
        visible={showForm} 
        onOk={() => joinInGame()} 
        onCancel={() => setShowForm(false)}
        >
        <Form ref={formRef}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input   />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ReadyRoom;
