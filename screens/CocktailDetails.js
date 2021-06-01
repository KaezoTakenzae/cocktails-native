import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, ScrollView } from 'react-native';

import { Text, View } from 'components/Themed';
import IngredientsList from 'components/IngredientsList';
import InstructionsList from 'components/InstructionsList';

import cocktailsAPI from 'lib/api/CocktailsAPI';
import getIngredients from 'lib/formatting/getIngredients';

export default function CocktailDetails(props) {
  const cocktailData = props.route.params;
  const [cocktail, setCocktail] = useState({});
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    cocktailsAPI.getCocktailById(cocktailData.idDrink)
      .then(resp => {
        let drink = resp.drinks[0];
        setCocktail(drink);
        setIngredients(getIngredients(drink));
      })
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: cocktailData.strDrinkThumb }} />
      <View style={styles.basicInfo}>
        <Text style={styles.title}>{cocktail.strAlcoholic}</Text>
        <View>
          <Text style={styles.title}>Drink from a:</Text>
          {cocktail.strGlass !== '' ? <Text style={styles.glassType}>{cocktail.strGlass}</Text> : null}
        </View>
      </View>
      <IngredientsList data={ingredients} />
      <InstructionsList data={cocktail.strInstructions} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 'white'
  },
  image: {
    alignSelf: 'center',
    marginVertical: 20,
    height: 200,
    width: 200
  },
  basicInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  glassType: {
    fontSize: 20,
    fontStyle: 'italic'
  }
});
