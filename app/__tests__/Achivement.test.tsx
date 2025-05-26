import { Redirect, useRouter } from "expo-router";
import { ROUTES } from "@/utils/constants/routes";
import { act, fireEvent, render } from "@testing-library/react-native";

import ProfilePage from "../(tabs)/profile";
import { useNewGameStore } from "@/store/game/new-game-store";
import { useAuthStore } from "@/store/auth-store";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { BORDER_RADIUS } from "@/utils/constants";
import { useAchievementsStore } from "@/store/achivement-store";
import { achievements as mockAchievements } from "@/mocks/achievements";
import AchivementList from "@/components/shared/AchivementList";

jest.mock("expo-router", () => {
	const React = require("react");
	const { Text } = require("react-native");
	return {
		useRouter: jest.fn(),
		Redirect: ({ href }: { href: string }) => <Text>Redirect to {href}</Text>,
	};
});


jest.mock('@/store/auth-store', () => ({
  useAuthStore: jest.fn(() => ({
    user: { id: '123', name: 'Test User' },
    updateUser: jest.fn(),
  })),
}));

jest.mock("@/store/achivement-store",()=>({
    useAchievementsStore: jest.fn(),
  }));


const mockPush = jest.fn();
const mockedUseRouter = useRouter as jest.Mock;
//const mockedUseAchivementStore = useAchievementsStore as unknown as jest.Mock;

describe('Achievements Component', () => {
    const mockedUseAchivementStore = useAchievementsStore as unknown as jest.Mock;
    beforeEach(() => {
        jest.clearAllMocks();
	});
  it('renders no achievements from the Zustand store', () => {
    mockedUseAchivementStore.mockReturnValue({ achievements:[]});

    const { getByText } = render(<AchivementList />);

    expect(
			getByText("Oops..Achivements not loaded try again later."),
		).toBeTruthy();
  });

    it('renders all achievements from the Zustand store', () => {
    mockedUseAchivementStore.mockReturnValue({ achievements:[...mockAchievements]});

    const { getByText } = render(<AchivementList />);

    //const screen =render(<AchivementList />);

    //screen.debug();
    //console.log('Achievements:', mockedUseAchivementStore);
    // biome-ignore lint/complexity/noForEach: <explanation>
                mockAchievements.forEach((achievement) => {
    //const el = getByText(achievement.title);
    //console.log(`Rendered: ${el?.props?.children}`);
      expect(getByText(achievement.title)).toBeTruthy();
    });

    // mockAchievements.forEach((achievement) => {
    //   const el = getByText(achievement.title);
    //   console.log(`Rendered: ${el?.props?.children}`);
    // });

  });

//   it('opens modal with correct data when card is clicked', () => {
//     // Simulate press and check modal
//   });

//   it('modal closes when close button is pressed', () => {
//     // Check if modal is dismissed
//   });
});
