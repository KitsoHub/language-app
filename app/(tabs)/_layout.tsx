import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/build/Feather";
import { colors, COLORS } from "@/utils/constants/colors";
import { Gamepad2 } from "lucide-react-native";
import { useAuthStore } from "@/store/auth-store";
import { Crown } from "lucide-react-native";


export default function MainLayout() {
	
const { user } = useAuthStore();
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: COLORS.colorCerulean,
				tabBarShowLabel: false,
        tabBarInactiveTintColor:'#999',
        tabBarStyle: {
          borderWidth:1,

        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					
					tabBarIcon: ({ color, size }) => (
						<Feather name="home" size={size} color={color} />
					),
					headerTitle: `Hello, ${user?.name || "Friend"}!`,
					headerShown: true,
					headerStyle: { backgroundColor: COLORS.quaternaryLight ,borderBottomRightRadius: 20, borderBottomLeftRadius: 20 ,height: 120},
									headerTintColor: COLORS.quaternaryDark,
					headerTitleStyle: {
					color: "Black",fontSize: 30, fontWeight: "bold",}	,


					headerRight: () => <Crown size={24} color="gold" />,  
					headerRightContainerStyle: {
					paddingRight: 20,},
					
				}}
			/>

			<Tabs.Screen
				name="games"
				options={{
					title: "Game",
					tabBarIcon: ({ color, size }) => (
						<Gamepad2 size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					headerShown: false,
					animation: "fade",
					tabBarIcon: ({ color, size }) => (
						<Feather name="user" size={size} color={color} />
					),
				}}
			/>

      			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					headerShown: false,
					animation: "fade",
					tabBarIcon: ({ color, size }) => (
						<Feather name="settings" size={size} color={color} />
					),
				}}
			/>
		</Tabs>

	);
}

const styles = StyleSheet.create({});
