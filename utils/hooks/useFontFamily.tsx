import { useFonts } from "expo-font";
import { FONT_FAMILY } from "../constants";

export const useLoadedFonts = () => {
    const [fontsLoaded] = useFonts({
         [FONT_FAMILY.regular]: require("@/assets/fonts/ADLaMDisplay-Regular.ttf"),
    });

    return fontsLoaded;

}
