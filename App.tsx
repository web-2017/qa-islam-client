import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Provider as PaperProvider, configureFonts} from 'react-native-paper';
import * as Font from 'expo-font';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {DefaultTheme, DarkTheme} from "@react-navigation/native";
import {fontConfig} from "./utils/theme";

const theme = {
  ...DefaultTheme,
    fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
    animation: {
        scale: 1.0,
    },
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
            <Navigation theme={theme}  />
        </PaperProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
