function sentenceCase(string) {
  let newString = string.trim();
  let char1 = newString.substr(0,1);
  newString = `${char1.toUpperCase()}${newString.substr(1)}`;

  return newString;
}

export default sentenceCase;
