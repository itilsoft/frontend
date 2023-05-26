import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ServicesApi } from '../api/ServicesApi';
import { saveTokenToStorage } from '../utils/TokenUtil';

const services = ['Bilgisayar Tamiri'
  , 'Web Tasarım'
  , 'Mobil Tasarım'
  , 'Kombi Tamiri'
  , 'Araba Yıkama'
  , 'Petek Temizleme'
  , 'Ev veya Ofis Temizleme'
  , 'İngilizce Eğtimi'
  , 'Kodlama Eğitimi'];

export default ServicesScreen = () => {
  const [service, setServices] = useState([])
  const navigation = useNavigation();

  // const getServices = async () => {
  //   try {
  //     console.log('Screen - response öncesi')
  //     const response = await ServicesApi();
  //     console.log('Screen - response sonrası')
  //     if (response.success) {
  //       await saveTokenToStorage(response.token);
  //       setServices(response.data)
  //     }
  //     else {
  //       Alert.alert(response.messages.join('\n'));
  //     }
  //   } catch (error) {
  //     console.log({ error });
  //   }
  // }

  // useEffect(() => {
  //   getServices();
  // }, []); // İkinci parametre olarak boş bir dizi verildi

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
              <TouchableOpacity style={styles.serviceRow} onPress={() => navigation.navigate('ServiceDetail')}>
                <Text style={styles.serviceText}>{item}</Text>
                <View style={styles.stars}>
                  {[...Array(5)].map((_, i) => <Image key={i} source={require('../assets/star.png')} style={styles.star} />)}
                </View>
              </TouchableOpacity>
              {index % 2 === 0 && (
                <TouchableOpacity style={styles.commentButton1} onPress={() => navigation.navigate('ServiceDetail', { serviceId: 2 })}>
                  <Text style={styles.commentButtonText1}>Yorum Yap</Text>
                </TouchableOpacity>
              )}
              {index % 2 !== 0 && (
                <TouchableOpacity style={styles.commentButton2} onPress={() => navigation.navigate('ServiceDetail')}>
                  <Text style={styles.commentButtonText2}>Verdiğiniz puan 5/5</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
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
