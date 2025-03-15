import { useAuthStore } from '@/store/auth-store';
import { Stack } from 'expo-router'
import React from 'react'

export default function RootLayout() {
    const { isAuthenticated, user } = useAuthStore();
    return (
        <Stack >
            <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: "fade" }} />
            <Stack.Screen name="auth/sign-in" options={{ headerShown: false, animation: "fade" }} />
            <Stack.Screen name="index" options={{ headerShown: false, animation: "fade" }} />
            <Stack.Screen name='course/[id]' options={{ animation:'fade_from_bottom', title:"Lessons"}}/>
        </Stack>)}
