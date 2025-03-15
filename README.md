



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
