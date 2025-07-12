import { StyleSheet, Text, View, ViewStyle, Image } from 'react-native';
import  { useMemo, useState } from 'react';
import { colors } from '@/utils/constants/colors';


const presetAvatars = {
  '0': require('@/assets/avatars/boy.png'),
  '1': require('@/assets/avatars/women.png'),
  // Add more preset avatars as needed
};

type AvatarProps = {
  uri?: string | number;
  name?: string;
  size?: number;
  style?: ViewStyle;
};
export default function Avatar({ uri, name, size = 48, style }: AvatarProps) {
  //console.log(' >> Image from store >>', uri);
  const [imgIndex, setImgIndex] = useState<number | null>(-1);

  // const getInitials =() =>{
  //     if(!name)return '';
  //     const nameParts = name.split(' ');

  //     if(nameParts.length === 1){
  //         return nameParts[0].charAt(0).toLocaleUpperCase();
  //     }

  //     return(
  //         nameParts[0].charAt(0).toLocaleUpperCase() +
  //         nameParts[nameParts.length -1].charAt(0).toLocaleUpperCase()
  //     );
  // }

  // Memoize initials calculation
  const initials = useMemo(() => {
    if (!name) return '';
    const nameParts = name.trim().split(' ').filter(Boolean);

    if (nameParts.length === 0) return '';
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }

    return (
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  }, [name]);
  const imageConfig = useMemo(() => {
    console.log('Avatar - processing uri:', uri, 'type:', typeof uri);

    if (!uri || uri === '') {
      return { type: 'initials', source: null };
    }

    // Handle string URIs
    if (typeof uri === 'string') {
      // Check if it's an ImagePicker result (file path)
      if (
        uri.includes('ImagePicker') ||
        uri.startsWith('file://') ||
        uri.startsWith('content://')
      ) {
        //console.log('Avatar - detected image picker result');
        return {
          type: 'network',
          source: { uri: uri },
        };
      }
      // Check if it's a URL
      else if (uri.startsWith('http://') || uri.startsWith('https://')) {
        //console.log('Avatar - detected URL');
        return {
          type: 'network',
          source: { uri: uri },
        };
      }
      // Check if it's a preset avatar ID (string number)
      else if (presetAvatars[uri as keyof typeof presetAvatars]) {
        //console.log('Avatar - detected preset avatar:', uri);
        return {
          type: 'preset',
          source: presetAvatars[uri as keyof typeof presetAvatars],
        };
      }
    }

    // Handle number URIs (preset avatar indices)
    if (typeof uri === 'number') {
      const avatarKey = uri.toString() as keyof typeof presetAvatars;
      if (presetAvatars[avatarKey]) {
        //console.log('Avatar - detected preset avatar number:', uri);
        return {
          type: 'preset',
          source: presetAvatars[avatarKey],
        };
      }
    }

    console.log('Avatar - falling back to initials');
    return { type: 'initials', source: null };
  }, [uri]);

  // Memoize container styles
  const containerStyles = useMemo(
    () => [
      styles.container,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
      },
      style,
    ],
    [size, style],
  );

  // Memoize font size for initials
  const initialsStyle = useMemo(
    () => [styles.initials, { fontSize: size * 0.4 }],
    [size],
  );

  const renderContent = () => {
    switch (imageConfig.type) {
      case 'network':
      case 'preset':
        return (
          <Image
            source={imageConfig.source}
            style={styles.image}
            resizeMode="cover"
            onError={(error) => {
              console.error('Avatar image loading error:', error);
            }}
          />
        );
      case 'initials':
      default:
        return <Text style={initialsStyle}>{initials}</Text>;
    }
  };

   return (
        <View style={containerStyles}>
            {renderContent()}
        </View>
    );
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
});
