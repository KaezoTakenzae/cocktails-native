import sentenceCase from 'lib/formatting/sentenceCase';

test('String is formatted into sentence case correctly', () => {
  expect(sentenceCase('add vodka and kahlua')).toEqual('Add vodka and kahlua');
});
