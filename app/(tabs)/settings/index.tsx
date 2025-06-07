import { ScrollView, StyleSheet, View, Modal } from 'react-native'
import { useAuthStore } from '@/store/auth-store'; // Import the auth store
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/utils/constants/colors';
import ProfileStateCard from '@/components/shared/ProfileStateCard';
import {Button} from '@/components/ui/Button'; // Import Button component
import {Input} from '@/components/ui/Input'; // Import InputForm component
import { router, Stack } from 'expo-router';
import { ROUTES } from '@/utils/constants/routes';
import SettingsContainer from '@/components/shared/Settings';

export default function SettingsPage() {
  const { user, updateUser } = useAuthStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  // const handleSave = () => {
  //   updateUser({ name, email });
  //   setModalVisible(false);
  // };

  const handleProfileEdit =() =>{
    router.push(ROUTES.EDITPROFILE)
  }

  return (
    <SafeAreaView style={styles.container}>
 
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <SettingsContainer
          name={user?.name || 'Guest User'}
          email={user?.email || ''}
          title="Profile Details"
          currentLanguage={user?.currentLanguage || 'st'}
          xp={user?.xp || 0}
          streak={user?.streak || 0}
          level={user?.level || 1}
          icon="user"
          onPress={handleProfileEdit}
          // onPress={() => setModalVisible(true)}
                  />

        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Input
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button title="Save" onPress={handleSave} />
            <View style={styles.buttonSpacer} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </Modal> */}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight
  },
  scrollView: {
    flex: 1,
    padding: 16,
    marginBottom: 4
  },
  modalView: {
    flex: 1,
    width: '90%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    position: 'absolute',
    bottom: 0,

    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonSpacer: {
    height: 10, // Adjust the height as needed
  },
})
