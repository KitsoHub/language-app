import { appLanguages } from './../mocks/languages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from './../types/index';
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useAuthStore } from './auth-store';


interface LanguageState{
    appLanguages: Language[] ;
    isLoading: boolean;
    selectedLanguage: Language | null;
    selectLanguage: (languageId: string)=> void;
    getLanguageById: (id:string)=>Language|undefined;

}
export const useLanguageStore = create(
    persist<LanguageState>(
        (set,get)=>({
            appLanguages,
            selectedLanguage: null,
            isLoading:false,
            selectLanguage:(languageId)=>{
                const language = get().appLanguages.find((lang)=> lang.id === languageId)
                if(language){
                    set({
                        selectedLanguage:language
                    });
                // updating the users current language
                const authStore = useAuthStore.getState();
                if(authStore.user){
                    authStore.updateUser({currentLanguage: languageId})
                }
                }
            },
            getLanguageById:(id)=>{
                return get().appLanguages.find((lang) =>lang.id === id)
            }

        }),{name:'language-storage-a1', storage: createJSONStorage(()=> AsyncStorage)}
    )

)
