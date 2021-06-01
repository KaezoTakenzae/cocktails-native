import React, { useState, useEffect } from 'react';
import { TextInput, ScrollView, FlatList, StyleSheet } from 'react-native';

import { View, Text, Button } from 'components/Themed';
import CocktailCard from 'components/CocktailCard';
import Search from 'components/Search';

import cocktailsAPI from 'lib/api/CocktailsAPI';
import getIngredients from 'lib/formatting/getIngredients';

export default function Cocktails(props) {
  const [ cocktails, setCocktails ] = useState([]);
  const [ filteredCocktails, setFilteredCocktails ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ searching, setSearching ] = useState(false);
  const [ searchOpen, setSearchOpen ] = useState(false);
  const [ btnDisabled, setBtnDisabled ] = useState(true);

  useEffect(() => {
    cocktailsAPI.getCategories()
      .then(resp => {
        let str = resp.drinks.filter(item => {
          return item.strCategory.includes('ocktail');
        });
        return str && str !== '' ? str[0].strCategory : 'Cocktail';
      })
      .then(str => {
        cocktailsAPI.filterByCategory(str)
          .then(resp => {
            let cocktails = resp.drinks;
            setCocktails(cocktails);
            setBtnDisabled(false);
          })
      })
      searching.current = false;
  }, []);

  const search = searchTerm => {
    setSearchTerm(searchTerm);
    if (searching) {
      cocktailsAPI.abortRequest();
    }
    if (searchTerm === '') {
      setSearching(false);
      return setFilteredCocktails([]);
    }
    setSearching(true);
    cocktailsAPI.searchByName(searchTerm)
      .then(resp => {
        setSearching(false);
        let searchResults = resp.drinks ? resp.drinks : [];
        setFilteredCocktails(searchResults);
      })
      .catch(err => {
        console.log('Err', err);
      })
  }

  const returnRandomCocktail = () => {
    cocktailsAPI.getRandomCocktail().then(resp => {
      props.navigation.navigate("CocktailDetails", {...resp.drinks[0]})
    })
  }

  const getIngredientsForAll = async () => {
    setBtnDisabled(true);
    let newCocktails = [];
    for (let i = 0, len = cocktails.length; i < len; i++) {
      let resp = await cocktailsAPI.getCocktailById(cocktails[i].idDrink).catch(() => setBtnDisabled(false));
      let newDrink = {
        ...cocktails[i],
        ingredients: getIngredients(resp.drinks[0])
      };
      newCocktails.push(newDrink);
    }
    setCocktails(newCocktails);
  }

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button style={styles.btn} onPress={returnRandomCocktail} title="Get Lucky" />
      ),
    });
  }, [props.navigation]);

  const showFilteredResults = searching || filteredCocktails.length > 0;
  const cocktailsToDisplay = showFilteredResults ? filteredCocktails : cocktails;

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <Button style={styles.btn} onPress={getIngredientsForAll} title="Show Ingredients" disabled={btnDisabled} />
        <Button
          style={styles.btn}
          onPress={() => {
            if (showFilteredResults) {
              setSearchOpen(false);
              search('');
            } else {
              setSearchOpen(!searchOpen)
            }
          }}
          title={showFilteredResults ? "Clear Search" : "Search"}
        />
      </View>
      {
        searchOpen ? (
          <Search searchFunc={search} value={searchTerm} />
        ) : null
      }
      <FlatList
        data={cocktailsToDisplay}
        renderItem={itemData => (
          <CocktailCard
            data={itemData.item}
            ingredients={itemData.item.ingredients}
            viewDetails={() => { props.navigation.navigate("CocktailDetails", {...itemData.item})}}
          />
        )}
        keyExtractor={item => item.idDrink}
      />
      {/* <ScrollView>
        {cocktailsToDisplay.map((cocktail, i) => (
          <CocktailCard
            key={i}
            data={cocktail}
            ingredients={cocktail.ingredients}
            viewDetails={() => { props.navigation.navigate("CocktailDetails", {...cocktail})}}
          />
        ))}
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  flatList: {
    width: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  btn: {
    color: '#00acea'
  }
});
