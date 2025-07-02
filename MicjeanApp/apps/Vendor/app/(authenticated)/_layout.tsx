import React from "react";
import { Stack } from "expo-router";
import { DashboardLayout } from "~/components/DashboardLayout";

export default function Layout() {
  return (
    <DashboardLayout>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="orders"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="products"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="customers"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="menu"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </DashboardLayout>
  );
}
