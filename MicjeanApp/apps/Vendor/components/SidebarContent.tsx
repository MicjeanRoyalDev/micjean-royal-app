import React, { useEffect, useState } from "react";
import { Text, View, Pressable } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import {
  AppNavigationProp,
  HomePageParamList,
  HomePageParams,
} from "~/lib/navigation";
import {
  Bell,
  ChevronsLeft,
  LogOut,
  Settings,
  UtensilsCrossed,
  LayoutDashboard,
  Users,
  ShoppingCart,
} from "lucide-react-native";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/context/auth";
import { logout } from "~/api/dummy";
import { useBreakpoint } from "~/hooks/useBreakpoint";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { name: "Orders", icon: Bell, label: "Orders" },
  { name: "Menu", icon: UtensilsCrossed, label: "Menu" },
  { name: "Products", icon: ShoppingCart, label: "Products" },
  { name: "Customers", icon: Users, label: "Customers" },
  { name: "Settings", icon: Settings, label: "Settings" },
] as const;

interface SidebarContentProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SidebarContent({ expanded, setExpanded }: SidebarContentProps) {
  const { user, clearUser } = useAuth();
  const { isLargeScreen } = useBreakpoint();
  const navigation = useNavigation<AppNavigationProp>();

  const [screenName, setScreenName] =
    useState<keyof HomePageParamList>("Dashboard");

  useEffect(() => {
    const navState = navigation.getState();
    const parentRoute = navState.routes[navState.index];

    const targetRoute =
      parentRoute?.state && parentRoute.state.index
        ? parentRoute.state.routes[parentRoute.state.index]
        : undefined;
    let name: keyof HomePageParamList;
    if (targetRoute?.name && targetRoute?.name in HomePageParams) {
      name = targetRoute?.name as keyof HomePageParamList;
    } else {
      name = "Dashboard";
    }

    if (name != screenName) setScreenName(name);
  }, [navigation.getState()]);

  const navigate = (screenName: keyof HomePageParamList) => {
    navigation.navigate("Home", { screen: screenName });
    if (!isLargeScreen) setExpanded(false);
  };

  const handleLogout = () => {
    logout();
    clearUser();
  };

  return (
    // Use --card for the sidebar background and --border for the border.
    <View
      className={`
        border-r border-border bg-card p-4 flex flex-col h-full
        ${expanded ? "w-72" : "w-20"}
        transition-all duration-300 ease-in-out`}
    >
      {/* Header Section */}
      <View className="p-4 mb-4 flex-row items-center justify-between">
        {expanded && (
          <Text className="text-3xl font-extrabold text-foreground">Micjean</Text>
        )}
        {/* The chevron is an interactive element to collapse */}
        <Pressable
          onPress={() => setExpanded(false)}
          className="p-2 rounded-full hover:bg-accent active:bg-accent/80"
        >
          <ChevronsLeft size={28} className="text-foreground" />
        </Pressable>
      </View>

      {/* Navigation Items */}
      <View className="gap-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = screenName === item.name;

          return (
            // Use Pressable for the navigation action
            <Pressable 
                className={`
                  flex-row items-center gap-4 p-3 rounded-lg
                  ${isActive
                    ? 'bg-primary' // Active state: use primary background
                    : 'bg-transparent hover:bg-accent' // Inactive: transparent, with accent on hover
                  }
                  ${expanded ? 'justify-start' : 'justify-center'}
                `} key={item.name} onPress={() => navigate(item.name)}>
                <Icon
                  size={24}
                  className={`
                    ${isActive
                      ? 'text-primary-foreground' // Active icon: use primary-foreground
                      : 'text-foreground'          // Inactive icon: use standard foreground
                    }
                  `}
                />
                {expanded && (
                  <Text
                    className={`
                      font-semibold text-base
                      ${isActive
                        ? 'text-primary-foreground' // Active text
                        : 'text-foreground'          // Inactive text
                      }
                    `}
                  >
                    {item.label}
                  </Text>
                )}
            </Pressable>
          );
        })}
      </View>

      {/* User Info and Logout Section */}
      <View className="gap-y-2 border-t border-border pt-4 mt-4">
        {expanded && (
          <View className="p-2 flex-row items-center gap-3">
            {/* Using primary color for the avatar fallback is a nice brand touch */}
            <View className="w-10 h-10 bg-primary rounded-full items-center justify-center">
              <Text className="text-primary-foreground font-bold text-lg">
                {user.email?.[0].toUpperCase()}
              </Text>
            </View>
            <View>
              {/* Main text uses foreground */}
              <Text className="font-bold text-foreground">
                {user.name || "Vendor"}
              </Text>
              {/* Secondary, less important text uses muted-foreground */}
              <Text className="text-sm text-muted-foreground">
                {user.email}
              </Text>
            </View>
          </View>
        )}
        <Button
          variant="ghost"
          onPress={handleLogout}
          className={`
            flex-row items-center gap-3 px-3 py-4 rounded-lg hover:bg-destructive/20
            ${expanded ? 'justify-start' : 'justify-center w-full'}
          `}
        >
          {/* Destructive actions should use the destructive color */}
          <LogOut size={24} className="text-destructive" />
          {expanded && (
            <Text className="font-medium text-destructive">Logout</Text>
          )}
        </Button>
      </View>
    </View>
  );
}