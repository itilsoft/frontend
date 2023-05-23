import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, FlatList } from 'react-native';

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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Linking.openURL('http://example.com')}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('http://example.com')}>
          <Image source={require('../assets/profile.png')} style={styles.profile} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.headerText}>Hizmetler</Text>
        <FlatList
          data={services}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.serviceContainer}>
              <TouchableOpacity style={styles.serviceRow} onPress={() => Linking.openURL('http://example.com')}>
                <Text style={styles.serviceText}>
                  {item}
                </Text>
                <View style={styles.stars}>
                  {[...Array(5)].map((_, i) => <Image key={i} source={require('../assets/star.png')} style={styles.star} />)}
                </View>
              </TouchableOpacity>
              {index % 2 === 0 && (
                <TouchableOpacity style={styles.commentButton1}>
                  <Text style={styles.commentButtonText1}>Yorum Yap</Text>
                </TouchableOpacity>
              )}
              {index % 2 !== 0 && (
                <TouchableOpacity style={styles.commentButton2}>
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
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  profile: {
    width: 50,
    height: 50,
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
    alignItems: 'center', // yıldızları ve metni aynı hizaya getirir
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
    margin: 1, // Yıldızlar arasında biraz boşluk ekler
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
    borderColor: 'gray', // kenarlık rengini belirtir
    borderWidth: 1, // kenarlık kalınlığını belirtir
  },

  commentButtonText1: {
    color: '#000',
  },
  commentButtonText2: {
    color: 'yellow',
  },
});
