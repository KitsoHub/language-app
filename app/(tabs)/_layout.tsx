import { Platform, StyleSheet, Text, View, Image, Pressable } from "react-native";
import { router, Tabs } from "expo-router";
import { colors, COLORS } from "@/utils/constants/colors";
import { useAuthStore } from "@/store/auth-store";
import TabBar from "@/components/ui/TabBar";
import { ArrowLeft } from "lucide-react-native";

export default function MainLayout() {
	const { user } = useAuthStore();

  // Helper to get initials from user name
  const getInitials = (name: string) =>
		name
			.split(" ")
			.map((word) => word.charAt(0))
			.join("")
			.toUpperCase();

	return (
		<>
			{/* Set status bar background to black on the index page */}

			<Tabs tabBar={props => (<TabBar {...props} />)}>
				<Tabs.Screen
					name="index"
					options={{
						// Replace headerTitle with a custom component:
						headerTitle: () => (
							<View style={styles.headerTitleContainer}>
								<Text style={styles.headerTitle}>Hi, {user?.name || "Friend"}</Text>
								<Text style={styles.headerSubTitle}>Welcome</Text>
							</View>
						),
						headerShown: true,
						headerStyle: { backgroundColor: COLORS.background, height: 100, shadowColor: "transparent" },
						// Remove the previous headerTitleStyle:
						// headerTitleStyle: { color: "Black", fontSize: 30, fontWeight: "bold" },
						headerRight: () =>
							user?.avatar ? (
								<Image
									source={{ uri: user.avatar || user.image }}
									style={styles.avatarImage}
								/>
							) : user?.name ? (
								<View style={styles.initialsContainer}>
									<Text style={styles.initialsText}>
										{getInitials(user.name)}
									</Text>
								</View>
							) : (
								<Text style={styles.fallbackText}>PD</Text>
							),
					}}
				/>

				<Tabs.Screen
					name="games"
					options={{
						title: "Game",
						headerShown: true,
						headerLeft: () => (
                            <Pressable onPress={() => router.back()} style={{ paddingLeft: 16 }}>
								<ArrowLeft size={24} color={'white'} />
                            </Pressable>
                        ),

					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						headerShown: true,
						animation: "fade",
							headerLeft: () => (
													<Pressable onPress={() => router.back()} style={{ paddingLeft: 10 }}>
													  <ArrowLeft size={24} color={COLORS.primaryDark} />
													</Pressable>
												),

					}}
				/>


      			<Tabs.Screen
					name="settings"
					options={{
						title: "Settings",
						headerShown: true,
						animation: "fade",
						headerLeft: () => (
													<Pressable onPress={() => router.back()} style={{ paddingLeft: 10 }}>
													  <ArrowLeft size={24} color={COLORS.primaryDark} />
													</Pressable>
												),

					}}
				/>
			</Tabs>
		</>
	);
}

const styles = StyleSheet.create({
	avatarImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 20
	},
	initialsContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 20,
	},
	initialsText: {
		color: "#000",
		fontWeight: "bold"
	},
	fallbackText: {
		marginRight: 20
	},
	// New styles for the custom header title:
	headerTitleContainer: {
		flex: 1,
		justifyContent: "center",
	},
	headerTitle: {
		color: "Black",
		fontSize: 30,
		fontWeight: "bold",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		textShadowColor: "#737373",
	},
	headerSubTitle: {
		color: "grey",
		fontSize: 12,
	},
});
