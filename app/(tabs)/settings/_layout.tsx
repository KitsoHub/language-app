import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import { COLORS } from '@/utils/constants/colors'

export default function Layout() {
  return (
  <Stack>
    <Stack.Screen name="index" options={{title:"Settings",headerShown:false	}}>
    </Stack.Screen>

  </Stack>
  )
}

const styles = StyleSheet.create({})
