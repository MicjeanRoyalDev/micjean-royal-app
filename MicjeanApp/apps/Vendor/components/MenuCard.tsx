import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    Pressable,
} from 'react-native';

import { Menu, MenuStatus } from '~/api/types';
import { Badge } from '~/components/ui/badge';

const statusColors: Record<MenuStatus, string> = {
    'Available': 'bg-green-200 border-green-600',
    'Unavailable': 'bg-gray-200 border-gray-600',
};

const statusTextColors: Record<MenuStatus, string> = {
    'Available': 'text-green-800',
    'Unavailable': 'text-gray-800',
};

interface MenuCardProps {
    item: Menu;
    onPress: (item: Menu) => void;
}

export const MenuCard = ({ item, onPress }: MenuCardProps) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const imageSource = imageError || !item.imageUrl
        ? require('~/assets/images/no-image.svg')
        : { uri: item.imageUrl };

    return (
        <Pressable onPress={() => onPress(item)} className={`active:opacity-80 my-1 mx-2`}>
            <View className={`flex-row h-32 overflow-hidden rounded-lg border border-border bg-card`}>
                <View className="w-32 h-full p-1">
                    <Image
                        source={imageSource}
                        onError={handleImageError}
                        className="bg-muted"
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                    />
                </View>
                <View className="flex-1 p-3 justify-center">
                    <Text className="text-lg font-bold text-foreground" numberOfLines={1}>{item.name}</Text>
                    <Text className="text-base font-semibold text-foreground mt-1">GHS¢ {item.price.toFixed(2)}</Text>
                    {item.description && <Text className="text-xs text-muted-foreground mt-1" numberOfLines={2}>{item.description}</Text>}
                    <View className="mt-2 self-start">
                        <Badge className={`py-1 px-2 ${statusColors[item.status]}`}>
                            <Text className={`font-semibold text-xs ${statusTextColors[item.status]}`}>{item.status}</Text>
                        </Badge>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}