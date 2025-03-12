import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Feather from '@expo/vector-icons/build/Feather'
import { COLORS } from '../../utils/theme'

export default function MainLayout() {
  return (
<Tabs screenOptions={{tabBarActiveTintColor:COLORS.colorCerulean, tabBarShowLabel:false}}>
    <Tabs.Screen name='(home)' options={{ headerShown: false,    tabBarIcon:({color, size})=>(
      <Feather name="home" size={size} color={color} />
    )

}}/>
        <Tabs.Screen name="profile"  options={{ title: "Profile", headerShown: false, animation: "fade" ,
      tabBarIcon: ({color, size})=>(
        <Feather name="user" size={size} color={color} />
      )
    }} />
</Tabs>
  )
}

const styles = StyleSheet.create({})
