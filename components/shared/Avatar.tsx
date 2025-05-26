

import { StyleSheet, Text, View, ViewStyle, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '@/utils/constants/colors';
import { avatars } from '@/mocks/vowels';


type AvatarProps ={
    uri?: string | number;
    name?: string;
    size?: number;
    style?: ViewStyle;

}
export default function Avatar({
    uri, name, size = 48,style,
}: AvatarProps) {
console.log(" >> Image from store >>",uri)
const [imgIndex, setImgIndex] = useState<number | null >(-1);

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
    useEffect(() => {
      if (typeof uri === 'string') {
        if (uri.includes("ImagePicker")) {
            setImgIndex(null);
        } else {
            const parsed = parseInt(uri, 10);
            setImgIndex(Number.isInteger(parsed) ? parsed : null);
        }
    } else if (typeof uri === 'number') {
        setImgIndex(Number.isInteger(uri) ? uri : null);
    } else {
        setImgIndex(null);
    }
  }, [uri]);
  return (
    <View
    style={[
      styles.container,
      { width: size, height: size, borderRadius: size / 2 },
      style,
    ]}
  >
{/* TODO: update to use stored avatar */}
    { typeof uri === 'string' && uri?.includes("ImagePicker") ?(
        <Image source={ uri ? { uri: uri } : require("@/assets/avatars/avatar_1.jpg")} style={styles.image} resizeMode='cover'/>
    ):

    (
      imgIndex !== null && avatars[imgIndex] ? (
        <Image
          source={avatars[imgIndex].image}
          style={styles.image}
          resizeMode='cover'
        />
      ) : (
        <Text style={[styles.initials, {fontSize: size*0.4}]}>
          {getInitials()}
        </Text>
      ))

    }

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
