import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './SearchScreen';
import BookDetails from '../components/BookDetails';
import customFetch from '../utils/customFetch';
import {useCallback, useEffect, useState} from 'react';
import axiosError from '../utils/axiosError';
import Toast from 'react-native-toast-message';

type BookDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'BookDetails'
>;

export interface Book {
  index: string;
  title: string;
  authors: string[];
  spiritualAuthors: string[];
  originalPublisher: string;
  currentPublisher: string;
  publishedYear: string;
  copyright: string;
  yearPsychography: string[];
  isbn10: string[];
  isbn13: string[];
  originalCover: string;
  otherCover: string;
  currentCover: string;
}

function BookDetailsScreen({route}: BookDetailsScreenProps) {
  console.log('Book detail screen');
  const [book, setBook] = useState<Book>();
  const bookId = route.params.bookId;

  const fetchSingleBook = useCallback(async () => {
    try {
      const {data} = await customFetch.get(`books/${bookId}`);
      const book: Book = data.book;
      setBook(book);
    } catch (error) {
      const message = axiosError(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
    }
  }, []);

  useEffect(() => {
    fetchSingleBook();
  }, [fetchSingleBook]);

  return book && <BookDetails key={book?.index} {...book} />;
}

export default BookDetailsScreen;
