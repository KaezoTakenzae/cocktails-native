import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { View } from 'components/Themed';

const Search = ({ value, searchFunc }) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textInput}
        onChangeText={searchFunc}
        value={value}
        placeholder='White Russian'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    width: '100%',
    padding: 4
  },
  textInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8
  }
})

export default Search;
