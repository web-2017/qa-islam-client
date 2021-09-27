import React, {useState, useEffect} from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Button } from 'react-native';

import InputSearch from '../components/InputSearch';
import RenderItems from '../components/RenderItems';
import Colors from '../constants/Colors';
import fakeData from '../data/fake-data';
import { RootTabScreenProps } from '../types';

type propsData = {
  question: string,
  answers: [],
  date: Date
}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [searchText, setSearchText] = useState('')
  const [data, setData] = useState<propsData[]>([])

  useEffect(() => {
    setData(fakeData)
  }, [])

  const searchHandler = () => {

    const filteredPost = fakeData.filter((elem) => {
      return elem.question.toLowerCase().includes(searchText.toLowerCase())
    })
    
    setData(filteredPost)
    setSearchText('')
  
  }
  
  const clearResults = () => {
    setData(fakeData)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchTitle}>Введите ваш вопрос</Text>
          <Text style={styles.searchTitle}>{searchText}</Text>
          <InputSearch setSearchText={setSearchText} searchText={searchText} />

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.button}
              onPress={searchHandler}
            >
              <Text style={{textAlign: 'center', color: '#fff'}}>Найти</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={searchHandler}
            >
              <Text style={{textAlign: 'center', color: '#fff'}}
                onPress={clearResults}
              >Сбросить</Text>
            </TouchableOpacity>
          </View>
        </View>

        <RenderItems data={data}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff'
  },
  searchContainer: {
    paddingVertical: 50,
  },
  searchTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'uppercase',
    fontWeight: '700'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: Colors.light.blue,
    padding: 10,
    flex: 1,
    marginRight: 3,
    marginLeft: 3
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
