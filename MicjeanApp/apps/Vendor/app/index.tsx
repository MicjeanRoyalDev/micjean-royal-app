import "react-native-gesture-handler";
import * as React from "react";
import { AuthProvider } from "~/context/auth";
import { HomeScreen } from "~/components/HomeScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Screen() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <HomeScreen />
        </SafeAreaView>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
