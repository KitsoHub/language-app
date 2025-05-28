"use client";

import { StatusBar } from "expo-status-bar";
import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	BookOpen,
	ChevronRight,
	Flame,
	Trophy,
	HandCoins,
	Heart,
	Globe,
	Crown,
	Star,
} from "lucide-react-native";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "expo-router";
import { useLanguageStore } from "@/store/language-store";
import { useProgressStore } from "@/store/progress-store";
import { useEffect } from "react";
import { ROUTES } from "@/utils/constants/routes";
import { useNewGameStore } from "@/store/game/new-game-store";
import type { Game } from "@/types";
import { LinearGradient } from "expo-linear-gradient";

// Expanded Fall Guys inspired color palette
const COLORS = {
	primary: "#FF4D6D", // Pink
	primaryLight: "#FF97A7", // Light Pink
	primaryDark: "#D13354", // Dark Pink
	secondary: "#FFC857", // Yellow
	secondaryLight: "#FFE3A3", // Light Yellow
	secondaryDark: "#E6A100", // Dark Yellow
	tertiary: "#4ECDC4", // Teal
	tertiaryLight: "#8EEAE4", // Light Teal
	tertiaryDark: "#2A9D95", // Dark Teal
	quaternary: "#7B61FF", // Purple
	quaternaryLight: "#B4A5FF", // Light Purple
	quaternaryDark: "#5840CC", // Dark Purple
	success: "#7AE582", // Green
	successLight: "#B5F2BA", // Light Green
	successDark: "#4CAF50", // Dark Green
	warning: "#FF9E00", // Orange
	warningLight: "#FFD699", // Light Orange
	warningDark: "#E67700", // Dark Orange
	danger: "#FF5252", // Red
	dangerLight: "#FF8A8A", // Light Red
	dangerDark: "#CC0000", // Dark Red
	background: "#F5F7FF", // Light background
	backgroundAlt: "#E8EFFF", // Alternate background
	white: "#FFFFFF",
	black: "#333333",
	textDark: "#333333",
	text: "#333333",
	textLight: "#666666",
	gray200: "#E5E7EB",
	gray400: "#D1D5DB",
	mascotBackground: "#FFE8D6",
};

// Game difficulty color schemes
const DIFFICULTY_COLORS = {
	beginner: {
		primary: COLORS.tertiary,
		secondary: COLORS.tertiaryLight,
		text: "#003E3E",
		gradient: ["#8EEAE4", "#4ECDC4"] as const,
	},
	easy: {
		primary: COLORS.success,
		secondary: COLORS.successLight,
		text: "#006400",
		gradient: ["#B5F2BA", "#7AE582"] as const,
	},
	medium: {
		primary: COLORS.warning,
		secondary: COLORS.warningLight,
		text: "#664500",
		gradient: ["#FFD699", "#FF9E00"] as const,
	},
	hard: {
		primary: COLORS.danger,
		secondary: COLORS.dangerLight,
		text: "#FFFFFF",
		gradient: ["#FF8A8A", "#FF5252"] as const,
	},
};

