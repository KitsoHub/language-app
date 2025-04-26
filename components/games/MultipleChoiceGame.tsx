import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import type { Challenge } from "@/types";
import { Check, Container, X } from "lucide-react-native";
import {
	BORDER_RADIUS,
	FONT_SIZES,
	FONT_WEIGHTS,
	MARGIN,
	PADDING,
} from "@/utils/constants";
import { colors } from "@/utils/constants/colors";
import { useGameStore } from "@/store/game-store";
import { useNewGameStore } from "@/store/game/new-game-store";

type MultipleChoiceGameProps = {
	challenge: Challenge;
};
export default function MultipleChoiceGame({
	challenge,
}: MultipleChoiceGameProps) {
	// show options
	// select option
	// check option
  // set correct or incorrect style

	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [showResult, setShowResult] = useState<boolean>(false);
	const { submitAnswer, setShowFeedback } = useNewGameStore();

	const handleSelectOption = (option: string) => {
		setSelectedOption(option);
		// setShowResult(true);

		// check isCorrect answer
		const isCorrect = option === challenge.correctAnswer;

		console.log(">> Result >> ", isCorrect);

		if (isCorrect) {
      // setShowResult(false);

			submitAnswer(challenge.id, [option]);
      setShowFeedback(true);
      setShowResult(true);

      setTimeout(() => {
        setShowFeedback(false);
        setShowResult(false);
        setSelectedOption(null);
      }, 2000);
		}else{
      setShowFeedback(true);
      setShowResult(false);


      setTimeout(() => {
        setShowFeedback(false);
        setShowResult(false);
        setSelectedOption(null);
      }, 2000);
    }

	};

	// validate options
	const isCorretOption = (option: string) => {
		return showResult && option === challenge.correctAnswer;
	};
	const isIncorrectSelection = (option: string) => {
		return selectedOption === option && option !== challenge.correctAnswer

	};

	return (
		<View style={styles.container}>
			<View style={styles.optionsContainer}>
				{challenge.options?.map((option, index) => (
					<Pressable
						key={`${option}-${
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							index
						}`}
						style={[
							styles.optionsButton,
							selectedOption === option && styles.selectedOption,
							isCorretOption(option) && styles.correctOption,
              isIncorrectSelection(option) && styles.incorrectOption,
						]}
						onPress={() => !showResult && handleSelectOption(option)}
						disabled={showResult}
					>
						<Text
							style={[
								styles.optionText,
								(isCorretOption(option) || isIncorrectSelection(option) ) && styles.resultOptionText,
							]}
						>
							{option}
						</Text>

						{isCorretOption(option) && (
							<View style={styles.resultIcon}>
								<Check size={20} color="white" />
							</View>
						)}
						{isIncorrectSelection(option) && (
							<View style={styles.resultIcon}>
              <X size={20} color="white" />
            </View>
						)}
					</Pressable>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 16,
	},
	optionsContainer: {
		marginTop: 16,
	},
	optionsButton: {
		backgroundColor: colors.white,
		borderRadius: BORDER_RADIUS.sm,
		borderColor: colors.gray400,
		padding: PADDING.md,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderWidth: 2,
		marginBottom: MARGIN.sm,
	},
	optionText: {
		fontSize: FONT_SIZES.md,
		color: colors.text,
	},

	selectedOption: {
		borderColor: colors.primary,
		backgroundColor: "#F0F9F0",
	},
	correctOption: {
		borderColor: colors.success,
		backgroundColor: "#E8F5E9",
	},
	incorrectOption: {
		borderColor: colors.error,
		backgroundColor: "#FFEBEE",
	},
	resultIcon: {
		width: 28,
		height: 28,
		borderRadius: BORDER_RADIUS.md,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.success,
	},
	resultOptionText: {
		fontWeight: FONT_WEIGHTS.bold,
	},
});
