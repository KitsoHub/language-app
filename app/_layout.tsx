import { useAuthStore } from '@/store/auth-store';
import { Stack } from 'expo-router'
import React from 'react'
import { useLoadedFonts } from "@/utils/hooks/useFontFamily";

export default function RootLayout() {
    const { isAuthenticated, user } = useAuthStore();
    const fontsLoaded = useLoadedFonts();

    if (!fontsLoaded) {
        return null;
    }
    return (
        <Stack >
            <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: "fade" }} />
            <Stack.Screen name="auth/sign-in" options={{ headerShown: false, animation: "fade" }} />
            <Stack.Screen name="index" options={{ headerShown: false, animation: "fade" }} />
            <Stack.Screen name='course/[id]' options={{ animation:'fade_from_bottom', title:"Lessons"}}/>
            <Stack.Screen name='lesson/[id]' options={{ headerShown: true, animation:'fade_from_bottom'}}/>
            <Stack.Screen name='game/[id]' options={{ headerShown: true, animation:'fade_from_bottom'}}/>
            <Stack.Screen name='/games-list' options={{ headerShown: true,title:"Games", animation:'fade_from_bottom'}}/>
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
        </Stack>)}
