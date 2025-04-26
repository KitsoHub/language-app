import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import type { Challenge } from "@/types";
import { colors } from "@/utils/constants/colors";

type FillBlankGameProps = {
	challenge: Challenge;
};
export default function FillBlankGame({ challenge }: FillBlankGameProps) {
    const [answer, setAnswer] = useState('');
	const formatSentence = () => {
        console.log("answer: ", answer)
		if (!challenge.sentence) return null;

		return challenge.sentence.split("_").map((part, index, array) => (
			<>
				<Text style={styles.sentenceText}>{part} </Text>
				{/* <Text key={`${index}`}>{index}</Text> */}

				{index < array.length - 1 && (
					<View style={styles.blankContainer}>
						<TextInput
							style={styles.blankInput}
							placeholder="..."
							placeholderTextColor={colors.black}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={answer}
                            onChangeText={setAnswer}
						/>
					</View>
				)}
			</>
		));
	};
	return (
		<View style={styles.container}>
			<View style={styles.sentenceContainer}>{formatSentence()}</View>
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
	blankContainer: {
		borderBottomWidth: 2,
		borderBottomColor: colors.primary,
		marginHorizontal: 4,
		minWidth: 60,
	},
	correctBlank: {
		borderBottomColor: colors.success,
	},
	incorrectBlank: {
		borderBottomColor: colors.error,
	},
	blankInput: {
		fontSize: 18,
		padding: 4,
		textAlign: "center",
		color: colors.text,
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
