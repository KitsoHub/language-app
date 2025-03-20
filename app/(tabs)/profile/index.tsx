import ProfileState from '@/components/shared/profile'
import { ScrollView, StyleSheet, Text, View, Modal, TextInput } from 'react-native'
import { useAuthStore } from '@/store/auth-store'; // Import the auth store
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore(); // Get the user and updateUser from the auth store
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    updateUser({ name, email });
    setModalVisible(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <ProfileState
          name={user?.name || 'Ogaufi Mokopakagosi'}
          email={user?.email || ''}
          title="Profile Details"
          currentLanguage={user?.currentLanguage || 'st'}
          xp={user?.xp || '0'}
          streak={user?.streak || '0'}
          level={user?.level || ''}
          icon="user"
          onButtonPress={() => setModalVisible(true)} // Pass the onButtonPress prop
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
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: "flex",
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "black",
    width: "90%",
    flexDirection: "column",
    overflow: "hidden",
    alignItems: "center",
    fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
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