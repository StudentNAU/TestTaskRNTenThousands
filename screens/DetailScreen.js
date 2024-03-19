import {Image, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";

export default function DetailScreen({route}) {
    const {image} = route.params;
    const {name} = route.params;

    const [pokemonStats, setPokemonStats] = useState(null);
    const [pokemonTypes, setPokemonType] = useState(null);
    const [allPokemonInfo, setAllPokemonInfo] = useState(null);

    const loadPokemonStatsAndTypes = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await response.json();
            setPokemonStats(data.stats);
            setPokemonType(data.types);
            setAllPokemonInfo(data);
        } catch (error) {
            console.error("Error fetching Pokemon stats:", error);
        }
    };

    useEffect(() => {
        loadPokemonStatsAndTypes();
    }, []);

    if (!(pokemonStats && pokemonTypes && allPokemonInfo)) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={image}/>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.statContainer}>
                <Text style={styles.statName}>Types:</Text>
                <Text>{pokemonTypes[0].type.name}</Text>
            </View>
            <View style={styles.statContainer}>
                <Text style={styles.statName}>Height:</Text>
                <Text>{allPokemonInfo.height}</Text>
            </View>
            <View style={styles.statContainer}>
                <Text style={styles.statName}>Weight:</Text>
                <Text>{allPokemonInfo.weight}</Text>
            </View>
            <View style={styles.statContainer}>
                <Text style={styles.statName}>HP:</Text>
                <Text>{pokemonStats[0].base_stat}</Text>
            </View>
            <View style={styles.statContainer}>
                <Text style={styles.statName}>Attack:</Text>
                <Text>{pokemonStats[1].base_stat}</Text>
            </View>
            <View style={styles.statContainer}>
                <Text style={styles.statName}>Defense:</Text>
                <Text>{pokemonStats[2].base_stat}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    statContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        width: "100%",
        marginBottom: 5,
    },
    statName: {
        fontWeight: "bold",
    },
    name: {
        margin: 10,
    },
    image: {
        borderColor: "black",
        width: 200,
        height: 200
    }
});
