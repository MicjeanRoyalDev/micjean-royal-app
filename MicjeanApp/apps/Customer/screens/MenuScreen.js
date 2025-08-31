import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,ActivityIndicator} from 'react-native';
import Toast from '../components/Toast';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import DishGrid from '../components/DishGrid';
import { menu } from '../../../backend/supabase/menu';
import menuApi from '../utils/menu';

const MenuScreen = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('menu');
  const [dishes, setDishes] = useState([]);
  const [allDishes, setAllDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 2500);
  };

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await menu.getAllCategories();
        if (result.error) {
          showToast('Error fetching categories', 'error');
        } else {
          setCategories(result.data);
          // Set the first category as active by default
          if (result.data.length > 0) {
            setActiveCategory(result.data[0].id);
          }
        }
      } catch (error) {
        showToast('Error fetching categories', 'error');
      }
    };
    fetchCategories();
  }, []);

  // Fetch all dishes on mount
  useEffect(() => {
    const fetchAllDishes = async () => {
      setLoading(true);
      try {
        const { data, error } = await menuApi.getFullMenu();
        if (error) {
          showToast('Error fetching menu items', 'error');
          setAllDishes([]);
        } else {
          // Flatten all items from all categories
          const flatDishes = (data || []).flatMap(cat => cat.items || []);
          setAllDishes(flatDishes);
        }
      } catch (error) {
        showToast('Error fetching menu items', 'error');
        setAllDishes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllDishes();
  }, []);

  // Update dishes when category or search changes
  useEffect(() => {
    let filtered = allDishes;
    if (activeCategory) {
      filtered = filtered.filter(dish => dish.category_id === activeCategory);
    }
    if (search && search.trim() !== '') {
      const searchTerm = search.trim().toLowerCase();
      filtered = filtered.filter(dish => (dish.name || '').toString().toLowerCase().includes(searchTerm));
    }
    setDishes(filtered);
  }, [allDishes, activeCategory, search]);

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'home') {
      navigation.navigate('Home');
    } else if (tabId === 'menu') {
      navigation.navigate('Menu');
    }
  };

  // No need for filteredDishes, use dishes directly

  return (
    <SafeAreaView style={styles.container}>
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
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
        ) : dishes.length > 0 ? (
          <DishGrid 
            dishes={dishes} 
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
    letterSpacing: 0.5,
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
