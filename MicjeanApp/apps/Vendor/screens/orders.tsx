import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert } from "react-native";

import { useAuth } from "~/context/auth";
import { useDebounce } from "~/hooks/useDebounce";
import { OrderListItem, Paginated } from "~/api/types";

import {
  OrdersScreenHeader,
  OrdersFilters,
} from "~/components/OrdersScreenHeader";
import { OrderCard } from "~/components/OrderCard";
import { ListPagination } from "~/components/ListPagination";
import { fetchOrders } from "~/api/dummy";
import { useColorScheme } from "~/hooks/useColorScheme";

const FOOD_CATEGORIES = [
  "Pizza",
  "Burgers",
  "Salads",
  "Main Dishes",
  "Drinks",
  "Desserts",
  "Starters",
];

// --- MAIN SCREEN COMPONENT ---

export default function OrdersScreen() {
  const { authClient } = useAuth();
  const { themeColors } = useColorScheme();

  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<OrdersFilters>({ status: "active" });
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, filters]);

  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true);
      setError(null);

      const params: Record<string, any> = {
        page: currentPage,
        limit: pageSize,
        status: filters.status,
      };
      if (debouncedSearchQuery) {
        params.search = debouncedSearchQuery;
      }
      if (filters.category) {
        params.category = filters.category;
      }

      try {
        // const response = await authClient.get<Paginated<OrderListItem>>('/orders', { params });
        // setOrders(response.data.items);
        // setTotalItems(response.data.total);
        const orders = await fetchOrders(params); // Simulated API call
        setOrders(orders.items);
        setTotalItems(orders.total);
      } catch (e) {
        setError("Failed to fetch orders. Please try again.");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [debouncedSearchQuery, filters, currentPage, pageSize]);

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleOrderPress = (id: string) => {
    Alert.alert("Order Pressed", `Navigate to details for order #${id}.`);
  };

  const renderContent = () => {
    if (isLoading && orders.length === 0) {
      return (
        <View className="flex-1 justify-center items-center p-5">
          {/* The color prop is the correct way to style ActivityIndicator */}
          <ActivityIndicator size="large" color={themeColors["accent-2-foreground"]} />
        </View>
      );
    }
    if (error) {
      return (
        <View className="flex-1 justify-center items-center p-5">
          <Text className="text-muted-foreground text-base text-center">
            {error}
          </Text>
        </View>
      );
    }
    if (orders.length === 0) {
      return (
        <View className="flex-1 justify-center items-center p-5">
          <Text className="text-muted-foreground text-base text-center">
            No orders found.
          </Text>
        </View>
      );
    }
    return (
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        // Horizontal padding is applied to each card, so we only need vertical padding for the list container
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
        renderItem={({ item }) => (
          <OrderCard order={item} onPress={handleOrderPress} />
        )}
        ListFooterComponent={
          <ListPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            isLoading={isLoading}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
          />
        }
      />
    );
  };

  return (
    <View className="flex-1 bg-background px-4">
      <OrdersScreenHeader
        initialSearchQuery={searchQuery}
        initialFilters={filters}
        foodCategories={FOOD_CATEGORIES}
        onSearchChange={setSearchQuery}
        onFilterChange={setFilters}
      />
      {renderContent()}
    </View>
  );
}
