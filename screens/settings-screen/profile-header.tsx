import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {TextStyle, View, ViewStyle} from 'react-native';
import {Icon} from 'react-native-elements';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import {Touchable} from 'src/components/atoms/touchable/touchable';
import {Text} from 'src/components/atoms';
import {useStores} from 'src/models/root-store';
import NavigationRoutes from 'src/navigations/NavigationRoutes';
import {colors, scaleFont, scaleSize} from 'src/themes';

export const ProfileHeader = observer(() => {
  const navigation = useNavigation();
  const {authStore} = useStores();
  const {user} = authStore;

  if (!user) {
    return null;
  }

  return (
    <Touchable
      onPress={() => {
        navigation.navigate(NavigationRoutes.AVATAR);
      }}>
      <View style={containerStyle}>
        <FastImage
          source={{uri: user.avatarUrl}}
          style={imageStyle}
          resizeMode="cover"
        />

        <View style={textsContainerStyle}>
          <Text style={nameStyle}>{user.name}</Text>
          <Text style={labelStyle}>Editar foto de perfil</Text>
        </View>

        <Icon
          name="keyboard-arrow-right"
          type="materialicons"
          color={colors.lightGrey}
          size={scaleSize(24)}
        />
      </View>
    </Touchable>
  );
});

const containerStyle: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: scaleSize(26),
  paddingVertical: scaleSize(8),
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: colors.white,
};

const imageStyle: ImageStyle = {
  height: scaleSize(68),
  width: scaleSize(68),
  borderRadius: scaleSize(34),
  backgroundColor: colors.lighterGrey,
};

const textsContainerStyle: ViewStyle = {
  flex: 1,
  marginLeft: scaleSize(16),
};

const nameStyle: TextStyle = {
  fontSize: scaleFont(20),
  color: colors.c10062D,
};

const labelStyle: TextStyle = {
  fontSize: scaleFont(12),
  color: colors.c10062D,
  opacity: 0.35,
};
