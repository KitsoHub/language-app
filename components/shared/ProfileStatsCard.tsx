import { StyleSheet, Text,  TouchableOpacity, View, ViewStyle } from 'react-native'

import Feather from '@expo/vector-icons/build/Feather';
import { colors, COLORS } from '@/utils/constants/colors';
import { useAuthStore } from '@/store/auth-store';

import Avatar from './Avatar';
import { memo } from 'react';
import React from 'react';
interface ProfileProps {
  name: string,
  avatar: string,
  email: string,
  level: number,
  currentLanguage: string,
  streak: number,
  xp: number,
  title: string;
  description?: string;
  icon?: keyof typeof Feather.glyphMap;
  buttonTitle?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

// Memoized stat card component
const StatCard = memo(({ value, label }: { value: number; label: string }) => (
    <View style={styles.statCard}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
));


function ProfileStatsCardX ({
  name,
  email,
  xp,
  level,
  streak,

  onPress,

}: ProfileProps) {

  const { user} = useAuthStore();

  return (
    <>
      <View style={styles.profileHeader}>

        <Avatar
          uri={user?.avatar}
          name={name}
          size={80}

        />
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userEmail}>{email}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={onPress}

        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

      </View>
            <View style={styles.statsContainer}>
                <StatCard value={level} label="Level" />
                <StatCard value={xp} label="Total XP" />
                <StatCard value={streak} label="Day Streak" />
            </View>
      {/* <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{level}</Text>
          <Text style={styles.statLabel}>Level</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{xp}</Text>
          <Text style={styles.statLabel}>Total XP</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View> */}


    </>
  )
}

const styles = StyleSheet.create({


  profileHeader: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.white,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBlockColor: colors.gray200,
    borderBottomRightRadius:12,
    borderBottomLeftRadius:12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },

  section: {
    padding: 16,
    marginBottom: 13,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.textLight,
    fontWeight: 600,
    marginBottom: 8,
  },

  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  settingsIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsItemText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,

  },

  settingsItemExta:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,

  },

  settingsIconContainerExtra: {
    width: 26,
    height: 26,
    borderRadius: 5,
    backgroundColor: COLORS.colorGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsItemTextExtra: {
    flex: 1,
    fontSize: 15,
    color: colors.black,

  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: 16,
    marginBottom: 16,
    borderRadius:10
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.error,
    marginLeft: 8,
  },
  versionText: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 24,
  },
  // end

  profileImage: {
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileInfo: {
    flexDirection: 'column',
    // flex: 1,
  },
  TandC: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: COLORS.gray200,
    gap: 10,
  },
  TandCs: {
    flexDirection: 'column',
    width: 310,
    marginBottom: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    height: 40,
    backgroundColor: "grey",
    width: "auto",
  },
  description: {
    fontWeight: 400,
    lineHeight: 32,
    marginTop: 8,
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    marginTop: 16,

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
const ProfileStatsCard = React.memo(ProfileStatsCardX);

export default ProfileStatsCard;
