import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { Modal, message, Progress } from "antd";
import { websocketStatus } from "../../App";
import "./modelTips.css";

// 该组件用于展示一些提示，同时禁止玩家进行操作
// 顺序： 轮到谁 -》  计时（LOAD） -》 战绩（second）
const ModelTips = ({ isDrawer, current, setCurrent, user, userList }) => {
  const history = useHistory();
  const ws = useContext(websocketStatus);
  const [visible, setVisible] = useState(false);
  const [answer, setAnswer] = useState("呼啦圈");
  const [second, setSecond] = useState(0); //战绩排行
  const [load, setLoad] = useState(0); //轮到谁画
  const [userTips, setUserTips] = useState(5);

  // 计时开始，防止重复计时
  const setLoadBegin = () => {
    console.log(load);
    load === 0 && setLoad(5);
  };

  // 当前回合结束,防止重复计时
  const setRoundOver = () => {
    second === 0 && setSecond(5);
  };

  const setGameOver = () => {
    history.replace('/')
  };

  const setLastPlayer = (PlayerIndex) => {
    if (userList[PlayerIndex + 1].id === current) return; //防止因为延时而重复切换DRAWER
    setCurrent(userList[PlayerIndex + 1].id);
    setUserTips(5);
  };

  const boardCastMap = {
    500: setLastPlayer,
    550: setLoadBegin,
    600: setRoundOver,
    650: setGameOver,
  };

  //监听服务器信息
  ws.onmessage = function (event) {
    const { code, data } = JSON.parse(event.data);
    const boardHandle = boardCastMap[code];
    boardHandle && boardHandle(data);
  };

  // 轮到 XX 作画
  useEffect(() => {
    if (userTips === 0) return;
    const timer = setInterval(() => {
      if (userTips === 1) {
        clearInterval(timer);
        // setLoad(5);
        ws.send(JSON.stringify({ code: 550 }));
      } else setUserTips((pretime) => pretime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [userTips,ws]);

  // 计时
  useEffect(() => {
    if (load === 0) return;
    const timer = setInterval(() => {
      setLoad((preLoad) => preLoad - 1);
      if (load === 1) {
        setVisible(true);
        // setSecond(5);
        ws.send(JSON.stringify({ code: 600 }));
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [load,ws]);

  // 正确答案
  // 此时将作画权交给下一位
  // 如果已经是最后一位，则结束游戏，同时展示总分，并回到准备房间
  useEffect(() => {
    if (second === 0) return;
    const timer = setInterval(() => {
      if (second === 1) {
        setSecond(0);
        clearInterval(timer);
        const PlayerIndex = userList.findIndex((e) => e.id === current);
        const isLastPlayer = PlayerIndex === userList.length - 1;
        if (isLastPlayer) {
          // return history.replace("/");
          return ws.send(JSON.stringify({ code: 650 }));
        }
        // setCurrent(userList[PlayerIndex + 1].id);
        // setUserTips(5);
        ws.send(JSON.stringify({ code: 500, data: PlayerIndex }));

        setVisible(false);
      } else
        setSecond((pretime) => {
          return pretime - 1;
        });
    }, 1000);
    return () => clearInterval(timer);
  }, [second,ws,current,userList]);

  useEffect(() => {
    const hide = message.info({
      content: answer,
      duration: 0,
      style: {
        position: "absolute",
        left: "44%",
      },
      // icon: 'none'
    });

    return () => hide();
  }, [answer]);

  return (
    <>
      {load === 0 && (
        <div className="user-tips">
          <h2>
            轮到 {userList.find((e) => e.id === current)?.name}
            {isDrawer && "(你)"} 作画
          </h2>
          <h1>{userTips}</h1>
        </div>
      )}
      <Progress format={(percent) => ""} percent={(load / 5) * 100 - 0.1} />
      <Modal visible={visible} destroyOnClose={true} closable={false} footer={null}>
        <h1 style={{ textAlign: "center" }}>正确答案 ： {answer}</h1>
        <h2 style={{ textAlign: "center" }}>{second}</h2>
      </Modal>
    </>
  );
};

export default ModelTips;
