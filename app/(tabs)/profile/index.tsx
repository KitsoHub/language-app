
import { ScrollView, StyleSheet, Text, View, Modal, TextInput } from 'react-native'
import { useAuthStore } from '@/store/auth-store'; // Import the auth store
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/utils/constants/colors';
import ProfileStateCard from '@/components/shared/ProfileStateCard';

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    updateUser({ name, email });
    setModalVisible(false);
  };

  return (
<SafeAreaView style={styles.container}>
<ScrollView
showsVerticalScrollIndicator={false}
style={styles.scrollView}
>


        <ProfileStateCard
          name={user?.name || 'Guest User'}
          email={user?.email || ''}
          title="Profile Details"
          currentLanguage={user?.currentLanguage || 'st'}
          xp={user?.xp || 0}
          streak={user?.streak || 0}
          level={user?.level || 1}
          icon="user"
          onPress={() => setModalVisible(true)} // Pass the onButtonPress prop
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>

    </ScrollView>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
   flex:1,
   backgroundColor:colors.backgroundLight
  },
  scrollView:{
    flex:1,
    padding:16,
    marginBottom:4
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    width: '100%',
  },

})
