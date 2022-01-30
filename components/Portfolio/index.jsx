import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Skill = ({ title, header, skillTitle, skillPercentage, skillLogo }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {header && <Text>https://b0ft.github.io</Text>}
            {!header && (
                <View style={styles.skill}>
                    {/* <Text style={styles.logo}>Logo</Text> */}
                    <Ionicons
                        name={skillLogo}
                        size={16}
                        color="black"
                        style={styles.logo}
                    />
                    <Text style={styles.skillTitle}>{skillTitle}</Text>
                    <Text style={styles.skillPercentage}>
                        {skillPercentage}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default Skill;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginBottom: 5,
        // backgroundColor: "blue",
    },
    skill: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    logo: {
        flex: 1,
        marginHorizontal: 8,
    },
    skillTitle: {
        flex: 7,
        textAlign: "left",
    },
    skillPercentage: {
        flex: 1,
        textAlign: "center",
    },
});
