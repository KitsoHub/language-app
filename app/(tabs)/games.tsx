import {
	Alert,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useNewGameStore } from "@/store/game/new-game-store";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/Button";
import { colors } from "@/utils/constants/colors";
import ScoreDisplay from "@/components/shared/games/ScoreDisplay";
import WordBank from "@/components/wordMatching/WordBank";
import WordDropZone from "@/components/wordMatching/WordDropZone";
import WordMatchProgressBar from "@/components/wordMatching/WordMatchProgressBar";
import MascotAlert from "@/components/wordMatching/MascotAlert";
import GameCompletedModal from "@/components/modals/GameCompletedModal";
import MultiChoiceGame from "@/components/games/MultipleChoiceGame";
import MultipleChoiceGame from "@/components/games/MultipleChoiceGame";
import FillBlankGame from "@/components/games/FillBlankGame";
import SentenceBuilderGame from "@/components/games/SentenceBuilderGame";
import EmptyState from "@/components/shared/EmptyState";
import { ROUTES } from "@/utils/constants/routes";

export default function GamePage() {
	const router = useRouter();
	const {
		getCurrentGame,
		getCurrentChallenge,
		arrangedWords,
		isCorrect,
		showFeedback,
		addWordToArrangement,
		removeWordFromArrangement,
		checkAnswer,
		nextChallenge,
		resetLevel,
		setShowFeedback,
		isGameCompleted,
		resetGame,
		selectedChoice,
	} = useNewGameStore();

	const { user } = useAuthStore();
	const [showCompletionModal, setShowCompletionModal] = useState(false);
	const [showCheck, setShowCheck] = useState(false);

	// game state
	const currentGame = getCurrentGame();
	const currentChallenge = getCurrentChallenge();

	useEffect(() => {
		if (isGameCompleted() && !showCompletionModal) {
			setShowCompletionModal(true);
		}
	}, [isGameCompleted, showCompletionModal]);

	const handleRemoveWord = (index: number) => {
		removeWordFromArrangement(index);
	};

	const handleWordSelect = (word: string) => {
		addWordToArrangement(word);
	};

	const handleGameReset = () => {
		resetGame();
	};

	const handleResetLevel = () => {
		resetLevel();
	};

	const handleContinue = () => {
		setShowCompletionModal(false);
		router.back();
		resetGame();
	};
	const handleCloseCompletedModal = () => {
		setShowCompletionModal(false);
		router.back();
		resetGame();
	};
	const handleWordCheck = () => {
		setShowCheck(true);
		const wordCheckResult = checkAnswer();
		if (Platform.OS === "web") {
			if (wordCheckResult) {
				Alert.alert("Correct", "Great job! Moving the next level");
				setTimeout(() => {
					nextChallenge();
				}, 2000);
			} else {
				Alert.alert("Incorrect", "Try Again!");
			}
		} else {
			setTimeout(() => {
				if (wordCheckResult) {
					setShowCheck(false);
					if (isGameCompleted()) {
						setShowCompletionModal(true);

					} else {

						nextChallenge();
					}
				} else {setShowFeedback(false);setShowCheck(false);}
			}, 2000);
		}
	};

	if (!currentGame || !currentChallenge) {

		// empty state
		return (

			<EmptyState
			 title={currentGame?.title}
			//  icon="inbox"
			 description="No Game has been selected"
			 buttonTitle="Back to Home"
			 onButtonPress={() => router.push(ROUTES.TABS)}
			 animationSource={require("@/assets/lotties/empty_scroll.json")}
			   />

		);
	}

	return (
		<>
			<Stack.Screen
				options={{
					title: currentGame.title,
					headerBackTitle: "Back",
					headerStyle: { backgroundColor: colors.primary },
					headerTintColor: colors.white,
					headerRight: () => <ScoreDisplay score={user?.xp || 0} />,
				}}
			/>
			<SafeAreaView style={styles.container}>
				<View style={{ padding: 16 }}>
					<WordMatchProgressBar
						currentLevel={currentGame.challenges.indexOf(currentChallenge)}
						totalLevels={currentGame.challenges.length - 1}
					/>

					<View style={styles.instructionContainer}>
						<Text style={styles.instructionText}>
							{currentChallenge.instruction}
						</Text>
					</View>

					{currentChallenge.type === "word-matching" && (
						<>
							<WordDropZone
								arrangedWords={arrangedWords}
								onRemoveWord={handleRemoveWord}
							/>

							<WordBank
								words={currentChallenge.wordBank || []}
								usedWords={arrangedWords}
								onSelectWord={handleWordSelect}
							/>
						</>
					)}

					{/* multiple choice */}
					{currentChallenge.type === "multiple-choice" && (
						<MultipleChoiceGame challenge={currentChallenge} />
					)}

					{/* fill in blank */}
					{currentChallenge.type === "fill-blank" && (
						<FillBlankGame challenge={currentChallenge} />
					)}

					{/* sentence builder */}
					{currentChallenge.type === "sentence-builder" && (
						<SentenceBuilderGame challenge={currentChallenge} />
					)}

					{showFeedback && (
						<MascotAlert
							isCorrect={isCorrect ?? undefined}
							visible={showFeedback}
						/>
					)}
					<View style={styles.buttonContainer}>
						<Button
							title="Reset"
							onPress={handleResetLevel}
							variant="outline"
							style={styles.resetButton}
						/>
						<Button
							title="Check"
							onPress={handleWordCheck}
							disabled={showCheck}
							style={styles.checkButton}
						/>
					</View>
				</View>

				<View style={styles.content}>
					<GameCompletedModal
						visible={showCompletionModal}
						onClose={handleCloseCompletedModal}
						onContinue={handleContinue}
						gameTitle={currentGame.title}
						earnedXP={currentGame.challenges.reduce(
							(sum, challenge) => sum + (challenge.points || 0),
							0,
						)}
					/>
				</View>

				{/* <View style={styles.centeredContainer}>
     <Text style={styles.errorText}>No game selected. Please select a game from the home screen.</Text>
     <Button
       title="Go to Home"
       onPress={() => router.push('/(tabs)')}
       style={styles.button}
     />
   </View> */}
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
	scrollContent: {
		padding: 16,
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
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 24,
		marginBottom: 40,
	},
	resetButton: {
		flex: 1,
		marginRight: 8,
	},
	checkButton: {
		flex: 2,
		marginLeft: 8,
	},
	centeredContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	errorText: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
		color: colors.text,
	},
	button: {
		minWidth: 150,
	},
});
