import React, { useState } from "react";
import { Image, StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "./redux/authSlice";

export default function Login({ route, navigation }) {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);

    const submit = () => {
        if (username == "admin" && password == "admin") {
            dispatch(
                login({
                    username,
                    password,
                })
            );
        } else {
            setIsError(true);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>LOGIN</Text>

            {isError && <Text>Password salah</Text>}
            {/* <Image
                style={{ height: 150, width: 150 }}
                source={require("./assets/logo.jpg")}
            /> */}
            <View>
                <TextInput
                    style={{
                        borderWidth: 1,
                        paddingVertical: 10,
                        borderRadius: 5,
                        width: 300,
                        marginBottom: 10,
                        paddingHorizontal: 10,
                    }}
                    placeholder="Masukan Username"
                    value={username}
                    onChangeText={(value) => setUsername(value)}
                />
                <TextInput
                    style={{
                        borderWidth: 1,
                        paddingVertical: 10,
                        borderRadius: 5,
                        width: 300,
                        marginBottom: 10,
                        paddingHorizontal: 10,
                    }}
                    placeholder="Masukan Password"
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                />
                <Button onPress={submit} title="Login" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
});
