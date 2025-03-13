import { useAuthStore } from "@/store/auth-store";
import { ROUTES } from "@/utils/constants/routes";
import { Redirect } from "expo-router";

export default function Index(){
    const {isAuthenticated, user} = useAuthStore();

    //user is not authenticated
    if (!isAuthenticated){
        return <Redirect href={ROUTES.SIGNIN}/>
    }

    //user is authenticated but no selected language
    if(isAuthenticated && user && !user.currentLanguage){
        return <Redirect href={ROUTES.LANGUAGESELECT}/>
    }

    return <Redirect href={ROUTES.TABS}/>
}
