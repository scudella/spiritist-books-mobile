import {createContext, Dispatch, SetStateAction, useContext} from 'react';
import {Book, SearchText} from '../screens/SearchScreen';

export interface AllBooksContextType {
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

export const AllBooksContext = createContext<AllBooksContextType | undefined>(
  undefined,
);

export const useAllBooksContext = () => {
  const context = useContext(AllBooksContext);
  if (!context) {
    throw new Error('useAllBooksContext must be used within AllBooksProvider');
  }
  return context;
};
