import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/utils/constants/colors';


type WordMatchProgressBarProps={
    currentLevel: number,
    totalLevels: number,
}
export default function WordMatchProgressBar({currentLevel, totalLevels}: WordMatchProgressBarProps) {
  const progress = (currentLevel/totalLevels)*100;
    return (
<View style={styles.container}>
<View style={styles.progressInfo}>
      <Text style={styles.levelText}>Level {currentLevel}/{totalLevels}</Text>
      <Text style={styles.percentText}>{Math.round(progress)}%</Text>

    </View>

    <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, {width: `${progress}%`}]}/>
    </View>
</View>
  )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        marginVertical:16
    },
    progressInfo:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:4
    },
    levelText:{
        fontSize:14,
        fontWeight:400,
        color:colors.text
    },
    percentText:{
        fontSize: 14,
        color: colors.text
    },
    progressBarContainer:{
        height:8,
        backgroundColor:colors.gray400,
        borderRadius:4,
        overflow:'hidden'
    },
    progressBar:{
        height:"100%",
        backgroundColor:colors.primary,
        borderRadius: 4
    }
})
