import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, TextInput, View, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Logout, UpdatePassword, GetUser } from '../api/UserApi';

export default ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigation = useNavigation();

  const onLogout = async () => {
    setIsButtonDisabled(true);
    const logoutResponse = await Logout();
    if (logoutResponse.success) {
      navigation.navigate('Login', { headerLeft: null });
    }
    setIsButtonDisabled(false);
  }

  const changePassword = async () => {
    setIsButtonDisabled(true);

    if (newPassword != repeatNewPassword) {
      Alert.alert('Yeni şifreler eşleşmiyor!');
    }

    const response = await UpdatePassword(oldPassword, newPassword);
    if (response.success) {
      Alert.alert('Şifre güncellendi!');
    } else {
      Alert.alert(response.messages.join('\n'));
    }
    setIsButtonDisabled(false);
  };

  const userInfo = async () => {
    const response = await GetUser();
    if (response.success) {
      setUser(response.user);
    }
  }

  useEffect(() => {
    userInfo();
  }, []);

  if (!user) {
    return <LoadingScreen />
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Ad Soyad: {user.fullname}</Text>
        <Text style={styles.label}>Kullanıcı Adı: {user.username}</Text>

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
        <TouchableOpacity style={styles.loginButton} onPress={changePassword} disabled={isButtonDisabled}>
          <Text style={styles.loginButtonText}>Şifreyi Güncelle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={onLogout} disabled={isButtonDisabled}>
          <Text style={styles.loginButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    );
  }
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
    alignItems: 'center',
    top: 50, // Üst logo için konumlandırmayı ayarla
    left: 0,
    aspectRatio: 1, //Logo boyutlarını ayarlayın
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
