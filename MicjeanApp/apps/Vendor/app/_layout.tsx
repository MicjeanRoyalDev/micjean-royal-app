import "~/global.css";
import { Slot } from "expo-router";
import * as React from "react";
import { Appearance, Platform, View } from "react-native";
import { PortalHost } from "@rn-primitives/portal";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { toastConfig } from "../components/toasts/SuccessToast";

export {
  ErrorBoundary,
} from "expo-router";

const usePlatformSpecificSetup = Platform.select({
  web: useSetWebBackgroundClassName,
  android: useSetAndroidNavigationBar,
  default: noop,
});

export default function RootLayout() {
  usePlatformSpecificSetup();

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }} className="bg-background">
          <SafeAreaView style={{ flex: 1 }}>
            <Slot />
          </SafeAreaView>
        </View>
      </GestureHandlerRootView>
      <PortalHost />
      <Toast config={toastConfig} />
    </>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    document.documentElement.classList.add("bg-background");
  }, []);
}

function useSetAndroidNavigationBar() {
  React.useLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? "light");
  }, []);
}

function noop() { }
