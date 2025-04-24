import {
	Dimensions,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSequence,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { colors } from "@/utils/constants/colors";
import { Star, Trophy, X } from "lucide-react-native";
import { Button } from "../ui/Button";

interface GameCompletedModalProps {
	visible: boolean;
	onClose: () => void;
	//onPlayAgain: () => void;
	onContinue: () => void;
	gameTitle: string;
	earnedXP: number;
}

const { width } = Dimensions.get("window");
export default function GameCompletedModal({
	visible,
	onClose,
	onContinue,
	gameTitle,
	earnedXP,
}: GameCompletedModalProps) {
	const { user } = useAuthStore();

	// animation state
	const scale = useSharedValue(0.8);
	const opacity = useSharedValue(0);
	const rotate = useSharedValue(0);
	const starScale = useSharedValue(0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (visible) {
			opacity.value = withTiming(1, { duration: 300 });
			scale.value = withSpring(1, { damping: 12 });
			rotate.value = withSequence(
				withTiming(0, { duration: 10 }),
				withTiming(-10, { duration: 100 }),
				withTiming(10, { duration: 100 }),
				withTiming(-5, { duration: 100 }),
				withTiming(5, { duration: 100 }),
				withTiming(0, { duration: 100 }),
			);

			// Animate stars with delay
			starScale.value = withDelay(500, withSpring(1.2, { damping: 8 }));
		} else {
			opacity.value = withTiming(0, { duration: 300 });
			scale.value = withTiming(0.8, { duration: 300 });
			starScale.value = withTiming(0, { duration: 200 });
		}
	}, [visible]);

	// styles
	const containerStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
		};
	});

	const cardStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
		};
	});

	const starStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: starScale.value }],
		};
	});

	return (
		<Modal
			visible={visible}
			transparent={true}
			onRequestClose={onClose}
			animationType="none"
		>
			<Animated.View style={[styles.modalContainer, containerStyle]}>
				<Animated.View style={[styles.modalContent, cardStyle]}>
					<Pressable style={styles.closeButton} onPress={onClose} hitSlop={20}>
						<X size={24} color={colors.text} />
					</Pressable>

					{/* trophy */}

					<View style={styles.trophyContainer}>
						<Trophy size={60} color={colors.secondary} />
					</View>

					{/* Message */}
					<Text style={styles.congratsText}>Congradulations</Text>
					<Text style={styles.completedText}>You completed {gameTitle}</Text>

					{/* XP */}
					<Animated.View style={[styles.xpContainer, starStyle]}>
						<Star size={24} color={colors.secondary} />
						<Text style={styles.xpText}>+{earnedXP} XP</Text>
					</Animated.View>

					<View style={styles.statsContainer}>
						<View style={styles.statItem}>
							<Text style={styles.statLabel}>Total XP</Text>
							<Text style={styles.statValue}>{user?.xp || 0}</Text>
						</View>
						<View style={styles.statItem}>
							<Text style={styles.statLabel}>Level</Text>
							<Text style={styles.statValue}>{user?.level || 1}</Text>
						</View>
						<View style={styles.statItem}>
							<Text style={styles.statLabel}>Streak</Text>
							<Text style={styles.statValue}>{user?.streak || 0}</Text>
						</View>
					</View>

					<Button
						title="Continue"
						onPress={onContinue}
						style={styles.continueButton}
					/>
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
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: width * 0.85,
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

	trophyContainer: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: colors.mascotBackground,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 16,
	},
	congratsText: {
		fontSize: 24,
		fontWeight: "bold",
		color: colors.text,
		marginBottom: 8,
	},
	completedText: {
		fontSize: 18,
		color: colors.text,
		marginBottom: 24,
		textAlign: "center",
	},
	xpContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.mascotBackground,
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 16,
		marginBottom: 24,
	},
	xpText: {
		fontSize: 20,
		fontWeight: "bold",
		color: colors.text,
		marginLeft: 8,
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		marginBottom: 24,
	},
	statItem: {
		alignItems: "center",
	},
	statLabel: {
		fontSize: 14,
		color: "#666",
		marginBottom: 4,
	},
	statValue: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.primary,
	},
	continueButton: {
		width: "100%",
	},
});
