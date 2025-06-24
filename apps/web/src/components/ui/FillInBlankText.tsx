import React, { ReactNode } from "react";

export enum StyleChoice {
  CORRECT = 1,
  INCORRECT = 2,
  NEUTRAL = 3,
}

function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isBeginning(string: string, index: number): boolean {
  return index === 1 && (string === "" || "!'\"¿".indexOf(string) > -1);
}

interface FillInBlankTextProps {
  text: string;
  insert: string;
  styleChoice: StyleChoice;
}

function FillInBlankText(props: FillInBlankTextProps) {
  const splitArr: string[] = props.text.split("___");
  const renderedText: ReactNode[] = [];
  splitArr.forEach((text, i) => {
    if (i % 2 === 0) {
      renderedText.push(<React.Fragment key={i}>{text}</React.Fragment>);
    } else {
      renderedText.push(
        <React.Fragment key={i}>
          <span
            style={{
              color:
                props.styleChoice === StyleChoice.CORRECT
                  ? "#00ca00"
                  : props.styleChoice === StyleChoice.INCORRECT
                    ? "#ff3d33"
                    : "inherit",
            }}
          >
            {isBeginning(splitArr[0], i)
              ? capitalize(props.insert)
              : props.insert}
          </span>
          {text}
        </React.Fragment>,
      );
    }
  });

  return <React.Fragment>{renderedText}</React.Fragment>;
}

export default FillInBlankText;
