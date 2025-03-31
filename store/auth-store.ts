import { User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    // selectedRole: UserRole | null;

    //actions
    logout: () => void;
    clearError: () => void;
    login: (email: string, password: string) => Promise<void>;
    // register: (userData: Partial<User>, password: string) => Promise<void>;
    updateUser:(userData: Partial<User>)=>void;
    // setSelectedRole: (role: UserRole | null) => void;
    // setUserRole: (role: UserRole | null) => void;
    // setUser: (user: User | null) => void;
}


export const useAuthStore = create(
    persist<AuthState>(

        ((set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            login: async (email, password) => {
                await new Promise(resolve => setTimeout(resolve, 1000));
                try {
                    if (email && password) {

                        //set mock
                        const mockUser: User = {
                            id: "1",
                            name: 'Paul Doe',
                            email,
                            currentLanguage: 'st',
                            streak: 0,
                            xp: 0,
                            level: 1,
                            joinedAt: new Date().toISOString()
                        }

                        set({ user: mockUser, isAuthenticated: true, isLoading: false })
                    } else {
                        set({ isLoading: false })
                        throw new Error('Invalid credentials')
                    }
                    // set mock

                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : "Login error",
                        isLoading: false,
                    });

                }

            },
            logout: () => {
                set({ user: null, isAuthenticated: false })
            },
            updateUser:(userData)=>{
                set((state)=>({
                    user: state.user ? {...state.user, ...userData}: null,
                }));

            },
            clearError: () => {
                set({ error: null })
            }
        })), { name: "auth-storage-a1", storage: createJSONStorage(() => AsyncStorage) }
    )
)
