import React, { useEffect } from "react";
import { Modal, Button } from "antd";

const ModelTips = () => {
  // let secondsToGo = 5;
  //   useEffect(() => {
  //     const modal = Modal.info({
  //       content: "轮到 小明（你）作画",
  //       maskClosable: false,
  //       cancelButtonProps: null,
  //       okButtonProps: null,
  //     });
  //   }, []);

  // const timer = setInterval(() => {
  //   secondsToGo -= 1;
  //   modal.update({
  //     content: `This modal will be destroyed after ${secondsToGo} second.`,
  //   });
  // }, 1000);

  // setTimeout(() => {
  //   clearInterval(timer);
  //   modal.destroy();
  // }, secondsToGo * 1000);

  return (
    <Modal visible={true} closable={false}  footer={null}>
        <h2 style={{textAlign:'center'}} >轮到 小明（你）作画</h2>
    </Modal>
  );
};

export default ModelTips;
