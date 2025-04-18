import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function AppChallenges() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
  return (
    <View>
      <Text> AppChallenges</Text>
      <Text>{id}</Text>
      <Text onPress={() => router.back()}>Back</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