export default function App() {
	const { user } = useAuthStore();
	const router = useRouter();
	const { games, selectGame } = useNewGameStore();

	const handleSelectGame = (gameId: string) => {
		selectGame(gameId);
		router.push(ROUTES.GAMES);
	};

	const getDifficultyStyle = (badge: string) => {
		const difficulty = badge.toLowerCase() as keyof typeof DIFFICULTY_COLORS;
		return DIFFICULTY_COLORS[difficulty] || DIFFICULTY_COLORS.beginner;
	};

	const { selectedLanguage, selectLanguage } = useLanguageStore();
	const { dailyGoal, dailyProgress } = useProgressStore();

	// Filter games based on selected language
	const appGames = games?.filter(
		(game) => game.languageId?.includes(selectedLanguage?.id || ""
	),)
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {

		// biome-ignore lint/complexity/useOptionalChain: <explanation>
				if (user && user.currentLanguage && !selectedLanguage) {
			selectLanguage(user.currentLanguage);
		}
	}, []);


	// Game card renderer with Fall Guys styling
	const renderGameItem = ({ item, index }: { item: Game; index: number }) => {
		const completedChallenges = user?.completedChallenges || [];
		const totalChallenges = item.challenges.length;
		const completedCount = item.challenges.filter((challenge) =>
			completedChallenges.includes(String(challenge.id)),
		).length;
		const progress =
			totalChallenges > 0 ? (completedCount / totalChallenges) * 100 : 0;

		const difficultyStyle = getDifficultyStyle(item.gameBadge);

		// Alternate card colors for visual variety
		const cardColors =
			index % 3 === 0
				? ["#FFE3F1", "#FFC1E3"] as const
				: index % 3 === 1
					? ["#E3EEFF", "#C1D9FF"] as const
					: ["#E3FFF1", "#C1FFE3"] as const;

		return (
			<Pressable
				style={[
					styles.gameCard,
					{ transform: [{ translateY: index % 2 === 0 ? 0 : 8 }] },
				]}
				onPress={() => handleSelectGame(item.id)}
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

					{/* Decorative elements */}
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
				</LinearGradient>
			</Pressable>
		);
	};

	// Calculate daily goal progress
	const goalProgress = dailyGoal > 0 ? (dailyProgress / dailyGoal) * 100 : 0;

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="light" />

			{/* Colorful background patterns */}
			<View style={styles.backgroundPatterns}>
				<View style={[styles.patternCircle, styles.patternCircle1]} />
				<View style={[styles.patternCircle, styles.patternCircle2]} />
				<View style={[styles.patternCircle, styles.patternCircle3]} />
				<View style={[styles.patternCircle, styles.patternCircle4]} />
			</View>

			{/* Header with vibrant gradient background */}
			{/* <LinearGradient
				colors={[COLORS.quaternary, "#9B85FF", COLORS.primaryLight]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={styles.headerGradient}
			>
				<View style={styles.header}> */}
					{/* <View style={styles.userInfo}>
						<Text style={styles.greeting}>
							Hello, {user?.name?.split(" ")[0] || "Friend"}!
						</Text>


					</View> */}

					{/* User avatar with crown */}
					{/* <TouchableOpacity style={styles.avatarContainer}>
						<LinearGradient
							colors={[COLORS.secondary, COLORS.secondaryDark]}
							style={styles.avatar}
						>
							<Crown size={24} color="#FFFFFF" />
						</LinearGradient>
					</TouchableOpacity> */}
				{/* </View>
			</LinearGradient> */}

			{/* Stats Cards */}
			<View style={styles.statsContainer}>
				<LinearGradient colors={[COLORS.primary, COLORS.primary]} style={styles.statCard}>
					<LinearGradient
						colors={[COLORS.primaryDark, COLORS.primaryDark]}
						style={styles.statIconContainer}
					>
						<Trophy size={20} color="#FFFFFF" />
					</LinearGradient>
					<View>
						<Text style={styles.statValue}>{user?.xp || 0}</Text>
						<Text style={styles.statLabel}>Total XP</Text>
					</View>
				</LinearGradient>

				<LinearGradient colors={[COLORS.quaternary, COLORS.quaternary]} style={styles.statCard}>
					<LinearGradient
						colors={[COLORS.quaternaryDark, COLORS.quaternaryDark]}
						style={styles.statIconContainer}
					>
						<BookOpen size={20} color="#FFFFFF" />
					</LinearGradient>
					<View>
						<Text style={styles.statValue}>{user?.level || 1}</Text>
						<Text style={styles.statLabel}>Level</Text>
					</View>
				</LinearGradient>
			</View>

			{/* Games Section */}
			<View style={styles.sectionHeader}>
				<LinearGradient
					colors={[COLORS.quaternaryDark, COLORS.quaternaryDark]}
					style={styles.sectionTitleContainer}
				>
					<Text style={styles.sectionTitle}>Select Game</Text>
				</LinearGradient>
				<TouchableOpacity
					style={styles.seeAllButton}
					onPress={() => router.push(ROUTES.GAMESLIST as never)}
				>
					<LinearGradient
						colors={[COLORS.primaryDark, COLORS.primaryDark]}
						style={styles.seeAllGradient}
					>
						<Text style={styles.sectionTitle}>See All</Text>
						<ChevronRight size={16} color="#FFFFFF" />
					</LinearGradient>
				</TouchableOpacity>
			</View>

			{/* Games List */}
			{appGames && appGames.length > 0 ? (
				<FlatList
					data={games}
					renderItem={renderGameItem}
					showsVerticalScrollIndicator={false}
					nestedScrollEnabled
					contentContainerStyle={styles.gamesList}
				/>
			) : (
				<LinearGradient
					colors={["#FFFFFF", "#F0F4FF"]}
					style={styles.emptyState}
				>
					<Text style={styles.emptyStateText}>
						No available games. Please select a different language.
					</Text>
				</LinearGradient>
			)}

			{/* Language Section */}
			<View style={styles.sectionHeader}>
				<LinearGradient
					colors={[COLORS.tertiaryDark, COLORS.tertiaryDark]}
					style={styles.sectionTitleContainer}
				>
					<Text style={styles.sectionTitle}>Your Language</Text>
				</LinearGradient>
				<TouchableOpacity
					style={styles.seeAllButton}
					onPress={() => router.push(ROUTES.SETTINGS)}
				>
					<LinearGradient
						colors={[COLORS.tertiaryDark, COLORS.tertiaryDark]}
						style={styles.seeAllGradient}
					>
						<Text style={styles.seeAllText}>Change</Text>
						<ChevronRight size={16} color="#FFFFFF" />
					</LinearGradient>
				</TouchableOpacity>
			</View>

			{/* Language Card */}
			<LinearGradient
				colors={["#FFFFFF", "#E8FFF8"]}
				style={styles.languageCard}
			>
				<LinearGradient
					colors={[COLORS.tertiary, COLORS.tertiary]}
					style={styles.languageFlag}
				>
					<Globe size={24} color="#FFFFFF" />
				</LinearGradient>
				<View style={styles.languageInfo}>
					<Text style={styles.languageName}>
						{selectedLanguage?.name || "Setswana"}
					</Text>
					<Text style={styles.languageNative}>
						{selectedLanguage?.nativeName || "Setswana"}
					</Text>
				</View>

				{/* Language level indicator */}
				<LinearGradient
					colors={[COLORS.tertiary, COLORS.tertiary]}
					style={styles.languageLevelContainer}
				>
					<Text style={styles.languageLevel}>Beginner</Text>
				</LinearGradient>

				{/* Decorative elements */}
				<View style={[styles.decorDot, styles.decorDot1]} />
				<View style={[styles.decorDot, styles.decorDot2]} />
				<View style={[styles.decorDot, styles.decorDot3]} />
			</LinearGradient>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
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
	headerGradient: {
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		paddingTop: 8,
		paddingBottom: 20,
		marginBottom: 16,
		elevation: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 8,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		
	},
	userInfo: {
		flex: 1,
	},
	greeting: {
		fontSize: 28,
		fontWeight: "800",
		color: COLORS.white,
		marginBottom: 12,
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
	},
	statsRow: {
		flexDirection: "row",
		gap: 12,
	},
	statBubble: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.4)",
	},
	statText: {
		color: COLORS.white,
		fontWeight: "700",
		marginLeft: 6,
		fontSize: 14,
	},
	avatarContainer: {
		marginLeft: 16,
	},
	avatar: {
		width: 52,
		height: 52,
		borderRadius: 26,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 3,
		borderColor: "rgba(255, 255, 255, 0.6)",
	},
	dailyGoalCard: {
		borderRadius: 24,
		padding: 16,
		marginHorizontal: 16,
		marginBottom: 16,
		elevation: 6,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.15,
		shadowRadius: 6,
		borderWidth: 2,
		borderColor: "rgba(255, 77, 109, 0.2)",
	},
	dailyGoalHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	targetIconContainer: {
		width: 44,
		height: 44,
		borderRadius: 22,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
		borderWidth: 2,
		borderColor: "rgba(255, 255, 255, 0.6)",
	},
	targetIcon: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: "rgba(255, 255, 255, 0.8)",
		justifyContent: "center",
		alignItems: "center",
	},
	targetIconText: {
		fontSize: 20,
	},
	dailyGoalTitle: {
		fontSize: 20,
		fontWeight: "800",
		color: COLORS.text,
	},
	starContainer: {
		position: "absolute",
		right: 0,
		top: 0,
	},
	dailyGoalMessage: {
		fontSize: 15,
		color: COLORS.textLight,
		marginBottom: 12,
		fontWeight: "500",
	},
	statsContainer: {
		flexDirection: "row",
		marginHorizontal: 16,
		marginBottom: 24,
		gap: 12,
	},
	statCard: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 20,
		padding: 16,
		elevation: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		borderWidth: 2,
		borderColor: "rgba(255, 255, 255, 0.6)",
	},
	statIconContainer: {
		width: 44,
		height: 44,
		borderRadius: 22,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
		borderWidth: 2,
		borderColor: "rgba(255, 255, 255, 0.6)",
	},
	statValue: {
		fontSize: 22,
		fontWeight: "800",
		color: COLORS.text,
	},
	statLabel: {
		fontSize: 13,
		fontWeight: "600",
		color: COLORS.textDark,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 16,
		marginBottom: 16,
	},
	sectionTitleContainer: {
		borderRadius: 16,
		paddingHorizontal: 14,
		paddingVertical: 8,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "800",
		color: COLORS.white,
		textShadowColor: "rgba(0, 0, 0, 0.2)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
	},
	seeAllButton: {
		borderRadius: 16,
		overflow: "hidden",
	},
	seeAllGradient: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	seeAllText: {
		fontSize: 14,
		color: COLORS.white,
		marginRight: 4,
		fontWeight: "700",
	},
	gamesList: {
		paddingHorizontal: 16,
		paddingBottom: 24,
	},
	gameCard: {
		borderRadius: 24,
		marginBottom: 20,
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
	sparkleContainer: {
		position: "absolute",
		right: 4,
		top: -2,
	},
	sparkle: {
		transform: [{ rotate: "45deg" }],
	},
	progressText: {
		fontSize: 13,
		fontWeight: "700",
		color: COLORS.textLight,
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
	emptyState: {
		borderRadius: 24,
		padding: 24,
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 16,
		marginBottom: 24,
		elevation: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		borderWidth: 2,
		borderColor: "rgba(255, 255, 255, 0.6)",
	},
	emptyStateText: {
		fontSize: 15,
		color: COLORS.textLight,
		textAlign: "center",
		fontWeight: "600",
	},
	languageCard: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 24,
		padding: 16,
		marginHorizontal: 16,
		marginBottom: 24,
		elevation: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		borderWidth: 2,
		borderColor: "rgba(78, 205, 196, 0.2)",
		overflow: "hidden",
	},
	languageFlag: {
		width: 52,
		height: 52,
		borderRadius: 26,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 16,
		borderWidth: 2,
		borderColor: "rgba(255, 255, 255, 0.6)",
	},
	languageInfo: {
		flex: 1,
	},
	languageName: {
		fontSize: 20,
		fontWeight: "800",
		color: COLORS.text,
		marginBottom: 4,
	},
	languageNative: {
		fontSize: 15,
		color: COLORS.textLight,
		fontWeight: "500",
	},
	languageLevelContainer: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.6)",
	},
	languageLevel: {
		color: "#FFFFFF",
		fontSize: 12,
		fontWeight: "800",
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
