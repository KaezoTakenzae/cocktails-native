import React from 'react';
import {
  Image,
  StyleSheet
} from 'react-native';

import { Text, View } from 'components/Themed';

export default function IngredientsList({data, shortList = false}) {
  return (
      <View style={shortList ? { ...styles.root, ...styles.shortList } : styles.root}>
        {data.map((ingredient, i) => shortList ? (
          <Text key={i}>
            {ingredient.measure && ingredient.measure !== '' ? ingredient.measure : null}
            {ingredient.name}
            {i === data.length - 1 ? '' : ', '}
          </Text>
        ) : (
          <Text key={i}>
            {ingredient.measure && ingredient.measure !== '' ? ingredient.measure : null}
            {ingredient.name}
          </Text>
        ))}
      </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 8
  },
  shortList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
