import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View,
	ViewStyle,
	Image,
	ScrollView,
	Switch,
	Alert,
} from "react-native";
import React, { useState } from "react";
import type Feather from "@expo/vector-icons/build/Feather";
import { colors, COLORS } from "@/utils/constants/colors";
import { useAuthStore } from "@/store/auth-store"; // Import the auth store
import { Redirect, useRouter } from "expo-router"; // Import the router
import Avatar from "./Avatar";
import { Button } from "@/components/ui/Button";
import {
	Bell,
	Bookmark,
	BookMarked,
	BookOpen,
	ChevronRight,
	Eye,
	FileQuestion,
	GlobeLockIcon,
	Info,
	LogOut,
	PenIcon,
	RefreshCw,
	Share2,
	ShieldClose,
	Star,
	Trash2,
} from "lucide-react-native";
import { avatars } from "@/mocks/vowels";
import { useNewGameStore } from "@/store/game/new-game-store";
import { useLanguageStore } from "@/store/language-store";
import { FONT_SIZES, PADDING } from "@/utils/constants";

interface ProfileProps {
	name: string;
	avatar: string;
	email: string;
	level: number;
	streak: number;
	xp: number;
	title: string;
	description?: string;
	icon?: keyof typeof Feather.glyphMap;
	buttonTitle?: string;
	onPress?: () => void;
	style?: ViewStyle;
}

const modalContents = {
	// 'Help': 'If you need assistance, please contact our support team at support@example.com. We are available to help you with any issues related to using the app, whether it’s account access, subscription problems, or questions about learning Setswana. Don’t hesitate to reach out!',

	Privacy:
		"Your privacy is important to us. We do not share your personal information with third parties without your consent. Your data is securely stored and only used to improve your learning experience. If you want to learn more about how we protect your data, please read our full privacy policy.",

	TCs: 'By using this app, you agree to our terms and conditions. These include:\n\n Using the app in a responsible manner for learning purposes only. Not copying, sharing, or reselling any learning materials without permission.Following community guidelines if interacting with other learners.Ensuring that your account credentials remain confidential and not shared with others.Acknowledging that the app reserves the right to modify content, pricing, and features as needed.Understanding that the app is provided "as is," and the developers are not responsible for any data loss or service interruptions.Agreeing that any misuse of the app, including attempts to exploit its services, may result in suspension or termination of access.If you do not agree with these terms, please discontinue using the app. Read the full terms and conditions to understand your rights and responsibilities.',

	// 'FAQs': 'Frequently Asked Questions:\n\n1. How do I reset my password?\n   - Go to your account settings and select "Reset Password." Follow the instructions to create a new password. If you have trouble accessing your account, please contact support for further assistance.\n\n2. How do I change my email address?\n   - In your account settings, select "Change Email," enter your new email, and confirm the change. You will receive a verification email to complete the update. If you do not receive the email, check your spam folder or contact support.\n\n3. How do I contact support?\n   - You can reach us at ogaufimokopakgosi3@gmail.com or use the "Help" section in the app to send us a message. Our support team typically responds within 24-48 hours.\n\n4. Is the app free to use?\n   - The app offers a free version with basic features. To access premium lessons, advanced exercises, and personalized tutoring, you can subscribe to a paid plan.\n\n5. Can I use the app offline?\n   - Yes! Some lessons and features are available offline. However, certain interactive elements, such as live tutoring and community discussions, require an internet connection.\n\n6. How do I report a bug or suggest a feature?\n   - If you encounter a bug or have a feature request, please send us an email at support@example.com with detailed information. We appreciate your feedback and strive to improve your experience!\n\n7. Can I delete my account?\n   - Yes, if you wish to delete your account permanently, go to account settings and select "Delete Account." Please note that this action is irreversible, and all your data will be lost.',

	"About Us":
		"You can contact us at contact@example.com for any inquiries, feedback, or support requests. We value your input and are here to make your experience better. If you have suggestions or questions, we’d love to hear from you!",
};

