import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Pressable,
  BackHandler, // Import BackHandler
} from 'react-native';
import { PlusCircle } from 'lucide-react-native';

import { useAuth } from '~/context/auth';
import { fetchCategories, fetchMenus } from '~/api/dummy';
import { Category, Menu, MenuStatus, NewMenu, Paginated } from '~/api/types';
import { useBreakpoint } from '~/hooks/useBreakpoint';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { MenuEditSidebar } from '~/components/MenuEditSidebar';
import { showSuccessToast } from '~/components/toasts/SuccessToast';
import { useLoaderState } from '~/hooks/useLoaderState';
import { MenuDetailView } from '~/components/MenuDetailView';
import { MenuScreenHeader } from '~/components/MenuScreenHeader';
import { MenuCard } from '~/components/MenuCard';

// --- HELPER COMPONENTS & CONFIG ---

export default function MenuScreen() {
  const { authClient } = useAuth();
  const { isLargeScreen } = useBreakpoint();

  const { data: categories, isLoading: isLoadingCategories } = useLoaderState<Paginated<Category>>(true, async () => {
    const result = await fetchCategories();
    return result;
  });
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { data: menus, isLoading: isLoadingMenus } = useLoaderState<Paginated<Menu>>(!!selectedCategory, async () => {
    const result = await fetchMenus({ categoryId: selectedCategory?.id! });
    return result;
  });
  const [activeMenu, setActiveMenu] = useState<Menu | NewMenu | null>(null); // For mobile detail view
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onBackPress = () => {
      if (activeMenu) {
        setActiveMenu(null);
        return true;
      }

      if (selectedCategory) {
        setSelectedCategory(null);
        return true;
      }

      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => subscription.remove();
  }, [isLargeScreen, activeMenu, selectedCategory]);

  const handleMenuPress = (menu: Menu) => {
    setActiveMenu(menu);
  };

  const handleCreateMenuPress = () => {

    setActiveMenu({
      name: '',
      categoryId: selectedCategory?.id || '',
      status: 'Hidden',
      description: '',
      price: 15,
      imageUrl: 'https://via.placeholder.com/150',
    });
  };

  const handleSaveMenu = async (menuToSave: Menu | NewMenu) => {
    try {
      let response;
      if ("id" in menuToSave) {
        response = await authClient.post(`/menus/${menuToSave.id}`, menuToSave);
      } else {
        response = await authClient.post(`/menus`, menuToSave);
      }
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to save menu");
      }

      showSuccessToast("Menu saved successfully!");
    } catch (e) {
      setError("Failed to save menu.");
    } finally {
      setActiveMenu(null);
    }
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item)}
      className={`p-4 border-b border-border ${selectedCategory?.id === item.id ? 'bg-accent' : ''}`}
    >
      <Text className="text-lg text-foreground">{item.name}</Text>
    </TouchableOpacity>
  );

  const CategoryList = () => (
    <View className={isLargeScreen ? "w-1/4 border-r border-border bg-card" : "flex-1 bg-card"}>
      {isLoadingCategories ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={categories?.items || []}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );

  const MenuGrid = () => (
    <View className="flex-1 p-4">
      {isLoadingMenus ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      ) : menus?.items?.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-muted-foreground text-lg">No menus in this category.</Text>
        </View>
      ) : (
        <FlatList
          data={menus?.items || []}
          renderItem={({ item }) => <MenuCard item={item} onPress={handleMenuPress} />}
          keyExtractor={(item) => item.id}
          numColumns={isLargeScreen ? 2 : 1}
          contentContainerClassName="pb-24"
        />
      )}
    </View>
  );

  const renderContent = () => {
    if (isLargeScreen) {
      return (
        <>
          <CategoryList />
          <View className="flex-1">
            {selectedCategory ? <MenuGrid /> : (
              <View className="flex-1 justify-center items-center">
                <Text className="text-muted-foreground text-xl">Select a category to view menus</Text>
              </View>
            )}
          </View>
        </>
      );
    }

    // Mobile View
    if (activeMenu && 'id' in activeMenu) {
      const category = selectedCategory ?? categories?.items.find(c => c.id === activeMenu.categoryId);
      return <MenuDetailView menu={{...activeMenu, category}} onEditPress={() => setActiveMenu(activeMenu)} />;
    }
    return selectedCategory ? <MenuGrid /> : <CategoryList />;
  };


  if (error) {
    return <View className="flex-1 justify-center items-center"><Text className="text-destructive">{error}</Text></View>;
  }

  return (
    <View className="flex-1 bg-background">
      <MenuScreenHeader
        selectedCategory={selectedCategory}
        onCategoryDeselected={() => {
          setActiveMenu(null);
          setSelectedCategory(null);
        }}
        onMenuDeselected={() => {
          setActiveMenu(null);
        }}
      />
      <View className="flex-1 flex-row">
        {renderContent()}
      </View>
      {isLargeScreen && activeMenu && categories && (
        <MenuEditSidebar
          menu={activeMenu}
          categories={categories.items}
          onClose={() => setActiveMenu(null)}
          onSave={handleSaveMenu}
        />
      )}
    </View>
  );
}