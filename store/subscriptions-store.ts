import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SubscriptionPlanType } from '@/types';
import { COLORS } from '@/utils/constants/colors';


interface SubscriptionState{
    selectedPlanId: string | null;
    plans: SubscriptionPlanType[];
    selectPlan: (planId: string)=> void;
    isLoading: boolean;
    setLoading:(loading: boolean)=>void;
}


export const useSubscriptionStateStore = create(
    persist<SubscriptionState>(

        ((set)=>({
            selectedPlanId: null,
            isLoading: false,

            plans:[
                {
                    id: '12-week',
                    title: '12-Week Plan',
                    subtitle: 'US$17.89 / 12-week',
                    pricePerWeek: 'US$1.49',
                    badge: 'BEST VALUE',
                    badgeColor: '#00C853',
                  },
                  {
                    id: 'trial',
                    title: '7-Days',
                    subtitle: 'then US$52.74 / half-year',
                    pricePerWeek: 'US$2.20',
                    badge: 'WEEK',
                    badgeColor: '#FF6B6B',
                  },
                  {
                    id: 'lifetime',
                    title: 'Lifetime Access',
                    subtitle: 'One time payment of US$139.23',
                    pricePerWeek: 'US$0.27',
                    badge: 'LIFETIME',
                    badgeColor: COLORS.colorAppleGreen,
                  },
                  {
                    id: 'demo',
                    title: 'Demo Access',
                    subtitle: 'Demo Account with limited access',
                    pricePerWeek: 'US$0',
                    badge: 'DEMO',
                    badgeColor: COLORS.colorCerulean,
                  },
            ],
            selectPlan:(planId: string)=>set({selectedPlanId: planId}),
            setLoading:(loading: boolean)=>set({isLoading:loading})


        })), {name:'subscription-storage-a2', storage: createJSONStorage(()=> AsyncStorage)}
    )
)
