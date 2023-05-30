import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ServicesApi } from '../api/ServicesApi';
import LoadingScreen from './LoadingScreen';

export default ServicesScreen = () => {
  const [services, setServices] = useState([])
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      // Bu kısım, bu ekranın odaklandığı (geri dönüldüğü) her an tetiklenir.
      setServices([]);
      getServices();

      return () => {
        // Bu kısım, ekranın odaktan çıktığı (yani başka bir sayfaya gidildiği) zaman tetiklenir.
        // Genellikle temizleme işlemleri için kullanılır.
      };
    }, []),
  );

  const getServices = async () => {
    try {
      const response = await ServicesApi();
      if (response.success) {
        setServices(response.data)
      }
      else {
        Alert.alert(response.messages.join('\n'));
      }
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    getServices();
  }, []);

  if (services.length == 0) {
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
          <Text style={styles.headerText}>Hizmetler</Text>
        </View>
        <View style={styles.body}>
          <FlatList
            data={services}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.serviceContainer}>
                <TouchableOpacity style={styles.serviceRow} onPress={() => navigation.navigate('ServiceDetail', { serviceId: item.id })}>
                  <Text style={styles.serviceText}>{item.name}</Text>
                  <View style={styles.stars}>
                    {[...Array(Math.round(item.average_star))].map((_, i) => <Image key={i} source={require('../assets/star.png')} style={styles.star} />)}
                    {[...Array(5 - Math.round(item.average_star))].map((_, i) => <Image key={i} source={require('../assets/star-empty.png')} style={styles.star} />)}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.commentButton1} onPress={() => navigation.navigate('ServiceDetail', { serviceId: item.id })}>
                  <Text style={styles.commentButtonText1}>Yorum Yap</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
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
  body: {
    padding: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  serviceContainer: {
    marginBottom: 10,
    padding: 10,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceText: {
    color: '#fff',
    fontSize: 18,
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    width: 15,
    height: 15,
    margin: 1,
  },
  commentButton1: {
    backgroundColor: 'yellow',
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
  },
  commentButton2: {
    backgroundColor: 'black',
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  commentButtonText1: {
    color: '#000',
  },
  commentButtonText2: {
    color: 'yellow',
  },
});
