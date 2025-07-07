import React, { useState } from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import DishGrid from '../components/DishGrid';
const MENU_CATEGORIES = [
  { id: 'main', label: 'main dish' },
  { id: 'soups', label: 'soups & stews' },
  { id: 'deserts', label: 'deserts' },
  { id: 'beverages', label: 'beverages' },
];

const MOCK_DISHES = [
  {
    id: 1,
    image: require('../../../shared/assets/images/tilapia pic for mock data.jpeg'),
    name: 'TILAPIA EN SAUCE',
    price: 'Ghc 20.00',
  },
  {
    id: 2,
    image: require('../../../shared/assets/images/tilapia pic for mock data.jpeg'),
    name: 'TILAPIA EN SAUCE',
    price: 'Ghc 20.00',
  },
  {
    id: 3,
    image: require('../../../shared/assets/images/tilapia pic for mock data.jpeg'),
    name: 'TILAPIA EN SAUCE',
    price: 'Ghc 20.00',
  },
  {
    id: 4,
    image: require('../../../shared/assets/images/tilapia pic for mock data.jpeg'),
    name: 'TILAPIA EN SAUCE',
    price: 'Ghc 20.00',
  },
  {
    id: 5,
    image: require('../../../shared/assets/images/tilapia pic for mock data.jpeg'),
    name: 'TILAPIA GRILLED',
    price: 'Ghc 25.00',
  },
  {
    id: 6,
    image: require('../../../shared/assets/images/tilapia pic for mock data.jpeg'),
    name: 'TILAPIA FRIED',
    price: 'Ghc 22.00',
  },
  {
    id: 7,
    image: require('../../../shared/assets/images/tilapia pic for mock data.jpeg'),
    name: 'TILAPIA SPICY',
    price: 'Ghc 30.00',
  },
  {
    id: 8,
    image: require('../../../shared/assets/images/tilapia pic for mock data.jpeg'),
    name: 'TILAPIA STEWED',
    price: 'Ghc 28.00',
  },
];

const MenuScreen = () => {
  const [activeCategory, setActiveCategory] = useState('main');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('menu');
  const navigation = useNavigation();

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'home') {
      navigation.navigate('Home');
    } else if (tabId === 'menu') {
      navigation.navigate('Menu');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.menuTitle}>  </Text>
      <SearchBar value={search} onChangeText={setSearch} />
      <CategoryTabs 
        categories={MENU_CATEGORIES} 
        activeCategory={activeCategory} 
        onCategoryPress={setActiveCategory} 
      />
      <ScrollView contentContainerStyle={styles.dishesGrid} showsVerticalScrollIndicator={false}>
        <DishGrid dishes={MOCK_DISHES} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
  },
  menuTitle: {
    color: '#888',
    fontSize: 16,
    fontWeight: '300',
    marginTop: 10,
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: 24,
  },
  dishesGrid: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 80,
  },
});

export default MenuScreen;
