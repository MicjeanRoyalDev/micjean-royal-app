import { useState, useEffect, ReactNode } from 'react';
import { View, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBreakpoint } from '~/hooks/useBreakpoint';
import { SidebarContent } from '~/components/SidebarContent';
import { Menu } from 'lucide-react-native';

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { isLargeScreen } = useBreakpoint();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isLargeScreen) {
      setDrawerOpen(false);
    }
  }, [pathname, isLargeScreen]);

  if (isLargeScreen) {
    // --- TABLET LAYOUT ---
    return (
      <SafeAreaView style={{ flex: 1, flexDirection: 'row' }}>
        <SidebarContent
          pathname={pathname}
          isExpanded={isSidebarExpanded}
          onToggleExpand={() => setSidebarExpanded(!isSidebarExpanded)}
        />
        <View style={{ flex: 1 }}>
          {children}
        </View>
      </SafeAreaView>
    );
  }

  // --- PHONE LAYOUT ---
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Hamburger menu button for phone */}
      <Pressable
        onPress={() => setDrawerOpen(true)}
        style={{
          position: 'absolute',
          top: insets.top + 10,
          left: 10,
          zIndex: 10,
          padding: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}
      >
        <Menu size={24} color="#fff" />
      </Pressable>
      <View style={{ flex: 1, marginTop: insets.top }}>{children}</View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDrawerOpen}
        onRequestClose={() => setDrawerOpen(false)}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
          onPress={() => setDrawerOpen(false)}
        >
          <View
            style={{
              width: 288,
              height: '100%',
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            }}
            onStartShouldSetResponder={() => true}
          >
            <SidebarContent pathname={pathname} isExpanded={true} />
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}