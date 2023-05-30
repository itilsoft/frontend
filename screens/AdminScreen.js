import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GetStatisticsApi } from '../api/AdminApi';
import LoadingScreen from './LoadingScreen';

export default AdminScreen = () => {
  const [statistics, setStatistics] = useState(null)
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      // Bu kısım, bu ekranın odaklandığı (geri dönüldüğü) her an tetiklenir.
      setStatistics(null);
      getStatistics();

      return () => {
        // Bu kısım, ekranın odaktan çıktığı (yani başka bir sayfaya gidildiği) zaman tetiklenir.
        // Genellikle temizleme işlemleri için kullanılır.
      };
    }, []),
  );

  const getStatistics = async () => {
    try {
      const response = await GetStatisticsApi();
      if (response.success) {
        setStatistics(response.data)
      }
      else {
        Alert.alert(response.messages.join('\n'));
      }
    } catch (error) {
      console.log({ error });
    }
  }

  if (!statistics) {
    return <LoadingScreen />
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image source={require('../assets/profile.png')} style={styles.profile} />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text>Adminnn</Text>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  logo: {
    resizeMode: 'contain',
    aspectRatio: 1,
  },
  profile: {
    aspectRatio: 1,
  },
});
