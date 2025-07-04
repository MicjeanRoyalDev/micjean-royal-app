import "react-native-gesture-handler";
import * as React from "react";
import { AuthProvider } from "~/context/auth";
import { HomeScreen } from "~/components/HomeScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";

export default function Screen() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <HomeScreen />
        </View>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
