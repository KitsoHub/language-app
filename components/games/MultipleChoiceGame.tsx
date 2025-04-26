import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import type { Challenge } from '@/types'


type MultipleChoiceGameProps={
challenge: Challenge
}
export default function MultipleChoiceGame({challenge}:MultipleChoiceGameProps) {
  // show options
  // select option
  // check option
  return (
    <View>
      <Text>MultiChoiceGame</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
