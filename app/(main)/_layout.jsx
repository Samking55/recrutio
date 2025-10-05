import { router, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import colors from "@/assets/styles/colors";

function MainTabs() {
  // redirect function to profile page
  const toProfile = () => {
    router.push("/(profile)");
  };

  return (
    <Tabs
      screenOptions={{
        title: "Recrutio",
        headerStyle: {
          elevation: 0,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "bold",
          color: colors.main,
        },
        headerRight: () => (
          <View
            style={{
              marginHorizontal: 15,
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Ionicons
              name="person-outline"
              size={22}
              color="black"
              onPress={toProfile}
            />
            <Ionicons name="notifications-outline" size={22} color="black" />
          </View>
        ),
        tabBarStyle: {
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              size={26}
              color={focused && colors.main}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="find-resume"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="list-outline"
              size={26}
              color={focused && colors.main}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default MainTabs;
