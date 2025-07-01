import React from 'react';
import { Image, Text, View } from 'react-native';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Eye } from 'lucide-react-native';

export default function LoginScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
    <View className="flex-1 flex-col lg:flex-row bg-background">
      {/* Top Panel on mobile, Left panel on desktop */}
      <View className="lg:flex-1 bg-muted/40 overflow-hidden relative h-96 lg:h-full">
        <Image
          source={require('@/shared/assets/images/micjean photo for background.jpg')}
          className="absolute w-full h-full"
          style={{ opacity: 0.75, width: '100%', height: '100%' }}
          resizeMode="cover"
        />
        <View className="flex-1 items-center justify-center p-12">
          <Text className="text-2xl lg:text-4xl font-bold text-foreground text-center">
            Welcome Back
          </Text>
          <Text className="text-lg text-muted-foreground mt-2 hidden lg:block">
            Manage your restaurant with ease.
          </Text>
        </View>
      </View>

      {/* Bottom Panel on mobile, Right panel on desktop */}
      <View className="flex-1 items-center justify-center p-6 lg:p-12">
        <View className="w-full max-w-md mb-12">
          <Image
            source={require('@/shared/assets/images/micjean royal logo.png')}
            className="mx-auto"
            style={{ width: 96, height: 96 }}
            resizeMode="contain"
          />
          <Text className="text-3xl font-bold text-foreground mb-2 text-center">
            Sign In
          </Text>
          <Text className="text-muted-foreground mb-4 text-center">
            Enter your credentials to access your dashboard.
          </Text>

          <View className="gap-y-4">
            <View className="gap-y-2">
              <Label>Email</Label>
              <Input
                placeholder="vendor@micjean.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View className="gap-y-2">
              <Label>Password</Label>
              <View className="relative">
                <Input
                  placeholder="********"
                  secureTextEntry={!isPasswordVisible}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute p-1 right-1 top-1/2 -translate-y-1/2"
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Eye
                    size={20}
                    className="text-muted-foreground"
                  />
                </Button>
              </View>
            </View>
          </View>

          <Button size="lg" className="mt-8">
            <Text className="text-lg font-semibold text-primary-foreground">Sign In</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}