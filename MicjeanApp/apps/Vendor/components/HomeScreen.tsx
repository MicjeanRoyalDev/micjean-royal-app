import { useState } from "react";
import { View } from "react-native";
import { useBreakpoint } from "~/hooks/useBreakpoint";
import { SidebarContent } from "~/components/SidebarContent";
import { Menu, User } from "lucide-react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Drawer } from "react-native-drawer-layout";
import DashboardScreen from "~/screens/dashboard";
import OrdersScreen from "~/screens/orders";
import MenuScreen from "~/screens/menu";
import ProductsScreen from "~/screens/products";
import CustomersScreen from "~/screens/customers";
import SettingsScreen from "~/screens/settings";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "~/context/auth";
import { useColorScheme } from "~/hooks/useColorScheme";

const Stack = createStackNavigator();

function AppStackNavigator({ expanded, setExpanded }: SidebarNavigatorProps) {
  const { isLargeScreen } = useBreakpoint();
  const { user } = useAuth();
  const { themeColors } = useColorScheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: themeColors.card,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: themeColors.cardForeground,
        headerTitleAlign: 'center',
        cardStyle: { backgroundColor: themeColors.background },
        headerLeft: () =>
          !isLargeScreen ? (
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onPress={() => setExpanded(!expanded)}
            >
              <Menu size={32} color={themeColors.cardForeground} />
            </Button>
          ) : null,
        headerRight: () => (
          <View className="mr-4">
            <Avatar alt="user-avatar">
              <AvatarImage source={{ uri: user?.avatarUrl }} />
              <AvatarFallback>
                <User color={themeColors.cardForeground} />
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
  const { themeColors } = useColorScheme();

  return (
    <Drawer
      open={expanded}
      onOpen={() => setExpanded(true)}
      onClose={() => setExpanded(false)}
      drawerPosition="left"
      renderDrawerContent={() => {
        return <SidebarContent expanded={true} setExpanded={setExpanded} />;
      }}
      drawerStyle={{ width: 256, backgroundColor: themeColors.card }}
    >
      <AppStackNavigator expanded={expanded} setExpanded={setExpanded} />
    </Drawer>
  );
}

type SidebarNavigatorProps = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

function TabletNavigator({ expanded, setExpanded }: SidebarNavigatorProps) {
  const { themeColors } = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: themeColors.background,
      }}
    >
      <View className="max-w-72">
        <SidebarContent expanded={expanded} setExpanded={setExpanded} />
      </View>
      <View style={{ flex: 1 }}>
        <AppStackNavigator expanded={expanded} setExpanded={setExpanded} />
      </View>
    </View>
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home">{() => content}</Stack.Screen>
    </Stack.Navigator>
  );
}