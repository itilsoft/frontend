import AsyncStorage from '@react-native-async-storage/async-storage';

const saveTokenToStorage = async (token) => {
    try {
        await AsyncStorage.setItem('token', token);
        console.log('Token kaydedildi');
    } catch (error) {
        console.log('Token kaydedilemedi:', error);
    }
};

const getTokenFromStorage = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.log('Token alınamadı:', error);
        return null;
    }
};

const removeTokenFromStorage = async () => {
    try {
        await AsyncStorage.removeItem('token');
        console.log('Token kaldırıldı');
    } catch (error) {
        console.log('Token kaldırılamadı:', error);
    }
};

export { saveTokenToStorage, getTokenFromStorage, removeTokenFromStorage }