import React from 'react';
import { Text } from 'react-native';

export enum StyleChoice {
  CORRECT = 1,
  INCORRECT = 2,
  NEUTRAL = 3,
}

function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isBeginning(string: string, index: number): boolean {
  return index === 1 && (string === '' || '!\'"¿'.indexOf(string) > -1);
}

interface FillInBlankTextProps {
  text: string;
  insert: string;
  styleChoice: StyleChoice;
  style?: any;
}

export default function FillInBlankText(props: FillInBlankTextProps) {
  const splitArr: string[] = props.text.split('___');
  const renderedText: React.ReactNode[] = [];

  splitArr.forEach((text, i) => {
    if (i % 2 === 0) {
      // Wrap plain text in Text component with key
      renderedText.push(
        <Text key={`text-${i}`} style={{ color: 'inherit' }}>
          {text}
        </Text>
      );
    } else {
      const insertText = isBeginning(splitArr[0], i)
        ? capitalize(props.insert)
        : props.insert;

      renderedText.push(
        <Text
          key={`insert-${i}`}
          style={{
            color:
              props.styleChoice === StyleChoice.CORRECT
                ? '#00ca00'
                : props.styleChoice === StyleChoice.INCORRECT
                  ? '#ff3d33'
                  : '#2196f3',
            fontWeight: 'bold',
          }}
        >
          {insertText}
        </Text>
      );

      // Wrap the following text in Text component
      renderedText.push(
        <Text key={`after-${i}`} style={{ color: 'inherit' }}>
          {text}
        </Text>
      );
    }
  });

  return <Text style={props.style}>{renderedText}</Text>;
}
