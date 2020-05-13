import React from "react";
import styles from "./StyledAnswer.module.scss";

interface StyledAnswerProps {
  answerArray: Array<string | number[]>;
}

export default function StyledAnswer(props: StyledAnswerProps) {
  return (
    <React.Fragment>
      {props.answerArray.map((item, i) => {
        let className = "";
        if (item[0] === -1) className = styles.red;
        if (item[0] === 1) className = styles.green;
        return (
          <span key={i} className={className}>
            {item[1]}
          </span>
        );
      })}
    </React.Fragment>
  );
}