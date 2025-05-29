import { act, renderHook } from '@testing-library/react-native';
import { useHaptics } from '../hooks/useHaptics';
import * as Haptics from 'expo-haptics';
import { create } from 'zustand';
import { useHapticStore } from '@/store/haptic-store';
jest.mock('expo-haptics', () => require('@/mocks/expo-haptics'));

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

  it('should not trigger light impact when disabled', async () => {
    useHapticStore.getState().setHapticEnabled(false);
    const { result } = renderHook(() => useHaptics());

    await act(async () => {
      await result.current.triggerLightImpact();
    });
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
  });

  it('should trigger light haptic feedback', async () => {
    const { result } = renderHook(() => useHaptics());

    await act(async () => {
      await result.current.triggerLightImpact();
    });
    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Light,
    );
  });
});
