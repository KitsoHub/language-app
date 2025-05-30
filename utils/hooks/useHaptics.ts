import { useHapticStore } from "@/store/haptic-store"
import type { HapticPresets } from "@/types";
import * as Haptics from 'expo-haptics';
import { hapticPreset } from "../hapticPresets";

export const useHaptics = () =>{
    const {hapticEnabled} = useHapticStore();

    // const triggerLightImpact = () =>{
    //     if(hapticEnabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    // }

    const triggerHaptic = (preset: HapticPresets)=>{
        if(hapticEnabled){
            hapticPreset[preset]();
        }
    };

    return{
        triggerHaptic,
    };
}
