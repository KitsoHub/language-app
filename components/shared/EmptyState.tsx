import {
	Dimensions,
	StyleSheet,
	Text,
	View,
	type ViewStyle,
} from "react-native";
import React, { useRef } from "react";
import Feather from "@expo/vector-icons/build/Feather";
import { colors, COLORS } from "@/utils/constants/colors";
import { Button } from "../ui/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
interface EmptyStateProps {
	title?: string;
	description?: string;
	icon?: keyof typeof Feather.glyphMap;
	buttonTitle?: string;
	onButtonPress?: () => void;
	style?: ViewStyle;

	animationSource?: string | { uri: string };
}
const { width } = Dimensions.get("window");
export default function EmptyState({
	title,
	description,
	icon = "inbox",
	buttonTitle,
	onButtonPress,
	style,
	animationSource,
}: EmptyStateProps) {

	const defaultAnimation = require("@/assets/lotties/empty_scroll.json");

	return (
		<SafeAreaView style={styles.container}>

			<View style={styles.backgroundPatterns}>
				<View style={[styles.patternCircle, styles.patternCircle1]} />
				<View style={[styles.patternCircle, styles.patternCircle2]} />
				<View style={[styles.patternCircle, styles.patternCircle3]} />
				<View style={[styles.patternCircle, styles.patternCircle4]} />
			</View>
			<View style={[styles.content, style]}>
				<View style={styles.animationContainer}>

				{animationSource ? (
					<LottieView
						autoPlay
						source={animationSource}
						loop
						style={styles.animation}
					/>
				) : icon ? (
					<Feather name={icon} size={64} color={COLORS.textLight} />
				) : (
					<LottieView
						source={defaultAnimation}
						autoPlay
						loop
						style={styles.animation}
					/>
				)}
				</View>

				<Text style={styles.title}>{title}</Text>
				{description && <Text style={styles.description}>{description}</Text>}
				{buttonTitle && onButtonPress && (
					<Button
						title={buttonTitle}
						onPress={onButtonPress}
						style={styles.button}
					/>
				)}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 32,
		backgroundColor: COLORS.background,
	},
	title: { textAlign: "center" },
	description: {
		fontSize: 16,
		fontWeight: 400,
		lineHeight: 32,
		marginTop: 8,
		textAlign: "center",
		marginBottom: 24,
	},
	button: {
		marginTop: 16,
		borderRadius: 16,
		overflow: "hidden",
	},
	content: {
		alignItems: "center",
		zIndex: 1,
		maxWidth: width * 0.85,
	},
	backgroundPatterns: {
		position: "absolute",
		width: "100%",
		height: "100%",
	},
	patternCircle: {
		position: "absolute",
		borderRadius: 100,
		opacity: 0.15,
	},
	patternCircle1: {
		backgroundColor: COLORS.primary,
		width: 200,
		height: 200,
		top: "10%",
		left: -100,
	},
	patternCircle2: {
		backgroundColor: COLORS.secondary,
		width: 150,
		height: 150,
		top: "30%",
		right: -50,
	},
	patternCircle3: {
		backgroundColor: COLORS.tertiary,
		width: 180,
		height: 180,
		bottom: "20%",
		left: -90,
	},
	patternCircle4: {
		backgroundColor: COLORS.quaternary,
		width: 120,
		height: 120,
		bottom: "5%",
		right: -40,
	},
	  animationContainer: {
    backgroundColor: COLORS.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
	borderRadius: 50,
  },
	animation: {
		width: 200,
		height: 200,

	},
});
