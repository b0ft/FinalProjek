import { Text, View, StyleSheet, Image, Linking } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Skill from "./components/Portfolio";

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About Me</Text>
            <View style={styles.about}>
                <Image
                    style={styles.aboutImage}
                    source={require("./assets/about.jpg")}
                />
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>Aldy Syachranie</Text>
                    <View style={styles.instagramContainer}>
                        <Ionicons
                            name="logo-instagram"
                            size={14}
                            color="black"
                        />
                        <Text style={styles.instagramName}>aldysych</Text>
                    </View>
                </View>
            </View>
            <View style={styles.portfolio}>
                <View style={styles.skillContainer}>
                    <Text style={styles.skillTitle}>Portfolio</Text>
                    <Text
                        style={styles.hyperlinkStyle}
                        onPress={() => {
                            Linking.openURL("https://b0ft.github.io");
                        }}
                    >
                        https://b0ft.github.io
                    </Text>
                </View>
                <View style={styles.skillContainer}>
                    <Text style={styles.skillTitle}>Bahasa Pemrograman</Text>
                    <Skill
                        skillTitle={"Advance Javascript"}
                        skillPercentage={"95%"}
                        skillLogo={"logo-javascript"}
                    />
                </View>
                <View style={styles.skillContainer}>
                    <Text style={styles.skillTitle}>Framework/Library</Text>
                    <Skill
                        skillTitle={"Intermediate React.JS"}
                        skillPercentage={"90%"}
                        skillLogo={"logo-react"}
                    />
                    <Skill
                        skillTitle={"Basic React Native"}
                        skillPercentage={"75%"}
                        skillLogo={"logo-react"}
                    />
                </View>
                <View style={styles.skillContainer}>
                    <Text style={styles.skillTitle}>Teknologi</Text>
                    <Skill
                        skillTitle={"Intermediate Git"}
                        skillPercentage={"85%"}
                        skillLogo={"git-branch"}
                    />
                    <Skill
                        skillTitle={"Advance Github"}
                        skillPercentage={"95%"}
                        skillLogo={"logo-github"}
                    />
                </View>
            </View>
        </View>
    );
};

export default AboutScreen;

const styles = StyleSheet.create({
    container: {
        color: "white",
        margin: 20,
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    about: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    aboutImage: {
        flex: 1,
        height: 150,
        resizeMode: "contain",
    },
    nameContainer: {
        flex: 2,
        alignItems: "center",
    },
    name: {
        fontSize: 20,
        marginBottom: 5,
    },
    instagramContainer: {
        flexDirection: "row",
    },
    instagramName: {
        marginHorizontal: 5,
    },
    portfolio: {
        flex: 3,
    },
    skillContainer: {
        borderBottomWidth: 1,
        marginBottom: 15,
    },
    skillTitle: {
        fontSize: 18,
        marginBottom: 5,
    },
    hyperlinkStyle: {
        color: "blue",
    },
});
