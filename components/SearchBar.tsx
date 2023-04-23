import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import {TextInput} from "react-native"
import useDebounce from '../hooks/useDebounce';
import { StyleSheet } from 'react-native';

interface SearchBarProps {
    onChange: Dispatch<SetStateAction<string>>;
    value: string
}


const SearchBar: FC<SearchBarProps> = ({ onChange, value }) => {

    const [internalValue, setInternalValue] = useState(value)
    const debouncedSearchTerm: string = useDebounce<string>(internalValue, 1000);


    useEffect(
      () => {
        if (debouncedSearchTerm) {
          onChange(debouncedSearchTerm)
        }
      },
      [debouncedSearchTerm]
    );

    return (
    <TextInput
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={setInternalValue}
        value={internalValue}
    />
    );
};

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 50,
    height: 60,
    margin: 12,
    width: 320,
    paddingLeft: 30,
    backgroundColor: "#e8e8e8",
  }
});

export default SearchBar;
