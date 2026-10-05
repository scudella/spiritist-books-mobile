import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import BooksContainer from '../components/BooksContainer';
import SearchContainer from '../components/SearchContainer';
import customFetch from '../utils/customFetch';
import axiosError from '../utils/axiosError';

export type RootStackParamList = {
  SearchBooks: undefined;
  BookDetails: {bookId: string};
};

export type SearchScreenProps = NativeStackScreenProps<RootStackParamList>;

export interface Book {
  index: string;
  title: string;
  authors: string[];
  spiritualAuthors: string;
  currentPublisher: string;
  publishedYear: string;
  [key: string]: any;
}

export type SearchField =
  | 'title'
  | 'authors'
  | 'spiritualAuthors'
  | 'publishedYear';
export type SearchText = Partial<Record<SearchField, string>>;

interface AllBooksContextType {
  data: {books: Book[]; nbPages: number; totalBooks: number};
  searchParams: SearchText;
  setSearchParams: Dispatch<SetStateAction<SearchText>>;
  handleSearch: (params?: SearchText) => void;
  fetchNextPage: () => void;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  isInitialLoading: boolean;
  handleRefresh: () => void;
}

const AllBooksContext = createContext<AllBooksContextType | undefined>(
  undefined,
);

function SearchScreen() {
  const [data, setData] = useState<{
    books: Book[];
    nbPages: number;
    totalBooks: number;
  }>({books: [], nbPages: 0, totalBooks: 0});

  const [searchParams, setSearchParams] = useState<SearchText>({});
  const [page, setPage] = useState<number>(1);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // Synchronous lock ref to block concurrent fetch calls immediately
  const isFetchingRef = useRef<boolean>(false);

  const fetchBooks = useCallback(
    async (
      params: SearchText = {},
      pageNum = 1,
      append = false,
      isRefresh = false,
    ) => {
      // Prevent concurrent/duplicate requests instantly
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      try {
        if (append) {
          setIsLoadingMore(true);
        } else if (isRefresh) {
          setIsRefreshing(true);
        }

        const activeParams = Object.fromEntries(
          Object.entries(params).filter(([_, val]) => val && val.trim() !== ''),
        );

        const response = await customFetch.get('/books', {
          params: {...activeParams, page: pageNum},
        });

        const newBooks: Book[] = response.data.books || [];

        setData((prevData) => {
          if (!append) {
            return {
              books: newBooks,
              nbPages: response.data.nbPages || 0,
              totalBooks: response.data.totalBooks || 0,
            };
          }

          // Deduplicate books by unique ID/index to prevent key collision warnings
          const existingIds = new Set(prevData.books.map((b) => b.index));
          const uniqueNewBooks = newBooks.filter(
            (b) => !existingIds.has(b.index),
          );

          return {
            books: [...prevData.books, ...uniqueNewBooks],
            nbPages: response.data.nbPages || 0,
            totalBooks: response.data.totalBooks || 0,
          };
        });

        setPage(pageNum);
      } catch (error) {
        const message = axiosError(error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: message,
        });
      } finally {
        isFetchingRef.current = false;
        setIsInitialLoading(false);
        setIsRefreshing(false);
        setIsLoadingMore(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchBooks({}, 1, false);
  }, [fetchBooks]);

  // Handle new search/filters (resets list to page 1)
  const handleSearch = (newParams: SearchText = {}) => {
    setSearchParams(newParams);
    fetchBooks(newParams, 1, false);
  };

  // Pull-to-refresh (resets list to page 1)
  const handleRefresh = () => {
    fetchBooks(searchParams, 1, false, true);
  };

  // Infinite Scroll Trigger (appends next page)
  const fetchNextPage = () => {
    // Only trigger if there are remaining pages and no fetch is in progress
    if (page < data.nbPages && !isFetchingRef.current) {
      fetchBooks(searchParams, page + 1, true);
    }
  };

  return (
    <AllBooksContext.Provider
      value={{
        data,
        searchParams,
        setSearchParams,
        handleSearch,
        fetchNextPage,
        isRefreshing,
        isLoadingMore,
        isInitialLoading,
        handleRefresh,
      }}
    >
      <View style={styles.container}>
        <SearchContainer />
        {isInitialLoading ? (
          <View style={styles.center}>
            <ActivityIndicator size='large' color='#0000ff' />
          </View>
        ) : (
          <BooksContainer />
        )}
      </View>
    </AllBooksContext.Provider>
  );
}
export default SearchScreen;

export const useAllBooksContext = (): AllBooksContextType => {
  const context = useContext(AllBooksContext);
  if (!context) {
    throw new Error(
      'useAllBooksContext must be used within an AllBooksProvider',
    );
  }
  return context;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
