import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Pencil, PlusCircle } from "lucide-react-native";
import { Category, Menu } from "~/api/types";
import { Button } from "~/components/ui/button";
import { useBreakpoint } from "~/hooks/useBreakpoint";

type MenuScreenHeaderProps = {
    selectedCategory: Category | null;
    selectedMenu: Menu | null;
    onCategoryDeselected: () => void;
    onMenuDeselected: () => void;
};

type ModalType = "category" | "menu";

export const MenuScreenHeader = ({
    selectedCategory,
    selectedMenu,
    onCategoryDeselected,
    onMenuDeselected,
}: MenuScreenHeaderProps) => {
    const { isLargeScreen } = useBreakpoint();
    const [modalVisibility, setModalVisibility] = React.useState<
        { edit: ModalType } | { add: ModalType } | null
    >(null);
    const handleAddPress = () => {
        if (selectedCategory) {
            setModalVisibility({ add: "menu" });
        } else {
            setModalVisibility({ add: "category" });
        }
    };

    const handleEditPress = () => {
        if (selectedMenu) {
            setModalVisibility({ edit: "menu" });
        } else if (selectedCategory) {
            setModalVisibility({ edit: "category" });
        }
    };

    const renderTools = () => {
        // if menu is selected, show edit button
        // if category is selected, show edit button and add button
        // if no selection, show add button

        const tools = { edit: <></>, add: <></> };

        if (!isLargeScreen && (selectedCategory || selectedMenu)) {
            tools.edit = (
                <Button
                    key="edit"
                    size="sm"
                    variant="outline"
                    onPress={handleEditPress}
                    className="ml-4 flex-shrink-0"
                >
                    <Pencil className="text-foreground" size={20} />
                    {isLargeScreen && <Text className="text-foreground ml-2">Edit</Text>}
                </Button>
            );
        }

        if (!selectedMenu) {
            tools.add = (
                <Button
                    key="add"
                    size="sm"
                    variant="outline"
                    onPress={handleAddPress}
                    className="ml-4 flex-shrink-0"
                >
                    <PlusCircle className="text-foreground" size={20} />
                    {isLargeScreen && <Text className="text-foreground ml-2">Add</Text>}
                </Button>
            );
        }

        return (
            <>
                {tools.edit}
                {tools.add}
            </>
        );
    };

    return (
        <View className="p-4 border-b border-border flex-row justify-between items-center">
            <View className="flex-1 flex-row items-center">
                <View className="flex-1 flex-row items-center flex-wrap">
                    <TouchableOpacity
                        onPress={onCategoryDeselected}
                        className="flex-shrink-0"
                    >
                        <Text className="text-2xl font-bold text-foreground">
                            Categories
                        </Text>
                    </TouchableOpacity>
                    {selectedCategory && (
                        <>
                            <Text className="text-2xl font-bold text-muted-foreground mx-2">
                                »
                            </Text>
                            <TouchableOpacity onPress={onMenuDeselected}>
                                <Text className="text-2xl font-bold text-foreground flex-shrink-1">
                                    {selectedCategory.name}
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                    {selectedMenu && (
                        <>
                            <Text className="text-2xl font-bold text-muted-foreground mx-2">
                                »
                            </Text>
                            <Text className="text-2xl font-bold text-foreground flex-shrink-1">
                                {selectedMenu.name}
                            </Text>
                        </>
                    )}
                </View>
            </View>
            <View className="flex-row items-center">{renderTools()}</View>
        </View>
    );
};
