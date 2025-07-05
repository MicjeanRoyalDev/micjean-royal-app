import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { OrderListItem } from '~/api/types';

const getStatusStyles = (status: OrderListItem['status']) => {
  switch (status) {
    case 'completed':
      return {
        bg: 'bg-primary',
        text: 'text-primary-foreground',
      };
    case 'preparing':
      return {
        bg: 'bg-accent-3',
        text: 'text-accent-3-foreground',
      };
    case 'ready':
      return {
        bg: 'bg-accent',
        text: 'text-accent-foreground',
      };
    case 'placed':
      return {
        bg: 'bg-accent-2',
        text: 'text-accent-2-foreground',
      };
    case 'cancelled':
      return {
        bg: 'bg-destructive',
        text: 'text-destructive-foreground',
      };
    default:
      return {
        bg: 'bg-muted',
        text: 'text-muted-foreground',
      };
  }
};

const formatItemsPreview = (items: OrderListItem['items']) => {
  if (!items || items.length === 0) {
    return 'No items';
  }
  const firstItem = items[0];
  const firstItemText = `${firstItem.food}${
    firstItem.toppings.length > 0 ? ` with ${firstItem.toppings[0]}` : ''
  }`;

  if (items.length > 1) {
    return `${firstItemText}... and ${items.length - 1} more`;
  }
  return firstItemText;
};

const formatCurrency = (amount: number) => {
  // TODO - update later
  return `GHS¢ ${amount.toFixed(2)}`;
};

interface OrderCardProps {
  order: OrderListItem;
  onPress: (id: string) => void;
}

export function OrderCard({ order, onPress }: OrderCardProps) {
  const statusStyles = getStatusStyles(order.status);

  // For a better UX, you would use a library like 'date-fns' to show "5 minutes ago"
  // For now, we'll just show the time.
  const displayTime = new Date(order.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Pressable
      onPress={() => onPress(order.id)}
      className="bg-card border border-border rounded-lg p-4 mb-4 active:bg-accent/80"
    >
      <View className="flex flex-col gap-y-3">
        {/* Top Row: Customer Name and Time */}
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold text-foreground">
            {order.customerName}
          </Text>
          <Text className="text-sm text-muted-foreground">{displayTime}</Text>
        </View>

        {/* Middle Row: Item Summary */}
        <View>
          <Text className="text-base text-muted-foreground" numberOfLines={1}>
            {formatItemsPreview(order.items)}
          </Text>
        </View>

        {/* Bottom Row: Total Amount and Status Badge */}
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-semibold text-foreground">
            {formatCurrency(order.totalAmount)}
          </Text>
          <View
            className={`px-3 py-1 rounded-full ${statusStyles.bg}`}
          >
            <Text
              className={`text-xs font-bold capitalize ${statusStyles.text}`}
            >
              {order.status}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}