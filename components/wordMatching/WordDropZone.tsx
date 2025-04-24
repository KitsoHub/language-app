import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/utils/constants/colors";
import WordTile from "./WordTile";

type WordDropZoneProps = {
	arrangedWords: string[];
	onRemoveWord: (index: number) => void;
};
export default function WordDropZone({
	arrangedWords,
	onRemoveWord,
}: WordDropZoneProps) {
	return (
		<View style={styles.container}>
			<View style={styles.dropZoneArea}>
				{/* display word tiles if they exist */}

				{arrangedWords.length === 0 ? (
					<Text style={styles.placeholder}>
						Select words below to add them here.
					</Text>
				) : (
					<View style={styles.wordContainer}>
						{arrangedWords.map((word, index) => (
							<WordTile
								key={`${word}-${index}`}
								word={word}
								onPress={() => onRemoveWord(index)}
								style={styles.wordTile}
							/>
						))}
					</View>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginVertical: 16,
	},
	label: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
		color: colors.text,
	},
	wordContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
	},
	wordTile: {
		backgroundColor: colors.secondary,
	},
	placeholder: {
		textAlign: "center",
		fontSize: 16,
		color: colors.gray500,
	},
	dropZoneArea: {
		borderStyle: "dashed",
		backgroundColor: colors.cardBackground,
		borderWidth: 2,
		borderColor: colors.gray300,
		padding: 16,
		minHeight: 120,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
	},
});
