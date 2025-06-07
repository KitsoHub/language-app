import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ title: "Profile",headerShown:false, }}/>
			<Stack.Screen name="terms" options={{ title: "Terms" }}/>
		</Stack>
	);
}

const styles = StyleSheet.create({});
