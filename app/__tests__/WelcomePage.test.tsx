import { Redirect, useRouter } from "expo-router";
import { ROUTES } from "@/utils/constants/routes";
import { act, fireEvent, render } from "@testing-library/react-native";
import { Text } from "react-native";

import WelcomePage from "@/app/welcome";
jest.mock("expo-router", () => {
      const React = require('react');
  const { Text } = require('react-native');
	return{useRouter: jest.fn(),
	Redirect: ({ href }: { href: string }) => <Text>Redirect to {href}</Text>,}
});

// Mock the router
// const mockRedirect = jest.fn();
// const mockReplace = jest.fn();

// jest.mock('expo-router', () => ({
//   useRouter: () => ({
//     replace: mockReplace,
//   }),
//   Redirect: (props: { href: never; }) => {
//     mockRedirect(props.href);
//     return null;
//   },
// }));


// Set up fake timers
jest.useFakeTimers();
describe("Welcome Page", () => {

      let mockReplace: jest.Mock;
  const mockedUseRouter = useRouter as jest.Mock;
	beforeEach(() => {
            jest.useFakeTimers();
    mockReplace = jest.fn();
        mockedUseRouter.mockReturnValue({ replace: mockReplace });
		// jest.clearAllMocks();
	});

	//on the welcome page
	// it("matches snapshot", () => {
	// 	const tree = render(<WelcomePage />).toJSON();
	// 	expect(tree).toMatchSnapshot();
	// });

	// text
	// it("Return start button text ", () => {
	// 	const { getByText } = render(<WelcomePage />);
	// 	expect(getByText("Start")).toBeTruthy();
	// });
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

	//navigation
	it("navigates to auth screen when START button is pressed (nonauth user)", () => {

        const { getByText } = render(<WelcomePage />);


		// Advance timers
		act(() => {
            fireEvent.press(getByText("Start"));
			jest.advanceTimersByTime(300);
		});

         expect(mockReplace).toHaveBeenCalledWith(ROUTES.SIGNIN);
	});
});
