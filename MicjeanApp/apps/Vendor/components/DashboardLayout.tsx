import { useState, ReactNode } from "react";
import { View, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBreakpoint } from "~/hooks/useBreakpoint";
import { SidebarContent } from "~/components/SidebarContent";
import { Menu, User } from "lucide-react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import DashboardScreen from "~/screens/dashboard";
import OrdersScreen from "~/screens/orders";
import MenuScreen from "~/screens/menu";
import ProductsScreen from "~/screens/products";
import CustomersScreen from "~/screens/customers";
import SettingsScreen from "~/screens/settings";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "~/context/auth";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AppStackNavigator() {
  const navigation = useNavigation();
  const { isLargeScreen } = useBreakpoint();
  const { user } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0f172a", shadowOpacity: 0 },
        headerTintColor: "#fff",
        cardStyle: { backgroundColor: "#1e293b" },
        headerLeft: () =>
          !isLargeScreen ? (
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onPress={() => (navigation as any).toggleDrawer()}
            >
              <Menu size={24} color="#fff" />
            </Button>
          ) : null,
        headerRight: () => (
          <View className="mr-4">
            <Avatar alt="user-avatar">
              <AvatarImage source={{ uri: user?.avatarUrl }} />
              <AvatarFallback>
                <User color="#fff" />
              </AvatarFallback>
            </Avatar>
          </View>
        ),
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Customers" component={CustomersScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <SidebarContent others={props} isExpanded={true} />}
      screenOptions={{ headerShown: false, drawerStyle: { width: 288 } }}
    >
      <Drawer.Screen name="App" component={AppStackNavigator} />
    </Drawer.Navigator>
  );
}

export function DashboardLayout() {
  const { isLargeScreen } = useBreakpoint();
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);

  if (isLargeScreen) {
    // --- TABLET LAYOUT ---
    return (
      <SafeAreaView
        style={{ flex: 1, flexDirection: "row", backgroundColor: "#0f172a" }}
      >
        <SidebarContent
          isExpanded={isSidebarExpanded}
          onToggleExpand={() => setSidebarExpanded(!isSidebarExpanded)}
        />
        <View style={{ flex: 1 }}>
          <AppStackNavigator />
        </View>
      </SafeAreaView>
    );
  }

  // --- PHONE LAYOUT ---
  return <DrawerNavigator />;
}