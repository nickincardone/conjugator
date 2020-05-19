import React, {ReactNode} from 'react'

function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isBeginning(string: string, index: number): boolean {
  return index === 1 && (string === '' || '!\'"¿'.indexOf(string) > -1);
}

interface FillInBlankTextProps {
  text: string;
  insert: string;
  className: string;
}

function FillInBlankText(props: FillInBlankTextProps) {
  const splitArr: string[] = props.text.split('___');
  const renderedText: ReactNode[] = [];
  splitArr.forEach((text, i) => {
    if (i % 2 === 0) {
      renderedText.push(<React.Fragment key={i}>{text}</React.Fragment>)
    } else {
      renderedText.push(
        <React.Fragment key={i}>
            <span className={props.className}>
              {isBeginning(splitArr[0], i) ? capitalize(props.insert) : props.insert}
            </span>
          {text}
        </React.Fragment>
      )
    }
  });

  return <React.Fragment>{renderedText}</React.Fragment>;
}

export default FillInBlankText;