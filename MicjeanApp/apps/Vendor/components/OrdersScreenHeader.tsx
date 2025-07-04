import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Modal, StyleSheet } from 'react-native';
import { Search, SlidersHorizontal, X } from 'lucide-react-native';
import { useBreakpoint } from '~/hooks/useBreakpoint';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select'; // Assuming this exists

// --- TYPE DEFINITIONS ---
export type FilterStatus = 'active' | 'completed' | 'cancelled';

export type OrdersFilters = {
  status: FilterStatus;
  category?: string; // `undefined` or '' for 'All'
};

interface OrdersScreenHeaderProps {
  initialSearchQuery?: string;
  initialFilters: OrdersFilters;
  foodCategories: string[];
  onSearchChange: (query: string) => void;
  onFilterChange: (filters: OrdersFilters) => void;
}


// --- REUSABLE SUB-COMPONENTS ---

// A reusable button for the status filters
const FilterButton = ({ label, isActive, onPress }: { label: string, isActive: boolean, onPress: () => void }) => (
  <Pressable
    onPress={onPress}
    className={`px-4 py-2 rounded-md ${
      isActive ? 'bg-primary shadow' : 'bg-muted'
    }`}
  >
    <Text className={`font-semibold capitalize ${
      isActive ? 'text-primary-foreground' : 'text-muted-foreground'
    }`}>
      {label}
    </Text>
  </Pressable>
);

// --- MOBILE VIEW ---
function MobileHeader({
  initialSearchQuery = '',
  initialFilters,
  foodCategories,
  onSearchChange,
  onFilterChange,
}: OrdersScreenHeaderProps) {
  const [modalVisible, setModalVisible] = useState(false);
  // Staged filters for the modal, only applied on confirmation
  const [stagedFilters, setStagedFilters] = useState<OrdersFilters>(initialFilters);

  // Sync staged filters when the modal opens
  useEffect(() => {
    if (modalVisible) {
      setStagedFilters(initialFilters);
    }
  }, [modalVisible, initialFilters]);

  const handleApplyFilters = () => {
    onFilterChange(stagedFilters);
    setModalVisible(false);
  };

  const hasChanges = JSON.stringify(stagedFilters) !== JSON.stringify(initialFilters);

  return (
    <>
      <View className="flex-row items-center w-full p-4 gap-x-3 bg-card border-b border-border">
        {/* Search Input */}
        <View className="flex-1 flex-row items-center bg-muted rounded-lg px-3">
          <Search size={20} className="text-muted-foreground" />
          <TextInput
            placeholder="Search by customer name..."
            placeholderTextColor="#a1a1aa" // text-muted-foreground
            className="flex-1 p-2 text-foreground"
            defaultValue={initialSearchQuery}
            onChangeText={onSearchChange}
          />
        </View>

        {/* Filter Button */}
        <Pressable
          onPress={() => setModalVisible(true)}
          className="p-3 bg-muted rounded-lg active:bg-accent"
        >
          <SlidersHorizontal size={20} className="text-foreground" />
        </Pressable>
      </View>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/60">
          <View className="bg-card rounded-t-2xl p-6 h-[55%]">
            {/* Modal Header */}
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-foreground">Filters</Text>
              <Pressable onPress={() => setModalVisible(false)} className="p-2 rounded-full active:bg-muted">
                <X size={24} className="text-muted-foreground" />
              </Pressable>
            </View>

            {/* Status Filter */}
            <View className="mb-6">
              <Text className="text-base font-semibold text-muted-foreground mb-3">Status</Text>
              <View className="flex-row gap-x-3">
                {(['active', 'completed', 'cancelled'] as FilterStatus[]).map((status) => (
                  <FilterButton
                    key={status}
                    label={status}
                    isActive={stagedFilters.status === status}
                    onPress={() => setStagedFilters(prev => ({ ...prev, status }))}
                  />
                ))}
              </View>
            </View>

            {/* Category Filter */}
            <View className="mb-8">
              <Text className="text-base font-semibold text-muted-foreground mb-3">Food Category</Text>
              <Select
                onValueChange={(option) => {
                  const value = typeof option === 'string' ? option : option?.value;
                  setStagedFilters(prev => ({
                    ...prev,
                    category: value === 'all' ? undefined : value
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" label="All Categories">All Categories</SelectItem>
                  {foodCategories.map((cat) => (
                    <SelectItem key={cat} value={cat} label={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </View>

            {/* Apply Button */}
            <Pressable
              onPress={handleApplyFilters}
              disabled={!hasChanges}
              className={`w-full py-4 rounded-lg ${
                hasChanges ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <Text className={`text-center font-bold text-lg ${
                hasChanges ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}>
                Apply Filters
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

// --- TABLET / LARGE SCREEN VIEW ---
function TabletHeader({
  initialSearchQuery = '',
  initialFilters,
  foodCategories,
  onSearchChange,
  onFilterChange,
}: OrdersScreenHeaderProps) {
  return (
    <View className="flex-row items-center w-full p-4 gap-x-6 bg-card border-b border-border">
      {/* Search Input */}
      <View className="flex-1 flex-row items-center bg-muted rounded-lg px-3 max-w-xs">
        <Search size={20} className="text-muted-foreground" />
        <TextInput
          placeholder="Search customers..."
          placeholderTextColor="#a1a1aa"
          className="flex-1 p-2 text-foreground"
          defaultValue={initialSearchQuery}
          onChangeText={onSearchChange}
        />
      </View>

      {/* Status Filter */}
      <View className="flex-row items-center gap-x-2">
        {(['active', 'completed', 'cancelled'] as FilterStatus[]).map((status) => (
          <FilterButton
            key={status}
            label={status}
            isActive={initialFilters.status === status}
            onPress={() => onFilterChange({ ...initialFilters, status })}
          />
        ))}
      </View>

      {/* Spacer */}
      <View className="flex-1" />

      {/* Category Filter */}
      <View className="w-52">
         <Select
            value={
              initialFilters.category
                ? { value: initialFilters.category, label: initialFilters.category }
                : undefined
            }
            onValueChange={(option) => {
              const value = typeof option === 'string' ? option : option?.value;
              onFilterChange({ ...initialFilters, category: value === 'all' ? undefined : value });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" label="All Categories">All Categories</SelectItem>
              {foodCategories.map((cat) => (
                <SelectItem key={cat} value={cat} label={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
      </View>
    </View>
  );
}


// --- MAIN EXPORTED COMPONENT ---
export function OrdersScreenHeader(props: OrdersScreenHeaderProps) {
  const { isLargeScreen } = useBreakpoint();

  return isLargeScreen ? <TabletHeader {...props} /> : <MobileHeader {...props} />;
}