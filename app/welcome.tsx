import { Dimensions, Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";

import { colors, COLORS } from "@/utils/constants/colors";
import { StatusBar } from "expo-status-bar";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSequence,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { FONT_SIZES, FONT_WEIGHTS } from "@/utils/constants";
import { useRouter } from "expo-router";

const {width, height} = Dimensions.get('window');
export default function WelcomePage() {
	const router = useRouter();

	const buttonScale = useSharedValue(0.8);
	const buttonOpacity = useSharedValue(0);
	const logoOpacity = useSharedValue(0);
	const logoScale = useSharedValue(0.8);
    const bgY = useSharedValue(height*0.1);

	useEffect(() => {
		buttonOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));
		buttonScale.value = withDelay(600, withSpring(1, { damping: 8 }));

		// logo animate
		logoOpacity.value = withTiming(1, { duration: 800 });
		logoScale.value = withSpring(1, { damping: 12 });
	}, [buttonOpacity, buttonScale, logoOpacity, logoScale]);

	const buttonStyle = useAnimatedStyle(() => {
		return {
			opacity: buttonOpacity.value,
			transform: [{ scale: buttonScale.value }],
		};
	});

    const logoStyle = useAnimatedStyle(()=>{
        return {
            opacity: logoOpacity.value,
            transform: [{scale:logoScale.value}]
        }
    })
	const handleStart = () => {
		buttonScale.value = withSequence(
			withTiming(0.9, { duration: 100 }),
			withTiming(1.1, { duration: 100 }),
			withTiming(1, { duration: 100 }),
		);
		buttonOpacity.value = withSequence(
			withTiming(0.5, { duration: 100 }),
			withTiming(1, { duration: 100 }),
		);

		setTimeout(() => {
			console.log("Navigating to tabs screen");
			//router.replace("/(tabs)");
		}, 300);
	};

	return (
		<View style={styles.container}>
			<StatusBar style="light" />

			<Animated.View style={[styles.logoContainer, logoStyle]}>
				<Text style={styles.logoTextTop}>TswaLingo</Text>

				<Text style={styles.tagline}>Play and Learn</Text>
			</Animated.View>

                  <View style={styles.charactersContainer}>
        <Image
         source={require("@/assets/avatars/avatar_BG_2.png")}
          style={styles.characterImageLeft}
        />
        <Image
         source={require("@/assets/avatars/avatar_BG_1.png")}
          style={styles.characterImageRight}
        />
      </View>

			<Animated.View style={[styles.buttonContainer, buttonStyle]}>
				<Pressable
					style={styles.startButtonContainer}
					android_ripple={{ color: "rgba(255,255,255,0.2)", radius: 120 }}
					onPress={handleStart}
				>
					<Text style={styles.startButtonText}>Start</Text>
				</Pressable>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		//backgroundColor: COLORS.purpleBackground,
       backgroundColor:"#1F33CE", // darkblue
    // backgroundColor:"#FF470B", //orange

        paddingVertical: 60,
    paddingHorizontal: 20,
	},
	buttonContainer: {
		alignItems:"flex-end",
		marginTop:20,
        marginBottom:-30
	},
	startButtonText: {
		color: COLORS.white,
		fontSize: FONT_SIZES.xl,
		fontWeight: FONT_WEIGHTS.bold,
	},
	startButtonContainer: {
        width: width*0.9,
        alignItems: "center",
		backgroundColor: COLORS.primary,
		borderRadius: 30,
		borderColor: COLORS.white,
		borderWidth: 4,
		paddingHorizontal: 40,
		paddingVertical: 10,
		elevation: 5,
		shadowColor: COLORS.black,
		shadowOpacity: 0.3,
		shadowRadius: 5,
		shadowOffset: { width: 0, height: 4 },

	},
	logoContainer: {
		alignItems: "center",
        marginTop:80

	},
    logoTextTop:{
        fontSize: FONT_SIZES.xxxl*2,
        fontWeight:FONT_WEIGHTS.bold,
        // color:COLORS.cyanBlue,
        color:COLORS.white,
        textShadowColor:'rgba(1, 0, 0, 0.5)',
        textShadowRadius:5,
        textShadowOffset:{width:2, height:2},

    },
    tagline:{
        fontSize:FONT_SIZES.md,
        fontWeight:FONT_WEIGHTS.bold,
        color:COLORS.white,
        marginTop:40,
        letterSpacing:1
    }
,
      charactersContainer: {
    width: '100%',
    // marginBottom: 20,
    flexDirection: 'row',
  },
  characterImageLeft: {
    width: 290.1,
    height: 350,
	transform: [{ rotate: '-3.1deg' }, {translateX: -70}, {translateY:20},{scale:1.18}  ],
    zIndex:1


  },
  characterImageRight: {
    width: 210,
    height: 290,
    	transform: [{ rotate: '8.57deg' }, {translateX: -75}, {translateY:100},{scale:.95} ],
  },
});
