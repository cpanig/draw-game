import React, { useState,useContext } from "react";
import { Button } from "antd";
import "./comments.css";
import { websocketStatus } from "../../App";


const Comments = ({ userId, name,commentList }) => {
  const ws = useContext(websocketStatus);
  const [message, setMessage] = useState("");

  const handleEnter = (e) => {
    if (e.keyCode !== 13) return;
    handleSend();
  };

  const handleSend = () => {
    if (message === "") return;
    const answer = {
      userId,
      name,
      value: message,
    };

    ws.send(JSON.stringify({ code : 300 , data: answer }));
    setMessage("");
  };

  return (
    <div className={`${"com-container"} ${"global-border"}`}>
      {/* 聊天记录区 */}
      <div className="comment-list">
        {commentList &&
          commentList.map((user, index) => {
            return (
              <div className="comment-items" key={index}>
                <p className="user-name">{user.name}:</p>
                <p className="user-value">{user.value}</p>
              </div>
            );
          })}
      </div>
      {/* 发送评论区 */}
      <input
        onKeyDown={(e) => handleEnter(e)}
        className="comment-input"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={handleSend} type="primary">
        Send
      </Button>
    </div>
  );
};

export default Comments;
