import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen, {RootStackParamList} from './screens/SearchScreen';
import './utils/i18n';
import BookDetailsScreen from './screens/BookDetailsScreen';
import {useTranslation} from 'react-i18next';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const {t} = useTranslation('book');

  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: '#3f3f3f'},
            headerTintColor: 'white',
            contentStyle: {backgroundColor: '#333333'},
          }}
        >
          <Stack.Screen
            name='SearchBooks'
            component={SearchScreen}
            options={{title: t('Livro Espírita')}}
          />
          <Stack.Screen
            name='BookDetails'
            component={BookDetailsScreen}
            options={{title: t('Livro Espírita')}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
