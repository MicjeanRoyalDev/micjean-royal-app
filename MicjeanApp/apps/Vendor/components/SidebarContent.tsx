import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
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
  { href: "/(authenticated)", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/(authenticated)/orders", icon: Bell, label: "Orders" },
  { href: "/(authenticated)/menu", icon: UtensilsCrossed, label: "Menu" },
  { href: "/(authenticated)/products", icon: ShoppingCart, label: "Products" },
  { href: "/(authenticated)/customers", icon: Users, label: "Customers" },
  { href: "/(authenticated)/settings", icon: Settings, label: "Settings" },
] as const;

interface SidebarContentProps {
  isExpanded: boolean;
  pathname: string;
  onToggleExpand?: () => void;
}

export function SidebarContent({
  isExpanded,
  pathname,
  onToggleExpand,
}: SidebarContentProps) {
  const { user, clearUser } = useAuth();

  const handleLogout = () => {
    logout();
    clearUser();
  };

  return (
    <View
      className={`
                border-r border-border bg-card p-4 flex flex-col h-full
                ${isExpanded ? "w-72" : "w-20"}
                transition-all duration-300 ease-in-out`}
    >
      {/* Header Section */}
      <View className="p-4 mb-4 flex-row items-center justify-between">
        {isExpanded && (
          <Text className="text-3xl font-extrabold text-primary">Micjean</Text>
        )}
        {onToggleExpand && (
          <Pressable
            onPress={onToggleExpand}
            className="p-2 rounded-full hover:bg-muted"
          >
            <ChevronsLeft size={28} className="text-foreground" />
          </Pressable>
        )}
      </View>

      {/* Navigation Items */}
      <View className="gap-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/(authenticated)" &&
              pathname.startsWith(item.href));
          return (
            <Link href={item.href} asChild key={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`justify-start gap-3 px-3 py-6 rounded-lg ${
                  isExpanded ? "" : "items-center justify-center w-full"
                }`}
              >
                <Icon
                  size={24}
                  className={isActive ? "text-primary" : "text-foreground"}
                />
                {isExpanded && (
                  <Text
                    className={`font-semibold ${
                      isActive ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </Text>
                )}
              </Button>
            </Link>
          );
        })}
      </View>

      {/* User Info and Logout Section - A much cleaner look */}
      <View className="gap-y-2 border-t border-border pt-4 mt-4">
        {isExpanded && user && (
          <View className="p-2 flex-row items-center gap-3">
            <View className="w-10 h-10 bg-primary rounded-full items-center justify-center">
              <Text className="text-primary-foreground text-lg font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text className="font-bold text-foreground">{user.name}</Text>
              <Text className="text-sm text-muted-foreground">
                {user.email}
              </Text>
            </View>
          </View>
        )}
        <Button
          variant="ghost"
          onPress={handleLogout}
          className={`justify-start gap-3 px-3 py-4 rounded-lg ${
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
