import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';

import Colors from "../constants/Colors";


export default function ModalInfoScreen({route, navigation}) {
    // const {postId, userToken} = route.params
    // const [question, setQuestion] = useState('');

    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                {/* Use a light status bar on iOS to account for the black space above the modal */}
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
                <Text style={styles.title}>Only admin</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        marginVertical: 30,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        marginVertical: 3,
        borderColor: Colors.light.blue,
        padding: 5,
        minWidth: '90%',
        maxWidth: '90%',
        borderRadius: 6
    },
    button: {
        marginVertical: 20, backgroundColor: Colors.light.blue, padding: 15,
        borderRadius: 6
    }
});
