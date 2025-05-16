import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONT_SIZES, FONT_WEIGHTS } from '@/utils/constants'
import { colors } from '@/utils/constants/colors'
import { Star } from 'lucide-react-native'

type ScoreDisplayProps = {
  score: number
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <View style={styles.container}>
        <Star size={FONT_SIZES.md} color={colors.primary} fill={colors.primary} />
      <Text style={styles.scoreText}>{score}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.cardBackground,
        paddingHorizontal:12,
        paddingVertical: 6,
        borderRadius:15
    },
    scoreText:{
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.bold,
        color: colors.text,
        marginLeft: 4
    }
})
