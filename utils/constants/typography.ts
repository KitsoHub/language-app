import type { TextStyle } from "react-native"

export const FONT_SIZES = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  }

export const FONT_WEIGHTS: { [key: string]: TextStyle["fontWeight"] } = {
    regular: "normal",
    medium: "500",
    bold: "bold",
  }

  export const FONT_FAMILY = {
    regular: "ADLaMDisplay-Regular",
    medium: "ADLaMDisplay-Medium",
    bold: "ADLaMDisplay-Bold",
    light: "ADLaMDisplay-Light",
  }
