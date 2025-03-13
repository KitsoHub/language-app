
import { COLORS } from '@/utils/constants/colors';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
interface ProgressBarProps{
    progress: number;
    total: number;
    label?:string;
    showPercentage?:boolean;
    height?:number;
    style?: ViewStyle;
}

export default function ProgressBar({
    progress,
    total,
    label,
    showPercentage =true,
    height =8,
    style,
}: ProgressBarProps){

    const percentage = Math.min(Math.max((progress/total)*100,0),100)
    return(
        <View>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.progressContainer, { height }]}>
        <View
          style={[
            styles.progressFill,
            { width: `${percentage}%` }
          ]}
        />
      </View>
      {showPercentage && (
        <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
      )}

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      marginVertical: 8,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: COLORS.textLight,
      marginBottom: 4,
    },
    progressContainer: {
      backgroundColor: COLORS.gray200,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: COLORS.primary,
      borderRadius: 4,
    },
    percentage: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 4,
      textAlign: 'right',
    },
  });
