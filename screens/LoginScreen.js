import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, TextInput, View, StyleSheet, Image } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }
  
  onLogin() {
    const { username, password } = this.state;

    Alert.alert('Credentials', `${username} + ${password}`);
  }

  onSignup() {
    // Kayıt ol butonuna tıklandığında yapılacak işlemler burada olacak.
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <Text style={styles.label}>Kullanıcı Adı</Text>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          style={styles.input}
        />
        <Text style={styles.label}>Şifre</Text>
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry={true}
          style={styles.input}
        />
        <TouchableOpacity style={styles.loginButton} onPress={this.onLogin.bind(this)}>
          <Text style={styles.loginButtonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton} onPress={this.onSignup.bind(this)}>
          <Text style={styles.signupButtonText}>Hesabım Yok, Kayıt Olmak İstiyorum</Text>
        </TouchableOpacity>
        <Image style={styles.bottomImage} source={require('../assets/logo.png')} />
      </View>
    );
  }
}

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
    borderRadius:5,
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
