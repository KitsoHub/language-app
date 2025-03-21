import { Button, Modal, Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, ViewStyle, Image } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/build/Feather';
import { colors, COLORS } from '@/utils/constants/colors';
import { useAuthStore } from '@/store/auth-store'; // Import the auth store
import { useRouter } from 'expo-router'; // Import the router
import Avatar from './Avatar';

interface ProfileProps {
  name: string,
  email: string,
  level: number,
  currentLanguage: string,
  streak: number,
  xp: number,
  title: string;
  description?: string;
  icon?: keyof typeof Feather.glyphMap;
  buttonTitle?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

const modalContents = {
  'Help': 'If you need assistance, please contact our support team at support@example.com. We are available to help you with any issues related to using the app, whether it’s account access, subscription problems, or questions about learning Setswana. Don’t hesitate to reach out!',

  'Privacy Policy': 'Your privacy is important to us. We do not share your personal information with third parties without your consent. Your data is securely stored and only used to improve your learning experience. If you want to learn more about how we protect your data, please read our full privacy policy.',

  'Terms and Conditions': 'By using this app, you agree to our terms and conditions. These include:\n\n Using the app in a responsible manner for learning purposes only. Not copying, sharing, or reselling any learning materials without permission.Following community guidelines if interacting with other learners.Ensuring that your account credentials remain confidential and not shared with others.Acknowledging that the app reserves the right to modify content, pricing, and features as needed.Understanding that the app is provided "as is," and the developers are not responsible for any data loss or service interruptions.Agreeing that any misuse of the app, including attempts to exploit its services, may result in suspension or termination of access.If you do not agree with these terms, please discontinue using the app. Read the full terms and conditions to understand your rights and responsibilities.',

  'FAQs': 'Frequently Asked Questions:\n\n1. How do I reset my password?\n   - Go to your account settings and select "Reset Password." Follow the instructions to create a new password. If you have trouble accessing your account, please contact support for further assistance.\n\n2. How do I change my email address?\n   - In your account settings, select "Change Email," enter your new email, and confirm the change. You will receive a verification email to complete the update. If you do not receive the email, check your spam folder or contact support.\n\n3. How do I contact support?\n   - You can reach us at ogaufimokopakgosi3@gmail.com or use the "Help" section in the app to send us a message. Our support team typically responds within 24-48 hours.\n\n4. Is the app free to use?\n   - The app offers a free version with basic features. To access premium lessons, advanced exercises, and personalized tutoring, you can subscribe to a paid plan.\n\n5. Can I use the app offline?\n   - Yes! Some lessons and features are available offline. However, certain interactive elements, such as live tutoring and community discussions, require an internet connection.\n\n6. How do I report a bug or suggest a feature?\n   - If you encounter a bug or have a feature request, please send us an email at support@example.com with detailed information. We appreciate your feedback and strive to improve your experience!\n\n7. Can I delete my account?\n   - Yes, if you wish to delete your account permanently, go to account settings and select "Delete Account." Please note that this action is irreversible, and all your data will be lost.',

  'Contact Us': 'You can contact us at contact@example.com for any inquiries, feedback, or support requests. We value your input and are here to make your experience better. If you have suggestions or questions, we’d love to hear from you!',
};

export default function ProfileStateCard({
  name,
  email,
  xp,
  level,
  streak,
  currentLanguage,
  title,
  description,
  icon = "inbox",
  buttonTitle,
  onPress,
  style
}: ProfileProps) {
  const { logout } = useAuthStore(); // Get the logout function from the auth store
  const router = useRouter(); // Get the router

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleLogout = () => {
    logout();
    router.replace('/auth/sign-in'); // Navigate to the sign-in page
  };

  const openModal = (content: string) => {
    setModalContent(modalContents[content]);
    setModalVisible(true);
  };

  return (
    <>
      <View style={styles.profileHeader}>

        <Avatar
          uri={name}
          name={name}
          size={80}

        />
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userEmail}>{email}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={onPress}

        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{level}</Text>
          <Text style={styles.statLabel}>Level</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{xp}</Text>
          <Text style={styles.statLabel}>Total XP</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>

      // <View style={styles.TandCs}>
      //   <TouchableOpacity style={styles.TandC} onPress={() => openModal('Help')}>
      //     <Feather name="info" size={30} color={COLORS.primary} />
      //     <Text>Help</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity style={styles.TandC} onPress={() => openModal('Privacy Policy')}>
      //     <Feather name="lock" size={30} color={COLORS.primary} />
      //     <Text>Privacy Policy</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity style={styles.TandC} onPress={() => openModal('Terms and Conditions')}>
      //     <Feather name="book" size={30} color={COLORS.primary} />
      //     <Text>Terms and Conditions</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity style={styles.TandC} onPress={() => openModal('FAQs')}>
      //     <Feather name="search" size={30} color={COLORS.primary} />
      //     <Text>FAQs</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity style={styles.TandC} onPress={() => openModal('Contact Us')}>
      //     <Feather name="phone" size={30} color={COLORS.primary} />
      //     <Text>Contact Us</Text>
      //   </TouchableOpacity>
      // </View>

      // <View style={styles.TandCs}>
      //   <View style={styles.TandC}>
      //     <Feather name="info" size={30} color={COLORS.secondary} />
      //     <Text>Remove ads</Text>
      //   </View>
      // </View>

      // <Button title="Log Out" onPress={handleLogout} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{modalContent}</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

    </>
  )
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
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
    fontWeight: '500',
    color: colors.primary,
  },

  // end
  container: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 32,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.white
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileInfo: {
    flexDirection: 'column',
    // flex: 1,
  },
  TandC: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: COLORS.gray200,
    gap: 10,
  },
  TandCs: {
    flexDirection: 'column',
    width: 310,
    marginBottom: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
})
