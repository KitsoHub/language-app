import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { ViewStyle } from "react-native";
import React from "react";
import type { Achievement } from "@/types";
import { Lock, Star } from "lucide-react-native";
import { COLORS, colors } from "@/utils/constants/colors";
import ProgressBar from "./ProgressBar";
import { useAuthStore } from "@/store/auth-store";

type AchievementCardProps = {
	achievement: Achievement;
	style?: ViewStyle;
	status: boolean;
	onPress: ()=>void;
};

export default function AchievementCard({
	achievement,
	style,
	status,
	onPress
}: AchievementCardProps) {
	// const achievementTotal = achievement.progress / achievement.total
	const authStore = useAuthStore()
	const user = authStore.user
	return (
		<TouchableOpacity style={[styles.container, status && styles.unlockedContainer, style]} onPress={onPress}>
			<View style={styles.header}>
				<Text style={styles.icon}>{achievement.icon}</Text>


				{!status ? (
					<View style={styles.lockIconContainer}>
						<Lock size={16} color={COLORS.white} />
					</View>
				):(	<View style={styles.lockIconContainer}>
                    <Star size={16} color={COLORS.tertiary} fill={COLORS.tertiary} />
                </View>)}



			</View>

			{/* title, description, progress */}
			<Text style={styles.title}>{achievement.title}</Text>
			<Text style={styles.description}>{achievement.description}</Text>
			{/* Try adding progress per achievement */}
			{/* <ProgressBar style={styles.progressBar}
                progress={achievement.progress}
                total={achievement.total}
                height={6}
                showPercentage={false}

            />
            <Text style={styles.progressText}>{achievementTotal >= 0 ? achievementTotal : ''}</Text> */}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
		borderWidth: 1,
		borderColor: colors.gray200,
		width: 160,
		marginRight: 12,
	},

	unlockedContainer: {
		borderColor: colors.primary,
		backgroundColor: colors.primaryLight,
	},

	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	icon: {
		fontSize: 32,
	},
	lockIconContainer: {
		backgroundColor: colors.gray600,
		borderRadius: 12,
		padding: 4,
	},

	title: {
		fontSize: 16,
		fontWeight: "600",
		color: colors.text,
		marginBottom: 4,
	},

	description: {
		fontSize: 12,
		color: colors.textLight,
		marginBottom: 12,
		height: 32,
	},
	progressBar: {
		marginBottom: 4,
	},
	progressText: {
		fontSize: 12,
		color: colors.textMuted,
		textAlign: "right",
	},
});
