import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
interface CircularProgressProps {
  progress: number;
  size: number;
  strokeWidth: number;
  color: string;
  bgColor: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
      progress,
  size,
  strokeWidth,
  color,
  bgColor,
})=>{
  // Ensure progress is between 0 and 1
  const normalizedProgress = Math.min(Math.max(progress, 0), 1);

  // Calculate radius and center point
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

    // Calculate stroke dash offset based on progress
  const strokeDashoffset = circumference * (1 - normalizedProgress);
    return (
            <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          transform={`rotate(-90, ${center}, ${center})`}
        />
      </Svg>
    </View>
    )
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

export default CircularProgress;
