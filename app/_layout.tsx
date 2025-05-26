import { useAuthStore } from '@/store/auth-store';
import { Stack, useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { useLoadedFonts } from "@/utils/hooks/useFontFamily";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();
    const fontsLoaded = useLoadedFonts();


    useEffect(() => {
if (fontsLoaded) {
    SplashScreen.hideAsync();
    router.replace(isAuthenticated ? "/welcome" as never : "auth/sign-in" as never);
}
    },[fontsLoaded])

    if (!fontsLoaded) {
        return null;
    }
    return (
        // TODO: add theme provider
        <Stack >
            <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: "fade" }} />
            <Stack.Screen name="auth/sign-in" options={{ headerShown: false, animation: "fade" }} />
            <Stack.Screen name="index" options={{ headerShown: false, animation: "fade" }} />
            <Stack.Screen name='course/[id]' options={{ animation:'fade_from_bottom', title:"Lessons"}}/>
            <Stack.Screen name='lesson/[id]' options={{ headerShown: true, animation:'fade_from_bottom'}}/>
            <Stack.Screen name='game/[id]' options={{ headerShown: true, animation:'fade_from_bottom'}}/>
            <Stack.Screen name='games-list' options={{ headerShown: true,title:"Games", animation:'fade_from_bottom'}}/>
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
        </Stack>)}
