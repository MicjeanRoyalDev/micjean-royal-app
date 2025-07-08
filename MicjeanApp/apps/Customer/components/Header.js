import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header = ({ userName = "Eren" }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.greeting}>Hello, {userName}</Text>
        <Text style={styles.subGreeting}>Order a delicious meal, right here!</Text>
      </View>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../../shared/assets/images/micjean royal logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#B71C1C',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 30,
  },
  subGreeting: {
    color: 'white',
    fontSize: 12,
    opacity: 1.0,
  },
  logoContainer: {
    width: 70,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default Header;
