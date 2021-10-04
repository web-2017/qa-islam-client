import {Platform} from "react-native";

export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://qa-islam.herokuapp.com'
// export const BASE_URL_ANDROID = 'http://10.0.2.2:5000'
