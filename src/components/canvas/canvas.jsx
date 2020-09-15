import React, { useEffect, useRef, useState, useReducer } from "react";
import "./canvas.css";
// import Tips from "../tips/tips";
import Tool from "./tool/tool";


const toolMap = new Map();
const ws = new WebSocket("ws://192.168.0.123:8081");

const Canvas = () => {
  const canvas = useRef();
  const [ctx, setCtx] = useState(null);
  const [current, setCurrent] = useState(1); //当前工具
  const [isPress, setIsPress] = useState(false);



  ws.onopen = function () {
    //验证是否达成连接
    ws.send(JSON.stringify({ code: 0, data: "画板" }));
  };

  // 重置原点
  const initOrigin = () => {
    ctx.beginPath();
  };

  // 画画
  const setDraw = (pos) => {
    if (current === 2) {
      ctx.clearRect(pos.x, pos.y, 100, 100);
    }
    if (current === 1) {
      ctx.lineTo(pos.x, pos.y);
    }
    ctx.stroke();
  };

  // 广播切换
  const setTools = (toolId) =>{
    setCurrent(toolId)
  }

  const boardCastMap = {
    350: initOrigin,
    400: setDraw,
    450: setTools
  };

  // 切换工具
  const switchTools = (id) =>{
    ws.send(JSON.stringify({code : 450 ,data : id }))
  }

  //监听服务器信息
  ws.onmessage = function (event) {
    const { code, data } = JSON.parse(event.data);
    const boardHandle = boardCastMap[code];
    boardHandle && boardHandle(data);
  };

  // 工具效果
  toolMap.set(1, () => {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
  });
  toolMap.set(2, () => {});

  useEffect(() => {
    const context = canvas.current.getContext("2d");

    canvas.current.onmousedown = (e) => handleMouseDown(e);
    canvas.current.onmousemove = (e) => handleMouseMove(e);
    canvas.current.onmouseup = (e) => handleMouseUp(e);
    canvas.current.onmouseleave = (e) => handleMouseLeave(e);
    context.lineWidth = 1;

    setCtx(context);
  });

  // 按下鼠标
  const handleMouseDown = (e) => {
    let xy = getPosition(e);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.imageSmoothingEnabled = true;
    setIsPress(true);
  };

  // 移动鼠标 绘画

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (!isPress) return;
    let xy = getPosition(e);

    ws.send(JSON.stringify({ code: 400, data: { x: xy.posX, y: xy.posY } }));
  };

  // 松开鼠标
  const handleMouseUp = (e) => {
    e.preventDefault();
    if (!isPress) return;
    ws.send(JSON.stringify({ code: 350 }));
    setIsPress(false);
  };

  const handleMouseLeave = (e) =>{
    e.preventDefault();
    setIsPress(false);
    ws.send(JSON.stringify({ code: 350 }));
  }

  const getPosition = (e) => {
    //获得在画布移动时的位置
    let posX, posY;
    if (e.type.indexOf("Touch") >= 0) {
      //touch事件的获取方法
      posX = e.touches[0].pageX;
      posY = e.touches[0].pageY;
    } else {
      //鼠标事件的获取方法
      posX = e.offsetX + e.target.offsetLeft;
      posY = e.offsetY + e.target.offsetTop;
    }
    //返回位置对象
    return {
      posX: posX,
      posY: posY,
    };
  };

  const saveCanvas = (x, y) => {
    return ctx.getImageData(0, 0, 750, 500);
  };

  return (
    <div className={`${"canvas-container"} ${"global-border"}`}>
      {/* <Tips /> */}
      <Tool currentTool={current} setCurrent={switchTools} />
      <canvas ref={canvas} width="750" height="500" />
    </div>
  );
};

export default Canvas;
