import React from "react";
import { Text, View, Pressable } from "react-native";
import { useNavigationState } from "@react-navigation/native";
import { HomePageParamList } from "~/lib/navigation";
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

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { name: "Orders", icon: Bell, label: "Orders" },
  { name: "Menu", icon: UtensilsCrossed, label: "Menu" },
  { name: "Products", icon: ShoppingCart, label: "Products" },
  { name: "Customers", icon: Users, label: "Customers" },
  { name: "Settings", icon: Settings, label: "Settings" },
] as const;

interface SidebarContentProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
  navigate: (screenName: keyof HomePageParamList) => void;
}

export function SidebarContent({
  isExpanded,
  onToggleExpand,
  navigate,
}: SidebarContentProps) {
  const { user, clearUser } = useAuth();
  const routeName = useNavigationState((state) => {
    const parentRoute = state.routes[state.index];

    const targetRoute =
      parentRoute?.state && parentRoute.state.index
        ? parentRoute.state.routes[parentRoute.state.index]
        : undefined;
    return targetRoute?.name;
  });

  const handleLogout = () => {
    logout();
    clearUser();
  };

  return (
    <View
      className={`
                border-r border-border bg-muted/40 p-4 flex flex-col h-full
                ${isExpanded ? "w-72" : "w-20"}
                transition-all duration-300 ease-in-out`}
    >
      {/* Header Section */}
      <View className="p-4 mb-4 flex-row items-center justify-center gap-6">
        {isExpanded && (
          <Text className="text-3xl font-extrabold text-foreground">
            Micjean
          </Text>
        )}
        {onToggleExpand && (
          <Pressable
            onPress={onToggleExpand}
            className="p-2 rounded-full hover:bg-accent"
          >
            <ChevronsLeft size={28} className="text-foreground" />
          </Pressable>
        )}
      </View>

      {/* Navigation Items */}
      <View className="gap-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = routeName === item.name;
          return (
            <Pressable key={item.name}>
              <Button
                onPress={() => navigate(item.name)}
                variant={isActive ? "secondary" : "ghost"}
                className={`flex-row items-center justify-start gap-3 px-3 py-6 rounded-lg ${
                  isExpanded ? "" : "items-center justify-center w-full"
                } ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground"
                }`}
              >
                <Icon
                  size={24}
                  className={
                    isActive
                      ? "text-accent-foreground"
                      : "text-muted-foreground"
                  }
                />
                {isExpanded && (
                  <Text className="font-semibold">{item.label}</Text>
                )}
              </Button>
            </Pressable>
          );
        })}
      </View>

      {/* User Info and Logout Section */}
      <View className="gap-y-2 border-t border-border pt-4 mt-4 mb-6">
        {isExpanded && user && (
          <View className="p-2 flex-row items-center gap-3">
            <View className="w-10 h-10 bg-primary rounded-full items-center justify-center">
              <Text className="text-primary-foreground font-bold text-lg">
                {user.email?.[0].toUpperCase()}
              </Text>
            </View>
            <View>
              <Text className="font-bold text-foreground">
                {user.name || "Vendor"}
              </Text>
              <Text className="text-sm text-muted-foreground">
                {user.email}
              </Text>
            </View>
          </View>
        )}
        <Button
          variant="ghost"
          onPress={handleLogout}
          className={`flex-row items-center justify-start gap-3 px-3 py-4 rounded-lg ${
            isExpanded ? "" : "items-center justify-center w-full"
          }`}
        >
          <LogOut size={24} className="text-destructive" />
          {isExpanded && (
            <Text className="font-medium text-destructive">Logout</Text>
          )}
        </Button>
      </View>
    </View>
  );
}
