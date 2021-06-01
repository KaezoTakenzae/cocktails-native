import React from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

import { Text, View } from 'components/Themed';
import IngredientsList from './IngredientsList';

export default function CocktailCard({data, ingredients, viewDetails}) {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  let {
    strDrink,
    strDrinkThumb,
    idDrink
  } = data;
  return (
    <View style={styles.root}>
      <TouchableCmp onPress={viewDetails} useForeground>
        <View>
          <View style={styles.mainContent}>
            <Text style={styles.title}>{strDrink}</Text>
            <Image style={styles.image} source={{ uri: strDrinkThumb }} />
          </View>
          {ingredients ? <IngredientsList data={ingredients} shortList /> : null}
        </View>
      </TouchableCmp>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  mainContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    height: 50,
    width: 50,
    width: '20%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '80%'
  }
});
