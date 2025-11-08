import { Stack } from "expo-router";
import { AuthContextProvider } from "@/context/AuthContext";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import colors from "@/assets/styles/colors";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: colors.main,
            },
            animation: "fade_from_bottom",
          }}
        >
          <Stack.Screen name="(main)" />
          <Stack.Screen name="(profile)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
