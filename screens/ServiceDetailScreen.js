import React, { useRef, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default ServiceDetailScreen = () => {
    const [averageRating, setAverageRating] = useState(4);
    const [userRating, setUserRating] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const scrollViewRef = useRef();

    const handleUserRating = (selectedRating) => {
        setUserRating(selectedRating);
    };

    const handleComment = () => {
        const newComment = {
            rating: userRating,
            comment: comment
        };
        setComments([...comments, newComment]);
        setComment('');
        setUserRating(0);

        scrollViewRef.current.scrollToEnd({ animated: true });
    };

    return (
        <ScrollView contentContainerStyle={styles.container} ref={scrollViewRef}>
            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: 'https://media.istockphoto.com/id/1284066336/photo/modern-gadgets-in-interior-of-coworking-office-during-covid-19-epidemic.jpg?s=612x612&w=0&k=20&c=Rl3eAbIDD7aCe63ibkA7Ng_-VJV-Npuc9Ey_eIE24U8=' }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.title}>
                    Badana Hizmeti
                </Text>
                <Text style={styles.details}>
                    Boya ve badana işlemleri, her evin ihtiyacı arasında yer almaktadır.
                    İyi boyanmış bir ev her zaman daha şık ve temiz görünebilmektedir.
                    Bu bağlamda Bayburt'ta boya ve badana arayışı içerisinde olanlar,
                    evlerindeki iç ve dış cephe boya badana ihtiyaçlarını en iyi şekilde
                    giderebilmek için firmamıza kolay bir şekilde ulaşabilmektedir.
                    Boya ve badana işlemlerine ek olarak duvar tadilatı, duvar kağıdı,
                    tavan tadilat ve boyası ihtiyaçlarınız için de ekibimizle
                    iletişime geçebilirsiniz.
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
                                <Text style={styles.commentUser}>Mert Y.</Text>
                                <View style={styles.commentRating}>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <FontAwesome5
                                            key={rating}
                                            name={comment.rating >= rating ? 'star' : 'star'}
                                            size={15}
                                            solid={comment.rating >= rating}
                                            color={comment.rating >= rating ? "#FFD700" : "gray"}
                                        />
                                    ))}
                                </View>
                            </View>
                            <Text style={styles.commentText}>{comment.comment}</Text>
                            <View style={styles.commentDivider} />
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

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
        backgroundColor: 'rgba(154,154,154,255)',
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
    },
    commentDivider: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginTop: 10,
        marginBottom: 10,
    },
});