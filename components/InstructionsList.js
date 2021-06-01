import React from 'react';
import {
  Image,
  StyleSheet
} from 'react-native';

import { Text, View } from 'components/Themed';

import sentenceCase from 'lib/formatting/sentenceCase';

export default function InstructionsList({data}) {
  if (!data) return null;
  let instructions = data.split('.');
  return (
      <View style={styles.root}>
        <Text style={styles.title}>Instructions: </Text>
        {instructions.map((instruction, i) => instruction.trim() !== '' ? (
          <Text key={i}>
            {i+1}
            {'. '}
            {sentenceCase(instruction)}
            {'.'}
          </Text>
        ) : null)}
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
