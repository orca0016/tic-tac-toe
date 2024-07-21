import { Circle, X } from "lucide";
import React from "react";
import circle from "../assets/circle.svg";
import x from "../assets/x.svg";
const Column = ({ fncColumn, numberRow, numberColumn, position }) => {
  return (
    <div className="column"  onClick={() => fncColumn(numberRow, numberColumn)}>
        
        {position.position === "X" ? <img width={"50px"} src={x} /> : null}
        {position.position === "O" ? <img width={"50px"} src={circle} /> : null}
        {position.position === "" ? <img style={{opacity:"0"}} width={"50px"} src={circle} /> : null}
    </div>
  );
};

export default Column;
