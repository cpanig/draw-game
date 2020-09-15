import React from "react";
import { Card, Avatar } from "antd";
import { FormOutlined } from "@ant-design/icons";
const { Meta } = Card;

const UserCard = ({ user, isDrawer, isMine, index }) => {
  const score = (
    <div className="userScore">
      {user.score}
      {/* <a>+1</a> */}
    </div>
  );
  return (
    <div className="user-container">
      <FormOutlined
        style={{
          fontSize: "2rem",
          visibility: isDrawer ? "visible" : "hidden",
        }}
      />
      <Card
        className={`${isMine && 'myCard'}`}
        size="small"
        hoverable
        style={{ width: 230, marginTop: 16 }}
      >
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={user.name}
          description={score}
        />
      </Card>
    </div>
  );
};

export default UserCard;
