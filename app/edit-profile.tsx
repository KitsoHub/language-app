import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, useRouter } from 'expo-router'
import { useAuthStore } from '@/store/auth-store';
import { Input } from '@/components/ui/Input';
import { Camera, Mail, User } from 'lucide-react-native';
import { colors } from '@/utils/constants/colors';
import { Button } from '@/components/ui/Button';
import WrapperContainer from '@/components/shared/WrapperContainer';
import Avatar from '@/components/shared/Avatar';

export default function EditProfile() {
    const router = useRouter();
    const {user, updateUser} = useAuthStore();

    //user details
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [avatar, setAvatar] = useState(user?.avatar || null);

    //app submission state
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        name:'',
        email:'',
    })

    const validateForm = () =>{
        let isValid = true;
        const newErrors = {name: '', email:''};
        const isCheckEmail = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/

        if(!name.trim()){
            newErrors.name = "Name is required";
            isValid = false;
        }

        if(!email.trim()){
            newErrors.email = "Email is required";
        } else if (!isCheckEmail.test(email)){
            newErrors.email = "Email is invalid";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const handleImagePicker =()=>{
        console.log(" Handling Image Picker")
    }
    const handleSave = () =>{
        // form validate
        if(!validateForm()) return;

        setIsLoading(true);
        try {
            console.log('Handling Save')

        } catch (error) {

        }finally{
            setIsLoading(false)
        }
    }

  return (
<>
    <Stack.Screen options={{title:"EditProfile", headerBackTitle:"Back"}} />
<WrapperContainer>
<KeyboardAvoidingView
behavior={Platform.OS === 'ios' ?"padding":"height"}
>


    <ScrollView showsVerticalScrollIndicator={false}>
        {/* avatar*/}
        <View style={styles.avatarContainer}>
            <Avatar/>
            <TouchableOpacity style={styles.cameraButton}
            onPress={handleImagePicker}>
                <Camera size={30} color={colors.white}/>
            </TouchableOpacity>

        </View>



        {/* list of avatars */}

        {/* inputs */}
        <View>
            <Input label="Full Name" placeholder=' Enter your full name' value={name} onChangeText={setName} error={errors.name} leftIcon={<User size={20} color={colors.gray500} />}/>
            <Input keyboardType='email-address' autoCapitalize="words" label="Email Address" placeholder='Enter your email address' value={email} onChangeText={setEmail} error={errors.email} leftIcon={<Mail size={20} color={colors.gray500} />}/>

        <Button title='Save Changes'
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
})
