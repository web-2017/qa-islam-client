import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native'
import Colors from '../constants/Colors'
import {Ionicons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RenderItems({data, user, editPostHandler}) {

  const Item = ({item}) => {
    return  (
      <View style={styles.renderItemStyle}>
          <View key={item._id}>
            {
              user?._id &&
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Ionicons
                    onPress={() => editPostHandler(item._id)}
                    name={'create-outline'} size={20}
                    style={{
                      color: 'green',
                      textAlign: 'right',
                    }}
                />
                <Ionicons name={'trash-outline'} size={20}
                          style={{
                            color: 'red',
                            textAlign: 'right',
                          }}
                />
              </View>
            }
            <Text style={[styles.text, styles.title]}>{item.question}{' '}?</Text>
            <Text style={{fontWeight: '600'}} style={styles.label}>{item?.sheikh}</Text>
            <Text style={styles.original}>{item?.answer}</Text>
          </View>
      </View>
    )
  }

  const renderItem = ({ item }) => <Item item={item}/>

  return (
     <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item._id}
    />
  )
}


const styles = StyleSheet.create({
  renderItemStyle: {
    color: '#000',
    marginBottom: 10,
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.light.blue,
    padding: 5,
    paddingBottom: 30

  },
  text: {
    paddingVertical: 3,
    fontSize: 18,
    fontWeight: '300',
  },
  title: {
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: '700',
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
    padding: 10,
    fontSize: 16,
    marginVertical: 4,
    borderRadius: 6,
    overflow: 'hidden'
  },
  content: {},
})
