import { Button, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/build/Feather';
import { COLORS } from '@/utils/constants/colors';


interface EmptyStateProps
{
title: string;
description?: string;
icon?: keyof typeof Feather.glyphMap
buttonTitle?: string;
onButtonPress?: () => void;
style?: ViewStyle

}
// TODO: update the emptry state
export default function EmptyState({    title,
    description,
    icon = "inbox",
    buttonTitle,
    onButtonPress,
    style}: EmptyStateProps) {
  return (
    <View style={[styles.container, style]}>
            <Feather name={icon} size={64} color={COLORS.textLight} />
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {buttonTitle && onButtonPress && (
        <Button title={buttonTitle} onPress={onButtonPress} />
      )}

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
      },
      title:{textAlign:"center"},
      description:{
        fontSize:16,
        fontWeight: 400,
        lineHeight: 32,
        marginTop: 8,
        textAlign: "center",
        marginBottom: 24,
      },      button: {
        marginTop: 16,
      },
})
