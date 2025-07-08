import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Modal } from 'react-native';
import { Search, SlidersHorizontal, X } from 'lucide-react-native';
import { useBreakpoint } from '~/hooks/useBreakpoint';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { useColorScheme } from '~/hooks/useColorScheme';

export type FilterStatus = 'active' | 'completed' | 'cancelled';

export type OrdersFilters = {
  status: FilterStatus;
  category?: string;
};

interface OrdersScreenHeaderProps {
  initialSearchQuery?: string;
  initialFilters: OrdersFilters;
  foodCategories: string[];
  onSearchChange: (query: string) => void;
  onFilterChange: React.Dispatch<React.SetStateAction<OrdersFilters>>;
}


const FilterButton = ({ label, isActive, onPress }: { label: string, isActive: boolean, onPress: () => void }) => (
  <Pressable
    onPress={onPress}
    className={`px-4 py-2 rounded-md ${isActive ? 'bg-primary shadow' : 'bg-muted'
      }`}
  >
    <Text className={`font-semibold capitalize ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'
      }`}>
      {label}
    </Text>
  </Pressable>
);


function MobileHeader({
  initialSearchQuery = '',
  initialFilters,
  foodCategories,
  onSearchChange,
  onFilterChange,
}: OrdersScreenHeaderProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { themeColors } = useColorScheme();
  
  return (
    <>
      <View className="flex-row items-center w-full p-4 gap-x-3 bg-card border-b border-border">
        {/* Search Input */}
        <View className="flex-1 flex-row items-center bg-muted rounded-lg px-3">
          <Search size={20} className="text-muted-foreground" />
          <TextInput
            placeholder="Search by customer name..."
            placeholderTextColor={themeColors.mutedForeground}

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
        <MobileHeaderContent
          initialFilters={initialFilters}
          foodCategories={foodCategories}
          onFilterChange={onFilterChange}
          setModalVisible={setModalVisible}
        />
      </Modal>
    </>
  );
}

type MobileHeaderContentProps = {
  initialFilters: OrdersFilters;
  foodCategories: string[];
  onFilterChange: React.Dispatch<React.SetStateAction<OrdersFilters>>;
  setModalVisible: (visible: boolean) => void;
};

function MobileHeaderContent({ initialFilters, foodCategories, onFilterChange, setModalVisible }: MobileHeaderContentProps) {
  const [stagedFilters, setStagedFilters] = useState<{ status?: FilterStatus, category?: string }>({});

  const hasChanges = Object.keys(stagedFilters).length > 0;

  const handleStatusChange = (status: FilterStatus) => {
    setStagedFilters(prev => ({
      ...prev,
      status,
    }));
  }

  const handleCategoryChange = (category: string | undefined) => {
    setStagedFilters(prev => ({
      ...prev,
      category: category,
    }));
  }
  
  const handleApplyFilters = () => {
    onFilterChange(prev => {
      const newFilters = {
        ...prev,
      };
      return newFilters;
    });
    setModalVisible(false);
  };


  return (<View className="flex-1 justify-end bg-black/60">
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
                {(['active', 'completed', 'cancelled'] as const).map((status) => (
                  <FilterButton
                    key={status}
                    label={status}
                    isActive={(stagedFilters.status ?? initialFilters.status) === status}
                    onPress={() => handleStatusChange(status)}
                  />
                ))}
              </View>
            </View>

            {/* Category Filter */}
            <View className="mb-8">
              <Text className="text-base font-semibold text-muted-foreground mb-3">Food Category</Text>
              {/* <Select
                onValueChange={(option) => handleCategoryChange(option?.value)}
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
              </Select> */}
            </View>

            {/* Apply Button */}
            <Pressable
              onPress={handleApplyFilters}
              disabled={false}
              className={`w-full py-4 rounded-lg ${hasChanges ? 'bg-primary' : 'bg-muted'}`}
            >
              <Text className={`text-center font-bold text-lg ${hasChanges ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                Apply Filters
              </Text>
            </Pressable>
          </View>
        </View>)
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