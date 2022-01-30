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

    // console.log(route.params?.chapterId);
    const getChapter = async () => {
        try {
            const res = await client.get(
                `at-home/server/${route.params?.chapterId}`
            );
            // const chapterBaseURL = res.data.baseUrl;
            // const chapterData = res.data.chapter.data;
            const chapterData = res.data.chapter.data;
            const chapterHash = res.data.chapter.hash;
            setChapterHash(chapterHash);
            setChapter(chapterData);
            console.log(chapterData.length);
            // console.log(typeof chapterData);
            // console.log(chapterHash);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getChapter();
    }, []);

    return (
        <View>
            <FlatList
                data={chapter}
                keyExtractor={(item) => item}
                renderItem={({ item, index }) => {
                    // console.log(chapter);
                    return (
                        <View>
                            {chapterHash ? (
                                <Image
                                    source={{
                                        uri: `https://uploads.mangadex.org/data/${chapterHash}/${item}`,
                                    }}
                                    // source={require("./assets/icon.png")}
                                    style={{
                                        width: 400,
                                        height: 400,
                                        resizeMode: "contain",
                                    }}
                                ></Image>
                            ) : (
                                <Text>Gambar tidak dapat ditemukan</Text>
                            )}
                            {/* <Text>tes</Text> */}
                        </View>
                    );
                }}
            />
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
});
