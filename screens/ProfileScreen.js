import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput, View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Logout } from '../api/UserApi';

export default ProfileScreen = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const navigation = useNavigation();

  const onLogout = async () => {
    const logoutResponse = await Logout();
    if(logoutResponse.success) {
      navigation.navigate('Login', { headerLeft: null });
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.profileLogo} source={require('../assets/logo.png')} />
      <Text style={styles.label}>Eski şifre</Text>
      <TextInput
        value={oldPassword}
        onChangeText={(oldPassword) => setOldPassword(oldPassword)}
        secureTextEntry={true}
        style={styles.input}
      />
      <Text style={styles.label}>Yeni şifre</Text>
      <TextInput
        value={newPassword}
        onChangeText={(newPassword) => setNewPassword(newPassword)}
        secureTextEntry={true}
        style={styles.input}
      />
      <Text style={styles.label}>Eski şifre tekrar</Text>
      <TextInput
        value={repeatNewPassword}
        onChangeText={(repeatNewPassword) => setRepeatNewPassword(repeatNewPassword)}
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity style={styles.loginButton} onPress={() => {}}>
        <Text style={styles.loginButtonText}>Şifreyi Güncelle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={onLogout}>
        <Text style={styles.loginButtonText}>Çıkış Yap</Text>
      </TouchableOpacity>
      <Image style={styles.bottomImage} source={require('../assets/ilustrasyon.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    paddingTop: 200,
    padding: 15,
  },
  profileLogo: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  label: {
    borderRadius: 5,
    width: '100%',
    color: '#fff',
  },
  input: {
    borderRadius: 5,
    width: '100%',
    height: 50,
    padding: 10,
    backgroundColor: '#353535',
    color: '#fff',
    marginBottom: 10,
    borderBottomColor: 'grey', // TextInput border rengini gri yaptık
    borderBottomWidth: 1, // ve kalınlığını 1 olarak belirledik
  },
  loginButton: {
    borderRadius: 5,
    width: '100%',
    padding: 10,
    backgroundColor: 'yellow',
    marginBottom: 10,
    marginTop: 10,
  },
  loginButtonText: {
    borderRadius: 5,
    color: '#000',
    textAlign: 'center',
  },
  signupButton: {
    borderRadius: 5,
    width: '100%',
    padding: 10,
    backgroundColor: '#353535',
    marginBottom: 10,
    borderColor: 'grey',
    borderWidth: 2,
    marginTop: 10,
  },
  signupButtonText: {
    color: 'yellow',
    textAlign: 'center',
  },
  bottomImage: {
    position: 'absolute',
    bottom: 50, // Alt resim için konumlandırmayı ayarla
    right: 0,
    width: 100, //Alt resim boyutlarını ayarlayın
    height: 100,
  },
});
