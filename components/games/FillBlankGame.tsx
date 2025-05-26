import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { Challenge } from "@/types";
import { colors } from "@/utils/constants/colors";
import { useNewGameStore } from "@/store/game/new-game-store";
import BlankInput from "./BlankInput";

type FillBlankGameProps = {
	challenge: Challenge;
};
export default function FillBlankGame({ challenge }: FillBlankGameProps) {
	// TODO: debouncing
	const [answer, setAnswer] = useState("");
	const {
		submitAnswer,
		setShowFeedback,
		setSelectedChoice,
		getCurrentWordSelection,
	} = useNewGameStore();

	useEffect(()=>{
		if(answer){
			setSelectedChoice(answer);
		}
	},[answer, setSelectedChoice,])


	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setAnswer('');
	}, [challenge.id]);



	// const handleSubmit = useCallback(() => {
	// 	if (answer) {
	// 		setSelectedChoice(answer);

	// 		setAnswer("");
	// 	}
	// }, [answer, setSelectedChoice]);

	const formatSentence = useMemo(() => {
		if (!challenge.sentence) return null;
		const regex = /(\s*_\s*)/;
		const new_regex = /(_)/;
		const parts = challenge.sentence.split(new_regex);


		return (
			<>
				{parts.map((part, index) => {
					if (part === "_") {
						return (
							<BlankInput
								key={index}
								value={answer}
								onChange={setAnswer}
								// onSubmitEditing={handleSubmit}
							/>
						);
					}
					return part ? (
						<Text key={index} style={styles.sentenceText}>
							{part}
						</Text>
					) : null;
				})}
			</>
		);
	}, [challenge.sentence, answer]);

	return (
		<View style={styles.container}>
			<View style={styles.sentenceContainer}>{formatSentence}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 16,
	},
	sentenceContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		borderRadius: 12,
		padding: 20,
		marginBottom: 20,
	},
	sentenceText: {
		fontSize: 18,
		color: colors.text,
	},
	correctBlank: {
		borderBottomColor: colors.success,
	},
	incorrectBlank: {
		borderBottomColor: colors.error,
	},
	textInput: {
		borderColor: colors.gray500,
		borderWidth: 2,
		padding: 12,
		fontSize: 18,
		borderRadius: 50,
		marginHorizontal: 12,
		marginBottom: 12,
		backgroundColor: colors.white,
	},
});
