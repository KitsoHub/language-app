import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGameStore } from "@/store/game-store";
import { colors } from "@/utils/constants/colors";
import { FONT_SIZES, FONT_WEIGHTS } from "@/utils/constants";
import WordMatchProgressBar from "@/components/wordMatching/WordMatchProgressBar";
import { useWordMatchGameStore } from "@/store/word-matching-game-store";
import WordDropZone from "@/components/wordMatching/WordDropZone";
import MascotAlert from "@/components/wordMatching/MascotAlert";
import WordBank from "@/components/wordMatching/WordBank";
import { Button } from "@/components/ui/Button";
import { useLanguageStore } from "@/store/language-store";
import ScoreDisplay from "@/components/shared/games/ScoreDisplay";

export default function AppChallenges() {
	const router = useRouter();
	const { id } = useLocalSearchParams();
	const currentLanguage = useLanguageStore((state) => state.selectedLanguage);

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
	const [currentChallenge, setCurrentChallenge] = useState(
		currentGame.challenges[0],
	);
	const {
		addWordToArrangement,
		removeWordFromArrangement,
		arrangedWords,
		score,
		currentLevel,
		setShowFeedback,
		showFeedback,
		nextLevel,
		resetLevel,
		isWordCorrect,
		checkAnswer,
		resetGame,
	} = useWordMatchGameStore();


	const handleRemoveWord = (index: number) => {
		removeWordFromArrangement(index);
	};

	const handleWordSelect = (word: string) => {
		addWordToArrangement(word);
	};

	const handleGameReset = () => {
		resetGame();
	};

	const [isGameCompleted, setIsGameCompleted] = useState(false);
	useEffect(() => {
		if(isGameCompleted){
			Alert.alert(
				"Challenge Completed tests!",
				`You have earned ${score} XP!`,
				[
				  {
					text: "Continue",
					onPress: () =>
					  setTimeout(() => {
						router.back();
						resetGame();
						setIsGameCompleted(false);
					  }, 1000),
				  },
				],
			  );
		}
	},[isGameCompleted, score, router, resetGame])

	const handleWordCheck = () => {
		const wordCheckResult = checkAnswer();

		if (Platform.OS === "web") {
			if (wordCheckResult) {
				Alert.alert("Correct", "Great job! Moving the next level");
				setTimeout(() => {
					nextLevel();
				}, 2000);
			} else {
				Alert.alert("Incorrect", "Try Again!");
			}
		} else {
			setTimeout(() => {
				if (wordCheckResult) {
					if (isLastTask) {

						// const currentXp = useWordMatchGameStore.getState().score;
						// Alert.alert(
						// 	"Challenge Completed tests!",
						// 	`You have earned ${currentXp} XP!`,
						// 	[
						// 		{
						// 			text: "Continue",
						// 			onPress: () =>
						// 				setTimeout(() => {
						// 					router.back();
						// 					resetGame();
						// 				}, 1000),
						// 		},
						// 	],
						// );
						setIsGameCompleted(true);

					} else {
						nextLevel();

					}
					//check challenge end
				} else setShowFeedback(false);
			}, 2000);
		}
	};

	const isWordCheckDisabled =
		arrangedWords.length !== currentChallenge.correctOrder.length;

	const totalChallenges = currentGame.challenges.filter(
		(c) => c.languageId === currentLanguage?.id,
	).length;
	useEffect(() => {
		const challenge = currentGame.challenges.find((c) => c.id === currentLevel);
		if (challenge) {
			setCurrentChallenge(challenge);
		}
	}, [currentLevel, currentGame.challenges]);

	// check challenge end
	const currentGameChallenge = currentGame.challenges[currentLevel];
	const isLastTask = currentLevel === currentGame.challenges.length;

	// render function
	const renderChallenge = () => {

		switch (currentGame.type) {
			case "word-matching":
				return (
					<SafeAreaView style={styles.container}>
						<WordMatchProgressBar
							currentLevel={currentChallenge.id}
							totalLevels={totalChallenges}
						/>

						<View style={styles.instructionContainer}>
							<Text style={styles.instructionText}>
								{currentChallenge.instruction}
							</Text>
						</View>

						{/* dropzone */}
						<WordDropZone
							arragedWords={arrangedWords}
							onRemoveWord={handleRemoveWord}
						/>
						{showFeedback && (
							<MascotAlert
								isCorrect={isWordCorrect ?? undefined}
								visible={showFeedback}
							/>
						)}

						{/*word bank*/}

						<WordBank
							words={currentChallenge.wordBank}
							usedWords={arrangedWords}
							onSelectWord={handleWordSelect}
						/>

						{/* reset and check buttons */}
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								marginTop: 40,
								marginBottom: 40,
							}}
						>
							<Button
								title="Reset"
								style={styles.resetButton}
								onPress={handleGameReset}
							/>
							<Button
								title="Check"
								style={styles.checkButton}
								onPress={handleWordCheck}
								disabled={isWordCheckDisabled}
							/>
						</View>
					</SafeAreaView>
				);

			default:
				return (
					<Text style={styles.gameQuestion}>
						This exercise type is not implemented
					</Text>
				);
		}
	};



	return (
		<>
			<Stack.Screen
				options={{
					title: currentGame.title,
					headerBackTitle: "Back",
					headerStyle: { backgroundColor: colors.primary },
					headerTintColor: colors.white,
					headerRight: () => <ScoreDisplay score={score} />,
				}}
			/>
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
	gameQuestion: {
		fontSize: FONT_SIZES.xl,
		fontWeight: FONT_WEIGHTS.bold,
		color: colors.text,
		marginBottom: 32,
		textAlign: "center",
	},
	instructionContainer: {
		backgroundColor: colors.mascotBackground,
		borderRadius: 16,
		padding: 16,
		marginVertical: 8,
	},
	instructionText: {
		fontSize: 18,
		fontWeight: "600",
		textAlign: "center",
		color: colors.text,
	},
	resetButton: {
		flex: 1,
		marginRight: 8,
		borderRadius: 25,
		backgroundColor: "#2D9ECE",
	},
	checkButton: {
		flex: 2,
		marginLeft: 8,
		borderRadius: 25,
	},
});
