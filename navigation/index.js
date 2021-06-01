/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import Cocktails from 'screens/Cocktails';
import CocktailDetails from 'screens/CocktailDetails';

import Header from './Header';

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cocktails"
        component={Cocktails}
        options={{
          headerTitle: 'Cocktails'
        }}
      />
      <Stack.Screen
        name="CocktailDetails"
        component={CocktailDetails}
        options={(props) => ({
          headerTitle: props.route.params.strDrink
        })}
      />
    </Stack.Navigator>
  );
}
