import * as React from "react";
import { AuthProvider } from "~/context/auth";
import { Slot } from "expo-router";
import { DashboardLayout } from "~/components/DashboardLayout";

export default function Screen() {
  return (
    <AuthProvider>
      <DashboardLayout />
    </AuthProvider>
  );
}
