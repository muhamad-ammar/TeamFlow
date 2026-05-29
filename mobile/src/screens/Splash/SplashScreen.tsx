import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './SplashScreen.style';
import { useSplashViewModel } from './SplashViewModel';

const SplashScreen = () => {
    const navigation = useNavigation();
    const splashViewModel = useSplashViewModel();
    
    useEffect(() => {
        splashViewModel.initialize();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TeamFlow</Text>
            <Text style={styles.subtitle}>Streamline Your Team's Workflow</Text>
            <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
        </View>
    );
};


export default SplashScreen;
