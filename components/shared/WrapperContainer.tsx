import {Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { colors } from '@/utils/constants/colors';
const {width, height} = Dimensions.get('window');

const WrapperContainer = ({children} : { children: React.ReactNode }) => {
    const guidelineBaseWidth = 375;
    const guidelineBaseHeight = 812;

    const moderateScale = (size: number, factor = 0.5) =>
        size + (scale(size) - size) * factor;

    const scale = (size: number) => (width / guidelineBaseWidth) * size;
  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <StatusBar backgroundColor={colors.white} />
      <View style={{flex: 1, marginHorizontal: moderateScale(38)}}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default WrapperContainer;

const styles = StyleSheet.create({});
