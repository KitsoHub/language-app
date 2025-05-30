import type { HapticPresets } from './../types/index';
import * as Haptics from 'expo-haptics';


// TODO: add for selection
export const hapticPreset: Record<HapticPresets, ()=> Promise<void>>={
    light: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
    medium:()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
    heavy:()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
    success:()=> Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
    error:()=> Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
    warning:() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
}
