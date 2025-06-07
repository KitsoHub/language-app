import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useLanguageStore } from '@/store/language-store'
import { useAuthStore } from '@/store/auth-store'
import { COLORS } from '@/utils/constants/colors'

export default function Header() {

    const { user} = useAuthStore()
    const { appLanguages } = useLanguageStore();
      const currentLanguage = appLanguages.find(lang => user?.currentLanguage === lang.id);
  return (
    <View style={styles.container}>
      <View style={styles.languageContainer}>
        <Text style={styles.languageLabel}>Language</Text>
        <Text style={styles.languageName}>{currentLanguage?.name || 'Kalanga'}</Text>
      </View>

                  {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <View style={styles.statIconContainer}>
                            <Image
                                source={require('@/assets/images/coins.png')}
                                style={{ width: 30, height: 30 }}
                                resizeMode="contain"
                            />
                        </View>
                        <View>
                            <Text style={styles.statLabel}>Points</Text>
                            <Text style={styles.statValue}>{user?.xp || 0}</Text>
                        </View>
                    </View>

                    {/* Vertical Divider */}
                    <View style={styles.Divider} />

                    <View style={styles.statCard}>
                        <View style={styles.statIconContainer}>
                            <Image
                                source={require('@/assets/images/trophy1.png')}
                                style={{ width: 50, height: 45 }}
                                resizeMode="contain"
                            />
                        </View>
                        <View>
                            <Text style={styles.statLabel}>Level</Text>
                            <Text style={styles.statValue}>{user?.level || 1}</Text>
                        </View>
                    </View>
                </View>

    </View>
  )
}

const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
    languageContainer: {
    alignItems: 'flex-start',
  },
  languageLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  languageName: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#333',
  },
  	statsContainer: {
		flex: 1,
        flexDirection: "row",
		justifyContent: "space-around",
		borderRadius: 16,
		elevation: 4,
        marginHorizontal:10,
        backgroundColor: COLORS.cyanLight,
	},
	statCard: {
		flexDirection: "row",
		alignItems: "center",
		padding: 5,

	},
	statIconContainer: {
		width: 44,
		height: 44,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 4,
	},
	statValue: {
		fontSize: 24,
		fontWeight: "900",
		color: COLORS.tertiaryDark,
	},
	statLabel: {
		fontSize: 15,
		fontWeight: "800",
		color: COLORS.text,
	},
    	Divider: {
		alignContent: "center",
		alignSelf: "center",
		width: 1,
		height: "90%",
		backgroundColor: COLORS.gray400,
	},
})
