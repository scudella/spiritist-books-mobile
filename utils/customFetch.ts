import axios from 'axios';
import {Platform} from 'react-native';

// Set your base API URL depending on the environment
const getBaseUrl = (): string => {
  if (__DEV__) {
    // Android Emulator routes 10.0.2.2 to host machine's localhost
    // iOS Simulator can hit localhost directly
    const localhost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
    return `http://${localhost}:5000/api/v1`;
  }

  return 'https://jgrg23lrb2ojkgsme246jwmgje0galhi.lambda-url.sa-east-1.on.aws/api/v1';
};

const customFetch = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default customFetch;
