import React, { useState, useContext } from "react";
import { Input } from "antd";
import "./comments.css";
import { websocketStatus } from "../../App";

const { Search } = Input;

const Comments = ({ user,isDrawer }) => {
  const ws = useContext(websocketStatus);
  const [commentList, setCommentList] = useState([]);
  const [message, setMessage] = useState("");

  const handleSend = (message) => {
    if (message === "") return;
    const answer = {
      userId : user.id,
      name : user.name,
      value: message,
    };
    ws.send(JSON.stringify({ code: 300, data: answer }));
    setMessage("");
  };

  // 广播评论
  const addComment = (newAnswer) => {
    setCommentList([...commentList, newAnswer]);
  };

  // 广播事件map
  const boardCastMap = {
    300: addComment,
  };

  //监听服务器信息
  ws.onmessage = function (event) {
    console.log(event.data)
    const { code, data } = JSON.parse(event.data);
    const boardHandle = boardCastMap[code];
    boardHandle && boardHandle(data);
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
        {isDrawer ? (
          <Input disabled={true} placeholder="您不能说话" />
        ) : (
          <Search
            enterButton="send"
            value={message}
            size="large"
            onChange={(e) => setMessage(e.target.value)}
            onSearch={(value) => handleSend(value)}
          />
        )}
      </div>
    </div>
  );
};

export default Comments;
