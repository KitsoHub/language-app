import { LayoutChangeEvent, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, colors } from '@/utils/constants/colors';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


export type TabButtonProps = {
    title: string;
}

type TabButtonType = {
    buttons: TabButtonProps[],
    selectedTab: number,
    setSelectedTab: (index: number) => void
}
export default function TabButton({ buttons, selectedTab, setSelectedTab }: TabButtonType) {

    //set dimensions
    const [dimensions, setDimensions] = useState({ height: 20, width: 100 })
    const buttonWidth = dimensions.width / buttons.length

    const onTabbarLayout = (e:LayoutChangeEvent)=>{
        setDimensions({
            height: e.nativeEvent.layout.height,
            width:e.nativeEvent.layout.width
        })

    }

    const tabPositionX =  useSharedValue(0)

    const handleOnPress = (index:number)=>{
        setSelectedTab(index)
    }
    const onTabPress = (index:number)=>{
        tabPositionX.value = withTiming(buttonWidth*index, {}, ()=>{runOnJS(handleOnPress)(index)})
    }
    const animatedStyle = useAnimatedStyle(() => {
            if (Platform.OS === 'web') {
                return {};
            }

            return {
                transform: [
                    { translateX: tabPositionX.value},
                ],
            };
        });

    return (


        <View  style={{ backgroundColor: COLORS.primary, borderRadius: 20, justifyContent: "center" }}>

                        {/* tab background */}
            <Animated.View style={[animatedStyle,
                {position:'absolute',
                backgroundColor:colors.white,
                borderRadius:15,
                marginHorizontal:5,
                height: dimensions.height -10,
                width: buttonWidth -10}

            ]}/>


            <View  onLayout={onTabbarLayout} style={{ flexDirection: 'row' }}>
                {/* selected tab color */}


                {buttons.map((tab, index) => {
                    // set dynamic color
                    const tabColor = selectedTab === index?  COLORS.primary: colors.white;
                    return (
                        <Pressable
                            key={`${tab}-${index}`}
                            style={{ flex: 1, paddingVertical: 20 }}
                            onPress={()=> onTabPress(index)}
                        >
                            <Text style={{ color: tabColor, alignSelf:'center', fontSize:14, fontWeight:"600"}}>{tab.title}</Text>
                        </Pressable>
                    )
                })}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
