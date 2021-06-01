/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from 'react';
import { TouchableOpacity, Text as DefaultText, View as DefaultView, StyleSheet } from 'react-native';

import Colors from 'constants/Colors';
import useColorScheme from 'hooks/useColorScheme';

export function useThemeColor(
  props,
  colorName
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function Button(props) {
  const { style, lightColor, darkColor, onPress, title, disabled, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btnContainer, { backgroundColor }, style]}
      disabled={disabled}
      {...otherProps}>
      <Text style={[styles.btnText, { color }, style, disabled ? styles.disabled : null]}>{title}</Text>
    </TouchableOpacity>
  )
}

export function View(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  btnText: {
    fontSize: 18,
    alignSelf: 'center',
  },
  disabled: {
    color: 'grey'
  }
})
