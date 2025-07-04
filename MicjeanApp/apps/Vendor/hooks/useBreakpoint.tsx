import { useWindowDimensions } from 'react-native';

const DESKTOP_BREAKPOINT = 768;

export function useBreakpoint() {
  const { width } = useWindowDimensions();
  return {
    isLargeScreen: width >= DESKTOP_BREAKPOINT,
  };
}