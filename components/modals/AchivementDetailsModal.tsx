import {
	Dimensions,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useEffect } from "react";
import { useAchievementsStore } from "@/store/achivement-store";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSequence,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { COLORS } from "@/utils/constants/colors";
import { X, Lock, Check } from "lucide-react-native";
import { FONT_SIZES, FONT_WEIGHTS, MARGIN } from "@/utils/constants";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");
export default function AchivementDetailsModal() {
	const { selectedAchivement, clearSelected, isAchievementUnlocked } =
		useAchievementsStore();

	const opacity = useSharedValue(0);
	const rotate = useSharedValue(0);
	const scale = useSharedValue(0.8);
	const iconScale = useSharedValue(0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (selectedAchivement) {
			opacity.value = withTiming(0.9, { duration: 300 });
			scale.value = withSpring(1, { damping: 12 });
			rotate.value = withSequence(
				withTiming(0, { duration: 10 }),
				withTiming(-10, { duration: 100 }),
				withTiming(10, { duration: 100 }),
				withTiming(-5, { duration: 100 }),
				withTiming(5, { duration: 100 }),
				withTiming(0, { duration: 100 }),
			);

			// animate icon -> damping:8
			iconScale.value = withDelay(500, withSpring(1.2, { damping: 12 }));
		} else {
			opacity.value = withTiming(0, { duration: 300 });
			scale.value = withTiming(0.8, { duration: 300 });
			iconScale.value = withTiming(0, { duration: 200 });
		}
	}, [selectedAchivement]);

	const containerStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	const cardStyle = useAnimatedStyle(() => ({
		transform: [{ scale: iconScale.value }, { rotate: `${rotate.value}deg` }],
	}));

	const iconStyle = useAnimatedStyle(() => ({
		transform: [{ scale: iconScale.value }],
	}));

	const defaultAnimation = require("@/assets/lotties/trophy.json");

	if (!selectedAchivement) return null;
	const isUnlocked = isAchievementUnlocked(selectedAchivement.id);
	
	return (
		<Modal transparent={true} animationType="none">
			<Animated.View style={[styles.modalContainer, containerStyle]}>
				<Animated.View style={[styles.modalContent, cardStyle]}>
					<Pressable
						onPress={clearSelected}
						style={styles.closeButton}
						hitSlop={20}
					>
						<X size={24} color={COLORS.text} />
					</Pressable>

					{isUnlocked ? (
						<>
							<LottieView
								autoPlay={false}
								source={defaultAnimation}
								loop
								style={styles.animation}
							/>

							<Text style={styles.titleText}> {selectedAchivement.title}</Text>
							<View style={styles.lockIconContainer}>
								<Check size={16} color={COLORS.white} />
							</View>
							<Text style={styles.descriptionComplete}>COMPLETED</Text>
						</>
					) : (
						<>
							<Animated.View style={iconStyle}>
								<Text style={styles.icon}>{selectedAchivement.icon}</Text>
							</Animated.View>

							<Text style={styles.titleText}> {selectedAchivement.title}</Text>

							<Text style={styles.description}>
								{selectedAchivement.description}
							</Text>
							<View style={styles.lockIconContainer}>
								<Lock size={16} color={COLORS.white} />
							</View>
							<Text style={styles.lockedText}>Locked</Text>
						</>
					)}
				</Animated.View>
			</Animated.View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.black,
		opacity: 0.5,
	},
	modalContent: {
		width: width * 0.75,
		maxWidth: 400,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 24,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	closeButton: {
		position: "absolute",
		top: 16,
		right: 16,
		zIndex: 1,
	},
	icon: {
		fontSize: FONT_SIZES.xxl * 5,
	},
	description: {
		fontSize: FONT_SIZES.md,
		marginBottom: MARGIN.lg,
		color: COLORS.textLight,
	},
	titleText: {
		fontSize: FONT_SIZES.xxl,
		fontWeight: FONT_WEIGHTS.bold,
		color: COLORS.text,
		paddingTop: 20,
		marginBottom: MARGIN.lg,
	},
	descriptionCompletedTitle: {},
	descriptionComplete: {
		fontSize: FONT_SIZES.xl,
		paddingTop: MARGIN.md,
		marginBottom: MARGIN.lg,
		color: COLORS.colorGreen,
		fontWeight: FONT_WEIGHTS.bold,
	},

	animation: {
		height: 200,
		width: 200,
	},
	lockedText: {
		fontSize: FONT_SIZES.md,
		marginBottom: MARGIN.lg,
		color: COLORS.textLight,
	},
	lockIconContainer: {
		backgroundColor: COLORS.gray600,
		borderRadius: 12,
		padding: 4,
	},
});
