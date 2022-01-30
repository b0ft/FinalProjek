import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../Home";
import LoginScreen from "../Login";
import DetailsScreen from "../Details";
import ChapterScreen from "../Chapter";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import AboutScreen from "../About";

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function MainNavigator() {
    const password = useSelector((state) => state.auth.password);
    const dispatch = useDispatch();
    return (
        <NavigationContainer>
            {/* <StatusBar style="auto" translucent={false} /> */}
            <Stack.Navigator initialRouteName="Login">
                {!password ? (
                    <Stack.Screen name="Login" component={LoginScreen} />
                ) : (
                    <>
                        <Stack.Screen
                            name="Home"
                            component={MyDrawer}
                            options={{
                                headerRight: () => (
                                    <Button
                                        onPress={() => dispatch(logout())}
                                        title="Logout"
                                        color="#fff"
                                    />
                                ),
                            }}
                        />
                        <Stack.Screen
                            name="Details"
                            component={DetailsScreen}
                        />
                        <Stack.Screen
                            name="Chapter"
                            component={ChapterScreen}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const MyDrawer = () => (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="About Me" component={AboutScreen} />
    </Drawer.Navigator>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
