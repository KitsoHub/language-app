import { LayoutChangeEvent, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import WrapperContainer from '@/components/shared/WrapperContainer'
import { router, Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/utils/constants/colors'
import { LinearGradient } from 'expo-linear-gradient';
import { termsContent } from '@/utils/constants/termsData'
import { FONT_SIZES, FONT_WEIGHTS } from '@/utils/constants'
import { ChevronDown, ChevronUp } from 'lucide-react-native'
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native'


export default function TermsPage() {
    const [isAtBottom, setIsAtBottom] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, layoutMeasurement, contentSize } = e.nativeEvent;
        const paddingToBottom = 20;
        const isCurrentlyAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;


        if (isCurrentlyAtBottom !== isAtBottom) {
            setIsAtBottom(isCurrentlyAtBottom)
        }
    }

    const scrollToBottom = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
    }

    const scrollToTop = () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }

    const handleAccept = () =>{
        router.replace("/");
    }
    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Stack.Screen
                options={{
                    //   title: "Terms of Service",
                    headerShown: true,
                }}
            />

            <View style={styles.header}>
                <Text style={styles.headerSubtitle}>AGREEMENT</Text>
                <Text style={styles.headerTitle}>Terms of Service</Text>
                <Text style={styles.headerDate}>Last updated on 05/15/2023</Text>
            </View>


            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                // scrollEventThrottle={100}
            >

                {termsContent.map((section, index) => (
                    <View key={`${section.title}-${index}`} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <Text style={styles.sectionContent}>{section.content}</Text>
                    </View>
                ))}

                <View style={styles.spacer} />
            </ScrollView>
            <LinearGradient
                colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.9)', 'rgba(255,255,255,1)']}
                style={styles.gradientOverlay}
                pointerEvents="none"
            />

            <View style={styles.buttonContainer}>
                {isAtBottom ? (
                    <Pressable style={styles.acceptButton} onPress={handleAccept}>
                        <Text style={styles.acceptButtonText}>Accept & Continue</Text>
                    </Pressable>
                ) : (<Pressable style={styles.scrollButton} onPress={scrollToBottom}>
                    <Text style={styles.scrollButtonText}>Scroll to Bottom</Text>
                    <ChevronDown size={18} color="#555" />
                </Pressable>
            )}

                <Pressable style={[styles.scrollButton, styles.topButton]} onPress={scrollToTop}>
                    <Text style={styles.scrollButtonText}>Scroll to Top</Text>
                    <ChevronUp size={18} color="#555" />
                </Pressable>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundLight
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#888',
        marginBottom: 4,
        letterSpacing: 1,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    headerDate: {
        fontSize: 14,
        color: '#888',
    },
    gradientOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
    },
    spacer: {
        height: 60
    },
    section: {
        backgroundColor: colors.backgroundLight,
        borderRadius: 15,
        padding: 16,
        marginBottom: 16,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0,
        shadowRadius: 3,
        elevation: 2
    },
    sectionTitle: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.bold,
        color: colors.gray600,
        marginBottom: 12
    },
    sectionContent: {
        fontSize: FONT_SIZES.md
    },
    scrollButtonText: {
        marginRight: 6,
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.bold,
        color: "#555"
    },
    scrollButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    topButton: {
        backgroundColor: '#f8f8f8',
    },
    scrollView: { flex: 1 },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        paddingBottom: Platform.OS === 'ios' ? 30 : 16,
    }
    ,

    acceptButton: {
        backgroundColor: '#4A7DFF',
        borderRadius: 30,
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#4A7DFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
        flex: 1,
        marginRight: 10,
    },
    acceptButtonText: {
        color: colors.white,
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.bold,
    },
})
