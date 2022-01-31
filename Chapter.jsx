import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "https://api.mangadex.org/";
// https://api.mangadex.org/at-home/server/dc1b63a5-8c6f-4b95-94fd-64386d7de71c

const client = axios.create({
    baseURL,
});

const ChapterScreen = ({ route, navigation }) => {
    const [chapter, setChapter] = useState({});
    const [chapterHash, setChapterHash] = useState("");

    const getChapter = async () => {
        try {
            const res = await client.get(
                `at-home/server/${route.params?.chapterId}`
            );
            const chapterData = res.data.chapter.data;
            const chapterHash = res.data.chapter.hash;
            setChapterHash(chapterHash);
            setChapter(chapterData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getChapter();
    }, []);

    return (
        <View style={styles.container}>
            {chapterHash ? (
                <FlatList
                    data={chapter}
                    keyExtractor={(item) => item}
                    renderItem={({ item, index }) => {
                        return (
                            <View>
                                <Image
                                    source={{
                                        uri: `https://uploads.mangadex.org/data/${chapterHash}/${item}`,
                                    }}
                                    style={{
                                        width: 400,
                                        height: 400,
                                        resizeMode: "contain",
                                    }}
                                ></Image>
                            </View>
                        );
                    }}
                />
            ) : (
                <Text style={styles.warning}>Loading...</Text>
            )}
        </View>
    );
};

export default ChapterScreen;

const styles = StyleSheet.create({
    // detailsContainer: {
    //     flex: 1
    // }
    // chapterContainer: {
    //     marginBottom: 10,
    //     padding: 10,
    //     fontSize: 15,
    // },
    container: {
        flex: 1,
        justifyContent: "center",
    },
    warning: {
        textAlign: "center",
        fontSize: 20,
    },
});
