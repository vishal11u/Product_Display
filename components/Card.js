import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Card = ({ image, title, description, price, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <Text numberOfLines={2} style={styles.description}>{description}</Text>
                <Text style={styles.price}>${price}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        marginVertical: 10,
        padding: 7,
        backgroundColor: '#fff',
        borderRadius: 12,
        // shadowColor: '#000',
        // shadowOpacity: 0.15,
        // shadowOffset: { width: 0, height: 4 },
        // shadowRadius: 10,
        elevation: 2,
        borderColor: '#ddd',
        borderWidth: 1,
        alignItems: "center"
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 15,
        overflow: 'hidden',
        borderColor: '#e0e0e0',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    description: {
        fontSize: 13,
        color: '#777',
        marginBottom: 5,
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#007BFF',
    },
});

export default Card;
