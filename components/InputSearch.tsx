import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';

import Colors from '../constants/Colors'

export default function InputSearch({searchText, setSearchText}: {searchText: string, setSearchText: Function}) {
  
  return (
    <View>
      {/* input */}
      <View>
        <TextInput
            label="Поиск"
            value={searchText}
            onChangeText={text => setSearchText(text)}
            dense
            clearButtonMode={'always'}
        />
      </View>
    </View>
   
  )
}

const styles = StyleSheet.create({
  searchInput: {
    borderColor: Colors.light.green,
    borderWidth: 1,
    borderRadius: 4,
    padding: 7,
  },
})
