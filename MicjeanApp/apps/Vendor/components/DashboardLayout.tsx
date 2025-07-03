import { useState, ReactNode } from "react";
import { View, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBreakpoint } from "~/hooks/useBreakpoint";
import { SidebarContent } from "~/components/SidebarContent";
import { Menu, User } from "lucide-react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  createNavigationContainerRef,
  DrawerActions,
  NavigationContainer,
  NavigationIndependentTree,
  useNavigation,
} from "@react-navigation/native";
import DashboardScreen from "~/screens/dashboard";
import OrdersScreen from "~/screens/orders";
import MenuScreen from "~/screens/menu";
import ProductsScreen from "~/screens/products";
import CustomersScreen from "~/screens/customers";
import SettingsScreen from "~/screens/settings";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "~/context/auth";
import { useColorScheme } from "nativewind";
import {
  AppDrawerNavigationProp,
  HomePageNavigationProp,
  HomePageParamList,
} from "~/lib/navigation";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AppStackNavigator() {
  const navigation = useNavigation<AppDrawerNavigationProp>();
  const { isLargeScreen } = useBreakpoint();
  const { user } = useAuth();
  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  const headerStyle = {
    backgroundColor: isDark ? "#08080A" : "#FFFFFF",
    shadowOpacity: 0,
  };

  const headerTintColor = isDark ? "#FAFAFA" : "#08080A";
  const cardStyle = { backgroundColor: isDark ? "#08080A" : "#FFFFFF" };
  const iconColor = isDark ? "#FAFAFA" : "#08080A";

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle,
        headerTintColor,
        cardStyle,
        headerLeft: () =>
          !isLargeScreen ? (
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onPress={() => navigation.toggleDrawer()}
            >
              <Menu size={24} color={iconColor} />
            </Button>
          ) : null,
        headerRight: () => (
          <View className="mr-4">
            <Avatar alt="user-avatar">
              <AvatarImage source={{ uri: user?.avatarUrl }} />
              <AvatarFallback>
                <User color={iconColor} />
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
      drawerContent={({ navigation }) => {
        const navigate = (screenName: keyof HomePageParamList) => {
          navigation.dispatch(DrawerActions.closeDrawer());
          navigation.navigate("Home", { screen: screenName });
        };
        return <SidebarContent navigate={navigate} isExpanded={true} />;
      }}
      screenOptions={{ headerShown: false, drawerStyle: { width: 288 } }}
    >
      <Drawer.Screen name="Home" component={AppStackNavigator} />
    </Drawer.Navigator>
  );
}

const tabletNavigationRef = createNavigationContainerRef<HomePageParamList>();

function TabletNavigator() {
  const { colorScheme } = useColorScheme();
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const isDark = colorScheme === "dark";
  const safeAreaBgColor = isDark ? "#08080A" : "#FFFFFF";

  const navigate = (screenName: keyof HomePageParamList) => {
    if (tabletNavigationRef.isReady()) {
      tabletNavigationRef.navigate(screenName);
    }
  };

  return (
    <NavigationIndependentTree>
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: safeAreaBgColor,
        }}
      >
        <SidebarContent
          isExpanded={isSidebarExpanded}
          onToggleExpand={() => setSidebarExpanded((prev) => !prev)}
          navigate={navigate}
        />
        <View style={{ flex: 1 }}>
          <NavigationContainer ref={tabletNavigationRef}>
            <AppStackNavigator />
          </NavigationContainer>
        </View>
      </SafeAreaView>
    </NavigationIndependentTree>
  );
}

export function DashboardLayout() {
  const { isLargeScreen } = useBreakpoint();

  if (isLargeScreen) {
    return <TabletNavigator />;
  }

  return <DrawerNavigator />;
}
