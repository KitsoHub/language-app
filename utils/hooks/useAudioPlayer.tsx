import { useRef } from "react";
import { Alert } from "react-native";
import { Audio, type AVPlaybackSource } from "expo-av";

export function useAudioPlayer() {
	const soundRef = useRef<Audio.Sound | null>(null);

	const play = async (uri: string) => {
		try {
			await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
			const { sound } = await Audio.Sound.createAsync(
				uri as unknown as AVPlaybackSource ,
				{ shouldPlay: true },
			);

            soundRef.current = sound;

			sound.setOnPlaybackStatusUpdate((status) => {
				if (status.isLoaded && status.didJustFinish) {
					sound.unloadAsync();
				}
			});
		} catch (error) {
            console.log(error)
			Alert.alert("Playback Error", "Unable to play audio at this time.");
		}
	};

    const stop = async ()=>{
        if (soundRef.current){
            await soundRef.current.stopAsync();
            await soundRef.current.unloadAsync()
            soundRef.current =  null;
        }
    }

    return {play, stop}
}
