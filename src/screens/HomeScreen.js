import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const HomeScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        applyFilter(filter);
    }, [tasks, filter]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await fetch(API_URL);
            const data = await response.json();
            // console.log(data);
            setTasks(data);
            await AsyncStorage.setItem('tasks', JSON.stringify(data));
        } catch (error) {
            setError(true);
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks) setTasks(JSON.parse(storedTasks));
        } finally {
            setLoading(false);
        }
    };

    const applyFilter = (filterType) => {
        if (filterType === 'Completed') {
            setFilteredTasks(tasks.filter(task => task.completed));
        } else if (filterType === 'Incomplete') {
            setFilteredTasks(tasks.filter(task => !task.completed));
        } else {
            setFilteredTasks(tasks);
        }
    };

    if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
    if (error) return <Button title="Retry" onPress={fetchTasks} />;

    return (
        <View style={styles.container}>
            <View style={styles.filterButtons}>
                {['All', 'Completed', 'Incomplete'].map(type => (
                    <Button key={type} title={type} onPress={() => setFilter(type)} />
                ))}
            </View>
            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.taskItem}
                        onPress={() => navigation.navigate('Details', { task: item })}>
                        <Text>{item.title}</Text>
                        <Text>{item.completed ? '✓ Completed' : '✗ Incomplete'}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    filterButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    taskItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    }
});

export default HomeScreen;
