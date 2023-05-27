import React from 'react';
import { Text, StyleSheet } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

export default LoadingScreen = () => {
  return (
    <AnimatedLoader
      visible={true}
      source={require("../assets/loader.json")}
      animationStyle={styles.lottie}
      overlayColor="rgb(16,12,12)"
      speed={2}
    >
      <Text style={styles.title}>SANA SÖZ</Text>
    </AnimatedLoader>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
  lottie: {
    width: 300,
    height: 300,
},
});
