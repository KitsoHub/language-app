import { Redirect, useRouter } from "expo-router";
import { ROUTES } from "@/utils/constants/routes";
import { act, fireEvent, render } from "@testing-library/react-native";

import GamesList from "@/app/games-list";
import { useNewGameStore } from "@/store/game/new-game-store";

import { BORDER_RADIUS } from "@/utils/constants";

jest.mock("expo-router", () => {
	const React = require("react");
	const { Text } = require("react-native");
	return {
		useRouter: jest.fn(),
		Redirect: ({ href }: { href: string }) => <Text>Redirect to {href}</Text>,
	};
});

jest.mock("@/store/game/new-game-store", () => ({
	useNewGameStore: jest.fn(),
}));

const mockPush = jest.fn();
const mockSelectGame = jest.fn();
const mockedUseRouter = useRouter as jest.Mock;
const mockedUseNewGameStore = useNewGameStore as unknown as jest.Mock;

describe("Games List Page", () => {
	const mockPush = jest.fn();
	const mockedUseRouter = useRouter as jest.Mock;
	const mockedUseNewGameStore = useNewGameStore as unknown as jest.Mock;
	beforeEach(() => {
		jest.clearAllMocks();
		mockedUseRouter.mockReturnValue({ push: mockPush });
	});

	it("renders empty state when there are no games", () => {
		mockedUseNewGameStore.mockReturnValue({ games: [], selectGame: jest.fn() });
		const { getByText } = render(<GamesList />);

		expect(
			getByText("No available games. Please select a different language."),
		).toBeTruthy();
	});

	it("renders a list of game items when games exist", () => {
		const sampleGames = [
			{ id: "words", gameIcon: "🔤", title: "Words Game" },
			{ id: "pictures", gameIcon: "🎮", title: "Picture Game" },
		];
		mockedUseNewGameStore.mockReturnValue({
			games: sampleGames,
			selectGame: jest.fn(),
		});

		const { getAllByText } = render(<GamesList />);

		expect(getAllByText("🔤").length).toBe(1);
		expect(getAllByText("🎮").length).toBe(1);
	});

	it("Matches snapshot when populated", () => {
		const sampleGame = [{ id: "words", gameIcon: "🔤", title: "Words Game" }];
		mockedUseNewGameStore.mockReturnValue({
			games: sampleGame,
			selectGame: jest.fn(),
		});
		const tree = render(<GamesList />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("selects and navigates to game screen on select game", () => {
		const sampleGame = [
			{ id: "word-matching", gameIcon: "🔤", title: "Words Game" },
		];
		const mockSelectGame = jest.fn();
		mockedUseNewGameStore.mockReturnValue({
			games: sampleGame,
			selectGame: mockSelectGame,
		});

		const { getByText } = render(<GamesList />);
		fireEvent.press(getByText("🔤"));

		expect(mockSelectGame).toHaveBeenCalledWith("word-matching");
		expect(mockPush).toHaveBeenCalledWith(ROUTES.GAMES as never);
	});
});

describe("Component Behaviour", () => {
	it("uses Flatlist for rendered games when available", () => {

		const sampleGame = { id: "words", gameIcon: "🔤", title: "Words Game" };
		mockedUseNewGameStore.mockReturnValue({games:[sampleGame], selectGame: mockSelectGame});
        const {getByTestId} = render(<GamesList/>)
       expect(getByTestId('games-list')).toBeTruthy();
	});
});

describe('UI Elements', () => {

    it("correct style for games card pressables",()=>{
        const sampleGame = { id: "words", gameIcon: "🔤", title: "Words Game" };
		mockedUseNewGameStore.mockReturnValue({games:[sampleGame], selectGame: mockSelectGame});
        const {getByTestId, queryAllByTestId} = render(<GamesList/>)

        expect(queryAllByTestId('games-list').length).toBe(1);

        const card = getByTestId('game-card');
        const style = card.props.style;
        expect(style).toEqual(expect.arrayContaining([
            expect.objectContaining({borderRadius: BORDER_RADIUS.xxl}),
            expect.objectContaining({overflow:"hidden"})
        ]))
    })

})
