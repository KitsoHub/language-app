


import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { Achievement } from '@/types'
import { Lock } from 'lucide-react-native';
import { colors } from '@/utils/constants/colors';
import ProgressBar from './ProgressBar';


type AchievementCardProps = {
    achievement: Achievement;
    style?: ViewStyle;
}

export default function AchievementCard({achievement, style}: AchievementCardProps) {
  return (
    <View style={[styles.container, achievement.unlocked && styles.unlockedContainer, style]}>
      <View style={styles.header}>
        <Text style={styles.icon}>{achievement.icon}</Text>

        {/* display for locked items */}
        {!achievement.unlocked &&(
            <View style={styles.lockIconContainer}>
                <Lock size={16} color={colors.white}/>
            </View>
        )}

      </View>

      {/* title, description, progress */}
      <Text style={styles.title}>{achievement.title}</Text>
      <Text style={styles.description}>{achievement.description}</Text>
      <ProgressBar style={styles.progressBar}
      progress={achievement.progress}
      total={achievement.total}
      height={6}
      showPercentage={false}

      />
      <Text style={styles.progressText}>{achievement.progress / achievement.total}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: colors.gray200,
        width: 160,
        marginRight: 12,
      },

  unlockedContainer: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 32,
  },
  lockIconContainer: {
    backgroundColor: colors.gray600,
    borderRadius: 12,
    padding: 4,
  },

title: {
  fontSize: 16,
  fontWeight: '600',
  color: colors.text,
  marginBottom: 4,
},

description:{
    fontSize:12,
    color: colors.textLight,
    marginBottom:12,
    height:32,
},
progressBar:{
    marginBottom:4
},
progressText:{
fontSize:12,
color: colors.textMuted,
textAlign: 'right'
}

})