export default function SettingsContainer({
	name,
	email,
	xp,
	level,
	streak,
	title,
	description,
	icon = "inbox",
	buttonTitle,
	onPress,
	style,
	avatar,
}: ProfileProps) {
	const { logout,resetGameProgress, user } = useAuthStore();
	const router = useRouter();
	const [modalVisible, setModalVisible] = useState(false);
	const [modalContent, setModalContent] = useState("");

	const {appLanguages, selectLanguage,  } = useLanguageStore();


	const [hapticEnabled, setHapticEnabled] = useState(false);
	//   add sound
	// add notification
	//   add dark mode
	const handleLogout = () => {
		logout();
		router.replace("/auth/sign-in");
	};

	const openModal = (content: string) => {
		setModalContent(modalContents[content]);
		setModalVisible(true);
	};

	const handleTermsPress = () => {
		router.push("/profile/terms");
	};

	const handleResetProgress = () => {
		Alert.alert(
			"Reset Progress",
			"Are you sure you want to reset your progress? This action cannot be undone.",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "OK",
					onPress: () => resetGameProgress(),
					style: "destructive",

				},
			],
			{ cancelable: false },
		);
	};

	const handleLanguageChange =(id:string)=>{

		Alert.alert(
			"Change Language","Are you sure you want to change language",[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "OK",
					onPress: () => selectLanguage(id),
					style: "destructive",
				},
			],{cancelable: false}
		)
	}
	return (
		<>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Account</Text>

				<TouchableOpacity
					style={styles.settingsItem}
					onPress={handleResetProgress}
				>
					<View style={styles.settingsIconContainer}>
						<Trash2 size={20} color={colors.error} />
					</View>
					<Text style={styles.signOutText}>Reset Progress</Text>
				</TouchableOpacity>
				<View style={styles.settingsItem}>
					<View style={styles.settingLabelContainer}>
						<RefreshCw size={24} color={colors.text} />
						<Text style={styles.settingLabel}>Haptic Feedback</Text>
					</View>
					<Switch
						value={hapticEnabled}
						onValueChange={setHapticEnabled}
						trackColor={{ false: colors.gray300, true: colors.primary }}
						thumbColor="white"
					/>
				</View>
			</View>

						{/* Language select */}
						<View style={styles.section}>
				<View style={[{flexDirection: "row", alignItems:"flex-start", justifyContent:"space-between"}]}>
				<Text style={styles.sectionTitle}>Language</Text>
				<Text style={styles.sectionSubTitle }>Select your language here.</Text>
				</View>

			<View style={styles.languageOptions}>
				{appLanguages.map((language) => (
					<Button
					key={language.id}
					title={language.name || language.nativeName}
					variant={user?.currentLanguage === language.id ? "primary" : "secondary"}
					onPress={()=>handleLanguageChange(language.id)}
					style={styles.languageButton}
					/>
				))}
			</View>
			</View>



{/* Legal */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Legal</Text>

				<TouchableOpacity
					style={styles.settingsItem}
					onPress={() => openModal("Privacy")}
				>
					<View style={styles.settingsIconContainer}>
						<GlobeLockIcon size={20} color={colors.primary} />
					</View>
					<Text style={styles.settingsItemText}>Privacy Policy</Text>
					<ChevronRight size={20} color={colors.gray400} />
				</TouchableOpacity>

				{/* Terms and Conditions */}
				<TouchableOpacity
					style={styles.settingsItem}
					onPress={handleTermsPress}
				>
					<View style={styles.settingsIconContainer}>
						<BookOpen size={20} color={colors.primary} />
					</View>
					<Text style={styles.settingsItemText}>Terms and Conditions</Text>
					<ChevronRight size={20} color={colors.gray400} />
				</TouchableOpacity>
			</View>
			{/* Extras */}

			<View style={styles.section}>
				<TouchableOpacity
					style={styles.settingsItemExta}
					onPress={() => openModal("Help")}
				>
					<View style={styles.settingsIconContainerExtra}>
						<Star size={15} color={colors.white} />
					</View>
					<Text style={styles.settingsItemTextExtra}>Rate us</Text>
				</TouchableOpacity>
				{/* feedback */}
				<TouchableOpacity
					style={styles.settingsItemExta}
					onPress={() => openModal("Help")}
				>
					<View style={styles.settingsIconContainerExtra}>
						<PenIcon size={15} color={colors.white} />
					</View>
					<Text style={styles.settingsItemTextExtra}>Feedback</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.settingsItemExta}
					onPress={() => openModal("Help")}
				>
					<View style={styles.settingsIconContainerExtra}>
						<Eye size={15} color={colors.white} />
					</View>
					<Text style={styles.settingsItemTextExtra}>About Us</Text>
				</TouchableOpacity>
			</View>


			<TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
				<LogOut size={20} color={colors.error} />
				<Text style={styles.signOutText}>Sign Out</Text>
			</TouchableOpacity>

			<Text style={styles.versionText}>Version 1.0.0</Text>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalView}>
						<ScrollView contentContainerStyle={styles.scrollViewContent}>
							<Text style={styles.modalText}>{modalContent}</Text>
							<Button title="Close" onPress={() => setModalVisible(false)} />
						</ScrollView>
					</View>
				</View>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	profileHeader: {
		alignItems: "center",
		padding: 24,
		backgroundColor: colors.white,
		borderRadius: 12,
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
		backgroundColor: colors.white,
		marginBottom: 16,
		borderBottomWidth: 1,
		borderBlockColor: colors.gray200,
		borderBottomRightRadius: 12,
		borderBottomLeftRadius: 12,
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
	userName: {
		fontSize: 20,
		fontWeight: "600",
		color: colors.text,
		marginTop: 12,
		marginBottom: 4,
	},
	userEmail: {
		fontSize: 14,
		color: colors.textLight,
		marginBottom: 16,
	},
	editButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: colors.primaryLight,
		borderRadius: 20,
	},
	editButtonText: {
		fontSize: 14,
		fontWeight: "500",
		color: colors.primary,
	},

	section: {
		padding: 12,
		marginBottom: 13,
		backgroundColor: colors.white,
		borderRadius: 12,
	},
	sectionTitle: {
		fontSize: 16,
		color: colors.textLight,
		fontWeight: 600,
		marginBottom: 8,
	},
	sectionSubTitle:{
		fontSize: FONT_SIZES.sm,
		color: colors.textLight,
		marginBottom: 4,

	},

	settingsItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderTopWidth: 1,
		borderTopColor: colors.gray200,
	},
	settingLabel: {
		fontSize: 16,
		marginLeft: 12,
		color: colors.text,
	},
	settingLabelContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	settingsIconContainer: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: colors.primaryLight,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
	},
	settingsItemText: {
		flex: 1,
		fontSize: 15,
		color: colors.text,
	},

	settingsItemExta: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderTopWidth: 1,
		borderTopColor: colors.gray100,
	},

	settingsIconContainerExtra: {
		width: 26,
		height: 26,
		borderRadius: 5,
		backgroundColor: COLORS.colorGrey,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
	},
	settingsItemTextExtra: {
		flex: 1,
		fontSize: 15,
		color: colors.black,
	},
	signOutButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.white,
		paddingVertical: 16,
		marginBottom: 16,
		borderRadius: 10,
	},
	signOutText: {
		fontSize: 16,
		fontWeight: "500",
		color: colors.error,
		marginLeft: 8,
	},
	versionText: {
		fontSize: 12,
		color: colors.textMuted,
		textAlign: "center",
		marginBottom: 24,
	},

	languageOptions: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 8,
	  },
	  languageButton: {
		marginRight: 8,
		marginBottom: 8,
	  },
	// end

	profileImage: {
		width: 40,
		borderRadius: 20,
		marginRight: 10,
	},
	profileInfo: {
		flexDirection: "column",
		// flex: 1,
	},
	TandC: {
		flexDirection: "row",
		alignItems: "center",
		padding: 5,
		borderBottomWidth: 1,
		borderColor: COLORS.gray200,
		gap: 10,
	},
	TandCs: {
		flexDirection: "column",
		width: 310,
		marginBottom: 20,
		backgroundColor: COLORS.white,
		borderRadius: 10,
		padding: 5,
	},
	name: {
		fontSize: 16,
		fontWeight: "bold",
	},
	email: {
		fontSize: 14,
		color: "gray",
	},
	title: {
		textAlign: "center",
		fontSize: 16,
		height: 40,
		backgroundColor: "grey",
		width: "auto",
	},
	description: {
		fontWeight: 400,
		lineHeight: 32,
		marginTop: 8,
		textAlign: "center",
		marginBottom: 24,
	},
	button: {
		marginTop: 16,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalView: {
		width: "90%",
		maxHeight: "80%",
		backgroundColor: "white",
		borderRadius: 20,
		padding: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
	scrollViewContent: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
