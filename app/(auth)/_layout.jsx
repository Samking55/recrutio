import { Stack } from "expo-router";
import colors from "../../assets/styles/colors";
import Entypo from "@expo/vector-icons/Entypo";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerBackVisible: false,
        headerTintColor: colors.main
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Connexion",
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: "Inscription",
        }}
      />
    </Stack>
  );
}
