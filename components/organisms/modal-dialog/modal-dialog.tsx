import React from 'react';
import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  ButtonProps,
  Dimensions,
} from 'react-native';
import {Divider} from 'react-native-elements';
import Modal from 'react-native-modal';
import {Button} from 'src/components/atoms';
import {scaleSize, colors, typography, scaleFont} from '../../../themes';

interface ModalDialogProps {
  visible: boolean;
  title: string;
  subtitle?: string;
  subtitleComponent?: React.ReactNode;
  showConfirm?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  dividerStyle?: ViewStyle;
  optionButtons?: Array<ButtonProps>;
}

const modalStyle: ViewStyle = {alignItems: 'center', justifyContent: 'center'};
const contentStyle: ViewStyle = {
  backgroundColor: 'white',
  alignItems: 'center',
  width: '95%',
  padding: scaleSize(20),
  borderRadius: scaleSize(10),
};
const titleStyle: TextStyle = {
  color: colors.c092058,
  fontWeight: '700',
  textAlign: 'left',
  letterSpacing: 1.5,
  fontSize: scaleFont(24),
  lineHeight: scaleFont(20) * 1.25,
  marginBottom: scaleSize(4),
};
const subtitleStyle: TextStyle = {
  color: colors.c092058,
  fontFamily: typography.primary,
  textAlign: 'center',
  fontSize: scaleFont(16),
  lineHeight: scaleFont(16) * 1.25,
  marginTop: scaleSize(8),
  marginBottom: scaleSize(16),
  marginHorizontal: scaleSize(8),
};

const screenWidth = Dimensions.get('screen').width;
const buttonStyle: ViewStyle = {
  marginTop: scaleSize(8),
  borderRadius: scaleSize(6),
  width: screenWidth * 0.7,
  borderWidth: scaleSize(1),
};

export const ModalDialog = (props: ModalDialogProps) => {
  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={props.visible}
      onBackButtonPress={props.onCancel}
      onBackdropPress={props.onCancel}
      onDismiss={props.onCancel}
      backdropColor={'#2F4443'}
      style={modalStyle}>
      <View style={contentStyle}>
        <Text style={[titleStyle, props.titleStyle]}>{props.title}</Text>
        {props.subtitle != null && (
          <Text style={[subtitleStyle, props.subtitleStyle]}>
            {props.subtitle}
          </Text>
        )}
        {props.subtitleComponent}
        {props.subtitle != null && <Divider style={props.dividerStyle} />}

        {props.optionButtons &&
          props.optionButtons.map((args) => (
            <Button preset="primary" containerStyle={buttonStyle} {...args} />
          ))}
        {props.showConfirm && (
          <Button
            type="bordered"
            preset="primary"
            title={
              props.confirmText !== undefined ? props.confirmText : 'Confirmar'
            }
            onPress={props.onConfirm}
            containerStyle={buttonStyle}
          />
        )}

        <Button
          type="bordered"
          title={props.cancelText !== undefined ? props.cancelText : 'Cancelar'}
          onPress={props.onCancel}
          color={colors.primary}
          containerStyle={buttonStyle}
        />
      </View>
    </Modal>
  );
};
