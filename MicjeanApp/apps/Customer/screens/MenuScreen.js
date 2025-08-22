import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import DishGrid from '../components/DishGrid';
import { menu } from '../../../backend/supabase/menu';

const MenuScreen = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('menu');
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await menu.getAllCategories();
        if (result.error) {
          console.error('Error fetching categories:', result.error);
        } else {
          setCategories(result.data);
          // Set the first category as active by default
          if (result.data.length > 0) {
            setActiveCategory(result.data[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch dishes when category changes
  useEffect(() => {
    if (activeCategory) {
      const fetchDishes = async () => {
        setLoading(true);
        try {
          const result = await menu.getMenuItemsByCategory(activeCategory);
          if (result.error) {
            console.error('Error fetching dishes:', result.error);
            setDishes([]);
          } else {
            setDishes(result.data);
          }
        } catch (error) {
          console.error('Error fetching dishes:', error);
          setDishes([]);
        } finally {
          setLoading(false);
        }
      };

      fetchDishes();
    }
  }, [activeCategory]);

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'home') {
      navigation.navigate('Home');
    } else if (tabId === 'menu') {
      navigation.navigate('Menu');
    }
  };

  // Filter dishes based on search
  const filteredDishes = dishes.filter(dish => 
    dish.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.menuTitle}>Menu</Text>
      <SearchBar value={search} onChangeText={setSearch} />
      {categories.length > 0 && (
        <CategoryTabs 
          categories={categories} 
          activeCategory={activeCategory} 
          onCategoryPress={setActiveCategory} 
        />
      )}
      <ScrollView contentContainerStyle={styles.dishesGrid} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color='#069910ff' style={styles.spinner} />
        ) : filteredDishes.length > 0 ? (
          <DishGrid 
            dishes={filteredDishes} 
          />
        ) : (
          <Text style={styles.noDataText}>
            {search ? 'No dishes found matching your search' : 'No dishes available'}
          </Text>
        )}
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
  spinner: {
    marginTop: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default MenuScreen;
