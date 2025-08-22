import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { colors } from '~/lib/constants';

export function useColorScheme() {
  const { colorScheme } = useNativewindColorScheme();
  return {
    colorScheme: colorScheme ?? 'dark',
    isDarkColorScheme: colorScheme === 'dark',
    themeColors: colorScheme === 'dark' ? colors.dark : colors.light,
  };
}
