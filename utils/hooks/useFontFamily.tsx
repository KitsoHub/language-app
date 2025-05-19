import { useFonts } from "expo-font";
import { FONT_FAMILY } from "../constants";
import { useEffect } from "react";

export const useLoadedFonts = () => {
    const [fontsLoaded,error] = useFonts({
         [FONT_FAMILY.regular]: require("@/assets/fonts/ADLaMDisplay-Regular.ttf"),
    });
  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);


    return fontsLoaded;

}
