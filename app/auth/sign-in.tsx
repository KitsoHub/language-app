
import { useAuthStore } from "@/store/auth-store";
import { colors, COLORS } from "@/utils/constants/colors";
import { ROUTES } from "@/utils/constants/routes";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity, } from "react-native";
import { Mail, Lock, ArrowRight, User } from 'lucide-react-native';
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useHaptics } from "@/utils/hooks/useHaptics";
import { supabase } from "@/utils/supabase";

export default function SignInScreen() {
    const router = useRouter();
    const { isLoading, login } = useAuthStore();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    const { triggerHaptic} = useHaptics();

    const validateForm = () => {
        let isValid = true;
        const newErrors = { username: '', email: '', password: '' };

        
        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };


    const handleSignIn = async () => {
        // validate form
       setLoading(true)
       try{
        triggerHaptic('success');
        await login(email,password);
        router.replace(ROUTES.TABS)
       }
       catch (error: any) {Alert.alert('sign in failed',error.message)

       }
  
    }
    async function handleSignUp() {
        setLoading(true)
        const{
            data: {session},
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        if (error) Alert.alert(error.message)
            if(!session) Alert.alert('please check your inbox for email verfication!')
                setLoading(false)
        
    }


    // TODO: Remove on production branch
    const handleDemoLogin = () =>{
        console.log(" >> Activating Demo ACC >> ")
        let demoEmail = '';
        demoEmail = "testuser@example.com"
        triggerHaptic('success')
        setUsername("Tswa Lingo")
        setEmail(demoEmail);
        setPassword('password');
    }
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS ? "padding" : "height"}
            >

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollContent}
                >
                    <View style={styles.header}>
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>
                            Sign in to continue your language learning journey
                        </Text>
                    </View>

                    <View style={styles.form}>
           
            <Input
              label="Email Address"
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Mail size={20} color={COLORS.gray500} />}
              value={email}
              onChangeText={setEmail}
              error={errors.email}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              leftIcon={<Lock size={20} color={COLORS.gray500} />}
              value={password}
              onChangeText={setPassword}
              error={errors.password}
            />

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* sign in */}
            <Button
              title="Sign In"
              onPress={handleSignIn}
              isLoading={isLoading}
              style={styles.signInButton}
            />
          </View>

          {/* sign up */}

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          {/* third party */}
          <View style={styles.socialSignIn}>
            <Text style={styles.socialSignInText}>Or sign in with</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>

              {/* TODO: Remove on production */}
              <TouchableOpacity style={styles.socialButton} onPress={handleDemoLogin}>
                <Text style={styles.demoButtonText}>Demo</Text>
              </TouchableOpacity>
            </View>
          </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
    },
    header: {
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textLight,
    },
    form: {
        marginBottom: 24,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: COLORS.primary,
    },
    signInButton: {
        marginBottom: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 32,
    },
    footerText: {
        fontSize: 14,
        color: COLORS.textLight,
        marginRight: 4,
    },
    signUpText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primary,
    },
    socialSignIn: {
        marginTop: 'auto',
    },
    socialSignInText: {
        fontSize: 14,
        color: COLORS.textLight,
        textAlign: 'center',
        marginBottom: 16,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    socialButton: {
        flex: 1,
        backgroundColor: COLORS.gray100,
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        marginHorizontal: 8,
        borderWidth: 1,
        borderColor: COLORS.gray200,
    },
    socialButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.text,
    },

    demoButtonText:{
        color:colors.secondary,
        fontWeight:'500'
    }
});
