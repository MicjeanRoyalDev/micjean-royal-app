import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBreakpoint } from "~/hooks/useBreakpoint";
import { SidebarContent } from "~/components/SidebarContent";
import { Menu, User } from "lucide-react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Drawer } from "react-native-drawer-layout";
import {
  createNavigationContainerRef,
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
import { HomePageParamList } from "~/lib/navigation";

const Stack = createStackNavigator();
const navigationRef = createNavigationContainerRef<HomePageParamList>();

function AppStackNavigator({ expanded, setExpanded }: SidebarNavigatorProps) {
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
              onPress={() => setExpanded(!expanded)}
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

function DrawerNavigator({ expanded, setExpanded }: SidebarNavigatorProps) {
  return (
    <Drawer
      open={expanded}
      onOpen={() => setExpanded(true)}
      onClose={() => setExpanded(false)}
      drawerPosition="left"
      renderDrawerContent={() => {
        const navigate = (screenName: keyof HomePageParamList) => {
          navigationRef.navigate(screenName);
          setExpanded(false);
        };
        return <SidebarContent navigate={navigate} isExpanded={true} onToggleExpand={() => setExpanded(!expanded)} />;
      }}
      drawerStyle={{ width: 288 }}
    >
      <AppStackNavigator expanded={expanded} setExpanded={setExpanded} />
    </Drawer>
  );
}

type SidebarNavigatorProps = {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
};

function TabletNavigator({ expanded, setExpanded }: SidebarNavigatorProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const safeAreaBgColor = isDark ? "#08080A" : "#FFFFFF";

  const navigate = (screenName: keyof HomePageParamList) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(screenName);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: safeAreaBgColor,
      }}
    >
      <SidebarContent
        isExpanded={expanded}
        onToggleExpand={() => setExpanded(!expanded)}
        navigate={navigate}
      />
      <View style={{ flex: 1 }}>
        <AppStackNavigator expanded={expanded} setExpanded={setExpanded} />
      </View>
    </SafeAreaView>
  );
}

export function HomeScreen() {
  const { isLargeScreen } = useBreakpoint();

  const [isExpanded, setExpanded] = useState(isLargeScreen);

  const content = isLargeScreen ? (
    <TabletNavigator expanded={isExpanded} setExpanded={setExpanded} />
  ) : (
    <DrawerNavigator expanded={isExpanded} setExpanded={setExpanded} />
  );

  return (
    <NavigationIndependentTree>
      <NavigationContainer ref={navigationRef}>{content}</NavigationContainer>
    </NavigationIndependentTree>
  );
}
