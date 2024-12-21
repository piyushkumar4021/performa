'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

type TSearchContextProviderProps = {
  children: ReactNode;
};
type TSearchContext = {
  query: string;
  handleChangeQuery: (newQuery: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: TSearchContextProviderProps) {
  const [query, setQuery] = useState('');

  const handleChangeQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <SearchContext.Provider value={{ query, handleChangeQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      'useSearchContext must be used within an SearchContextProvider. Ensure that your component is wrapped inside the SearchContextProvider in the component tree.'
    );
  }

  return context;
};
