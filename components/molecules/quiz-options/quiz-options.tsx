import React from 'react';
import {TextStyle} from 'react-native';
import {View, ViewStyle} from 'react-native';
import {getBottomSpace, isIphoneX} from 'react-native-iphone-x-helper';
import {Button, Text} from 'src/components/atoms';
import {colors, scaleFont, scaleSize} from 'src/themes';

interface QuizOptionsProps {
  options: Array<string>;
  resultPercents?: Array<number>;
  onPressIndex: (index: number) => void;
  selectedIndex?: number;
  mode: 'active' | 'result';
}

export const QuizOptions = (props: QuizOptionsProps) => {
  const _renderItem = (option: string, index: number) => {
    const _renderResultView = () => {
      const percent = props.resultPercents ? props.resultPercents[index] : 0;
      return (
        <View style={resultItemContainer} key={`option_${index}`}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: percent,
                backgroundColor:
                  index === props.selectedIndex
                    ? colors.correctAnswer
                    : colors.wrongAnswer,
                borderRadius: scaleSize(40),
              }}
            />
            <View style={{flex: 100 - percent}} />
          </View>
          <Text style={titleStyle(false, true)}>{`${String.fromCharCode(
            65 + index,
          )}.   ${option}`}</Text>
        </View>
      );
    };

    const _renderActiveView = (
      <Button
        title={`${String.fromCharCode(65 + index)}.   ${option}`}
        onPress={() => {
          props.onPressIndex(index);
        }}
        containerStyle={buttonStyle(index === props.selectedIndex)}
        titleStyle={titleStyle(index == props.selectedIndex)}
      />
    );

    return (
      <>{props.mode === 'result' ? _renderResultView() : _renderActiveView}</>
    );
  };

  return <View style={containerStyle}>{props.options.map(_renderItem)}</View>;
};

const itemPaddingVertical = scaleSize(14);

const containerStyle: ViewStyle = {
  paddingHorizontal: scaleSize(30),
  paddingBottom: isIphoneX() ? getBottomSpace() : scaleSize(4),
};

const buttonStyle = (isSelected: boolean) => {
  const style: ViewStyle = {
    backgroundColor: isSelected ? colors.secondary : colors.palette.white,
    alignItems: 'flex-start',
    marginBottom: scaleSize(8),
    paddingVertical: itemPaddingVertical,
  };
  return style;
};

const titleStyle = (isSelected: boolean, boldWithPadding?: boolean) => {
  const style: TextStyle = {
    color: isSelected ? colors.palette.white : colors.c272626,
    fontSize: scaleFont(18),
    fontWeight: boldWithPadding ? '700' : '400',
    paddingHorizontal: scaleSize(16),
  };
  return style;
};

const resultItemContainer: ViewStyle = {
  backgroundColor: colors.palette.white,
  borderRadius: scaleSize(40),
  marginBottom: scaleSize(8),
  paddingVertical: itemPaddingVertical,
  justifyContent: 'center',
};
