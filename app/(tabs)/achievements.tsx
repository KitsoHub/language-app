import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AchievementCard from '@/components/shared/AchievementCard'
import { achievements } from '@/mocks/achievements'


export default function AchievementsPage() {
  return (
    <View>
      {achievements.map((item)=>(
        <AchievementCard key={item.id} achievement={item}/>

      ))}
    </View>
  )
}

const styles = StyleSheet.create({})
