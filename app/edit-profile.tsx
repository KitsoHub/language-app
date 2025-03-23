import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, useRouter } from 'expo-router'
import { useAuthStore } from '@/store/auth-store';
import { Input } from '@/components/ui/Input';
import { Mail, User } from 'lucide-react-native';
import { colors } from '@/utils/constants/colors';
import { Button } from '@/components/ui/Button';

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

    const handleSave = () =>{
        console.log('Handling Save')
    }

  return (
<>
    <Stack.Screen options={{title:"EditProfile", headerBackTitle:"Back"}} />
<SafeAreaView>
<KeyboardAvoidingView
behavior={Platform.OS === 'ios' ?"padding":"height"}
>


    <ScrollView showsVerticalScrollIndicator={false}>
        {/* avatar*/}

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
</SafeAreaView>

</>
  )
}

const styles = StyleSheet.create({})
