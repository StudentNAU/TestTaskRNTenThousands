import {FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {images} from "../images";
import {useEffect, useState} from "react";

export default function DashBoardScreen({navigation}) {
    const [pokemonNames, setPokemonNames] = useState([]);

    useEffect(() => {
        loadPokemon();
    }, []);

    const loadPokemon = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`);
        const data = await response.json();
        setPokemonNames(data.results);
    };


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={pokemonNames}
                renderItem={({item, index}) => (
                    <TouchableOpacity
                        onLongPress={() => navigation.navigate("details", {
                            image: images[index],
                            name: item.name,
                            stats: `https://pokeapi.co/api/v2/pokemon/${item.name}`
                        })}
                        activeOpacity={0.7}
                    >
                        <View style={styles.listItem}>
                            <Image
                                source={images[index]}
                                style={styles.image}
                            />
                            <Text style={styles.text}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: StatusBar.currentHeight,
    },
    listItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 15,
    },
    text: {
        marginBottom: 20,
        padding: 6,
    },
    image: {
        width: "60%",
        height: 200,
        marginVertical: 20,
    }
});
