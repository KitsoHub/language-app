

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Skill } from '@/types'
import { colors } from '@/utils/constants/colors'
import { BookOpen, BookText, Eye, Headphones, Mic, Pen } from 'lucide-react-native'


type SkillProgressProps = {
    skill: Skill
}

export default function SkillProgressContainer({ skill }: SkillProgressProps) {

    const getIcon = () => {
        switch (skill.name) {
            case 'vocabulary':
                return <BookOpen size={20} color={colors.primary} />
            case 'listening':
                return <Headphones size={20} color={colors.primary} />
            case 'speaking':
                return <Mic size={20} color={colors.primary} />
            case 'reading':
                return <Eye size={20} color={colors.primary} />
            case 'writing':
                return <Pen size={20} color={colors.primary} />
            case 'grammar':
                return <BookText size={20} color={colors.primary} />
            default:
                return null;
        }

    }

    const getSkillName = () => {
        return skill.name.charAt(0).toUpperCase() + skill.name.slice(1)
    }
    return (
        <View style={styles.container}>

            <View style={styles.iconContainer}>
                {getIcon()}
            </View>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.progressName}>{getSkillName()}</Text>
                    <Text>{skill.progress}%</Text>

                </View>

                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${skill.progress}%` }
                        ]}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 6,
    },

    progressBar: {
        height: 6,
        backgroundColor: colors.gray200,
        borderRadius: 3,
        overflow: 'hidden'
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 3,

    },
    progressName: {
        color: colors.textMuted,
        fontSize: 16,
        fontWeight: '500'
    },

    header: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    }
    , content: {
        flex: 1
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

})
