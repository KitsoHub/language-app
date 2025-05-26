export const COLORS = {
  primary: '#4A6FA5',
  primarySecond: '#FF7E54',
  primaryDark: '#2C4770',
  primaryLight: '#7B9ED9',
  secondary: '#F9A826',
  secondaryDark: '#D98014',
  secondaryLight: '#FFC66D',
  background: '#F5F7FA',
  backgroundLight: '#F8F9FA',
  white: '#FFFFFF',
  pale:"#F0F4FF",
  black: '#000000',
  text: '#333333',
  textLight: '#666666',
  textMuted: '#999999',
  textExtraLight: '#999999',
  border: '#E1E1E1',
  error: '#FF5252',
  dangerLight: "#FF8A8A", // Light Red
  success: '#4CAF50',
  warning: '#FFC107',
  warningLight: "#FFD699", // Light Orange
  info: '#2196F3',
  inactive: '#CCCCCC',
  shadow: 'rgba(0, 0, 0, 0.1)',
  gray100: '#F8F9FA',
  gray200: '#E9ECEF',
  gray300: '#DEE2E6',
  gray400: '#CED4DA',
  gray500: '#ADB5BD',
  gray600: '#6C757D',
  gray700: '#495057',
  gray800: '#343A40',
  gray900: '#212529',
  green: '#3CA685',
  textOrange: '#FF7E54',
  orange:'#FF9E00',
  colorCerulean: '#1a759f',
  colorWhite: '#fff',
  colorBlack: '#000',
  colorGrey: 'grey',
  colorRed: 'red',
  colorLightGrey: '#eee',
  colorGreen: '#29b365',
  colorOrage: '#FA4A0C',
  colorAppleGreen: '#a0d36c',
  colorLimeGreen: '#d0e57e',
  colorOrageLight: '#FA4A0C',
  yellow: '#FFDE00', // Bright yellow
  tertiary: '#4ECDC4', // Teal
  tertiaryLight: '#8EEAE4', // Light Teal
  tertiaryDark: '#2A9D95', // Dark Teal
  quaternary: '#7B61FF', // Purple
  quaternaryLight: '#B4A5FF', // Light Purple
  quaternaryDark: '#5840CC', // Dark Purple
  primaryPink: '#FF3A89', // Hot pink
  purpleBackground: '#5A30F0', // Purple background
  cyanBlue: '#00C8E1', // Cyan blue
  darkBlue:'#1F33CE', // dark blue
  darkBackground: '#3A1D9E', // Darker purple
  successLight: "#B5F2BA", // Light Green
  greenTint: '#E3FFF1',
  greenDark: '#006400',
  greenCool: '#7AE582',
  cyanDark:"#003E3E",
  greenSpring: '#C1FFE3',
  blueTint: '#C1D9FF',
  blueTintLight:'#E3EEFF',
  bluePale:'#F0F4FF',
  pink:'#FFC1E3',
  pinkPale:'#FFE3F1',
  yellowDark:'#664500',
};

export const colors = {
  primary: '#3BB873',
  primaryLight: '#E8F7F0',
  secondary: '#FF9F43',
  secondaryLight: '#FFF5E9',
  text: '#333333',
  textLight: '#666666',
  textMuted: '#999999',
  background: '#FFFFFF',
  backgroundLight: '#F8F9FA',
  border: '#E5E7EB',
  error: '#FF5252',
  success: '#4CAF50',
  info: '#2196F3',
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#F8F9FA',
  gray200: '#E9ECEF',
  gray300: '#DEE2E6',
  gray400: '#CED4DA',
  gray500: '#ADB5BD',
  gray600: '#6C757D',
  gray700: '#495057',
  gray800: '#343A40',
  gray900: '#212529',
  cardBackground: '#F7F7F7',
  mascotBackground: '#FFF4D4',
};


// Game difficulty color schemes
export const DIFFICULTY_COLORS = {
	beginner: {
		primary: COLORS.tertiary,
		secondary: COLORS.tertiaryLight,
		text: COLORS.cyanDark,
		gradient: [COLORS.tertiaryLight, COLORS.tertiary] as const,
	},
	easy: {
		primary: COLORS.success,
		secondary: COLORS.successLight,
		text: COLORS.greenDark,
		gradient: [COLORS.successLight, COLORS.greenCool] as const,
	},
	medium: {
		primary: COLORS.warning,
		secondary: COLORS.warningLight,
		text: COLORS.yellowDark,
		gradient: [COLORS.warningLight, COLORS.orange] as const,
	},
	hard: {
		primary: COLORS.error,
		secondary: COLORS.dangerLight,
		text: COLORS.white,
		gradient: [COLORS.dangerLight, COLORS.error] as const,
	},
};
