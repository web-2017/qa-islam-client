import React, {useState} from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'

export default function InputSearch({searchText, setSearchText}: {searchText: String, setSearchText: Function}) {
  
  return (
    <View>
      {/* input */}
      <View style={styles.searchInput}>
        <TextInput
          placeholder='Поиск'
          onChangeText={text => setSearchText(text)}
          defaultValue={searchText as string}
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
    padding: 7
  },
})
