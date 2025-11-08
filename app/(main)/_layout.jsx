import { router, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import colors from "@/assets/styles/colors";
import { House, FileText, Bell, UserRound, Hammer } from "lucide-react-native";



function MainTabs() {
  // redirect function to profile page
  const toProfile = () => {
    router.push("/(profile)");
  };

  const toNotifications = () => {};

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        animation: "shift",
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
            <UserRound onPress={toProfile} size={22} />
            <Bell onPress={toNotifications} size={22} />
          </View>
        ),
        tabBarStyle: {
          elevation: 0,
          marginHorizontal: 30,
          marginTop: -30,
          paddingTop: 5,
          backgroundColor: "white",
          borderTopWidth: 0,
          borderRadius: 100,
          bottom: 40,
          height: 55,
          display: "flex",
        },
        tabBarShowLabel: false,
      }}
    >
      {/* find resume screen */}
      <Tabs.Screen
        name="find-resume"
        options={{
          tabBarIcon: ({ focused }) => (
            <FileText color={focused ? colors.main : "black"} />
          ),
        }}
      />
      {/* center home button */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <House color={focused ? colors.white : "black"} />
          ),
          tabBarIconStyle: {
            backgroundColor: colors.main,
            height: 50,
            width: 50,
            borderRadius: 100,
            bottom: 15,
            elevation: 8,
          },
        }}
      />

      {/* screen builder */}
      <Tabs.Screen
        name="resume-builder"
        options={{
          tabBarIcon: ({ focused }) => (
            <Hammer color={focused ? colors.main : "black"} />
          ),
        }}
      />
    </Tabs>
  );
}

export default MainTabs;
