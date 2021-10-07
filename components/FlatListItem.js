import React, {useRef} from "react";
import {StyleSheet, View, Share, Text, Linking, Platform} from "react-native";
import {FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {Chip, Divider, Paragraph, Subheading, Title} from "react-native-paper";
import WebView from "react-native-webview";

import {filterReplaceStr} from "../utils/filters/filterReplaceStr";
import Colors from "../constants/Colors";


export const FlatListItem = ({item, deletePost, user, navigation}) => {
    const ref = useRef(null);

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

    return  (
        <View style={styles.renderItemStyle}>
            <View key={item._id}>
                {
                    user?._id &&
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Ionicons
                            onPress={() => navigation.navigate('Modal', {
                                postId: item._id, userToken: user.token,
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
                            onPress={() => deletePost(item._id)}
                        />
                    </View>
                }
                <Title style={styles.title}>{filterReplaceStr(item.question)}{' '}? </Title>
                <Chip mode={'flat'} color="green">
                    <FontAwesome name="user-circle-o" size={20} color="green" />
                    {' '}<Paragraph>{item?.sheikh}</Paragraph>
                </Chip>

                <Paragraph style={styles.original}>{filterReplaceStr(item?.answer)}</Paragraph>
                {item?.extra ? <Paragraph style={styles.extra}>{filterReplaceStr(item?.extra)}</Paragraph> : null}
                {
                    item?.videoLink && item?.videoLink.includes('http') ?
                        <WebView
                            style={{height: 200}}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            ref={ref}
                            // onHttpError={event => console.log(11, event.loading)}
                            // onError={e => console.log(22, e)}
                            mediaPlaybackRequiresUserAction // play stop autoplay
                            source={{ uri: `${item?.videoLink}` }}
                        />
                        : null
                }
                <View style={styles.socials}>
                    <Paragraph>Поделиться </Paragraph>
                    <Ionicons
                        name={'share'} size={20}
                        style={{marginVertical: 4}}
                        color={Colors.light.blue}
                        onPress={() => onShare({msg: `${item.question}; ${item.sheikh}; ${item.answer}`})}
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
        </View>
    )
}

const styles = StyleSheet.create({
    renderItemStyle: {
        color: '#000',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
    },
    socials: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    label: {
        backgroundColor: '#444',
        color: '#fff',
        padding: 5,
        paddingLeft: 7,
        borderRadius: 5,
        overflow: "hidden",
        textTransform: 'capitalize'
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
        backgroundColor: Colors.light.green,
        color: '#fff',
        borderRadius: 5,
        padding: 15,
        fontSize: 16,
        textAlign: 'justify',
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
