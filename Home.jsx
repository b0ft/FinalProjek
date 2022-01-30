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
    const [coverId, setCoverId] = useState([]);
    const [coverLink, setCoverLink] = useState([]);

    const getManga = async () => {
        try {
            const resManga = await client.get("manga");
            const _manga = resManga.data.data;
            // const _mangaTes = resManga.data.data;
            setManga(_manga);
            // console.log(_manga[0].relationships[2].id);

            // const id = _manga;
            const coverId = _manga[0].relationships[2].id;
            setCoverId(coverId);
            const resCover = await client.get(`cover/${coverId}`);
            const _cover = resCover.data.data;
            setCoverLink(_cover);
            // console.log(coverLink);
            // console.log(_cover);
            // setCoverId(_manga.relationships[2].id);
            // console.log("res: ", _manga);
        } catch (err) {
            console.log(err);
        }
    };

    // const getCover = async (id) => {
    //     try {
    //         const res = await client.get(`cover/${id}`);
    //         console.log(res);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    useEffect(() => {
        getManga();
        // getCover(coverId);
    }, []);

    return (
        <View style={styles.container}>
            <Text>Welcome back, {username}!</Text>
            <FlatList
                data={manga}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    // console.log(coverLink.attributes.fileName);
                    return (
                        <View style={styles.mangaItem}>
                            <TouchableOpacity
                                style={styles.mangaContent}
                                onPress={() =>
                                    navigation.navigate("Details", {
                                        id: item.id,
                                    })
                                }
                            >
                                <Text style={styles.mangaTitle}>
                                    {item.attributes.title.en}
                                </Text>
                                <Text style={styles.mangaLastChapter}>
                                    Chapter {item.attributes.lastChapter}
                                </Text>
                                <Text style={styles.mangaType}>
                                    {item.type}
                                </Text>
                                <Image
                                    source={{
                                        uri: `https://uploads.mangadex.org/covers/${item.id}/${coverLink.attributes.fileName}.256.jpg`,
                                    }}
                                    // source={require("./assets/icon.png")}
                                    style={{ width: 256, height: 256 }}
                                ></Image>
                                {/* <Text style={styles.mangaCover}>
                                    {item.relationships[2].id}
                                </Text> */}
                                {/* {setCoverId(item.relationships[2].id)} */}
                                <Text style={styles.mangaTime}>
                                    {/* {coverLink} */}
                                    {moment
                                        .utc(item.attributes.updatedAt)
                                        .local()
                                        .startOf("day")
                                        .fromNow()}
                                </Text>
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
        // padding: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
