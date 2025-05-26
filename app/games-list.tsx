import {
	Pressable,
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";

import { COLORS, colors, DIFFICULTY_COLORS } from "@/utils/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ROUTES } from "@/utils/constants/routes";
import { useNewGameStore } from "@/store/game/new-game-store";
import type { Game } from "@/types";
import { BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS } from "@/utils/constants";
import { useAuthStore } from "@/store/auth-store";

export default function GamesList() {
	const router = useRouter();
	const { user } = useAuthStore();
	const { games, selectGame } = useNewGameStore();
	const handleSelectGame = (gameId: string) => {
		selectGame(gameId);
		router.push(ROUTES.GAMES);
	};

	type Difficulty = keyof typeof DIFFICULTY_COLORS;
	const getDifficultyStyle = (badge: string) => {
		const difficulty = badge.toLowerCase() as Difficulty;
		if (difficulty in DIFFICULTY_COLORS) {
			return DIFFICULTY_COLORS[difficulty];
		}
		return DIFFICULTY_COLORS.beginner;
	};
	const renderGameItem = ({ item, index }: { item: Game; index: number }) => {
		const completedChallenges = user?.completedChallenges || [];
		const totalChallenges = item.challenges.length;
		const completedCount = item.challenges.filter((challenge) =>
			completedChallenges.includes(String(challenge.id)),
		).length;
		const progress =
			totalChallenges > 0 ? (completedCount / totalChallenges) * 100 : 0;
		const difficultyStyle = getDifficultyStyle(item.gameBadge);

		const cardColors =
			index % 3 === 0
				? [COLORS.pinkPale, COLORS.pink] as const
				: index % 3 === 1
					? [COLORS.blueTintLight, COLORS.blueTint] as const
					: [COLORS.greenTint, COLORS.greenSpring] as const;
		return (
			<Pressable
				style={[styles.gameCard]}
				onPress={() => handleSelectGame(item.id)}
				testID="game-card"
			>
				<LinearGradient colors={cardColors} style={styles.gameCardGradient}>
					<View
						style={[
							styles.gameIconContainer,
							{ backgroundColor: difficultyStyle.secondary },
						]}
					>
						<Text style={styles.gameIcon}>{item.gameIcon}</Text>
					</View>
					<View style={styles.gameInfo}>
						<Text style={styles.gameTitle}>{item.title}</Text>
						<Text style={styles.gameDescription}>{item.description}</Text>
						<View style={styles.progressContainer}>
							<View style={styles.progressBarContainer}>
								<LinearGradient
									colors={difficultyStyle.gradient}
									start={{ x: 0, y: 0 }}
									end={{ x: 1, y: 0 }}
									style={[styles.progressBar, { width: `${progress}%` }]}
								/>
							</View>
							<Text style={styles.progressText}>
								{completedCount}/{totalChallenges}
							</Text>
						</View>
					</View>

					<LinearGradient
						colors={difficultyStyle.gradient}
						style={styles.badgeContainer}
					>
						<Text style={[styles.badgeText, { color: difficultyStyle.text }]}>
							{item.gameBadge}
						</Text>
					</LinearGradient>

					{/* Background elements */}
					<View
						style={[
							styles.decorCircle,
							styles.decorCircle1,
							{ backgroundColor: difficultyStyle.secondary },
						]}
					/>
					<View
						style={[
							styles.decorCircle,
							styles.decorCircle2,
							{ backgroundColor: difficultyStyle.secondary },
						]}
					/>

					<View style={[styles.decorDot, styles.decorDot1]} />
					<View style={[styles.decorDot, styles.decorDot2]} />
					<View style={[styles.decorDot, styles.decorDot3]} />
				</LinearGradient>
			</Pressable>
		);
	};
	return (
		<SafeAreaView>
			<View style={styles.backgroundPatterns}>
				<View style={[styles.patternCircle, styles.patternCircle1]} />
				<View style={[styles.patternCircle, styles.patternCircle2]} />
				<View style={[styles.patternCircle, styles.patternCircle3]} />
				<View style={[styles.patternCircle, styles.patternCircle4]} />
			</View>

			{games && games.length > 0 ? (
				<FlatList
					data={games}
					renderItem={renderGameItem}
					showsVerticalScrollIndicator={false}
					nestedScrollEnabled
					contentContainerStyle={styles.gameslist}
					testID="games-list"
				/>
			) : (
				<LinearGradient
					colors={[COLORS.white, COLORS.pale]}
					style={styles.emptyState}
				>
					<Text style={styles.emptyStateText}>
						No available games. Please select a different language.
					</Text>
				</LinearGradient>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	scrollView: {
		flex: 1,
		padding: 16,
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
	gameslist: {
		paddingBottom: 24,
		paddingHorizontal: 24,
	},
	emptyState: {
		backgroundColor: COLORS.white,
		borderRadius: 16,
		padding: 24,
		alignItems: "center",
		justifyContent: "center",
	},
	emptyStateText: {
		fontSize: 15,
		color: colors.textLight,
		textAlign: "center",
		fontWeight: "600",
	},
	gameCard: {
		marginTop: 20,
		borderRadius: BORDER_RADIUS.xxl,
		marginBottom: 0,
		elevation: 6,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.15,
		shadowRadius: 6,
		overflow: "hidden",
		borderWidth: 2,
		borderColor: "rgba(255, 255, 255, 0.6)",
	},
	gameCardGradient: {
		flexDirection: "row",
		padding: 16,
		borderRadius: 24,
		overflow: "hidden",
	},
	gameIconContainer: {
		width: 64,
		height: 64,
		borderRadius: 32,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 16,
		borderWidth: 3,
		borderColor: "rgba(255, 255, 255, 0.8)",
		elevation: 4,
	},
	gameIcon: {
		fontSize: 32,
	},
	gameInfo: {
		flex: 1,
		zIndex: 1,
	},
	gameTitle: {
		fontSize: 20,
		fontWeight: "800",
		color: COLORS.text,
		marginBottom: 4,
	},
	gameDescription: {
		fontSize: 14,
		color: COLORS.textLight,
		marginBottom: 12,
		fontWeight: "500",
	},
	badgeContainer: {
		position: "absolute",
		top: 12,
		right: 12,
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.6)",
	},
	badgeText: {
		fontSize: 12,
		fontWeight: "800",
	},
	progressContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	progressBarContainer: {
		flex: 1,
		height: 12,
		backgroundColor: "rgba(255, 255, 255, 0.5)",
		borderRadius: 6,
		marginRight: 8,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "rgba(0, 0, 0, 0.05)",
	},
	progressBar: {
		height: "100%",
		borderRadius: 6,
	},
	progressText: {
		fontSize: FONT_SIZES.sm,
		fontWeight: FONT_WEIGHTS.xl,
		color: COLORS.textLight,
	},
	decorCircle: {
		position: "absolute",
		borderRadius: 50,
		opacity: 0.15,
	},
	decorCircle1: {
		width: 60,
		height: 60,
		bottom: -20,
		right: 40,
	},
	decorCircle2: {
		width: 40,
		height: 40,
		top: -10,
		right: 80,
	},
	decorDot: {
		position: "absolute",
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: COLORS.tertiary,
		opacity: 0.2,
	},
	decorDot1: {
		bottom: 10,
		right: 30,
	},
	decorDot2: {
		bottom: 30,
		right: 20,
	},
	decorDot3: {
		bottom: 20,
		right: 40,
	},
});
