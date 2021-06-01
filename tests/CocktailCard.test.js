import React from 'react';
import renderer from 'react-test-renderer';
import CocktailCard from 'components/CocktailCard';

let cocktail = {
  strDrinkThumb: '',
  strDrink: 'White Russian'
}

function findInChildren(predicate) {
  return testInstance => {
    const children = testInstance.children
    return Array.isArray(children)
      ? children.some(predicate)
      : predicate(children)
  }
}

it(`renders correctly`, () => {
  const tree = renderer.create(
    <CocktailCard
      data={cocktail}
      viewDetails={() => {}}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it('Drink title is White Russian', () => {
  const tree = renderer.create(
    <CocktailCard
      data={cocktail}
      viewDetails={() => {}}
    />
  );
  const instance = tree.root.findByType('Text');

  expect(instance.props.children).toBe('White Russian');
});

it('Card can be clicked and function will run', () => {
  let btnClicked = false;
  const tree = renderer.create(
    <CocktailCard
      data={cocktail}
      viewDetails={() => { btnClicked = true; }}
    />
  );
  const instance = tree.root.findByProps({ focusable: true });
  instance.props.onClick();

  expect(btnClicked).toBe(true);
});
