import {
    View,
    Image,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";

const baseURL = "https://api.mangadex.org/";

const client = axios.create({
    baseURL,
});

const HomeScreen = ({ navigation }) => {
    const username = useSelector((state) => state.auth.username);
    const [manga, setManga] = useState([]);

    async function getManga() {
        const manga = await client.get(
            "manga?hasAvailableChapters=1&status[]=ongoing"
        );
        return manga;
    }

    async function getMangaCover(coverId) {
        const cover = await client.get(`cover/${coverId}`);
        return cover.data.data.attributes.fileName;
    }

    useEffect(() => {
        getManga()
            .then(async (mangaData) => {
                const mangas = await Promise.all(
                    mangaData &&
                        mangaData.data.data.map(async (manga) => {
                            const mangaObj = { ...manga };
                            const coverId = mangaObj.relationships.find(
                                (rl) => rl.type === "cover_art"
                            ).id;
                            const mangaCover = await getMangaCover(coverId);

                            mangaObj.cover_filename = mangaCover;
                            mangaObj.cover_id = coverId;

                            return mangaObj;
                        })
                );
                setManga(mangas);
            })
            .catch((error) => console.error("error: ", error));
    }, []);

    return (
        <View style={styles.container}>
            <Text>Welcome back, {username}!</Text>
            <FlatList
                data={manga}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.mangaItem}>
                            <TouchableOpacity
                                style={styles.mangaContent}
                                onPress={() =>
                                    navigation.navigate("Details", {
                                        id: item.id,
                                        title: item.attributes.title.en,
                                        description:
                                            item.attributes.description.en,
                                        fileName: item.cover_filename,
                                    })
                                }
                            >
                                <View style={styles.mangaLastChapterContainer}>
                                    <Text style={styles.mangaLastChapter}>
                                        Chapter
                                        {item.attributes.lastChapter
                                            ? ` ${item.attributes.lastChapter}`
                                            : " ?"}
                                    </Text>
                                </View>
                                <View style={styles.mangaTypeContainer}>
                                    {item.type == "manga" && (
                                        <Image
                                            source={require("./assets/japan.png")}
                                            style={{
                                                width: 20,
                                                height: 20,
                                            }}
                                        ></Image>
                                    )}
                                    {item.type == "manhwa" && (
                                        <Image
                                            source={require("./assets/south-korea.png")}
                                            style={{
                                                width: 20,
                                                height: 20,
                                            }}
                                        ></Image>
                                    )}
                                    {item.type == "manhua" && (
                                        <Image
                                            source={require("./assets/china.png")}
                                            style={{
                                                width: 20,
                                                height: 20,
                                            }}
                                        ></Image>
                                    )}
                                    <Text style={styles.mangaType}>
                                        {item.type}
                                    </Text>
                                </View>
                                <Image
                                    source={{
                                        uri: `https://uploads.mangadex.org/covers/${item.id}/${item.cover_filename}.256.jpg`,
                                    }}
                                    style={styles.mangaCover}
                                ></Image>
                                <View style={styles.subContainer}>
                                    <Text style={styles.mangaTitle}>
                                        {item.attributes.title.en.substring(
                                            0,
                                            32
                                        )}
                                    </Text>
                                    <Text style={styles.mangaTime}>
                                        {moment
                                            .utc(item.attributes.updatedAt)
                                            .local()
                                            .startOf("day")
                                            .fromNow()}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 500,
    },
    mangaItem: {
        flex: 1,
        alignItems: "center",
    },
    mangaContent: {
        flex: 1,
    },
    mangaLastChapterContainer: {
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 2,
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 100,
    },
    mangaTypeContainer: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        bottom: 80,
        left: 20,
        zIndex: 2,
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 100,
    },
    mangaType: {
        marginLeft: 5,
        color: "black",
        textTransform: "capitalize",
    },
    mangaCover: {
        width: 300,
        height: 300,
        position: "relative",
        borderRadius: 50,
    },
    subContainer: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
        height: 50,
        // bordercol,
        // maxHeight: 50,
    },
    mangaTitle: {
        fontWeight: "bold",
        fontSize: 14,
    },
    mangaTime: {
        // position: "absolute",
        // top: 10
    },
});
