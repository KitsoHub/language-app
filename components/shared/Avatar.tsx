

import { StyleSheet, Text, View, ViewStyle, Image } from 'react-native'
import React from 'react'
import { colors } from '@/utils/constants/colors';


type AvatarProps ={
    uri?: string | null;
    name?: string;
    size?: number;
    style?: ViewStyle;

}
export default function Avatar({
    uri, name, size = 48,style
}: AvatarProps) {

    const getInitials =() =>{
        if(!name)return '';
        const nameParts = name.split(' ');

        if(nameParts.length === 1){
            return nameParts[0].charAt(0).toLocaleUpperCase();
        }

        return(
            nameParts[0].charAt(0).toLocaleUpperCase() +
            nameParts[nameParts.length -1].charAt(0).toLocaleUpperCase()
        );
    }

  return (
    <View
    style={[
      styles.container,
      { width: size, height: size, borderRadius: size / 2 },
      style,
    ]}
  >
{/* TODO: update to use stored avatar */}
    {uri?(
        <Image source={ uri ? { uri: uri } : require("@/assets/avatars/avatar_1.jpg")} style={styles.image} resizeMode='cover'/>
        // <Image source={require("@/assets/avatars/avatar_1.jpg")} style={styles.image} resizeMode='cover'/>
    ):(
        //<Image source={require("@/assets/avatars/avata_1.jpg")} style={styles.image} resizeMode='cover'/>
        <Text style={[styles.initials, {fontSize: size*0.4}]}>
            {getInitials()}
        </Text>
    )}

  </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      },
      image: {
        width: '100%',
        height: '100%',
      },
      initials: {
        color: colors.white,
        fontWeight: '600',
      },
})
