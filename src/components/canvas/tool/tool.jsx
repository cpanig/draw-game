import React from "react";

// SVG图
// 笔
// 橡皮擦

// const svgTool = () => {
//     return (
//         <svg>

//         </svg>
//     )
// }

const toolsList = [
  {
    id: 1,
    name: "铅笔",
  },
  {
    id: 2,
    name: "橡皮擦",
  },
];

const Tool = ({ setCurrent, currentTool }) => {

  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "80px",
        border: "1px solid red",
      }}
    >
      {toolsList.map((tool) => {
        return (
          <div 
            key={tool.id} 
            onClick={() => setCurrent(tool.id)} 
            style={{ color: currentTool === tool.id ? "red" : "black" }}>
            {tool.name}
          </div>
        );
      })}
    </div>
  );
};

export default Tool;
