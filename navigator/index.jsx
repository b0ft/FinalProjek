import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Home";
import LoginScreen from "../Login";
import DetailsScreen from "../Details";
import ChapterScreen from "../Chapter";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import AboutScreen from "../About";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
                        <Stack.Screen name="MainApp" component={MainApp} />
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{
                                // headerTitle: (props) => (
                                //     <LogoTitle {...props} />
                                // ),
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

const MainApp = () => (
    <Tab.Navigator>
        <Tab.Screen name="About" component={AboutScreen} />
        {/* <Tab.Screen name="AddScreen" component={AddScreen} />
        <Tab.Screen name="SkillProjectScreen" component={SkillProjectScreen} /> */}
    </Tab.Navigator>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
