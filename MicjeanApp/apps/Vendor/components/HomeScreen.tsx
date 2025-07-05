import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { useColorScheme } from "nativewind";

const Stack = createStackNavigator();

// Define our semantic colors for both schemes to improve readability
const colors = {
  dark: {
    background: '#1E2028', // --background
    foreground: '#F7FAFC', // --foreground
    card: '#282A36',       // --card
    cardForeground: '#F7FAFC', // --card-foreground
  },
  light: {
    background: '#FFFFFF',
    foreground: '#09090B',
    card: '#F8F9FA',
    cardForeground: '#09090B',
  },
}

function AppStackNavigator({ expanded, setExpanded }: SidebarNavigatorProps) {
  const { isLargeScreen } = useBreakpoint();
  const { user } = useAuth();
  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";
  const themeColors = isDark ? colors.dark : colors.light;

  return (
    <Stack.Navigator
      screenOptions={{
        // Use --card for "lifted" surfaces like headers
        headerStyle: {
          backgroundColor: themeColors.card,
          shadowOpacity: 0,
          elevation: 0,
        },
        // Use --card-foreground for text/icons on a card background
        headerTintColor: themeColors.cardForeground,
        headerTitleAlign: 'center',
        // Use --background for the main content area of the screen
        cardStyle: { backgroundColor: themeColors.background },
        headerLeft: () =>
          !isLargeScreen ? (
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onPress={() => setExpanded(!expanded)}
            >
              {/* This icon color is inherited from headerTintColor */}
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
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const themeColors = isDark ? colors.dark : colors.light;

  return (
    // SafeAreaView should match the main app background
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
      <Drawer
        open={expanded}
        onOpen={() => setExpanded(true)}
        onClose={() => setExpanded(false)}
        drawerPosition="left"
        renderDrawerContent={() => {
          return <SidebarContent expanded={true} setExpanded={setExpanded} />;
        }}
        // The drawer panel itself is a "card"
        drawerStyle={{ width: 288, backgroundColor: themeColors.card }}
      >
        <AppStackNavigator expanded={expanded} setExpanded={setExpanded} />
      </Drawer>
    </SafeAreaView>
  );
}

type SidebarNavigatorProps = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

function TabletNavigator({ expanded, setExpanded }: SidebarNavigatorProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const themeColors = isDark ? colors.dark : colors.light;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        // The overall background for the tablet view
        backgroundColor: themeColors.background,
      }}
    >
      <SidebarContent expanded={expanded} setExpanded={setExpanded} />
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