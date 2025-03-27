import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DetailScreen = ({ route }) => {
    const { task } = route.params;
    const [taskStatus, setTaskStatus] = useState(task.completed);

    return (
        <View style={styles.container}>
            <Text style={styles.detailText}>Title: {task.title}</Text>
            <Text style={styles.detailText}>User ID: {task.userId}</Text>
            <Text style={styles.detailText}>Status: {taskStatus ? '✓ Completed' : '✗ Incomplete'}</Text>
            <Button title="Toggle Status" onPress={() => setTaskStatus(!taskStatus)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        padding: 20
    },
    detailText: 
    {
        fontSize: 18,
        marginBottom: 10
    }
});

export default DetailScreen;
