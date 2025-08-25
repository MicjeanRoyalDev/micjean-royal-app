import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    Alert,
    Pressable,
} from "react-native";
import {
    User,
    Clock,
    Hash,
    CheckCircle,
    XCircle,
    AlertTriangle,
    X,
} from "lucide-react-native";

import { useAuth } from "~/context/auth";
import { useColorScheme } from "~/hooks/useColorScheme";
import { fetchOrderById, fetchMenus } from "~/api/dummy";
import { OrderListItem, Paginated, Menu } from "~/api/types";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { getStatusStyles } from "~/lib/orders";

interface OrderDetailsSidebarProps {
    orderId: string | null;
    onClose: () => void;
}

const formatCurrency = (amount: number) => `GHS¢ ${amount.toFixed(2)}`;

export function OrderDetailsSidebar({ orderId, onClose }: OrderDetailsSidebarProps) {
    const { themeColors } = useColorScheme();

    const [order, setOrder] = useState<OrderListItem | null>(null);
    const [unavailableItems, setUnavailableItems] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isActionLoading, setIsActionLoading] = useState(false);

    useEffect(() => {
        if (!orderId) {
            setOrder(null);
            return;
        }

        const loadOrderDetails = async () => {
            setIsLoading(true);
            setOrder(null);
            try {
                const orderDetails = await fetchOrderById(orderId);
                setOrder(orderDetails);

                const allMenus = await fetchMenus({});
                const unavailable = orderDetails.items
                    .filter((item) => {
                        const menuItem = allMenus.items.find((m) => m.name === item.food);
                        return !menuItem || menuItem.status !== "Available";
                    })
                    .map((item) => item.food);
                setUnavailableItems(unavailable);
            } catch (e) {
                console.error(e);
                Alert.alert("Error", "Failed to load order details.");
                onClose();
            } finally {
                setIsLoading(false);
            }
        };

        loadOrderDetails();
    }, [orderId]);

    const handleAcceptOrder = async () => {
        if (!order) return;
        setIsActionLoading(true);
        try {
            // await authClient.post(`/orders/${order.id}/accept`);
            Alert.alert("Success", "Order has been accepted.");
            onClose();
        } catch (err) {
            Alert.alert("Error", "Could not accept the order.");
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleRejectOrder = async () => {
        if (!order) return;
        setIsActionLoading(true);
        try {
            // await authClient.post(`/orders/${order.id}/reject`);
            Alert.alert("Success", "Order has been rejected.");
            onClose();
        } catch (err) {
            Alert.alert("Error", "Could not reject the order.");
        } finally {
            setIsActionLoading(false);
        }
    };

    if (!orderId) {
        return null;
    }

    if (isLoading || !order) {
        return (
            <View className="w-96 bg-card border-l border-border h-full p-6 justify-center items-center">
                <ActivityIndicator size="large" color={themeColors.primary} />
            </View>
        );
    }

    const statusStyles = getStatusStyles(order.status);
    const canAccept = order.status === "placed" && unavailableItems.length === 0;

    return (
        <View className="w-96 bg-card border-l border-border h-full">
            <ScrollView className="p-6" showsVerticalScrollIndicator={false}>
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-2xl font-bold text-foreground">Order Details</Text>
                    <Pressable onPress={onClose} className="p-2 rounded-full hover:bg-accent active:bg-accent/80">
                        <X size={24} className="text-muted-foreground" />
                    </Pressable>
                </View>

                <View className="gap-y-5">
                    <View className="gap-y-3 p-4 rounded-lg border border-border">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-lg font-semibold text-foreground">{order.customerName}</Text>
                            <Badge className={`${statusStyles.bg} border-0`}>
                                <Text className={`font-bold text-sm capitalize ${statusStyles.text}`}>{order.status}</Text>
                            </Badge>
                        </View>
                        <Text className="text-sm text-muted-foreground">ID: {order.id.split('-')[0]}</Text>
                        <Text className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleString()}
                        </Text>
                    </View>

                    <View>
                        <Text className="text-lg font-semibold text-foreground mb-2">Items</Text>
                        <View className="p-4 rounded-lg border border-border">
                            {order.items.map((item, index) => (
                                <View key={index} className={`py-3 ${index < order.items.length - 1 ? 'border-b border-border' : ''}`}>
                                    <Text className="text-base font-semibold text-foreground">{item.food}</Text>
                                    {item.toppings.length > 0 && (
                                        <Text className="text-sm text-muted-foreground">{item.toppings.join(", ")}</Text>
                                    )}
                                    {unavailableItems.includes(item.food) && (
                                        <View className="flex-row items-center mt-1">
                                            <AlertTriangle size={14} className="text-destructive" />
                                            <Text className="text-sm text-destructive ml-1">Unavailable</Text>
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
                    </View>

                    <View className="flex-row justify-between items-center p-4 rounded-lg bg-muted">
                        <Text className="text-lg font-bold text-foreground">Total</Text>
                        <Text className="text-xl font-bold text-foreground">{formatCurrency(order.totalAmount)}</Text>
                    </View>
                </View>

                {order.status === 'placed' && (
                    <View className="mt-8">
                        {unavailableItems.length > 0 && (
                            <Text className="text-center text-sm text-destructive mb-3">
                                Cannot accept order with unavailable items.
                            </Text>
                        )}
                        <View className="flex-row gap-x-4">
                            <Button variant="outline" onPress={handleRejectOrder} className="flex-1" disabled={isActionLoading}>
                                <Text>Reject</Text>
                            </Button>
                            <Button onPress={handleAcceptOrder} className="flex-1" disabled={!canAccept || isActionLoading}>
                                <Text>Accept</Text>
                            </Button>
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}