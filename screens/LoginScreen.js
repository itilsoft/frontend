import React, { Component } from 'react';
import { Alert,Text, Button, TextInput, View, StyleSheet } from 'react-native';

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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textstyle}> Kullanıcı Adı </Text>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          style={styles.input}
          
        />
        <Text style={styles.textstyle}> Şifre </Text>
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry={true}
          style={styles.input}
        />
        <View style={styles.buttonstyle}>
        <Button
          title={'Giriş Yap'}
          onPress={this.onLogin.bind(this)}
          color= '#ebc8b2'
        />
        </View>
        <View style={styles.buttonstyle}>
        <Button
          title={'Hesabım Yok, Kayıt Olmak İstiyorum'}
          color= '#353535'
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#353535',
  },
  input: {
    width: 300,
    height: 35,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    color: "white"
  },
  buttonstyle:{
    width: 300,
    height: 37,
    color: '#ebc8b2',
    borderWidth: 2,
    overflow: 'hidden',
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#ebc8b2',
  },
  textstyle:{
    paddingBottom: 5,
    color: 'white',
  },
});
