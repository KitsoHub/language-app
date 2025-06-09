import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import type { Challenge } from "@/types";
import { Check } from "lucide-react-native";
import {
	BORDER_RADIUS,
	FONT_SIZES,
	FONT_WEIGHTS,
	MARGIN,
	PADDING,
} from "@/utils/constants";
import { colors } from "@/utils/constants/colors";
import { useNewGameStore } from "@/store/game/new-game-store";

type MultipleChoiceGameProps = {
	challenge: Challenge;
};
export default function MultipleChoiceGame({
	challenge,
}: MultipleChoiceGameProps) {

	const [selectedOption, setSelectedOption] = useState<string | null>(null);

	const { setSelectedChoice } = useNewGameStore();

	const handleSelectOption = (option: string) => {

    setSelectedChoice(option);
    setSelectedOption(option)



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

						]}
						onPress={() => handleSelectOption(option)}
						// disabled={showResult}
					>
						<Text
							style={[
								styles.optionText,
								selectedOption === option && styles.resultOptionText,
							]}
						>
							{option}
						</Text>

						{selectedOption === option && (
							<View style={styles.resultIcon}>
								<Check size={20} color="white" />
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
