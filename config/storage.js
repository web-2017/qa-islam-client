import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value, nameOfStorage = '@storage') => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(nameOfStorage, jsonValue)
    } catch (e) {
        // saving error
        console.error('AsyncStorage error ', + e)
    }
}
