/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import React, {useEffect, useState} from 'react';
import {FontAwesome} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createStackNavigator} from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

import CreatePostScreen from "../screens/CreatePostScreen";
import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/LogInScreen.js'
import ModalScreen from "../screens/ModalScreen";

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

export default function Navigation() {
    
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(false);
    
    useEffect(() => {
        (async () => {
            const user = await AsyncStorage.getItem('user');
    
            if (typeof user === "string") {
                const parseData = JSON.parse(user);
                setIsAuth(true)
                setUser(parseData)
            } else {
                console.error('Нужна авторизация')
                setIsAuth(false)
            }
        })()
    }, []);

    return (
      <NavigationContainer>
          <Drawer.Navigator>
              <Drawer.Screen
                    name='Root' component={RootStackScreen}
                  options={{
                     // headerRight: (() => <Ionicons name={'search'}/>),
                     title: 'Главная',
                     headerTitleAlign: 'center',
                     headerTitle: 'Ислам: Вопрос - Ответ'
                  }}
              />
              {isAuth ? <Drawer.Screen name='Create' component={CreatePostScreen} /> : null}
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
