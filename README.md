



### NOTES

1. App Structure:
   - Authentication (sign in/sign up screens)
   - Onboarding (language selection)
   - Home/Dashboard
   - Learning modules
   - Practice section
   - Profile/Settings
   - Gamification elements (streaks, points, achievements)

2. State Management:
   - Use Zustand for state management with AsyncStorage persistence
   - Create stores for:
     - User data and authentication
     - Learning progress
     - Selected language
     - Streaks and achievements

3. UI/UX:
   - Clean, modern design with a light theme
   - Accent colors that are engaging but not overwhelming
   - Intuitive navigation
   - Engaging animations and feedback
   - Gamification elements (badges, progress indicators)

4. Features:
   - Language selection
   - Learning modules with different types of exercises
   - Daily goals and streaks
   - Progress tracking
   - Achievements and rewards
   - Profile customization

Courses [id] => dynamic routes
    useEffect(()=>{
        const url = `${pathName}?${searchParams}`
        console.log(url)
    },[,pathName, searchParams])
    <Text>Course ID: {searchParams.get('id')}</Text>


### TODO
- re-evaluate the state {progress-storage}
- re-evaluate the Skill update and checkAchievements -> achievements page



///////babel.config.js
module.exports = {
    presets: [
'babel-preset-expo'
    ],
    plugins: [
           // Ensure consistent loose mode for class properties
           ['@babel/plugin-transform-class-properties', { loose: true }],
           ['@babel/plugin-transform-private-methods', { loose: true }],
           ['@babel/plugin-transform-private-property-in-object', { loose: true }],

           // Add transform runtime for better performance
           '@babel/plugin-transform-runtime',

           // React Native Web support
           'babel-plugin-react-native-web',

           // Module resolver for path aliases
           ['module-resolver', {
             root: ['language-app'],
             extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
             alias: {
               '@components': './components',
               '@utils': './utils'
             }
           }],
      'react-native-reanimated/plugin',
    ],
  };


///////////metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  };

  return config;
})();

/////
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@babel/plugin-transform-class-properties": "^7.23.3",
    "@babel/plugin-transform-private-methods": "^7.23.3",
    "@babel/plugin-transform-private-property-in-object": "^7.23.3",
    "@babel/plugin-transform-runtime": "^7.23.8",
    "@expo/ngrok": "^4.1.0",
    "@types/react": "~18.3.12",
    "babel-plugin-module-resolver": "^5.0.0",
    "babel-plugin-react-native-web": "^0.19.6",
    "eslint": "^8.57.0",
    "eslint-config-expo": "~8.0.1",
    "eslint-config-prettier": "^10.0.1",
    "eslint-plugin-prettier": "^5.2.3",
    "eslint-plugin-react-native": "^5.0.0",
    "prettier": "3.5.2",
    "react-native-svg-transformer": "^1.5.0",
    "typescript": "^5.3.3"
  },
