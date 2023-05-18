import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const Register = () => {
  return (
    <View>
      <Text>Register Component</Text>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" secureTextEntry={true} />
      <Button title="Register" onPress={() => {}} />
    </View>
  );
};

export default Register;
