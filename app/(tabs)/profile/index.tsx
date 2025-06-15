import { ScrollView, StyleSheet, View, Modal, Text } from 'react-native';
import { useAuthStore } from '@/store/auth-store';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, colors } from '@/utils/constants/colors';
import ProfileStateCard from '@/components/shared/ProfileStateCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { router } from 'expo-router';
import { ROUTES } from '@/utils/constants/routes';
import { useProgressStore } from '@/store/progress-store';
import AchievementCard from '@/components/shared/AchievementCard';
import ProfileStatsCard from '@/components/shared/ProfileStatsCard';
import { achievements } from '@/mocks/achievements';
import EmptyState from '@/components/shared/EmptyState';
import { LinearGradient } from 'expo-linear-gradient';
import AchivementList from '@/components/shared/AchivementList';
import { supabase } from '@/utils/supabase';

export default function ProfilePage() {
  const { updateUser } = useAuthStore();
  const [user, setUser] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(user?.user_metadata?.name || user?.email || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Get user from Supabase session
    const getSessionUser = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data?.session?.user || null;
      setUser(sessionUser);
      if (sessionUser) {
        updateUser({
          email: sessionUser.email,
          name: sessionUser.user_metadata?.name || sessionUser.email,
          avatar
        });
      }
    };
    getSessionUser();
  }, []);

  if (!user) return null;

  const handleProfileEdit = () => {
    router.push(ROUTES.EDITPROFILE);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <ProfileStatsCard
          name={user?.user_metadata?.name || user?.email || 'Guest User'}
          email={user?.email || ''}
          title="Profile Details"
          currentLanguage={user?.currentLanguage || 'st'}
          xp={user?.xp || 0}
          streak={user?.streak || 0}
          level={user?.level || 1}
          icon="user"
          onPress={handleProfileEdit} avatar={''}        />
        <Text style={styles.sectionTitle}>Achievements</Text>
        <AchivementList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  scrollView: {
    flex: 1,
    padding: 16,
    marginBottom: 4,
  },
  modalView: {
    flex: 1,
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    position: 'absolute',
    bottom: 0,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonSpacer: {
    height: 10,
  },
  statsContainer: {
    flexDirection: 'row',
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
  skillsContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 15,
    color: colors.textLight,
    fontWeight: '500',
    marginBottom: 16,
  },
});