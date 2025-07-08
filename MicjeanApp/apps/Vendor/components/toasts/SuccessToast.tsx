import React from 'react';
import { View } from 'react-native';
import Toast, { BaseToast, ErrorToast, ToastConfigParams } from 'react-native-toast-message';
import { AnimatedCheckmark, CircularProgress } from './ToastIcons';
import { Text } from '../ui/text';

/*
  1. Create the success toast component.
  2. Add a new toast type to the toast config.
*/

export const toastConfig = {
  success: (props: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '400'
      }}
    />
  ),
  error: (props: ToastConfigParams<any>) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  custom_success: ({ text1, props }: ToastConfigParams<{ duration: number }>) => (
    <View className="h-24 bg-neutral-800/90 w-[90vw] rounded-xl p-4 flex-row items-center">
      <View className="w-12 h-12">
        <CircularProgress duration={props.duration} size={48} />
        <View className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <AnimatedCheckmark color="#10B981" size={24} />
        </View>
      </View>
      <Text className="text-white ml-4 text-base">{text1}</Text>
    </View>
  )
};

export function showSuccessToast(message: string, duration = 4000) {
  Toast.show({
    type: 'custom_success',
    text1: message,
    position: 'bottom',
    visibilityTime: duration,
    props: { duration }
  });
}
