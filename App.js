import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import {UserProvider} from "./store/userContext";

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <UserProvider>
                <SafeAreaProvider>
                    <PaperProvider theme={DefaultTheme}>
                        <Navigation />
                    </PaperProvider>
                    <StatusBar/>
                </SafeAreaProvider>
            </UserProvider>

        );
    }
}
