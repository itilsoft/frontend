import React, { useState } from 'react';
import { Text, View, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GetStatisticsApi } from '../api/AdminApi';
import LoadingScreen from './LoadingScreen';
import { LineChart, BarChart } from "react-native-chart-kit";

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

        <Text style={styles.label}>Son 7 günde kullanıcı kayıt grafiği</Text>
        <LineChart
          data={{
            labels: statistics.users.map(u => {
              const items = u.date.split('-');
              return items[1] + '-' + items[2];
            }),
            datasets: [
              {
                data: statistics.users.map(u => u.count)
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0, // Tam sayı kullanmak için burayı 0'a ayarladık
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
          }}
        />

        <Text style={styles.label}>Son 7 günde yapılan yorum grafiği</Text>
        <BarChart
          data={{
            labels: statistics.comments.map(u => {
              const items = u.date.split('-');
              return items[1] + '-' + items[2];
            }),
            datasets: [
              {
                data: statistics.comments.map(u => u.count)
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#009ee2",
            backgroundGradientFrom: "#009ee2",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0, // Tam sayı kullanmak için burayı 0'a ayarladık
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
          }}
        />
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
  label: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10
  }
});
