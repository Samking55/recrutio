import { Tabs } from "expo-router";
import colors from "../../assets/styles/colors";
import { usePreventScreenCapture } from 'expo-screen-capture';

function ProfileTabs() {
  usePreventScreenCapture();
  return (
    <Tabs
      screenOptions={{
        title: "Profil",
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "bold",
          color: colors.main,
        },
        headerShadowVisible: false,
        headerStyle: {
          elevation: 0,
        },
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Tabs.Screen name="index" />
    </Tabs>
  );
}

export default ProfileTabs;
