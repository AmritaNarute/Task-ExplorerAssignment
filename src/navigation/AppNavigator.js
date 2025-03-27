import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
