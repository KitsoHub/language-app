import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router';
import BenefitItem from '@/components/shared/BenefitItem';
import { useSubscriptionStateStore } from '@/store/subscriptions-store';
import SubscriptionPlanCard from '@/components/shared/SubscriptionPlanCard';
import { COLORS, colors } from '@/utils/constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '@/utils/constants';

export default function SubscriptionPage() {

    const {plans, selectedPlanId, selectPlan, isLoading, setLoading} = useSubscriptionStateStore()
    const benefits = [
        'Personalized learning plans',
        '24/7 team support',
        'Full access to all language programs',
        'Cancel anytime'
      ];

      const handleContinue = ()=>{

        if(!selectedPlanId){
            Alert.alert("Please select a plan to continue"); return
        }

        setLoading(true);
        //Simulate API call
        setTimeout(()=>{
                setLoading(false);
                Alert.alert('Success', `Subscription selected: ${plans.find(p=> p.id === selectedPlanId)?.title} plan` )
        }, 2000)

        //redirect to sign-in

      }
  return (
 <SafeAreaView style={styles.container}>
    <Stack.Screen
    options={{
        headerShown:false,
    }}
    />
    <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Choose your Plan</Text>
            <Text style={styles.headerDescription}>One-time welcome offer</Text>
        </View>


        <View>
            {plans.map((plan, index)=>(
                <SubscriptionPlanCard
                key={`${plan.id}-${index}`}
                plan={plan}
                isSelected={selectedPlanId === plan.id}
                onSelect={()=>selectPlan(plan.id)}
                />
            ))}

        </View>

        <View>
            {benefits.map((benefit, index)=>(
                <BenefitItem key={`${benefit}-${index}`} text={benefit}/>
            ))}
        </View>

    </ScrollView>

    <View style={styles.footer}>
        <TouchableOpacity style={[styles.continueButton, isLoading && styles.continueButtonDisabled]} onPress={handleContinue} disabled={isLoading}>
            <Text style={styles.continueButtonText}>{isLoading? "PROCESSING...": 'CONTINUE'}</Text>
        </TouchableOpacity>

    <Text style={styles.termsText}>
          By continuing you accept our{'\n'}
          <Text style={styles.termsLink}>Privacy Policy</Text>, <Text style={styles.termsLink}>Terms of Use</Text> and <Text style={styles.termsLink}>Subscription Terms</Text>
        </Text>
    </View>
 </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.backgroundLight,
    },
    contentContainer:{
        padding:20
    },
    header:{
        alignItems:'center',
        marginTop: Platform.OS === 'ios' ? 60 : 40,
        marginBottom:20,
    },
    headerTitle:{
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.bold
    },
    headerDescription:{
        fontSize: FONT_SIZES.md,

    },
footer: {
  padding: 20,
  backgroundColor: '#FFFFFF',
  borderTopWidth: 1,
  borderTopColor: '#F0F0F0',
},
continueButton: {
//   backgroundColor: '#00E5C3',
backgroundColor:COLORS.colorCerulean,
  borderRadius: 28,
  paddingVertical: 16,
  alignItems: 'center',
  marginBottom: 16,
},
continueButtonDisabled: {
  opacity: 0.7,
},
continueButtonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '700',
},
termsText: {
  textAlign: 'center',
  fontSize: 12,
  color: '#999999',
  lineHeight: 18,
},
termsLink: {
  color: '#666666',
  textDecorationLine: 'underline',
},

})
