import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Image as ImageIcon } from 'lucide-react-native';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Menu, MenuStatus, Category } from '~/api/types';

const statusColors: Record<MenuStatus, string> = {
  'Available': 'bg-green-200 border-green-600',
  'Sold Out': 'bg-red-200 border-red-600',
  'Hidden': 'bg-gray-200 border-gray-600',
};

const statusTextColors: Record<MenuStatus, string> = {
  'Available': 'text-green-800',
  'Sold Out': 'text-red-800',
  'Hidden': 'text-gray-800',
};

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <View className="flex-row mb-3 items-start">
    <Text className="w-1/4 text-sm text-muted-foreground font-medium">{label}</Text>
    <View className="flex-1">
      {typeof value === 'string' ? <Text className="text-foreground text-base">{value}</Text> : value}
    </View>
  </View>
);

export const MenuDetailView = ({ menu, onEditPress }: { menu: Menu & { category?: Category }; onEditPress: () => void }) => (
  <View className="flex-1 bg-background">
    <ScrollView showsVerticalScrollIndicator={false} className="p-6">
          <Text className="text-3xl font-bold text-foreground text-center mb-6">{menu.name}</Text>
      {menu.imageUrl ? (
        <Image source={{ uri: menu.imageUrl }} className="w-full h-60 mb-6 rounded-lg bg-muted" />
      ) : (
        <View className="w-full h-60 mb-6 rounded-lg bg-muted items-center justify-center">
          <ImageIcon className="text-muted-foreground" size={48} />
          <Text className="text-muted-foreground mt-2">No Image</Text>
        </View>
      )}
      <View>
        <View className="py-4">
          <View className="space-y-4">
            <DetailRow label="ID" value={menu.id} />
            {menu.category && <DetailRow label="Category" value={menu.category.name} />}
            <DetailRow label="Price" value={`GHS¢ ${menu.price.toFixed(2)}`} />
            <DetailRow label="Status" value={
                <Badge className={`py-1 px-3 self-start ${statusColors[menu.status]}`}>
                    <Text className={`font-semibold ${statusTextColors[menu.status]}`}>{menu.status}</Text>
                </Badge>
            } />
            {menu.description && <DetailRow label="Description" value={menu.description} />}
          </View>
        </View>
      </View>
    </ScrollView>
  </View>
);
