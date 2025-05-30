import { useAudioPlayer } from "@/utils/hooks/useAudioPlayer";
import { act, renderHook } from "@testing-library/react-native";
import { Audio } from "expo-av";

jest.mock("expo-av", () => {

	const mockSetOnPlaybackStatusUpdate = jest.fn();
	const mockUnloadAsync = jest.fn();
	const mockStopAsync = jest.fn();
	const mockPlayAsync = jest.fn();
	return {
		Audio: {
			Sound: {
				createAsync: jest.fn().mockResolvedValue({
					sound: {

						unloadAsync: mockUnloadAsync,
						stopAsync: mockStopAsync,
						playAsync: mockPlayAsync,
						setOnPlaybackStatusUpdate: mockSetOnPlaybackStatusUpdate,
					},
				}),
			},
			setAudioModeAsync: jest.fn(),
		},
	};
});

describe("first", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("plays audio IOS silentmode", async () => {
		const { result } = renderHook(() => useAudioPlayer());

		await act(async () => {
			await result.current.play("@/assets/audio/vowel-e.mp3");
		});

		expect(await Audio.setAudioModeAsync).toHaveBeenCalledWith({
			playsInSilentModeIOS: true,
		});
	});

	it("plays audio once", async () => {
		const { result } = renderHook(() => useAudioPlayer());

		await act(async () => {
			await result.current.play("@/assets/audio/vowel-e.mp3");
		});
		expect(await Audio.Sound.createAsync).toHaveBeenCalledTimes(1);
	});

	it("should load the correct instance of sound", async () => {
		const { result } = renderHook(() => useAudioPlayer());

		await act(async () => {
			await result.current.play("@/assets/audio/vowel-e.mp3");
		});

		const createAsyncMock = Audio.Sound.createAsync as jest.Mock;
		const soundInstance = (await createAsyncMock.mock.results[0].value).sound;
		expect(createAsyncMock).toHaveBeenCalledWith(
			"@/assets/audio/vowel-e.mp3",
			{
				shouldPlay: true,
			},
		);
		expect(soundInstance.setOnPlaybackStatusUpdate).toHaveBeenCalled();
	});
});
