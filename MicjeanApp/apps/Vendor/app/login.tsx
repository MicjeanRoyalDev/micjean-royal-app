import React from 'react';
import { Image, Text, View } from 'react-native';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Button } from '../components/ui/button';
import { Eye } from 'lucide-react-native';

export default function LoginScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
    <View className="flex-1 flex-row bg-background">
      {/* Left Panel */}
      <View className="flex-1 items-center justify-center bg-muted/40 p-12 hidden lg:flex">
        <Image
          source={require('../../shared/assets/images/micjean-royal-logo.png')}
          className="w-48 h-48"
          resizeMode="contain"
        />
        <Text className="text-4xl font-bold mt-6 text-foreground">
          Welcome Back
        </Text>
        <Text className="text-lg text-muted-foreground mt-2">
          Manage your restaurant with ease.
        </Text>
      </View>

      {/* Right Panel */}
      <View className="flex-1 items-center justify-center p-6 lg:p-12">
        <View className="w-full max-w-md">
          <Text className="text-3xl font-bold text-foreground mb-2">
            Sign In
          </Text>
          <Text className="text-muted-foreground mb-8">
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
                  className="absolute right-2 top-2.5"
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
            Sign In
          </Button>
        </View>
      </View>
    </View>
  );
}