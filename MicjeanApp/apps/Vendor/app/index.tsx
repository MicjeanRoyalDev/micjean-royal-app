import "react-native-gesture-handler";
import * as React from "react";
import { AuthProvider } from "~/context/auth";
import { HomeScreen } from "~/components/HomeScreen";

export default function Screen() {
  return (
    <AuthProvider>
      {/* User will be authenticated before accessing the HomeScreen, if not will be automatically redirected to the login screen */}
      <HomeScreen />
    </AuthProvider>
  );
}
