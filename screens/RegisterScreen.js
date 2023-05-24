import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput, View, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RegisterApi from '../api/RegisterApi';

export default RegisterScreen = () => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const onSignup = async () => {
    try {
      const response = await RegisterApi(fullname, username, password);
      if (response.success) {
        navigation.navigate('Login');
      } else {
        Alert.alert(response.messages.join('\n'));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <Text style={styles.label}>İsim Soyisim</Text>
      <TextInput
        value={fullname}
        onChangeText={(fullname) => setFullname(fullname)}
        style={styles.input}
      />
      <Text style={styles.label}>Kullanıcı Adı</Text>
      <TextInput
        value={username}
        onChangeText={(username) => setUsername(username)}
        style={styles.input}
      />
      <Text style={styles.label}>Şifre</Text>
      <TextInput
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity style={styles.loginButton} onPress={onSignup}>
        <Text style={styles.loginButtonText}>Kaydol</Text>
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
    paddingTop: 200, // Eklendi
    padding: 15,
  },
  logo: {
    position: 'absolute',
    top: 50, // Üst logo için konumlandırmayı ayarla
    left: 0,
    width: 100, //Logo boyutlarını ayarlayın
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
