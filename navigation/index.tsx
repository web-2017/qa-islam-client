/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import React, {useEffect, useState} from 'react';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CreatePostScreen from "../screens/CreatePostScreen";
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/LogInScreen.js'

import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalScreen from "../screens/ModalScreen";
import {createStackNavigator} from "@react-navigation/stack";

const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

function RootStackScreen() {
    return (
        <RootStack.Navigator>
            <RootStack.Group>
                <RootStack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{headerShown: false}}
                />
            </RootStack.Group>
            <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                <RootStack.Screen name="Modal" component={ModalScreen} />
            </RootStack.Group>
        </RootStack.Navigator>
    )
}

export default function Navigation({navigation}) {
    
    const [isAuth, setIsAuth] = useState(null);
    
    useEffect(() => {
        (async () => {
            const user = await AsyncStorage.getItem('user');
    
            if (typeof user === "string") {
                const parseData = JSON.parse(user);
                setIsAuth(parseData)
            } else {
                console.error('Нужна авторизация')
            }
           
        })()
    }, []);
    
    
    return (
      <NavigationContainer>
          <Drawer.Navigator>
              <Drawer.Screen
                  name='Root' component={RootStackScreen}
                 options={{
                     headerRight: (() => <Ionicons name={'search'}/>),
                     title: 'Ислам',
                     headerTitleAlign: 'center',
                 }}
              />
              {isAuth && <Drawer.Screen name='Create' component={CreatePostScreen} />}
              {!isAuth && <Drawer.Screen name='LogIn' component={LogInScreen} />}
          </Drawer.Navigator>
      </NavigationContainer>
  );
}



/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
