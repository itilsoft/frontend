import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ServiceDetailApi, AddCommentApi } from '../api/ServiceDetail';
import LoadingScreen from './LoadingScreen';

export default ServiceDetailScreen = ({ route }) => {

    const { serviceId } = route.params;
    const [serviceDetail, setServiceDetail] = useState(null);
    const [averageRating, setAverageRating] = useState(null);
    const [comments, setComments] = useState([]);
    const [visible, setVisible] = useState(true);
    const [userRating, setUserRating] = useState(0);
    const [comment, setComment] = useState('');
    const scrollViewRef = useRef();

    const fetchServiceDetail = async () => {
        try {
            const response = await ServiceDetailApi(serviceId);
            const data = response.data;
            setServiceDetail(data);
            setAverageRating(Math.round(data.average_star));
            setComments(data.comments);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchServiceDetail();
    }, [serviceId]);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible((prevVisible) => !prevVisible);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleUserRating = (selectedRating) => {
        setUserRating(selectedRating);
    };

    const handleComment = async () => {
        await AddCommentApi(serviceId, userRating, comment);
        fetchServiceDetail();

        setTimeout(() => {
            setComment('');
            setUserRating(0);

            scrollViewRef.current.scrollToEnd({ animated: true });
        }, 5000);


    };


    if (!serviceDetail) {
        return <LoadingScreen />;
    } else {
        return (
            <ScrollView contentContainerStyle={styles.container} ref={scrollViewRef}>
                <View style={styles.content}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: serviceDetail.image }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.title}>
                        {serviceDetail.name}
                    </Text>
                    <Text style={styles.details}>
                        {serviceDetail.description}
                    </Text>
                    <Text style={styles.subtitle}>
                        Ortalama Hizmet Puanı
                    </Text>
                    <View style={styles.averageRatingContainer}>
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <FontAwesome5
                                key={rating}
                                name={averageRating >= rating ? 'star' : 'star'}
                                size={30}
                                solid={averageRating >= rating}
                                color={averageRating >= rating ? "#FFD700" : "gray"}
                            />
                        ))}
                    </View>
                    <Text style={styles.subtitle}>
                        Yorum Yap & Puanla
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Yorumunuzu yazın..."
                        placeholderTextColor="white"
                        value={comment}
                        onChangeText={text => setComment(text)}
                    />
                    <View style={styles.userRatingContainer}>
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <TouchableOpacity key={rating} onPress={() => handleUserRating(rating)}>
                                <FontAwesome5
                                    name={userRating >= rating ? 'star' : 'star'}
                                    size={40}
                                    solid={userRating >= rating}
                                    color={userRating >= rating ? "#FFD700" : "gray"}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity style={styles.buttonContainer} onPress={handleComment}>
                        <Text style={styles.buttonText}>Gönder</Text>
                    </TouchableOpacity>
                    <View style={styles.commentContainer}>
                        <Text style={styles.subtitle}>Yorumlar</Text>
                        {comments.map((comment, index) => (
                            <View key={index} style={styles.comment}>
                                <View style={styles.commentHeader}>
                                    <Text style={styles.commentUser}>{comment.user.fullname}</Text>
                                    <View style={styles.commentRating}>
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <FontAwesome5
                                                key={rating}
                                                name={comment.star >= rating ? 'star' : 'star'}
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
                        ))}
                    </View>
                </View>
            </ScrollView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
        backgroundColor: 'rgb(16,12,12)',
    },
    content: {},
    imageContainer: {
        width: '100%',
        height: 300,
        borderRadius: 30,
        overflow: 'hidden',
        marginBottom: 10,
        alignSelf: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'white',
    },
    details: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 25,
        color: 'white',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: 'white',
    },
    averageRatingContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20,
    },
    userRatingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 150,
        marginTop: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        textAlign: 'left',
        textAlignVertical: 'top',
        color: 'white',
    },
    buttonContainer: {
        width: '100%',
        height: 40,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'darkgreen',
        borderRadius: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'serif'
    },
    commentContainer: {
        marginTop: 20,
        alignSelf: 'stretch',
    },
    comment: {
        marginTop: 10,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    commentUser: {
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
        marginTop: 7,
    },
    commentDivider: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginTop: 10,
        marginBottom: 10,
    },
});