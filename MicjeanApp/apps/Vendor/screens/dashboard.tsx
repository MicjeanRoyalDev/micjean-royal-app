import { Text, View, ScrollView, Image } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import {
  ArrowUp,
  ArrowDown,
  User,
  DollarSign,
  ClipboardList,
} from "lucide-react-native";

const stats = [
  {
    title: "Total Revenue",
    amount: "$10,243.00",
    change: "+32.40%",
    changeType: "increase",
    icon: DollarSign,
  },
  {
    title: "Total Dish Ordered",
    amount: "23,456",
    change: "-12.40%",
    changeType: "decrease",
    icon: ClipboardList,
  },
  {
    title: "Total Customer",
    amount: "1,234",
    change: "+2.40%",
    changeType: "increase",
    icon: User,
  },
];

const orders = [
  {
    customer: "Eren Jaeger",
    menu: "Spicy seasoned seafood noodles",
    total: "$125",
    status: "Completed",
  },
  {
    customer: "Reiner Braun",
    menu: "Salted pasta with mushroom sauce",
    total: "$145",
    status: "Preparing",
  },
  {
    customer: "Levi Ackerman",
    menu: "Beef dumpling in hot and sour soup",
    total: "$105",
    status: "Pending",
  },
  {
    customer: "Historia Reiss",
    menu: "Hot spicy fried rice with omelet",
    total: "$145",
    status: "Completed",
  },
  {
    customer: "Armin Arlert",
    menu: "Hot spicy fried rice",
    total: "$125",
    status: "Completed",
  },
];

const mostOrdered = [
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

export default function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-background p-4">
      <View className="mb-4">
        <Text className="text-3xl font-bold text-foreground">Dashboard</Text>
        <Text className="text-muted-foreground">Tuesday 2 Feb, 2021</Text>
      </View>

      {/* Stats */}
      <View className="flex-row justify-between mb-4">
        {stats.map((stat, index) => (
          <Card key={index} className="flex-1 mx-2">
            <CardHeader>
              <View className="flex-row items-center justify-between">
                <stat.icon className="text-muted-foreground" size={24} />
                <View
                  className={`flex-row items-center ${
                    stat.changeType === "increase"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {stat.changeType === "increase" ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  )}
                  <Text className="ml-1">{stat.change}</Text>
                </View>
              </View>
            </CardHeader>
            <CardContent>
              <Text className="text-2xl font-bold text-foreground">
                {stat.amount}
              </Text>
              <Text className="text-muted-foreground">{stat.title}</Text>
            </CardContent>
          </Card>
        ))}
      </View>

      {/* Order Report */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Order Report</CardTitle>
        </CardHeader>
        <CardContent>
          <View className="flex-row justify-between mb-2 pb-2 border-b border-border">
            <Text className="w-1/4 text-muted-foreground">Customer</Text>
            <Text className="w-1/4 text-muted-foreground">Menu</Text>
            <Text className="w-1/4 text-muted-foreground text-right">
              Total Payment
            </Text>
            <Text className="w-1/4 text-muted-foreground text-right">
              Status
            </Text>
          </View>
          {orders.map((order, index) => (
            <View key={index} className="flex-row justify-between items-center py-2">
              <Text className="w-1/4 text-foreground">{order.customer}</Text>
              <Text className="w-1/4 text-foreground">{order.menu}</Text>
              <Text className="w-1/4 text-foreground text-right">
                {order.total}
              </Text>
              <Text
                className={`w-1/4 text-right ${
                  order.status === "Completed"
                    ? "text-green-500"
                    : order.status === "Preparing"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {order.status}
              </Text>
            </View>
          ))}
        </CardContent>
      </Card>

      <View className="flex-row">
        {/* Most Ordered */}
        <View className="w-1/2 pr-2">
          <Card>
            <CardHeader>
              <CardTitle>Most Ordered</CardTitle>
            </CardHeader>
            <CardContent>
              {mostOrdered.map((item, index) => (
                <View key={index} className="flex-row items-center mb-4">
                  <Image
                    source={item.image}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <View>
                    <Text className="text-foreground">{item.name}</Text>
                    <Text className="text-muted-foreground">
                      {item.orders} dishes ordered
                    </Text>
                  </View>
                </View>
              ))}
            </CardContent>
          </Card>
        </View>

        {/* Most Type of Order */}
        <View className="w-1/2 pl-2">
          <Card>
            <CardHeader>
              <CardTitle>Most Type of Order</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Donut chart placeholder */}
              <View className="items-center justify-center h-48">
                <Text className="text-muted-foreground">
                  Donut chart coming soon!
                </Text>
              </View>
              <View>
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-foreground">Dine In</Text>
                  <Text className="text-muted-foreground">200 customers</Text>
                </View>
                <Progress value={60} className="h-2 mb-4" />
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-foreground">To Go</Text>
                  <Text className="text-muted-foreground">122 customers</Text>
                </View>
                <Progress value={30} className="h-2 mb-4" />
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-foreground">Delivery</Text>
                  <Text className="text-muted-foreground">264 customers</Text>
                </View>
                <Progress value={80} className="h-2" />
              </View>
            </CardContent>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}