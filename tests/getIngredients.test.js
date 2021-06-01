import getIngredients from 'lib/formatting/getIngredients';

let cocktail = {
  strIngredient1: 'Vodka',
  strIngredient2: 'Kahlua',
  strIngredient2: 'Double Cream',
  strMeasure1: '1 shot of ',
  strMeasure2: '2 shots of ',
  strMeasure3: 'Top up with '
};

test('Ingredients format correctly', () => {
  let ingredients = getIngredients(cocktail);
  expect(ingredients[0].name).toEqual('Vodka');
});
