import React, { useState, useContext } from "react";
import { Input } from "antd";
import "./comments.css";
import { websocketStatus } from "../../App";

const { Search } = Input;

const Comments = ({ userId, name, commentList }) => {
  const ws = useContext(websocketStatus);
  const [message, setMessage] = useState("");

  const handleSend = (message) => {
    if (message === "") return;
    const answer = {
      userId,
      name,
      value: message,
    };
    ws.send(JSON.stringify({ code: 300, data: answer }));
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
      <div>
        <Search
          enterButton="send"
          value={message}
          size="large"
          onChange={(e) => setMessage(e.target.value)}
          onSearch={(value) => handleSend(value)}
        />
      </div>
    </div>
  );
};

export default Comments;
