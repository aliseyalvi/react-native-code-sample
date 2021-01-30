import React, {ReactNode, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {colors, scaleFont, scaleSize, typography} from '../../../themes';

interface TextInputProps extends RNTextInputProps {
  help?: string;
  label?: string;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  rightElement?: ReactNode;
  containerStyle?: ViewStyle;
  showLabel?: boolean;
}

const containerStyle: ViewStyle = {
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: colors.c254167,
  marginBottom: scaleSize(37),
};

const textInputStyle: TextStyle = {
  fontSize: scaleFont(18),
  color: colors.c24272B,
  opacity: 0.8,
  flex: 1,
  marginRight: 5,
};

const labelStyle: TextStyle = {
  color: colors.c3E4A59,
  opacity: 0.7,
  fontSize: scaleFont(14),
  fontWeight: '300',
};

const helpStyle: TextStyle = {
  fontFamily: typography.primary,
  color: colors.palette.grey,
  fontSize: scaleFont(14),
};

export const TextInput = ({
  label,
  help,
  value,
  rightElement,
  containerStyle: customStyle,
  ...rest
}: TextInputProps) => {
  const textInput = useRef<RNTextInput>();
  const [hideInput, setHideInput] = useState(help !== undefined);

  const showLabel = help !== undefined || value !== '' || rest.showLabel;

  const handleOnBlur = () => {
    setHideInput(value === '' && help !== undefined);
  };

  const onFocus = () => {
    setHideInput(false);
  };

  const requestFocus = () => {
    if (textInput && textInput.current) {
      textInput.current.focus();
    }
  };

  const inputHeightStyle = hideInput && value === '' && {height: 2};
  return (
    <View style={[containerStyle, customStyle]}>
      {label !== undefined && showLabel && (
        <Text
          style={showLabel ? [labelStyle, rest.labelStyle] : textInputStyle}
          onPress={requestFocus}>
          {label}
        </Text>
      )}
      {help !== undefined && (
        <Text style={helpStyle} onPress={requestFocus}>
          {help}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: scaleSize(8),
        }}>
        <RNTextInput
          ref={textInput}
          value={value}
          placeholder={!showLabel ? label : ''}
          placeholderTextColor={colors.palette.grey}
          style={[textInputStyle, inputHeightStyle, rest.inputStyle]}
          onBlur={handleOnBlur}
          onFocus={onFocus}
          {...rest}
        />
        {rightElement}
      </View>
    </View>
  );
};
