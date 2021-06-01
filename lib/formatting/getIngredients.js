const getIngredients = object => {
  let ingredients = [];

  for (let i = 1; i < 16; i++) {
    if (object[`strIngredient${i}`] !== '') {
        let ingredient = {
          name: object[`strIngredient${i}`],
          measure: object[`strMeasure${i}`] !== '' ? object[`strMeasure${i}`] : null
        }
        if (ingredient.name) {
          ingredients.push(ingredient);
        }
    }
  }

  return ingredients;
}

export default getIngredients;
