import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGameStore } from "@/store/game-store";
import { colors } from "@/utils/constants/colors";
import { FONT_SIZES, FONT_WEIGHTS } from "@/utils/constants";
import WordMatchProgressBar from "@/components/wordMatching/WordMatchProgressBar";

export default function AppChallenges() {
	const router = useRouter();
	const { id } = useLocalSearchParams();

  //game state
	const { currentGameId, selectGame, games } = useGameStore();
	const [currentGame, setCurrentGame] = useState(games[0]);


	// current game id
	useEffect(() => {
		//get current level
		const game = games.find((g) => g.id === id);
		if (game) {
			setCurrentGame(game);
		}
	}, [games, id]);

  //word matching game state
  const [currentChallenge, setCurrentChallenge] = useState(currentGame.challenges[0]);
	// render function
	const renderChallenge = () => {
		console.log("Current Game ID: ", currentGame.type);
    console.log("Challenges: ", currentGame.challenges

    );

    switch (currentGame.type) {
      case "word-matching":
        return (
               <SafeAreaView style={styles.container}>

                <WordMatchProgressBar currentLevel={currentChallenge.id} totalLevels={currentGame.challenges.length}/>

               </SafeAreaView>
        )

      default:
        return <Text style={styles.gameQuestion}>This exercise type is not implemented</Text>;
    }
	};

	return (
		<>
			<Stack.Screen options={{
        title: currentGame.title, headerBackTitle:'Back',
        headerStyle:{backgroundColor: colors.background},
         headerTintColor: colors.text
      }} />
			<SafeAreaView style={styles.container}>
				<View style={styles.content}>{renderChallenge()}</View>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	content: {
		justifyContent: "center",
		padding: 20,
		flex: 1,
	},
  gameQuestion:{
    fontSize:FONT_SIZES.xl,
    fontWeight:FONT_WEIGHTS.bold,
    color: colors.text,
    marginBottom: 32,
    textAlign: 'center',
  }
});
