import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, View, Text, RefreshControl } from 'react-native';
import axios from 'axios';
import Card from '../components/Card';

export default function ProductListScreen({ navigation }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://dummyjson.com/products');
            setProducts(response.data.products);
        } catch (error) {
            console.log('Error fetching products:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchProducts();
    };

    const renderProduct = ({ item }) => (
        <Card
            image={item.thumbnail}
            title={item.title}
            description={item.description}
            price={item.price}
            onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
        />
    );

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            ListHeaderComponent={<Text style={styles.header}>Product List</Text>}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />
    );
}

const styles = StyleSheet.create({
    list: {
        padding: 15,
        backgroundColor: '#f5f5f5',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
        paddingTop: 30
    },
});
