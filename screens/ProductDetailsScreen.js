import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProductDetailsScreen({ route, navigation }) {
    const { id } = route.params;
    const [product, setProduct] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalImage, setModalImage] = useState('');

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.log('Error fetching product details:', error);
        }
    };

    const handleAddToCart = () => {
        setModalMessage('Product added to cart!');
        setModalImage('https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg');
        setModalVisible(true);
    };

    const handleBuyNow = () => {
        setModalMessage('Proceeding to Checkout...');
        setModalImage('https://thumbs.dreamstime.com/b/vector-proceed-grunge-stamp-seal-tick-inside-green-imprint-grainy-surface-round-rubber-scratched-139450773.jpg');
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    if (!product) {
        return (
            <View style={styles.loading}>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="arrow-back" size={21} color="#000" />
                <Text style={styles.buttontxt}>Back</Text>
            </TouchableOpacity>

            <View>
                <Text style={styles.productdetails}>Product Details</Text>
            </View>

            <Image source={{ uri: product.thumbnail }} style={styles.image} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>${product.price}</Text>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
                    <Icon name="cart-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBuy} onPress={handleBuyNow}>
                    <Icon name="card-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Buy Now</Text>
                </TouchableOpacity>
            </View>

            {/* Modal for confirmation message */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Image source={{ uri: modalImage }} style={styles.modalImage} />
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 15,
        marginBottom: 20,
        marginTop: 50,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        color: '#777',
        marginBottom: 20,
        lineHeight: 22,
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00b894',
        marginBottom: 20,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#74b9ff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginRight: 10,
    },
    buttonBuy: {
        flexDirection: 'row',
        backgroundColor: '#55efc4',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
        fontWeight: '600',
    },
    backButton: {
        paddingLeft: 0,
        paddingVertical: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    buttontxt: {
        fontSize: 15,
        fontWeight: '500',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    modalImage: {
        width: 150,
        height: 150,
        marginBottom: 15,
        borderRadius: 10
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#74b9ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    productdetails: {
        fontSize: 22,
        fontWeight: "500",
        color: "gray"
    }
});
