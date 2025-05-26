

import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import type { SubscriptionPlanType } from '@/types'
import { FONT_SIZES } from '@/utils/constants';
import { Check, Circle } from 'lucide-react-native';
import { COLORS, colors } from '@/utils/constants/colors';

type SubscriptionPlanCardProps = {
    plan: SubscriptionPlanType;
    isSelected: boolean;
    onSelect: () => void;
}
export default function SubscriptionPlanCard({ plan, isSelected, onSelect }: SubscriptionPlanCardProps) {
    return (
        <TouchableOpacity style={[styles.container, isSelected && styles.selectedContainer]}
            onPress={onSelect}
            activeOpacity={0.8}
        >

            <View style={styles.leftContent}>
                {plan.badge && (
                    <View style={[styles.badge, { backgroundColor: plan.badgeColor }]}>
                        <Text style={styles.badgeText}>{plan.badge}</Text>
                    </View>
                )}
                <View style={styles.radioContainer}>
                    {isSelected ? (
                        <Check size={22} color="#00E5C3" />
                    ) : (
                        <Circle size={22} color="#E0E0E0" />
                    )}
                </View>

                <View style={styles.planInfo}>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    <Text style={styles.planSubtitle}>{plan.subtitle}</Text>
                </View>
            </View>

            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{plan.pricePerWeek}</Text>
                <Text style={styles.perWeekText}>{plan.badge === "DEMO" ? "" : "perWeek"}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: colors.border,
    },
    selectedContainer: {
        borderColor: COLORS.colorAppleGreen,
        backgroundColor: 'rgba(0, 229, 195, 0.05)',
    },

    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    radioContainer: {
        marginRight: 12
    },
    selectedText: {
        color: '#FFFFFF',
    },
    planInfo: {
        paddingTop: 10,
        flex: 1,
    },
    planTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    planSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    priceContainer: {
        alignItems: 'flex-end',
    },

    priceText: {
        fontSize: FONT_SIZES.lg,
        color: colors.text
    },
    perWeekText: {
        fontSize: FONT_SIZES.sm,
        color: '#666'
    },
    badge: {
        position: 'absolute',
        top: -16,
        left: 24,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        zIndex: 1,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '700',
    },
})
