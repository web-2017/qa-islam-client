import React, {useContext, useRef} from "react";
import {StyleSheet, View, Share, Text, Linking, Platform} from "react-native";
import {FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {Chip, Divider, Paragraph, Title} from "react-native-paper";
import WebView from "react-native-webview";

import {filterReplaceStr} from "../utils/filters/filterReplaceStr";
import Colors from "../constants/Colors";
import {UserContext} from "../store/userContext";


export const FlatListItem = ({item, deletePost, navigation}) => {

    const ref = useRef(null);

    const [stateUser, setStateUser] = useContext(UserContext);

    const onShare = async ({msg}) => {
        try {
            const result = await Share.share({
                message: msg,
            });

            // console.log(result)
            // if (result.action === Share.sharedAction) {
            //     if (result.activityType) {
            //         // shared with activity type of result.activityType
            //         console.log('shared', result)
            //     } else {
            //         // shared
            //         console.log('not shared', result)
            //     }
            // } else if (result.action === Share.dismissedAction) {
            //     // dismissed
            //     console.log('dismissed', result)
            // }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container} key={item._id}>
            {
                stateUser?._id &&
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Ionicons
                        onPress={() => navigation.navigate('Modal', {
                            postId: item?._id, userToken: stateUser.token,
                        })}
                        name={'create-outline'} size={20}
                        style={{
                            color: 'green',
                            textAlign: 'right',
                        }}
                    />
                    <Ionicons
                        name={'trash-outline'} size={20}
                        style={{
                            color: 'red',
                            textAlign: 'right',
                        }}
                        onPress={() => deletePost(item?._id)}
                    />
                </View>
            }
            <Title style={styles.title}>{filterReplaceStr(item.question)}{' '}? </Title>
            <Chip mode={'flat'} color="green">
                <FontAwesome name="user-circle-o" size={20} color="green"/>
                {' '}<Paragraph>{item?.sheikh}</Paragraph>
            </Chip>

            <Paragraph style={styles.original}>{filterReplaceStr(item?.answer)}</Paragraph>
            {item?.extra ? <Paragraph style={styles.extra}>{filterReplaceStr(item?.extra)}</Paragraph> : null}
            {
                item?.videoLink && item?.videoLink.includes('http') ?
                    <WebView
                        style={{height: 160}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        ref={ref}
                        // onHttpError={event => console.log(11, event.loading)}
                        // onError={e => console.log(22, e)}
                        mediaPlaybackRequiresUserAction // play stop autoplay
                        source={{uri: `${item?.videoLink}`}}
                    />
                    : null
            }
            <View style={styles.socials}>
                <Paragraph>???????????????????? </Paragraph>
                <Ionicons
                    name={'share'} size={20}
                    style={{marginVertical: 4}}
                    color={Colors.light.blue}
                    onPress={() =>
                        onShare(
                        {
                                msg: `
                                ????????????: ${filterReplaceStr(item.question)}?;\n
                                ????????: ${item.sheikh};\n
                                ??????????: ${filterReplaceStr(item.answer)};\n
                                ??????????: ${item.videoLink ? item.videoLink : '????????'}
                                `
                            }
                        )
                    }
                />
                <FontAwesome
                    name="whatsapp" size={20} style={{margin: 10}} color={Colors.light.green}
                    onPress={() => {
                        Platform.OS === 'ios' ?
                            Linking.openURL(
                                // 'http://api.whatsapp.com/send?phone=1' + '8473125422' + '?text=11111',
                                `http://api.whatsapp.com/send?text=${item.sheikh}; ${item.question}; ${item.answer}`
                            )
                            :
                            Linking.openURL(
                                `http://api.whatsapp.com/send?text=${item.sheikh}; ${item.question}; ${item.answer}`
                            );
                    }}
                />
                <MaterialIcons
                    style={{paddingHorizontal: 4}}
                    name="message"
                    size={20} color={Colors.light.blue}
                    onPress={() => {
                        Platform.OS === 'ios' ?
                            Linking.openURL(
                                `sms: &body=${item.sheikh}; ${item.question}; ${item.answer}`,
                            )
                            :
                            Linking.openURL(
                                `sms: ?body=${item.sheikh}; ${item.question}; ${item.answer}`,
                            );
                    }}
                />
            </View>

            <Divider style={{backgroundColor: Colors.light.lightBrown, marginVertical: 30, height: 1}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
    },
    socials: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: '#0001',
        paddingHorizontal: 15
    },
    original: {
        backgroundColor: '#ccc',
        fontSize: 16,
        marginVertical: 5,
        padding: 15,
        borderRadius: 6,
        overflow: 'hidden',
        textAlign: 'justify',
    },
    extra: {
        // backgroundColor: Colors.light.green,
        borderWidth: 1,
        borderColor: Colors.light.green,
        color: Colors.light.lightBrown,
        borderRadius: 5,
        padding: 15,
        fontSize: 16,
        textAlign: 'justify',
        marginVertical: 5
    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
