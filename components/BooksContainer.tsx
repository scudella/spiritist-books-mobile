import {useNavigation} from '@react-navigation/native';
import Book from './Book';
import type {RootStackParamList} from '../screens/SearchScreen';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../theme/colors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAllBooksContext} from '../context/AllBooksContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BooksContainer = () => {
  const navigation = useNavigation<NavigationProp>();
  const {data, fetchNextPage, isLoadingMore, isRefreshing, handleRefresh} =
    useAllBooksContext();
  const {books, totalBooks} = data;
  const {t} = useTranslation('book');

  if (books.length === 0) {
    return (
      <View style={styles.noBooks}>
        <Text style={styles.text}>
          {t('Não há livros para mostrar') + '...'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.resultText}>
          {totalBooks} {t('livro')}
          {books.length > 1 && 's'}{' '}
          {books.length === 1 ? t('encontrado') : t('encontrados')}
        </Text>
      </View>
      <View style={styles.books}>
        <FlatList
          data={books}
          keyExtractor={(item, index) =>
            item.index?.toString() ?? index.toString()
          }
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.5}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          ListFooterComponent={
            isLoadingMore ? (
              <ActivityIndicator
                size='small'
                color={colors.secondary[400]}
                style={styles.footerLoader}
              />
            ) : null
          }
          renderItem={(itemData) => {
            return (
              <Pressable
                android_ripple={{color: colors.primary['900']}}
                style={({pressed}) => (pressed ? styles.cardPressed : null)}
                onPress={() =>
                  navigation.navigate('BookDetails', {
                    bookId: itemData.item.index,
                  })
                }
              >
                <Book
                  title={itemData.item.title}
                  authors={itemData.item.authors}
                  spiritualAuthors={itemData.item.spiritualAuthors}
                  currentPublisher={itemData.item.currentPublisher}
                  publishedYear={itemData.item.publishedYear}
                  index={itemData.item.index}
                  cover={itemData.item.originalCover}
                />
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
};
export default BooksContainer;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  noBooks: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16,
  },
  textContainer: {
    flex: 1.5,
  },
  resultText: {
    color: colors.secondary[400],
    fontWeight: 'bold',
    fontSize: 18,
    padding: 8,
    margin: 8,
  },
  books: {
    flex: 10,
    marginHorizontal: 2,
    marginBottom: 4,
  },
  text: {
    fontSize: 18,
    color: colors.secondary[400],
  },
  footerLoader: {
    marginVertical: 16,
  },
  cardPressed: {
    opacity: 0.5,
  },
});
