import { useAuthStore } from "@/store/auth-store";
import { ROUTES } from "@/utils/constants/routes";
import { Redirect } from "expo-router";

export default function Index(){
    const {isAuthenticated, isSubscribed, user} = useAuthStore();

    // if (!isSubscribed){
    //     return <Redirect href={ROUTES.SUBSCRIPTION as never}/>
    // }

    //user is not authenticated
    if (!isAuthenticated){
        return <Redirect href={ROUTES.SIGNIN as never}/>
    }

    //user is authenticated but no selected language
    if(isAuthenticated && user && !user.currentLanguage){
        return <Redirect href={ROUTES.LANGUAGESELECT as never}/>
    }


    //testing welcome page that redirects to select language
    return <Redirect href={ROUTES.WELCOME as never}/>
    // TODO: load the subscription page after this
    // return <Redirect href={ROUTES.TABS as never}/>
}
