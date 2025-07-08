import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
const SearchBar = ({ value, onChangeText, placeholder = "Search for your meal..." }) => {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      <MaterialIcons name="search" size={22} color="#B71C1C" />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    marginTop: 2,
    paddingHorizontal: 12,
    height: 40,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  searchIcon: {
    fontSize: 18,
    color: '#B71C1C',
    marginLeft: 8,
  },
});

export default SearchBar;
