import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, useRouter } from 'expo-router'
import { useAuthStore } from '@/store/auth-store';

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


    </ScrollView>
</KeyboardAvoidingView>
</SafeAreaView>

</>
  )
}

const styles = StyleSheet.create({})
