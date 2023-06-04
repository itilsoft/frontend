import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, Image, StyleSheet, TouchableOpacity, Alert, FlatList, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GetStatisticsApi } from '../api/AdminApi';
import LoadingScreen from './LoadingScreen';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

export default AdminScreen = () => {
  const [statistics, setStatistics] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setStatistics(null);
      getStatistics();
    });

    return unsubscribe;
  }, [navigation]);

  const getStatistics = async () => {
    try {
      const response = await GetStatisticsApi();
      if (response.success) {
        setStatistics(response.data);
      } else {
        Alert.alert(response.messages.join('\n'));
      }
    } catch (error) {
      console.log({ error });
    }
  };

  if (!statistics) {
    return <LoadingScreen />;
  } else {
    const sections = [
      {
        title: 'En yüksek yıldızlı servisler',
        data: statistics.mostRatingServices,
        renderItem: ({ item }) => (
          <View style={styles.listItemContainer} key={item.id}>
            <Text style={styles.listItemText}>{item.name}</Text>
            <Text style={styles.listItemText}>{item.averageStar}</Text>
          </View>
        ),
      },
      {
        title: 'En fazla yorum alan servisler',
        data: statistics.mostCommentingServices,
        renderItem: ({ item }) => (
          <View style={styles.listItemContainer} key={item.id}>
            <Text style={styles.listItemText}>{item.name}</Text>
            <Text style={styles.listItemText}>{item.commentsCount}</Text>
          </View>
        ),
      },
    ];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ScrollView>
            <View style={styles.header}>
              <View style={styles.logoRow}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                  <Image source={require('../assets/profile.png')} style={styles.profile} />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.label}>Tüm servislerin yıldız ortalaması: <Text style={{ fontSize: 25 }}>{statistics.averageRatingOfAllServices}</Text></Text>

            <Text style={styles.label}>Tüm servislerin yorum sayısı: <Text style={{ fontSize: 25 }}>{statistics.mostCommentingServices.map(item => item.commentsCount).reduce((a, b) => a + b)}</Text></Text>

            <View>
              {sections.map((section) => (
                <React.Fragment key={section.title}>
                  <Text style={styles.label}>{section.title}</Text>
                  {section.data.map((item) => section.renderItem({ item }))}
                </React.Fragment>
              ))}
            </View>



            <Text style={styles.label}>Son 7 günde kullanıcı kayıt grafiği</Text>
            <LineChart
              data={{
                labels: statistics.users.map((u) => {
                  const items = u.date.split('-');
                  return items[1] + '-' + items[2];
                }),
                datasets: [
                  {
                    data: statistics.users.map((u) => u.count)
                  },
                ],
              }}
              width={Dimensions.get('window').width} // from react-native
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              fromZero="true"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 0, // Tam sayı kullanmak için burayı 0'a ayarladık
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                marginLeft: 10,
                marginRight: 20,
                borderRadius: 10, // Grafik bileşeninin kenarlarına yuvarlaklık ekledik
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                paddingRight: 35,
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5, // Grafik bileşenine bir gölgelendirme ekledik
              }}
            />

            <Text style={styles.label}>Son 7 günde yapılan yorum grafiği</Text>
            <BarChart
              data={{
                labels: statistics.comments.map((u) => {
                  const items = u.date.split('-');
                  return items[1] + '-' + items[2];
                }),
                datasets: [
                  {
                    data: statistics.comments.map((u) => u.count),
                  },
                ],
              }}
              width={56 * statistics.comments.length}
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: '#009ee2',
                backgroundGradientFrom: '#009ee2',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                paddingRight: 35,
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flexGrow: 1,
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
  label: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  listItemText: {
    color: 'white',
    fontSize: 16,
  },
});
