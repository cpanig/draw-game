import React, { useRef, useEffect, useState, useContext } from "react";
import { Form, Input, Button, Modal, Popover, Image } from "antd";
import { websocketStatus } from "../../App";
import { getAvatarList } from "../../network/get";
import { register } from "../../network/post";
const AddUser = ({ current, showForm, setShowForm }) => {
  const ws = useContext(websocketStatus);
  const formRef = useRef();
  const [avatar, setAvatar] = useState("");
  const [list, setList] = useState([]);

  // 获取头像列表
  useEffect(() => {
    async function getList() {
      setList(await getAvatarList());
    }
    getList();
  }, []);

  const selectAvatar = (avatar) => setAvatar(avatar);

  //头像展示区
  const avatarList = () => (
    <div className="">
      {list &&
        list
          .slice(0, 10)
          .map((avatar, index) => (
            <Image
              onClick={() => selectAvatar(avatar.img)}
              preview={false}
              key={index}
              width={40}
              src={avatar.img}
            />
          ))}
    </div>
  );

  // 获取用户输入的名称
  //应该先通过接口提交个人信息，再进行广播
  const joinInGame =async () => {
    const { username } = formRef.current.getFieldValue();
    if(!username || !avatar ) return;
    const newPlayer = {
      locate: current + 1, //当前所选的位置
      name: username,
      avatar,
      score: 0,
    };
    try {
      // const res = await joinInGame(newPlayer);
      // console.log(res);
      // ws.send(JSON.stringify({ code: 99, data: newPlayer }));
      // setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        maskClosable={false}
        title="输入昵称"
        okText="确定"
        cancelText="取消"
        visible={showForm}
        onOk={() => register()}
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
            <Input />
          </Form.Item>
        </Form>
        <Popover placement="rightTop" content={avatarList} trigger="focus">
          {avatar && (
            <Image preview={false} alt="awesome" width={60} src={avatar} />
          )}
          <Button type="primary">选择头像</Button>
        </Popover>
      </Modal>
    </>
  );
};

export default AddUser;
