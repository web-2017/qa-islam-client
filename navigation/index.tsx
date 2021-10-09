import React, {useContext} from 'react';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from '@react-navigation/drawer';

import CreatePostScreen from "../screens/CreatePostScreen";
import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/LogInScreen.js'
import ModalScreen from "../screens/ModalScreen";
import ModalInfoScreen from "../screens/ModalInfoScreen";

import {UserContext} from "../store/userContext";
import Colors from "../constants/Colors";

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
            <RootStack.Group screenOptions={{presentation: 'modal'}}>
                <RootStack.Screen name="Modal" component={ModalScreen}/>
            </RootStack.Group>
            <RootStack.Group screenOptions={{presentation: 'modal'}}>
                <RootStack.Screen name="ModalInfo" component={ModalInfoScreen}/>
            </RootStack.Group>
        </RootStack.Navigator>
    )
}

export default function Navigation() {
    const [stateUser, setStateUser] = useContext(UserContext);
    
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen
                    name='Root' component={RootStackScreen}
                    options={{
                        headerRight: (() => {
                            return (
                                stateUser?.token &&
                                <Ionicons
                                    name={'exit-outline'}
                                    size={20}
                                    onPress={() => setStateUser(null)}
                                    style={{paddingRight: 20}}
                                    color={Colors.light.red}
                                />
                            )
                        }),
                        title: 'Главная',
                        headerTitleAlign: 'center',
                        headerTitle: 'Ислам: Вопрос - Ответ'
                    }}
                />
                {stateUser?.token ? <Drawer.Screen
                    name='Create'
                    component={CreatePostScreen}
                    options={{
                        title: 'Создать',
                    }}
                /> : null}
                {!stateUser?.token && <Drawer.Screen
                    name='LogIn'
                    component={LogInScreen}
                    options={{
                        title: 'Войти',
                    }}
                />}
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
    return <FontAwesome size={30} style={{marginBottom: -3}} {...props} />;
}
