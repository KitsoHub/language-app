import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WordDropZone from "../wordMatching/WordDropZone";
import WordBank from "../wordMatching/WordBank";
import type { Challenge } from "@/types";
import { useNewGameStore } from "@/store/game/new-game-store";

type SentenceBuilderGameProps = {
	challenge: Challenge;
};
export default function SentenceBuilderGame({
	challenge,
}: SentenceBuilderGameProps) {
	const { arrangedWords, addWordToArrangement, removeWordFromArrangement } =
		useNewGameStore();

	const handleRemoveWord = (index: number) => {
		removeWordFromArrangement(index);
	};

	const handleWordSelect = (word: string) => {
		addWordToArrangement(word);
	};
	return (
		<>
			<WordDropZone
				arrangedWords={arrangedWords}
				onRemoveWord={handleRemoveWord}
			/>

			<WordBank
				words={challenge.wordBank || []}
				usedWords={arrangedWords}
				onSelectWord={handleWordSelect}
			/>
		</>
	);
}

const styles = StyleSheet.create({});
