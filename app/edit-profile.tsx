import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, useRouter } from 'expo-router'
import { useAuthStore } from '@/store/auth-store';
import { Input } from '@/components/ui/Input';
import { Camera, Mail, User } from 'lucide-react-native';
import { colors } from '@/utils/constants/colors';
import { Button } from '@/components/ui/Button';
import WrapperContainer from '@/components/shared/WrapperContainer';
import Avatar from '@/components/shared/Avatar';
import * as ImagePicker from "expo-image-picker";
import { supabase } from '@/utils/supabase';

export default function EditProfile() {
    const router = useRouter();
    const { updateUser } = useAuthStore();

    // user details from Supabase session
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({ name: '', email: '' });

    useEffect(() => {
        // Load user from Supabase session
        const loadUser = async () => {
    const { data, error: sessionError } = await supabase.auth.getSession();
    const sessionUser = data?.session?.user;

    if (sessionUser) {
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('username, avatar_url')
            .eq('id', sessionUser.id)
            .single();

        if (profileError) {
            Alert.alert('Error loading profile', profileError.message);
        } else {
            setName(profile?.username || '');
            setEmail(sessionUser.email || '');
            setAvatar(profile?.avatar_url || '');
        }
    } else if (sessionError) {
        Alert.alert('Error fetching session', sessionError.message);
    }
};

    }, []);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { name: '', email: '' };
        const isCheckEmail = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/

        if (!name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!isCheckEmail.test(email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const handleImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            });
            if (!result.canceled) {
                setAvatar(result.assets[0].uri)
            }
        } else {
            Alert.alert("Permission Denied", "We need camera roll permission to update the avatar");
        }
    }

   const handleSave = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        const user = sessionData?.session?.user;
        if (!user) throw new Error('No session found');

        const updates = {
            id: user.id,
            username: name,
            website: '', // or keep if you're not using it
            avatar_url: avatar,
            updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates);
        if (error) {
            Alert.alert('Update failed', error.message);
        } else {
            updateUser({ name, email, avatar });
            Alert.alert('Profile updated!');
            router.back();
        }
    } catch (error) {
        Alert.alert('Update failed', error instanceof Error ? error.message : 'Unknown error');
    } finally {
        setIsLoading(false);
    }
};


    const handleAvatarPicker = async (image: string) => {
        setAvatar(image)
    }

    return (
        <>
            <Stack.Screen options={{ title: "EditProfile", headerBackTitle: "Back" }} />
            <WrapperContainer>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? "padding" : "height"}
                >
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewContent}>
                        {/* avatar*/}
                        <View style={styles.avatarContainer}>
                            <Avatar
                                uri={avatar}
                                name={name}
                                size={100}
                            />
                            <TouchableOpacity style={styles.cameraButton}
                                onPress={handleImagePicker}>
                                <Camera size={20} color={colors.white} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.avatarSelectContainer}>
                            {/* list of avatars */}
                            <TouchableOpacity style={styles.avatarSubContainer}
                                onPress={() => handleAvatarPicker("0")}>
                                <Image source={require("@/assets/avatars/boy.png")} style={styles.avatarImage} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.avatarSubContainer}
                                onPress={() => handleAvatarPicker("1")}>
                                <Image source={require("@/assets/avatars/women.png")} style={styles.avatarImage} />
                            </TouchableOpacity>
                        </View>
                        {/* inputs */}
                        <View style={styles.form}>
                            <Input label="Full Name" placeholder=' Enter your full name' value={name} onChangeText={setName} error={errors.name} leftIcon={<User size={20} color={colors.gray500} />} />
                            <Input keyboardType='email-address' autoCapitalize="words" label="Email Address" placeholder='Enter your email address' value={email} onChangeText={setEmail} error={errors.email} leftIcon={<Mail size={20} color={colors.gray500} />} />
                            <Button style={styles.saveButton} title='Save Changes'
                                onPress={handleSave}
                                isLoading={isLoading}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </WrapperContainer>
        </>
    )
}

const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 32,
        position: 'relative',
    },
    avatarSelectContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    avatarSubContainer: {
        backgroundColor: colors.gray300,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 32,
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors.secondary,
    },
    ScrollViewContent: {
        flexGrow: 1,
        padding: 24
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: '35%',
        backgroundColor: colors.primary,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.white,
    },
    form: { marginBottom: 24 },
    saveButton: {
        marginTop: 16
    },
    image: {
        width: '100%',
        height: '100%',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
});