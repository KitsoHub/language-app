import { act, renderHook } from '@testing-library/react-native';
import { useHaptics } from '../hooks/useHaptics';
import * as Haptics from 'expo-haptics';
import { useHapticStore } from '@/store/haptic-store';
import { HapticPresets } from '@/types';
jest.mock('expo-haptics', () => (
  {
    impactAsync: jest.fn(),
 notificationAsync: jest.fn(),
ImpactFeedbackStyle: {
  Medium: "medium",
   Light: "light",
},
 NotificationFeedbackType:{
  Success: "success",
}

  }
));

jest.mock('@/store/haptic-store', () => {
  const create = require('zustand').create || require('zustand').default;
  const store = create(() => ({
    hapticEnabled: true,
    setHapticEnabled: (val: boolean) => store.setState({ hapticEnabled: val }),
  }));
  return {
    useHapticStore: store,
  };
});



describe('Haptics test', () => {
  beforeEach(() => {
    useHapticStore.setState({ hapticEnabled: true });
    jest.clearAllMocks();
  });
  const impactPresets: [string, Haptics.ImpactFeedbackStyle][] = [
    ['light', Haptics.ImpactFeedbackStyle.Light],
    ['medium', Haptics.ImpactFeedbackStyle.Medium],
    ['heavy', Haptics.ImpactFeedbackStyle.Heavy],
  ];

    const notificationPresets: [string, Haptics.NotificationFeedbackType][] = [
    ['success', Haptics.NotificationFeedbackType.Success],
    ['error', Haptics.NotificationFeedbackType.Error],
    ['warning', Haptics.NotificationFeedbackType.Warning],
  ];



  it('should not trigger light impact when disabled', async () => {
    useHapticStore.getState().setHapticEnabled(false);
    const { result } = renderHook(() => useHaptics());

    await act(async () => {
      await result.current.triggerHaptic('light');
      await result.current.triggerHaptic('success');
    });
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
  });

  // it('should trigger light haptic feedback', async () => {
  //   const { result } = renderHook(() => useHaptics());

  //   await act(async () => {
  //     await result.current.triggerHaptic('light');

  //   });
  //   expect(Haptics.impactAsync).toHaveBeenCalledWith(
  //     Haptics.ImpactFeedbackStyle.Light,
  //   );
  // });

  it.each(impactPresets)('Should trigger %s impact haptic feedback when enabled',
    async (preset, style) => {
      const {result } = renderHook(()=> useHaptics());
      await act(async()=>{
        await result.current.triggerHaptic(preset as HapticPresets);
      });

      expect(Haptics.impactAsync).toHaveBeenCalledWith(style)

    }
  );

    it.each(notificationPresets)('Should trigger %s notification haptic feedback when enabled',
    async (preset, style) => {
      const {result } = renderHook(()=> useHaptics());
      await act(async()=>{
        await result.current.triggerHaptic(preset as HapticPresets);
      });

      expect(Haptics.impactAsync).toHaveBeenCalledWith(style)

    }
  )
});
