import React, {useState} from 'react';
import {TextStyle, View, ViewStyle} from 'react-native';
import {ImageButton, Text, TextInput} from 'src/components/atoms';
import {colors, images, scaleFont, scaleSize} from 'src/themes';

interface ProfileInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  disabled?: boolean;
}

export const ProfileInput = ({
  label,
  value,
  onChangeText,
  disabled,
}: ProfileInputProps) => {
  const [editable, setEditable] = useState(true);

  const onEdit = () => {
    // setEditable(!editable);
  };

  const _renderEditButton = (
    <ImageButton
      imageSource={images.edit}
      containerStyle={{backgroundColor: 'transparent'}}
      onPress={onEdit}
    />
  );

  return (
    <View>
      <Text style={labelStyle}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        containerStyle={inputContainerStyle}
        editable={editable && !disabled}
        style={inputTextStyle}
        rightElement={disabled ? null : _renderEditButton}
      />
    </View>
  );
};

const labelStyle: TextStyle = {
  paddingLeft: scaleSize(26),
  paddingTop: scaleSize(12),
  paddingBottom: scaleSize(8),
  color: colors.c10062D,
  fontSize: scaleFont(14),
  opacity: 0.45,
};

const inputContainerStyle: ViewStyle = {
  borderBottomWidth: 0,
  marginBottom: 0,
  width: '100%',
  backgroundColor: colors.white,
};

const inputTextStyle: TextStyle = {
  marginHorizontal: scaleSize(26),
  paddingVertical: scaleSize(12),
  borderWidth: 0,
  fontSize: scaleFont(18),
  color: colors.c10062D,
  flex: 1,
};
