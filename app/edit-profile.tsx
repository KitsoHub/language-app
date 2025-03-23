import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, useRouter } from 'expo-router'
import { useAuthStore } from '@/store/auth-store';
import { Input } from '@/components/ui/Input';
import { Camera, Mail, User } from 'lucide-react-native';
import { colors } from '@/utils/constants/colors';
import { Button } from '@/components/ui/Button';
import WrapperContainer from '@/components/shared/WrapperContainer';
import Avatar from '@/components/shared/Avatar';
import * as ImagePicker from "expo-image-picker";

export default function EditProfile() {
    const router = useRouter();
    const {user, updateUser} = useAuthStore();

    //user details
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [avatar, setAvatar] = useState(user?.avatar || '');

    //app submission state
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        name:'',
        email:'',
    })

    const validateForm = () =>{
        let isValid = true;
        const newErrors = {name: '', email:''};
        const isCheckEmail = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/

        if(!name.trim()){
            newErrors.name = "Name is required";
            isValid = false;
        }

        if(!email.trim()){
            newErrors.email = "Email is required";
        } else if (!isCheckEmail.test(email)){
            newErrors.email = "Email is invalid";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const handleImagePicker = async ()=>{
        console.log(" Handling Image Picker")
          //request image library
          const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()

          if(status === 'granted'){

              const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  aspect: [1,1],
                  quality: 0.5
              });
              console.log(JSON.stringify(result, null, ' '))
              if(!result.canceled){
                  //console.log(result.assets[0].uri)
                 setAvatar(result.assets[0].uri)
              }

          }else{
              let alert_title= "Permission Denied";
              let alert_message = "We need to camera roll permission to update the avatar";
              Alert.alert(alert_title, alert_message);
          }
    }
    const handleSave = async () =>{
        // form validate
        if(!validateForm()) return;

        setIsLoading(true);
        try {
            await new Promise(resolve =>setTimeout(resolve, 1000));
            console.log('Handling Save')
            updateUser(
                {
                    name,
                    email,
                    avatar
                }
            )


        } catch (error) {
            console.log("<<< Image update error >>>",error);

        }finally{
            console.log("<<< Finished updating >>>");
            setIsLoading(false)
        }
    }

    const handleAvatarPicker = async (image:string)=> {
        console.log(image)
        await new Promise(resolve=> setTimeout(resolve, 1000))
        setAvatar(image)
    }

  return (
<>
    <Stack.Screen options={{title:"EditProfile", headerBackTitle:"Back"}} />
<WrapperContainer>
<KeyboardAvoidingView
behavior={Platform.OS === 'ios' ?"padding":"height"}
>


    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewContent}>
        {/* avatar*/}
        <View style={styles.avatarContainer}>
            <Avatar
            uri={avatar}
            name={name}
            size={100}
            />
            <TouchableOpacity style={styles.cameraButton}
            onPress={handleImagePicker}>
                <Camera size={20} color={colors.white}/>
            </TouchableOpacity>

        </View>

        <View style={styles.avatarSelectContainer}>

            <TouchableOpacity style={styles.cameraButton}
            onPress={()=>setAvatar(
                "1")}>
               <Image source={require("@/assets/avatars/avatar_1.jpg")} style={styles.image}/>
            </TouchableOpacity>

        </View>




        {/* list of avatars */}

        {/* inputs */}
        <View style={styles.form}>
            <Input label="Full Name" placeholder=' Enter your full name' value={name} onChangeText={setName} error={errors.name} leftIcon={<User size={20} color={colors.gray500} />}/>
            <Input keyboardType='email-address' autoCapitalize="words" label="Email Address" placeholder='Enter your email address' value={email} onChangeText={setEmail} error={errors.email} leftIcon={<Mail size={20} color={colors.gray500} />}/>

        <Button style={styles.saveButton} title='Save Changes'
        onPress={handleSave}
        isLoading={isLoading}
        />
        </View>


    </ScrollView>
</KeyboardAvoidingView>
</WrapperContainer>

</>
  )
}

const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 32,
        position: 'relative',
      },
      avatarSelectContainer: {
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 32,
        position: 'relative',
      },
      ScrollViewContent:{
        flexGrow:1,
        padding:24
      },
      cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: '35%',
        backgroundColor: colors.primary,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.white,
      },
      form:{marginBottom:24},
      saveButton:{
        marginTop:16
      },
      image: {
        width: '100%',
        height: '100%',
      },
})
