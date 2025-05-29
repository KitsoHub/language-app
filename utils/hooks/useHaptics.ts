import { useHapticStore } from "@/store/haptic-store"
import * as Haptics from 'expo-haptics';

export const useHaptics = () =>{
    const {hapticEnabled} = useHapticStore();

    const triggerLightImpact = () =>{
        if(hapticEnabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }

    return{
        triggerLightImpact
    }
}
