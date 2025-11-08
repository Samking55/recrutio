import { Stack } from "expo-router";
import colors from "../../assets/styles/colors";
import Entypo from "@expo/vector-icons/Entypo";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerBackVisible: false,
        headerTintColor: colors.main,
        headerShown: false,
        animation: "fade_from_bottom",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
