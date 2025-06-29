import { useAuthStore } from '@/store/auth-store';
import { colors, COLORS } from '@/utils/constants/colors';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Camera, Check, Mail, User } from 'lucide-react-native';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useHaptics } from '@/utils/hooks/useHaptics';
import Avatar from '@/components/shared/Avatar';
import * as ImagePicker from 'expo-image-picker';
//import { v4 as uuidv4 } from 'uuid'

export default function EditProfile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUser, updateUserProfile, updateUserAvatar } =
    useAuthStore();
  const [name, setUsername] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [hasChanges, setHasChanges] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);

  const { triggerHaptic } = useHaptics();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '' };
    const isCheckEmail = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isCheckEmail.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    // form validate
    console.log('>> Handling Save >>', name, email, avatar);
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('>> Handling Save >>', name, email, avatar);
      updateUserProfile({
        name,
        email,
        avatar,
      });
    } catch (error) {
      console.log('<<< Update error >>>', error);
    } finally {
      console.log('<<< Finished updating >>>');
      setIsLoading(false);
    }
  };

  // Track if form has changes

  // const handleCancel = () => {
  //   if (hasChanges) {
  //     Alert.alert(
  //       'Discard Changes',
  //       'Are you sure you want to discard your changes?',
  //       [
  //         { text: 'Cancel', style: 'cancel' },
  //         {
  //           text: 'Discard',
  //           style: 'destructive',
  //           onPress: () => {

  //             setUsername(user?.name || '');
  //             setEmail(user?.email || '');
  //             setErrors({ name: '', email: '' });
  //             router.back();
  //           }
  //         }
  //       ]
  //     );
  //   } else {
  //     router.back();
  //   }
  // };
  const handleImagePicker = async () => {
    console.log('Handling Image Picker');

    try {
      // Request image library permission
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8, // Increased quality for better images
        });

        console.log('ImagePicker result:', JSON.stringify(result, null, 2));

        if (!result.canceled && result.assets && result.assets[0]) {
          const selectedImageUri = result.assets[0].uri;

          //                     const uniqueSuffix = uuidv4();
          //                     // result.assets[0].assetId = uniqueSuffix
          //  const uniqueUri = `${selectedImageUri}?id=${uniqueSuffix}`;
          const uniqueUri = `${selectedImageUri}?t=${Date.now()}`;
          console.log('Selected image URI:', uniqueUri);

          // Update local state immediately for UI feedback
          setAvatar(uniqueUri);

          // Update the store immediately
          // if (updateUserAvatar) {
          //   updateUserAvatar(uniqueUri);
          // } else if (updateUserProfile) {
          //   updateUserProfile({ avatar: uniqueUri });
          // }
        }
      } else {
        Alert.alert(
          'Permission Denied',
          'We need camera roll permission to update the avatar',
        );
      }
    } catch (error) {
      console.error('Error in image picker:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };
  const handleAvatarPicker = async (avatarId: string) => {
    console.log('Avatar Picker selected:', avatarId);

    try {
      // Show loading state briefly
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Update local state immediately
      setAvatar(avatarId);

      // Update the store immediately
      // if (updateUserAvatar) {
      //   updateUserAvatar(avatarId);
      // } else if (updateUserProfile) {
      //   updateUserProfile({ avatar: avatarId });
      // }

      console.log('Avatar updated to:', avatarId);
    } catch (error) {
      console.error('Error updating avatar:', error);
      Alert.alert('Error', 'Failed to update avatar. Please try again.');
    }
  };
    useEffect(() => {
        console.log(
    '[DEBUG] local avatar:', avatar,
    'store avatar:', user?.avatar,
  );
    const hasUserChanges =
      name !== (user?.name || '') ||
      email !== (user?.email || '') ||
      avatar !== (user?.avatar || '');
        console.log('[DEBUG] hasChanges:', hasUserChanges);
    setHasChanges(hasUserChanges);
  }, [name, email, avatar,user]);


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContent}
        >
          {/* avatar*/}
          <View style={styles.avatarContainer}>
            <Avatar uri={avatar} name={name} size={100} />
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={handleImagePicker}
            >
              <Camera size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>


          {/* Preset Avatar Selection */}
          <View style={styles.avatarSelectContainer}>
            <TouchableOpacity
              style={[
                styles.avatarSubContainer,
                avatar === '0' && styles.selectedAvatarContainer,
              ]}
              onPress={() => handleAvatarPicker('0')}
            >
              <Image
                source={require('@/assets/avatars/boy.png')}
                style={styles.avatarImage}
              />

            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.avatarSubContainer,
                avatar === '1' && styles.selectedAvatarContainer,
              ]}
              onPress={() => handleAvatarPicker('1')}
            >
              <Image
                source={require('@/assets/avatars/women.png')}
                style={styles.avatarImage}
              />

            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Input
              label="User Name"
              placeholder="Enter your username"
              keyboardType="default"
              autoCapitalize="none"
              leftIcon={<User size={20} color={COLORS.gray500} />}
              value={name}
              onChangeText={setUsername}
              error={errors.name}
            />

            <Input
              label="Email Address"
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Mail size={20} color={COLORS.gray500} />}
              value={email}
              onChangeText={setEmail}
              error={errors.email}
            />
            <Button
              style={styles.saveButton}
              title="Save Changes"
              onPress={handleSave}
              isLoading={isLoading}
              disabled={!hasChanges}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  form: {
    marginBottom: 24,
  },

  headerButton: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    marginTop: 16,
    marginBottom: 16,
  },

  avatarContainer: {
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },

  avatarSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 32,
  },
  avatarSubContainer: {
    backgroundColor: colors.gray300,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.gray400,
    position: 'relative',
  },
  selectedAvatarContainer: {
    borderColor: colors.primary,
    borderWidth: 3,
  },
  selectedIndicator: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
      avatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
});
