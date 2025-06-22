import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Feather, House, Gamepad2, User, Settings, UserCircle, SettingsIcon, HousePlugIcon, LucideHouse, Flame } from 'lucide-react-native';
import { JSX } from 'react/jsx-runtime';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    // { changed code } Hide tabbar when on settings screen
    if (state.routes[state.index].name === "settings") {
        return null;
    }
    if (state.routes[state.index].name === "games") {
        return null;
    }
    if (state.routes[state.index].name === "profile") {
        return null;
    }

    const primarycolor = 'black'; // You can change this to your desired primary color
    const secondarycolor = 'black'; // You can change this to your desired secondary color

    const icons = {
        index: (props) => <LucideHouse {...props} size={27} />,
        games: (props) => <Flame {...props} size={27} />,
        profile: (props) => <UserCircle {...props} size={27} />,
        settings: (props) => <SettingsIcon {...props} size={27} />,
    };

    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.name}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={[
                            styles.tabBarItem,
                            isFocused && styles.focusedTabBarItem, // Apply focused style
                        ]}
                    >
                        <View
                            style={[
                                styles.iconContainer,
                                isFocused && styles.focusedIconContainer, // Apply scaling effect
                            ]}
                        >
                    {
                            icons[route.name as keyof typeof icons]({
                                color: isFocused? primarycolor : secondarycolor,
                            })
                        }
                        
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#f3f3f3',
        borderRadius: 25,
        elevation: 5, // Android shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowRadius: 15,
        shadowOpacity: 0.15,
    },
    tabBarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    focusedTabBarItem: {
        transform: [{ scale: 1 }], // Slightly enlarge the item when focused
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    focusedIconContainer: {
        transform: [{ scale: 1.3 }], // Elevate the icon when focused
        color: '#0891b2', // Change color when focused
    },
});

export default TabBar;