

import { Platform, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { colors } from '@/utils/constants/colors';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface WordTileProps {
    word: string;
    onPress: () => void;
    style?: ViewStyle;
    disabled?: boolean;
}

export default function WordTile({
    word, onPress, style, disabled = false
}: WordTileProps) {

    const animatedStyle = useAnimatedStyle(() => {
        if (Platform.OS === 'web') {
            return {};
        }

        return {
            transform: [
                { scale: withTiming(disabled ? 0.95 : 1, { duration: 150 }) },
            ],
            opacity: withTiming(disabled ? 0.6 : 1, { duration: 150 }),
        };
    });
    return (
        <Pressable onPress={disabled ? undefined : onPress}
            style={({ pressed }) => [
                styles.container,
                 {
                opacity: (pressed && !disabled) ? 0.7 : 1,
                transform: [{ scale: (pressed && !disabled) ? 0.95 : 1 }],
                },
                style,
        ]}
            disabled={disabled}
        >


            {Platform.OS !== 'web'? (
                <Animated.View style={[styles.innerContainer, animatedStyle]}>
                    <Text style={styles.text}>{word}</Text>
                </Animated.View>
            ):(<Text style={styles.text}>{word}</Text>)}
        </Pressable>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        padding: 12,
        margin: 6,
        minWidth: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    innerContainer: {
        width: '100%',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    }
})
