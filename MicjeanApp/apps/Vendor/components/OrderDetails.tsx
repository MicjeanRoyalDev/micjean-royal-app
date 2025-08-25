import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    Alert,
} from "react-native";
import {
    User,
    Clock,
    Hash,
    CheckCircle,
    XCircle,
    AlertTriangle,
} from "lucide-react-native";

import { useAuth } from "~/context/auth";
import { useColorScheme } from "~/hooks/useColorScheme";
import { fetchOrderById, fetchMenus } from "~/api/dummy";
import { OrderListItem } from "~/api/types";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { getStatusStyles } from "~/lib/orders";
import { showSuccessToast } from "./toasts/SuccessToast";

const formatCurrency = (amount: number) => `GHS¢ ${amount.toFixed(2)}`;

export default function OrderDetails({ orderId, onClose }: { orderId: string, onClose: () => void }) {
    const { themeColors } = useColorScheme();

    const [order, setOrder] = useState<OrderListItem | null>(null);
    const [unavailableItems, setUnavailableItems] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadOrderDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // const orderDetails = await authClient.get<OrderListItem>(`/orders/${orderId}`);
                // setOrder(orderDetails.data);
                const orderDetails = await fetchOrderById(orderId);
                setOrder(orderDetails);

                // Check menu item availability
                // const allMenus = await authClient.get<Paginated<Menu>>('/menus', { params: { limit: 100 } });
                const allMenus = await fetchMenus({});
                const unavailable = orderDetails.items
                    .filter((item) => {
                        const menuItem = allMenus.items.find((m) => m.name === item.food);
                        return !menuItem || menuItem.status !== "Available";
                    })
                    .map((item) => item.food);
                setUnavailableItems(unavailable);
            } catch (e) {
                setError("Failed to load order details.");
                console.error(e);
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
            showSuccessToast("Order accepted successfully!");
            onClose();
        } catch (err) {
            Alert.alert("Error", "Could not accept the order.");
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleRejectOrder = async () => {
        if (!order) return;
        Alert.alert(
            "Confirm Rejection",
            "Are you sure you want to reject this order?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Reject",
                    style: "destructive",
                    onPress: async () => {
                        setIsActionLoading(true);
                        try {
                            // await authClient.post(`/orders/${order.id}/reject`);
                            showSuccessToast("Order rejected successfully!");
                            onClose();
                        } catch (err) {
                            Alert.alert("Error", "Could not reject the order.");
                        } finally {
                            setIsActionLoading(false);
                        }
                    },
                },
            ]
        );
    };

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-background">
                <ActivityIndicator size="large" color={themeColors.primary} />
            </View>
        );
    }

    if (error || !order) {
        return (
            <View className="flex-1 justify-center items-center bg-background p-4">
                <Text className="text-lg text-destructive">{error || "Order not found."}</Text>
                <Button variant="outline" className="mt-4" onPress={() => onClose()}>
                    Go Back
                </Button>
            </View>
        );
    }

    const statusStyles = getStatusStyles(order.status);
    const canAccept = order.status === "placed" && unavailableItems.length === 0;

    return (
        <ScrollView className="flex-1 bg-background">
            <View className="p-4 gap-y-4">
                {/* Header */}
                <View className="flex-row items-center justify-between">
                    <Text className="text-2xl font-bold text-foreground">Order Details</Text>
                    <Badge className={`${statusStyles.bg} border-0`}>
                        <Text className={`font-bold text-sm capitalize ${statusStyles.text}`}>{order.status}</Text>
                    </Badge>
                </View>

                {/* Customer & Order Info */}
                <Card>
                    <CardContent className="pt-6 gap-y-4">
                        <InfoRow icon={User} label="Customer" value={order.customerName} />
                        <InfoRow icon={Hash} label="Order ID" value={order.id.split('-')[0]} />
                        <InfoRow icon={Clock} label="Time" value={new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} />
                    </CardContent>
                </Card>

                {/* Items Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Ordered Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {order.items.map((item, index) => (
                            <View key={index} className={`py-3 ${index < order.items.length - 1 ? 'border-b border-border' : ''}`}>
                                <Text className="text-base font-semibold text-foreground">{item.food}</Text>
                                {item.toppings.length > 0 && (
                                    <Text className="text-sm text-muted-foreground">
                                        {item.toppings.join(", ")}
                                    </Text>
                                )}
                                {unavailableItems.includes(item.food) && (
                                    <View className="flex-row items-center mt-1">
                                        <AlertTriangle size={14} className="text-destructive" />
                                        <Text className="text-sm text-destructive ml-1">Item is unavailable</Text>
                                    </View>
                                )}
                            </View>
                        ))}
                        <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-border">
                            <Text className="text-lg font-bold text-foreground">Total</Text>
                            <Text className="text-xl font-bold text-foreground">{formatCurrency(order.totalAmount)}</Text>
                        </View>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                {order.status === 'placed' && (
                    <View className="flex-row gap-x-3 mt-2">
                        <View className="flex-1">
                            <Button
                                size="lg"
                                variant="destructive"
                                onPress={handleRejectOrder}
                                disabled={isActionLoading}
                            >
                                <XCircle size={18} className="text-destructive-foreground mr-2" />
                                <Text>Reject</Text>
                            </Button>
                        </View>
                        <View className="flex-1">
                            <Button
                                size="lg"
                                onPress={handleAcceptOrder}
                                disabled={!canAccept || isActionLoading}
                            >
                                {isActionLoading && !canAccept ? <ActivityIndicator color={themeColors.primaryForeground} /> : <CheckCircle size={18} className="text-primary-foreground mr-2" />}
                                <Text>Accept Order</Text>
                            </Button>
                        </View>
                    </View>
                )}
                {unavailableItems.length > 0 && order.status === 'placed' && (
                    <Text className="text-center text-sm text-destructive mt-2">
                        Cannot accept order because some items are unavailable.
                    </Text>
                )}
            </View>
        </ScrollView>
    );
}

const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
    <View className="flex-row items-center">
        <Icon className="text-muted-foreground" size={16} />
        <Text className="text-base text-muted-foreground ml-3 w-24">{label}</Text>
        <Text className="text-base font-semibold text-foreground flex-1" numberOfLines={1}>{value}</Text>
    </View>
);