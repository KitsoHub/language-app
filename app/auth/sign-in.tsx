import { useAuthStore } from "@/store/auth-store";
import { colors, COLORS } from "@/utils/constants/colors";
import { ROUTES } from "@/utils/constants/routes";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Mail, Lock, User } from "lucide-react-native";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useHaptics } from "@/utils/hooks/useHaptics";
import { supabase } from "@/lib/supabase";

export default function SignInScreen() {
  const router = useRouter();
  const { isLoading, login, register, error, clearError } = useAuthStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState({ username: "", email: "", password: "" });
  const { triggerHaptic } = useHaptics();

  const handleInputChange = (field: keyof typeof errors, value: string) => {
    const setters = {
      username: setUsername,
      email: setEmail,
      password: setPassword,
    };
    setters[field](value);

    const newErrors = { ...errors };
    if (field === "username") {
      newErrors.username = value ? "" : "Username is required";
    } else if (field === "email") {
      newErrors.email = value
        ? /\S+@\S+\.\S+/.test(value)
          ? ""
          : "Email is invalid"
        : "Email is required";
    } else if (field === "password") {
      newErrors.password = value
        ? value.length < 6
          ? "Password must be at least 6 characters"
          : ""
        : "Password is required";
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = { username: "", email: "", password: "" };
    let isValid = true;

    if (!username) {
      newErrors.username = "Username is required";
      isValid = false;
    }
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAuth = async () => {
    if (!validateForm()) {
      triggerHaptic("error");
      return;
    }
    try {
      clearError();
      triggerHaptic("success");
      if (isSignUp) {
        await register(username, email, password);
        if (useAuthStore.getState().error) {
          Alert.alert("Sign Up Failed", useAuthStore.getState().error || "Unknown error");
          return;
        }
        Alert.alert("Success", "Please check your inbox for email verification!");
        setIsSignUp(false); // Switch back to sign-in after successful sign-up
      } else {
        await login(username, email, password);
        const { user, error: loginError } = useAuthStore.getState();
        if (loginError || !user) {
          Alert.alert("Sign In Failed", loginError || "Invalid credentials or email not verified.");
          return;
        }
        const route = user?.language ? ROUTES.TABS : ROUTES.LANGUAGESELECT;
        router.replace(route);
      }
    } catch (error) {
      // Error handled in store
      Alert.alert("Authentication Error", error?.message || "An error occurred.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrors({ ...errors, email: "Please enter your email first" });
      return;
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'YOUR_APP_RESET_PASSWORD_URL', // Replace with your app's reset password URL
      });
      if (error) throw error;
      triggerHaptic("success");
      Alert.alert("Success", "Password reset email sent!");
    } catch (error: any) {
      setErrors({ ...errors, email: error.message || "Failed to send reset email" });
    }
  };

  const handleDemoLogin = () => {
    if (process.env.NODE_ENV !== "development") return;
    console.log(" >> Activating Demo ACC >> ");
    triggerHaptic("success");
    setUsername("Tswa Lingo");
    setEmail("testuser@example.com");
    setPassword("password");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{isSignUp ? "Create Account" : "Welcome Back"}</Text>
            <Text style={styles.subtitle}>
              {isSignUp
                ? "Sign up to start your language learning journey"
                : "Sign in to continue your language learning journey"}
            </Text>
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.form}>
            <Input
              label="Username"
              placeholder="Enter your username"
              keyboardType="default"
              autoCapitalize="none"
              leftIcon={<User size={20} color={COLORS.gray500} />}
              value={username}
              onChangeText={(value) => handleInputChange("username", value)}
              error={errors.username}
              accessibilityLabel="Username input"
            />
            <Input
              label="Email Address"
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Mail size={20} color={COLORS.gray500} />}
              value={email}
              onChangeText={(value) => handleInputChange("email", value)}
              error={errors.email}
              accessibilityLabel="Email input"
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              leftIcon={<Lock size={20} color={COLORS.gray500} />}
              value={password}
              onChangeText={(value) => handleInputChange("password", value)}
              error={errors.password}
              accessibilityLabel="Password input"
            />

            {!isSignUp && (
              <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <Button
              title={isSignUp ? "Sign Up" : "Sign In"}
              onPress={handleAuth}
              isLoading={isLoading}
              style={styles.signInButton}
              accessibilityLabel={isSignUp ? "Sign up button" : "Sign in button"}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </Text>
            <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
              <Text style={styles.signUpText}>{isSignUp ? "Sign In" : "Sign Up"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.socialSignIn}>
            <Text style={styles.socialSignInText}>Or continue with</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>
              {process.env.NODE_ENV === "development" && (
                <TouchableOpacity style={styles.socialButton} onPress={handleDemoLogin}>
                  <Text style={styles.demoButtonText}>Demo</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  demoButtonText: {
    color: colors.secondary,
    fontWeight: '500',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
});