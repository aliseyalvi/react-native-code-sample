import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {Alert, TextStyle, View, ViewStyle} from 'react-native';
import {Icon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Touchable} from 'src/components/atoms/touchable/touchable';
import {AppBarButton, BackButton, Button, Text} from 'src/components/atoms';
import {AppBar} from 'src/components/molecules';
import {ModalDialog} from 'src/components/organisms/modal-dialog';
import {useStores} from 'src/models/root-store';
import {ProfileUpdateForm} from 'src/services/api';
import {colors, images, scaleFont, scaleSize} from 'src/themes';
import {validateEmail} from 'src/utility/helpers';
import {ProfileHeader} from './profile-header';
import {ProfileInput} from './profile-input';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const {authStore} = useStores();
  const {user} = authStore;

  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.userName);
  const [email, setEmail] = useState(user.emailId);
  const [showModal, setShowModal] = useState(false);
  const [modalSubtitle, setModalSubtitle] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const logout = () => {
    authStore.logout();
  };

  const updateProfile = async () => {
    try {
      if (name == '' || username == '') {
        setModalSubtitle('Debes añadir una nombre y email nombre de usuario');
        setShowModal(true);
        return;
      }
      if (email == '') {
        setModalSubtitle('Debes añadir una email válidos');
        setShowModal(true);
        return;
      }
      if (!validateEmail(email)) {
        setModalSubtitle('formato de mail no válido');
        setShowModal(true);
        return;
      }

      const form: ProfileUpdateForm = {
        emailId: email,
        name: name,
        userName: username,
      };
      await authStore.updateProfile(form);
      Alert.alert('Profile updated successfully');
    } catch (err) {
      console.warn('Failed to login user: ' + err.message);
      setModalSubtitle(err.message);
      setShowModal(true);
    }
  };

  const _renderLogoutButton = (
    <Touchable onPress={logout}>
      <View style={logoutButtonContainer}>
        <View style={logoutIconContainerStyle}>
          <Icon
            name="logout"
            type="materialicons"
            color={colors.white}
            size={scaleSize(18)}
          />
        </View>

        <Text style={logoutTextStyle}>Cerrar sesion</Text>
      </View>
    </Touchable>
  );

  const _renderContent = (
    <KeyboardAwareScrollView
      style={root}
      contentContainerStyle={contentContainerStyle}>
      <BackButton onPress={goBack} containerStyle={backButtonContainerStyle} />

      <Text preset="header" style={titleStyle}>
        Perfil
      </Text>
      <ProfileHeader />

      <ProfileInput label="NOMBRE" value={name} onChangeText={setName} />

      <ProfileInput
        label="USUARIO"
        value={username}
        onChangeText={setUsername}
        disabled={true}
      />

      <ProfileInput
        label="EMAIL"
        value={email}
        onChangeText={setEmail}
        disabled={true}
      />

      <Button
        title="GUARDAR CAMBIOS"
        type="bordered"
        color={colors.c96A0A2}
        onPress={updateProfile}
        containerStyle={updateButtonContainerStyle}
      />
      {_renderLogoutButton}
    </KeyboardAwareScrollView>
  );

  return (
    <View style={root}>
      <AppBar />
      {_renderContent}
      <ModalDialog
        visible={showModal}
        title={'Error'}
        subtitle={modalSubtitle}
        cancelText={'Aceptar'}
        onCancel={() => {
          setShowModal(false);
        }}
      />
    </View>
  );
};

export default observer(SettingsScreen);

const root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
};

const contentContainerStyle: ViewStyle = {
  paddingTop: scaleSize(16),
  paddingBottom: scaleSize(56),
};

const titleStyle: TextStyle = {
  marginHorizontal: scaleSize(26),
  marginBottom: scaleSize(16),
  color: colors.c10062D,
};

const logoutButtonContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: colors.white,
  paddingHorizontal: scaleSize(28),
  paddingVertical: scaleSize(12),
  borderColor: colors.lightGrey,
  borderTopWidth: 1,
  borderBottomWidth: 1,
};

const logoutIconContainerStyle: ViewStyle = {
  backgroundColor: colors.lightRed,
  justifyContent: 'center',
  alignItems: 'center',
  padding: scaleSize(8),
  borderRadius: scaleSize(4),
  marginRight: scaleSize(16),
};

const logoutTextStyle: TextStyle = {
  color: colors.lightRed,
  fontSize: scaleFont(18),
};

const updateButtonContainerStyle: ViewStyle = {
  marginVertical: scaleSize(24),
  marginHorizontal: scaleSize(80),
  borderRadius: scaleSize(6),
  backgroundColor: colors.background,
};

const backButtonContainerStyle: ViewStyle = {
  marginStart: scaleSize(22),
};
