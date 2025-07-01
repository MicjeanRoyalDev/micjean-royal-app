import React from 'react';
import { Image, Text, View } from 'react-native';
import { Link, Slot, Stack } from 'expo-router';
import { Bell, LogOut, Settings, UtensilsCrossed } from 'lucide-react-native';
import { Button } from '~/components/ui/button';
import { ThemeToggle } from '~/components/ThemeToggle';

const NavLink = ({ href, children }: { href: any; children: React.ReactNode }) => (
  <Link href={href} asChild>
    <Button variant="ghost" className="justify-start gap-3 px-4 py-6">
      {children}
    </Button>
  </Link>
);

export default function AppLayout() {
  return (<Stack>
    <Stack.Screen
      name='index'
      options={{
        title: 'Starter Base',
        headerRight: () => <ThemeToggle />,
      }}
    />
    <View className="flex-1 flex-row bg-background">
      {/* Side Navigation Panel */}
      <View className="w-72 border-r border-border bg-muted/40 p-4">
        <View className="p-4 mb-4">
          <View
            className="w-24 h-24 self-center"
          />
        </View>
        <View className="gap-y-2">
          <NavLink href="/(app)">
            <Bell size={20} className="text-foreground" />
            <Text className="text-lg font-medium text-foreground">Orders</Text>
          </NavLink>
          <NavLink href="/(app)/menu">
            <UtensilsCrossed size={20} className="text-foreground" />
            <Text className="text-lg font-medium text-foreground">Menu</Text>
          </NavLink>
          <NavLink href="/(app)/settings">
            <Settings size={20} className="text-foreground" />
            <Text className="text-lg font-medium text-foreground">Settings</Text>
          </NavLink>
        </View>
        <View className="flex-1" />
        <NavLink href="/login">
          <LogOut size={20} className="text-destructive" />
          <Text className="text-lg font-medium text-destructive">Logout</Text>
        </NavLink>
      </View>

      {/* Screen Content */}
      <View className="flex-1">
        <Slot />
      </View>
    </View>

  </Stack>
  );
}