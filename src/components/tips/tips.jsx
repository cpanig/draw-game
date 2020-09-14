import React from "react";
import './tips'
import { message } from 'antd'


const Tips = () => {

  // useEffect(() =>{
    message.info({
      content:"小鸡鸡",
      duration : 0,
      style:{
        position:'absolute',
        left:"58%"
      }
      // icon: 'none'
    })
  // })

  return <></>
};

export default Tips;
