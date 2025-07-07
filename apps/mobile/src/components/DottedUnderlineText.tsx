import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextStyle,
  ViewStyle,
  StyleProp,
  NativeSyntheticEvent,
  TextLayoutEventData,
} from 'react-native';

interface DottedUnderlineTextProps {
  children: string;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  dotSize?: number;
  dotSpacing?: number;
  dotColor?: string;
  lineHeight?: number;
  isCentered?: boolean;
}

const DottedUnderlineText: React.FC<DottedUnderlineTextProps> = ({
  children,
  style,
  containerStyle,
  dotSize = 2,
  dotSpacing = 2,
  dotColor = '#000',
  lineHeight: lineHeightProp,
  isCentered = false,
}) => {
  const [lineWidths, setLineWidths] = useState<number[]>([]);

  const handleTextLayout = (
    event: NativeSyntheticEvent<TextLayoutEventData>
  ) => {
    const lines = event.nativeEvent.lines;
    const widths = lines.map(line => line.width);
    setLineWidths(widths);
  };

  const textStyle = StyleSheet.flatten([styles.text, style]);
  const lineHeight =
    lineHeightProp || textStyle?.lineHeight || textStyle?.fontSize || 16;

  const renderDottedLine = (width: number, index: number) => {
    const dotTotalWidth = dotSize + dotSpacing;
    const dotCount = Math.floor(width / dotTotalWidth);

    return (
      <View
        key={index}
        style={[
          styles.dotRow,
          {
            width,
            top: (index + 1) * lineHeight - dotSize,
            alignSelf: isCentered ? 'center' : 'flex-start',
          },
        ]}
      >
        {Array.from({ length: dotCount }).map((_, i) => (
          <View
            key={i}
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: dotColor,
              marginRight: dotSpacing,
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{ position: 'relative' }}>
        <Text
          onTextLayout={handleTextLayout}
          style={[
            styles.text,
            style,
            isCentered ? { textAlign: 'center' } : null,
          ]}
        >
          {children}
        </Text>
        {lineWidths.map((width, index) => renderDottedLine(width, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  dotRow: {
    position: 'absolute',
    flexDirection: 'row',
  },
});

export default DottedUnderlineText;
