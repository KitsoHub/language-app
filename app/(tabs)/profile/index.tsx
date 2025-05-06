import { ScrollView, StyleSheet, View, Modal, Text } from "react-native";
import { useAuthStore } from "@/store/auth-store"; // Import the auth store
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/utils/constants/colors";
import ProfileStateCard from "@/components/shared/ProfileStateCard";
import { Button } from "@/components/ui/Button"; // Import Button component
import { Input } from "@/components/ui/Input"; // Import InputForm component
import { router } from "expo-router";
import { ROUTES } from "@/utils/constants/routes";
import { useProgressStore } from "@/store/progress-store";
import AchievementCard from "@/components/shared/AchievementCard";
import ProfileStatsCard from "@/components/shared/ProfileStatsCard";

export default function ProfilePage() {
	const { user, updateUser } = useAuthStore();
	const { achievements, skills, getCompletedGames } = useProgressStore();
	if (!user) {
		return null;
	}
	const [modalVisible, setModalVisible] = useState(false);
	const [name, setName] = useState(user?.name || "");
	const [email, setEmail] = useState(user?.email || "");
	const [password, setPassword] = useState("");

	// const handleSave = () => {
	//   updateUser({ name, email });
	//   setModalVisible(false);
	// };

	const handleProfileEdit = () => {
		router.push(ROUTES.EDITPROFILE);
	};

	//filter achievement -> unlocked & locked
	const unlockedAchievements = achievements.filter((item) => item.unlocked);
	const lockedAchievements = achievements.filter((item) => !item.unlocked);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.scrollView}
			>
				<ProfileStatsCard
					name={user?.name || "Guest User"}
					email={user?.email || ""}
					title="Profile Details"
					currentLanguage={user?.currentLanguage || "st"}
					xp={user?.xp || 0}
					streak={user?.streak || 0}
					level={user?.level || 1}
					icon="user"
					onPress={handleProfileEdit}
					// onPress={() => setModalVisible(true)}
				/>
				<Text style={styles.sectionTitle}>Achievements</Text>

				{unlockedAchievements && (
					<>
						<Text style={styles.subsectionTitle}>Unlocked</Text>
						<ScrollView
							showsHorizontalScrollIndicator={true}
							horizontal
							style={styles.horizontalScroll}
						>
							{unlockedAchievements.map((item) => (
								<AchievementCard key={item.id} achievement={item} />
							))}
						</ScrollView>
					</>
				)}

				{lockedAchievements && (
					<>
						<Text style={styles.subsectionTitle}>Locked</Text>
						<ScrollView
							showsHorizontalScrollIndicator={true}
							horizontal
							style={styles.horizontalScroll}
						>
							{lockedAchievements.map((item) => (
								<AchievementCard key={item.id} achievement={item} />
							))}
						</ScrollView>
					</>
				)}

				{/* <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Input
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button title="Save" onPress={handleSave} />
            <View style={styles.buttonSpacer} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </Modal> */}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.backgroundLight,
	},
	scrollView: {
		flex: 1,
		padding: 16,
		marginBottom: 4,
	},
	modalView: {
		flex: 1,
		width: "90%",
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		position: "absolute",
		bottom: 0,

		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	buttonSpacer: {
		height: 10, // Adjust the height as needed
	},

	statsContainer: {
		flexDirection: "row",
	},
	statCard: {
		flex: 1,
		backgroundColor: colors.white,
		borderRadius: 12,
		padding: 16,
		marginHorizontal: 4,
		alignItems: "center",
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 1,
	},
	statValue: {
		fontSize: 24,
		fontWeight: "700",
		color: colors.text,
		marginBottom: 4,
	},
	statLabel: {
		fontSize: 12,
		color: colors.textLight,
	},
	skillsContainer: {
		backgroundColor: colors.white,
		borderRadius: 16,
		padding: 16,
		marginBottom: 24,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 1,
	},

	sectionTitle: {
		fontSize: 18,
		color: colors.text,
		fontWeight: 600,
		marginBottom: 16,
	},
	subsectionTitle: {
		fontSize: 15,
		color: colors.textLight,
		fontWeight: 500,
		marginBottom: 16,
	},
	horizontalScroll: {
		marginBottom: 24,
	},
});
