import React from "react";
import "./rank.css";
import UserCard from "./userCard/userCard";
// ID === user.id  标识自己
// current === user.id 标识drawer

const Rank = ({ userId, current,userList }) => {
  return (
    <div className={`${"rank-container"} ${"global-border"}`}>
      {userList && userList.map((user, index) => {
        const isMine = userId === user.id;
        const isDrawer = current === user.id;
        return <UserCard key={user.id} index={index} user={user} isMine={isMine} isDrawer={isDrawer} />;
      })}
    </div>
  );
};

export default Rank;
