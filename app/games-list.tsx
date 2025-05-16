import { Pressable, FlatList,SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Scroll } from "lucide-react-native";
import { colors } from "@/utils/constants/colors";

import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ROUTES } from "@/utils/constants/routes";
import { useNewGameStore } from "@/store/game/new-game-store";
import type { Game } from "@/types";

export default function GamesList() {

    const  router = useRouter()
    const { games, selectGame } = useNewGameStore()
      const handleSelectGame = (gameId: string) => {
        selectGame(gameId)
        router.push(ROUTES.GAMES)
      }

      const renderGameItem = ({ item }:{item: Game}) => {
        return (
<Pressable
                style={[styles.gameCard]}
                onPress={() => handleSelectGame(item.id)}
>
                <LinearGradient
                colors={["#FFFFFF", "#F0F4FF"]}
            >
             <View >
                   <Text>{item.gameIcon}</Text>
             </View>
            </LinearGradient>
</Pressable>
        );
      }
	return (
		<SafeAreaView>


                {games &&  games.length > 0 ? (
                    <FlatList
                     data={games}
                     renderItem={renderGameItem}
                     showsVerticalScrollIndicator={false}
                     nestedScrollEnabled
                     contentContainerStyle={styles.gameslist}
                    />

                ):(
                     <LinearGradient colors={["#FFFFFF", "#F0F4FF"]} style={styles.emptyState}>
                          <Text style={styles.emptyStateText}>No available games. Please select a different language.</Text>
                        </LinearGradient>)}



		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.backgroundLight,
	},
	scrollView: {
		flex: 1,
		padding: 16,
	},
    gameslist:{
        paddingBottom:24,
        paddingHorizontal:24
    },
      emptyStateText: {
    fontSize: 15,
    color: colors.textLight,
    textAlign: "center",
    fontWeight: "600",
  },
    gameCard: {
    borderRadius: 24,
    marginBottom: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.6)",
  },
});
