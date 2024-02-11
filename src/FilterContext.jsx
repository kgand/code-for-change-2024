// FilterContext.js
import React, { createContext, useState, useContext } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedTags, setSelectedTags] = useState({
    gender: '',
    clothingType: ''
  });

  return (
    <FilterContext.Provider value={{ selectedTags, setSelectedTags }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);