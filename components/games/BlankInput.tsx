import { colors } from "@/utils/constants/colors";
import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

interface BlankInputProps {
	value: string;
	onChange: (text: string) => void;
	// onSubmitEditing :()=>void
}

const BlankInput = React.memo(({ value, onChange }: BlankInputProps) => (
	<View style={styles.blankContainer}>
		<TextInput
			style={styles.blankInput}
			placeholder="..."
			placeholderTextColor={colors.black}
			autoCapitalize="none"
			autoCorrect={false}
			value={value}
			onChangeText={onChange}
			// onSubmitEditing={onSubmitEditing }
		/>
	</View>
));

const styles = StyleSheet.create({
	blankContainer: {
		borderBottomWidth: 2,
		borderBottomColor: colors.primary,
		marginHorizontal: 4,
		minWidth: 60,
	},

	blankInput: {
		fontSize: 18,
		padding: 4,
		textAlign: "center",
		color: colors.text,
	},
});

export default BlankInput;
