"use client"; // Client-side component banane ke liye
import React, { createContext, useContext, useState } from 'react';

// Context banayein
type SearchContextType = {
  searchQuery: string;
  handleSearch: (query: string) => void;
};

const SearchContext = createContext<SearchContextType>({
  searchQuery: "",
  handleSearch: () => {},
});

// Custom hook banayein
export const useSearch = () => useContext(SearchContext);

// Provider component banayein
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};