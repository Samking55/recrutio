import { Stack } from "expo-router";
import { AuthContextProvider } from "@/context/AuthContext";

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(main)" />
        <Stack.Screen name="(profile)" />
      </Stack>
    </AuthContextProvider>
  );
}
