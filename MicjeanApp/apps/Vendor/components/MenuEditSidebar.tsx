import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, Pressable, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';

import { Menu, MenuStatus, Category, NewMenu } from '~/api/types';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Textarea } from './ui/textarea';

interface MenuEditSidebarProps {
  menu: Menu | NewMenu;
  categories: Category[];
  onClose: () => void;
  onSave: (menu: Menu | NewMenu) => void;
}

const MENU_STATUSES: MenuStatus[] = ['Available', 'Sold Out', 'Hidden'];

export function MenuEditSidebar({
  menu,
  categories,
  onClose,
  onSave,
}: MenuEditSidebarProps) {
  const [editedMenu, setEditedMenu] = useState<Partial<Menu> | null>(null);

  useEffect(() => {
    setEditedMenu({ ...menu });
  }, [menu]);

  const isCreating = 'id' in menu === false;

  const handleFieldChange = (field: keyof Menu, value: any) => {
    setEditedMenu(prev => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSave = () => {
    if (editedMenu) {
      onSave(editedMenu as Menu);
    }
  };

  if (!editedMenu) {
    return null;
  }

  return (
    <View className="w-96 bg-card border-l border-border h-full p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-foreground">
            {isCreating ? 'Create Menu' : 'Edit Menu'}
          </Text>
          <Pressable onPress={onClose} className="p-2 rounded-full hover:bg-accent active:bg-accent/80">
            <X size={24} className="text-muted-foreground" />
          </Pressable>
        </View>

        <View className="gap-y-6">
          <View>
            <Image
              source={{ uri: editedMenu.imageUrl }}
              className="w-full h-48 rounded-lg bg-muted"
            />
            <Button variant="outline" className="mt-4">
              <Text>Change Image</Text>
            </Button>
          </View>

          <View className="gap-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={editedMenu.name}
              onChangeText={(text) => handleFieldChange('name', text)}
              placeholder="e.g. Classic Burger"
            />
          </View>

          <View className="gap-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={{
                value: editedMenu.categoryId!,
                label: categories.find(c => c.id === editedMenu.categoryId)?.name || "Select category",
              }}
              onValueChange={(value) => handleFieldChange('categoryId', value?.value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} label={category.name} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </View>

          <View className="gap-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editedMenu.description}
              onChangeText={(text) => handleFieldChange('description', text)}
              placeholder="A short description of the menu item."
              numberOfLines={4}
            />
          </View>

          <View className="gap-y-2">
            <Label htmlFor="price">Price (GHS¢)</Label>
            <Input
              id="price"
              value={String(editedMenu.price)}
              onChangeText={(text) => handleFieldChange('price', Number(text) || 0)}
              keyboardType="numeric"
              placeholder="e.g. 50.00"
            />
          </View>

          <View className="gap-y-2">
            <Label>Status</Label>
            <Select
              value={{
                value: editedMenu.status!,
                label: editedMenu.status!,
              }}
              onValueChange={(value) => handleFieldChange('status', value?.value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {MENU_STATUSES.map(status => (
                  <SelectItem key={status} label={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </View>
        </View>

        <View className="mt-8 flex-row gap-x-4">
          <Button variant="outline" onPress={onClose} className="flex-1">
            <Text>Cancel</Text>
          </Button>
          <Button onPress={handleSave} className="flex-1">
            <Text>{isCreating ? 'Create Menu' : 'Apply Edits'}</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
