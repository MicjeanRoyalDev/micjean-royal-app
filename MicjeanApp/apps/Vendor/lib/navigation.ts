import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NavigatorScreenParams } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export const HomePageParams = {
    Dashboard: undefined,
    Orders: undefined,
    Menu: undefined,
    Products: undefined,
    Customers: undefined,
    Settings: undefined,
};

export type HomePageParamList =  typeof HomePageParams;

export type AppParamList = {
    Home: NavigatorScreenParams<HomePageParamList>
}

export type AppNavigationProp = StackNavigationProp<AppParamList>;
