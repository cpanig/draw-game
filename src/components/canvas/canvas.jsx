import React, { useEffect, useRef, useState,useContext } from "react";
import "./canvas.css";
import { websocketStatus } from "../../App";
import Tool from "./tool/tool";

const Canvas = ({ isDrawer,current: currentDrawer }) => {
  const ws = useContext(websocketStatus);
  const canvas = useRef();
  const [ctx, setCtx] = useState(null);
  const [current, setCurrent] = useState(1); //当前工具
  const [isPress, setIsPress] = useState(false);





  // 重置原点
  const initOrigin = () => {
    ctx.beginPath();
  };

  // 画画
  const setDraw = (pos) => {

    switch(current){
      case 1 : ctx.lineTo(pos.x, pos.y); break;
      case 2 : return ctx.clearRect(pos.x, pos.y, 100, 100);
      default: break;
    }

    ctx.stroke();
  };

  // 切换工具
  const setTools = (toolId) => {
    setCurrent(toolId);
  };

  // 广播事件列表
  const boardCastMap = {
    350: initOrigin,
    400: setDraw,
    450: setTools,
  };

  // 切换工具
  const switchTools = (id) => {
    ws.send(JSON.stringify({ code: 450, data: id }));
  };

  //监听服务器信息
  ws.onmessage = function (event) {  
    // console.log(event.data)                                           
    const { code, data } = JSON.parse(event.data);
    const boardHandle = boardCastMap[code];
    boardHandle && boardHandle(data);
  };

  useEffect(() => {
    const context = canvas.current.getContext("2d");
    canvas.current.onmousedown = (e) => handleMouseDown(e);
    canvas.current.onmousemove = (e) => handleMouseMove(e);
    canvas.current.onmouseup = (e) => handleMouseUp(e);
    canvas.current.onmouseleave = (e) => handleMouseLeave(e);
    context.lineWidth = 1;
    context.lineCap = "round";
    context.lineJoin = "round";
    setCtx(context);
  } );


    // 当current改变时，清空画板
    // useEffect(() =>{
    //   ctx.clearRect(0,0,750,500)
    // },[currentDrawer])

  // 按下鼠标
  // 只有画的人可以触发事件，其他人只能看
  const handleMouseDown = (e) => {
    e.preventDefault();
    if (!isDrawer) return;
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

  // 鼠标离开画板
  const handleMouseLeave = (e) => {
    e.preventDefault();
    if (!isPress) return;
    setIsPress(false);
    ws.send(JSON.stringify({ code: 350 }));
  };

  //获得在画布移动时的位置
  const getPosition = (e) => {
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

  return (
    <div className={`${"canvas-container"}`}>
      {isDrawer && <Tool currentTool={current} setCurrent={switchTools} />}
      <canvas ref={canvas} width="750" height="500" />
    </div>
  );
};

export default Canvas;
