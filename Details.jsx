import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "https://api.mangadex.org/";

const client = axios.create({
    baseURL,
});

const DetailsScreen = ({ route, navigation }) => {
    const [chapters, setChapters] = useState({});

    const getDetails = async () => {
        try {
            const res = await client.get(`manga/${route.params?.id}/aggregate`);
            const _chapter = res.data.volumes.none.chapters;
            setChapters(_chapter);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getDetails();
    }, []);

    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{route.params?.title}</Text>
                <Image
                    source={{
                        uri: `https://uploads.mangadex.org/covers/${route.params?.id}/${route.params?.fileName}.256.jpg`,
                    }}
                    style={{ width: 300, height: 300, resizeMode: "contain" }}
                ></Image>
                <Text style={styles.description}>
                    {route.params?.description.substring(0, 250)}
                </Text>
            </View>
            <View>
                {/* <Text>{route.params?.id}</Text> */}
                <FlatList
                    data={Object.keys(chapters)}
                    keyExtractor={(item) => item}
                    numColumns={3}
                    horizontal={false}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.detailsContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate({
                                            name: "Chapter",
                                            params: {
                                                chapterId: chapters[item].id,
                                                chapterN:
                                                    chapters[item].chapter,
                                            },
                                        });
                                    }}
                                >
                                    {/* <Text>{chapters[item].id}</Text> */}
                                    <Text style={styles.chapterContainer}>
                                        Chapter {chapters[item].chapter}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1,
        alignItems: "center",
    },
    chapterContainer: {
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
    },
    titleContainer: {
        alignItems: "center",
        // borderBottomWidth: 5,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        padding: 10,
        fontWeight: "700",
    },
    description: {
        fontSize: 15,
        textAlign: "center",
        padding: 10,
        // fontWeight: "700",
    },
});
