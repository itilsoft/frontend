import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, TextInput, View, StyleSheet, Image, Alert, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Logout, UpdatePassword, GetUser } from '../api/UserApi';

export default ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigation = useNavigation();

  const onLogout = async () => {
    setIsButtonDisabled(true);
    const logoutResponse = await Logout();
    if (logoutResponse.success) {
      navigation.navigate('Login', { headerLeft: null });
    }
    setIsButtonDisabled(false);
  }

  const changePassword = async () => {
    setIsButtonDisabled(true);

    if (newPassword != repeatNewPassword) {
      Alert.alert('Yeni şifreler eşleşmiyor!');
    }

    const response = await UpdatePassword(oldPassword, newPassword);
    if (response.success) {
      Alert.alert('Şifre güncellendi!');
    } else {
      Alert.alert(response.messages.join('\n'));
    }
    setIsButtonDisabled(false);
  };

  const userInfo = async () => {
    const response = await GetUser();
    if (response.success) {
      setUser(response.user);
    }
  }

  useEffect(() => {
    userInfo();
  }, []);

  if (!user) {
    return <LoadingScreen />
  } else {
    return (
      <View style={styles.container}>
        <Image style={styles.profileLogo} source={require('../assets/profile.png')} />

        <View style={styles.topSection}>
          <Text style={styles.label}>
            <Text style={styles.boldLabel}>Ad Soyad: </Text>
            {user.fullname}
          </Text>
          <Text style={styles.label}>
            <Text style={styles.boldLabel}>Kullanıcı Adı: </Text>
            {user.username}
          </Text>
        </View>

        <Text style={styles.label}>Eski şifre</Text>
        <TextInput
          value={oldPassword}
          onChangeText={(oldPassword) => setOldPassword(oldPassword)}
          secureTextEntry={true}
          style={styles.input}
        />
        <Text style={styles.label}>Yeni şifre</Text>
        <TextInput
          value={newPassword}
          onChangeText={(newPassword) => setNewPassword(newPassword)}
          secureTextEntry={true}
          style={styles.input}
        />
        <Text style={styles.label}>Eski şifre tekrar</Text>
        <TextInput
          value={repeatNewPassword}
          onChangeText={(repeatNewPassword) => setRepeatNewPassword(repeatNewPassword)}
          secureTextEntry={true}
          style={styles.input}
        />
        <TouchableOpacity style={styles.passwordButton} onPress={changePassword} disabled={isButtonDisabled}>
          <Text style={styles.passwordButtonText}>Şifreyi Güncelle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout} disabled={isButtonDisabled}>
          <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>

        <View style={styles.commentContainer}>
          <Text style={styles.subtitle}>Yorumlarım</Text>
          <FlatList
            data={user.comments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item: comment, index }) => (
              <View key={index} style={styles.comment}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentService}>{comment.service.name}</Text>
                  <View style={styles.commentRating}>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <FontAwesome5
                        key={rating}
                        name={'star'}
                        size={15}
                        solid={comment.star >= rating}
                        color={comment.star >= rating ? "#FFD700" : "gray"}
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.commentText}>{comment.description}</Text>
                <View style={styles.commentDivider} />
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
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 15
  },
  profileLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  topSection: {
    marginBottom: 20
  },
  label: {
    borderRadius: 5,
    width: '100%',
    color: '#fff',
  },
  boldLabel: {
    fontWeight: 'bold',
  },
  input: {
    borderRadius: 5,
    width: '100%',
    height: 50,
    padding: 10,
    backgroundColor: '#353535',
    color: '#fff',
    marginBottom: 10,
    borderBottomColor: 'grey', // TextInput border rengini gri yaptık
    borderBottomWidth: 1, // ve kalınlığını 1 olarak belirledik
  },
  passwordButton: {
    borderRadius: 5,
    width: '100%',
    padding: 10,
    backgroundColor: 'green',
    marginBottom: 10,
    marginTop: 10,
  },
  passwordButtonText: {
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
  },
  logoutButton: {
    borderRadius: 5,
    width: '100%',
    padding: 10,
    backgroundColor: 'red',
    marginBottom: 10,
    marginTop: 10,
  },
  logoutButtonText: {
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
  },
  signupButton: {
    borderRadius: 5,
    width: '100%',
    padding: 10,
    backgroundColor: '#353535',
    marginBottom: 10,
    borderColor: 'grey',
    borderWidth: 2,
    marginTop: 10,
  },
  signupButtonText: {
    color: 'yellow',
    textAlign: 'center',
  },
  bottomImage: {
    position: 'absolute',
    bottom: 50, // Alt resim için konumlandırmayı ayarla
    right: 0,
    width: 100, //Alt resim boyutlarını ayarlayın
    height: 100,
  },
  commentContainer: {
    marginTop: 20,
    alignSelf: 'stretch',
    height: 300,
  },
  comment: {
    marginTop: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentService: {
    fontFamily: 'serif',
    fontSize: 15,
    fontStyle: 'italic',
    color: 'white',
  },
  commentRating: {
    flexDirection: 'row',
  },
  commentText: {
    color: 'white',
  },
  commentDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginTop: 10,
    marginBottom: 10,
  },
});
