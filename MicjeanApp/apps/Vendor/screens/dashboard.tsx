import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Standard navigation hook
import { useAuth } from "~/context/auth";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { OrderCard } from "~/components/OrderCard";
import { OrderListItem, Paginated } from "~/api/types";
import {
  ArrowUp,
  ArrowDown,
  User,
  DollarSign,
  ClipboardList,
  ChevronRight,
} from "lucide-react-native";
import { fetchOrders } from "~/api/dummy";
import { apiClient } from "~/api";

// --- Static Data (can be replaced with API data later) ---
const topStatsData = [
  {
    title: "Total Revenue",
    amount: "$10,243.00",
    change: "+32.40%",
    changeType: "increase",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    amount: "2,350",
    change: "-12.40%",
    changeType: "decrease",
    icon: ClipboardList,
  },
  {
    title: "Total Customers",
    amount: "1,234",
    change: "+2.40%",
    changeType: "increase",
    icon: User,
  },
];

const mostOrderedData = [
  {
    name: "Spicy seasoned seafood noodles",
    orders: 200,
    image: require("~/assets/images/tilapia pic for mock data.jpeg"),
  },
  {
    name: "Salted pasta with mushroom sauce",
    orders: 120,
    image: require("~/assets/images/tilapia pic for mock data.jpeg"),
  },
  {
    name: "Beef dumpling in hot and sour soup",
    orders: 80,
    image: require("~/assets/images/tilapia pic for mock data.jpeg"),
  },
];

const orderTypesData = [
  { type: "Dine In", count: 200, progress: 45, color: "bg-primary" },
  { type: "To Go", count: 122, progress: 25, color: "bg-accent-2" },
  { type: "Delivery", count: 264, progress: 30, color: "bg-accent-3" },
];

// --- Sub-Components for a Cleaner Structure ---

const StatCard = ({ stat }: { stat: (typeof topStatsData)[0] }) => {
  const isIncrease = stat.changeType === "increase";
  const changeColor = isIncrease ? "text-success" : "text-destructive";

  return (
    <Card className="flex-1 min-w-[280px]">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <Text className="text-base font-medium text-muted-foreground">
          {stat.title}
        </Text>
        <stat.icon className="text-muted-foreground" size={22} />
      </CardHeader>
      <CardContent>
        <Text className="text-3xl font-bold text-foreground">
          {stat.amount}
        </Text>
        <View className="flex-row items-center">
          {isIncrease ? (
            <ArrowUp size={16} className={changeColor} />
          ) : (
            <ArrowDown size={16} className={changeColor} />
          )}
          <Text className={`ml-1 text-sm ${changeColor}`}>{stat.change}</Text>
          <Text className="text-sm text-muted-foreground">
            {" "}
            from last month
          </Text>
        </View>
      </CardContent>
    </Card>
  );
};

const RecentOrdersSection = ({
  orders,
  isLoading,
  error,
}: {
  orders: OrderListItem[];
  isLoading: boolean;
  error: string | null;
}) => {
  const navigation = useNavigation();

  const renderContent = () => {
    if (isLoading) {
      return (
        <ActivityIndicator size="large" color="#a1a1aa" className="my-10" />
      );
    }
    if (error) {
      return (
        <Text className="text-center text-destructive py-10">{error}</Text>
      );
    }
    if (orders.length === 0) {
      return (
        <Text className="text-center text-muted-foreground py-10">
          No recent orders found.
        </Text>
      );
    }
    return (
      <View className="gap-y-0">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onPress={() => {
              /* Can navigate to order detail here */
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <View className="flex-col md:flex-row">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Pressable
          className="flex-row items-center active:opacity-70"
          onPress={() => navigation.navigate("Orders" as never)}
        >
          <Text className="text-sm font-semibold text-primary">View all</Text>
          <ChevronRight size={16} className="text-primary" />
        </Pressable>
      </CardHeader>
      {renderContent()}
    </View>
  );
};

// --- Main Dashboard Screen ---

export default function DashboardScreen() {
  const [recentOrders, setRecentOrders] = useState<OrderListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        // const data = await apiClient.fetchOrders({
        //   limit: 5,
        //   page: 1,
        //   status: 'active',
        // });
        // setRecentOrders(data.items);
        const recentOrders = await fetchOrders({
          limit: 5,
          page: 1,
          status: "active",
        }); // Simulated API call
        setRecentOrders(recentOrders.items);
      } catch (e) {
        setError("Could not load recent orders.");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecentOrders();
  }, []);

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 md:p-6 gap-y-6">
        {/* Header */}
        <View>
          <Text className="text-xl font-bold text-foreground">
            Here's a summary of your restaurant's activity.
          </Text>
        </View>

        {/* Responsive Stats Section */}
        <View className="flex-col md:flex-row gap-4 mb-4">
          {topStatsData.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </View>

        {/* Dynamic Recent Orders Section */}
        <RecentOrdersSection
          orders={recentOrders}
          isLoading={isLoading}
          error={error}
        />

        {/* Responsive Bottom Section */}
        <View className="flex-col lg:flex-row gap-4">
          {/* Most Ordered */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Most Ordered Dishes</CardTitle>
            </CardHeader>
            <CardContent className="gap-y-5">
              {mostOrderedData.map((item, index) => (
                <View key={index} className="flex-row items-center">
                  <Image
                    source={item.image}
                    className="w-10 h-10 rounded-lg mr-4"
                  />
                  <View className="flex-1">
                    <Text
                      className="font-semibold text-foreground"
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                    <Text className="text-sm text-muted-foreground">
                      {item.orders} orders
                    </Text>
                  </View>
                </View>
              ))}
            </CardContent>
          </Card>

          {/* Most Type of Order */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Order Types Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="gap-y-4">
              {orderTypesData.map((item, index) => (
                <View key={index}>
                  <View className="flex-row justify-between mb-1">
                    <Text className="font-medium text-foreground">
                      {item.type}
                    </Text>
                    <Text className="text-sm text-muted-foreground">
                      {item.count} customers
                    </Text>
                  </View>
                  <Progress
                    value={item.progress}
                    indicatorClassName={item.color}
                  />
                </View>
              ))}
            </CardContent>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}
