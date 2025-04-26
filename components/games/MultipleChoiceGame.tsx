import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import type { Challenge } from "@/types";
import { Container } from "lucide-react-native";
import { BORDER_RADIUS, FONT_SIZES, MARGIN, PADDING } from "@/utils/constants";
import { colors } from "@/utils/constants/colors";

type MultipleChoiceGameProps = {
	challenge: Challenge;
};
export default function MultipleChoiceGame({
	challenge,
}: MultipleChoiceGameProps) {
	// show options
	// select option
	// check option
	return (
		<View style={styles.container}>
			<View style={styles.optionsContainer}>
				{challenge.options?.map((option, index) => (
					<Pressable
						key={`${option}-${
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							index
						}`}
            style={[styles.optionsButton]}
					>

            <Text>
              {option}
            </Text>


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
  optionsButton:{
    backgroundColor:colors.white,
    borderRadius: BORDER_RADIUS.sm,
    borderColor:colors.gray400,
    padding:PADDING.md,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    borderWidth:2,
    marginBottom: MARGIN.sm

  },
  optionText:{
    fontSize:FONT_SIZES.md,
    color:colors.text
  },

});
