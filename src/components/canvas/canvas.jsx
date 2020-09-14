import React, { useEffect, useRef, useState } from "react";
import "./canvas.css";
// import Tips from "../tips/tips";
import Tool from "./tool/tool";


const toolMap = new Map();


const Canvas = () => {
  const canvas = useRef();
  const [ctx,setCtx] = useState(null);
  

  const [current, setCurrent] = useState(1);
  const [isPress, setIsPress] = useState(false);
  toolMap.set(1,() =>{ ctx.strokeStyle = '#000000'; ctx.lineWidth = 5; })
  toolMap.set(2,() =>{ 
  })

  useEffect(() => {
    const context = canvas.current.getContext("2d")
    canvas.current.onmousedown = (e) => handleMouseDown(e);
    canvas.current.onmousemove = (e) => handleMouseMove(e);
    canvas.current.onmouseup = (e) => handleMouseUp(e);
    canvas.current.onmouseleave = () => setIsPress(false);  
    context.lineWidth = 1;
    setCtx(context);
  });


  // 按下鼠标
  const handleMouseDown = (e) => {
    let xy = getPosition(e);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.imageSmoothingEnabled = true;
    
    const options =  toolMap.get(current);
    options();
    // if(current === 2) {
    //   ctx.strokeRect(xy.posX,xy.posY,100,100);
    // }

    ctx.beginPath();
    ctx.moveTo(xy.posX, xy.poxY);
    setIsPress(true);
  };

  // 移动鼠标 绘画
  
  const handleMouseMove = (e) => {
    e.preventDefault();
    if(!isPress) return;
    let xy = getPosition(e);
    if(current === 2){
      ctx.clearRect(xy.posX,xy.posY,100,100)
    }


    if(current === 1){
      ctx.lineTo(xy.posX,xy.posY);
    }
    

		ctx.stroke();
  };

  // 松开鼠标
  const handleMouseUp = (e) => {
    e.preventDefault();
    if(!isPress) return;
    setIsPress(false);

  };

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



  return (
    <div className={`${"canvas-container"} ${"global-border"}`}>
      {/* <Tips /> */}
      <Tool currentTool={current} setCurrent={setCurrent}  />
      <canvas ref={canvas} width="750" height="500" />
    </div>
  );
};

export default Canvas;
