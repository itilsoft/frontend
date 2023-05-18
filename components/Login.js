import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const Login = () => {
  return (
    <View>
      <Text>Login Component</Text>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" secureTextEntry={true} />
      <Button title="Login" onPress={() => {}} />
    </View>
  );
};

export default Login;
