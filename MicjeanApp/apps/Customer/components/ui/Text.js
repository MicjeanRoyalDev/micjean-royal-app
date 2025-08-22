import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

export default function Text({ h1, h2, h3, h4, style, children, ...rest }) {
  let variantStyle = null;
  if (h1) variantStyle = styles.h1;
  else if (h2) variantStyle = styles.h2;
  else if (h3) variantStyle = styles.h3;
  else if (h4) variantStyle = styles.h4;

  return (
    <RNText {...rest} style={[variantStyle, style]}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 32, fontWeight: '700' },
  h2: { fontSize: 28, fontWeight: '700' },
  h3: { fontSize: 24, fontWeight: '700' },
  h4: { fontSize: 20, fontWeight: '700' },
});


