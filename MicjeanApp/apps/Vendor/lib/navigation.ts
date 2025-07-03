import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NavigatorScreenParams } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type HomePageParamList = {
    Dashboard: undefined;
    Orders: undefined;
    Menu: undefined;
    Products: undefined;
    Customers: undefined;
    Settings: undefined;
};

export type DrawerParamList = {
    Home: NavigatorScreenParams<HomePageParamList>;
};

export type HomePageNavigationProp = StackNavigationProp<HomePageParamList>;
export type AppDrawerNavigationProp = DrawerNavigationProp<DrawerParamList>;
