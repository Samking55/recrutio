import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import colors from "@/assets/styles/colors";
import defaultStyle from "@/assets/styles/default";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import AuthContext from "@/context/AuthContext";
import { useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import AuthApi from "../../api/authapi";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader";

function ProfileOptions() {
  const options = [
    {
      id: 1,
      label: "Mes informations personnelles",
      url: "/(profile)/personnal-info",
    },
    {
      id: 2,
      label: "Mes informations professionnelles",
      url: "/(profile)/job-info",
    },
    {
      id: 3,
      label: "Mes demandes d'emploi",
      url: "/(profile)/job-application",
    },
    {
      id: 4,
      label: "Mon CV",
      url: "/(profile)/job-info",
    },
    {
      id: 5,
      label: "Mes recruteurs",
      url: "/(profile)/job-info",
    },
  ];
  return (
    <View
      style={{
        backgroundColor: colors.white,
        padding: 13,
        borderRadius: 10,
        marginTop: 30,
      }}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={{
            marginVertical: 3,
            paddingVertical: 9,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
          onPress={() => router.navigate(option.url)}
        >
          <Text style={{ fontWeight: "400" }}> {option.label} </Text>
          <Entypo name="chevron-right" size={20} color="black" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

function ProfileScreen() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuth) {
      router.replace("/(auth)");
    }
  }, [isAuth]);

  // check if user logged in
  useEffect(() => {
    AuthApi.isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  });

  // get user info
  const {
    data: userInfo,
    isPending: userInfoPending,
    isError: userInfoIsError,
    error: UserInfoError,
  } = useQuery({
    queryKey: ["UserInfo"],
    queryFn: () => AuthApi.userInfo(),
    enabled: isAuth,
  });

  if (userInfoIsError && UserInfoError?.status_code == 401) {
    AuthApi.deleteToken().then(() => {
      setIsAuth(false);
    });
  }
  
  if (userInfoPending) return <Loader />;
  return (
    <View style={defaultStyle.container}>
      {/* display card for default user info */}
      <View
        style={{
          backgroundColor: colors.white,
          padding: 15,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 10,
          }}
        >
          Mon profil
        </Text>
        {/* profile pic container  */}
        <View
          style={{
            height: 90,
            width: 90,
            borderRadius: 100,
          }}
        >
          <Image
            src="https://images.pexels.com/photos/31110329/pexels-photo-31110329.jpeg?_gl=1*1rinhxh*_ga*MTUyMDM0NzgwNC4xNzU3NDU2OTQx*_ga_8JE65Q40S6*czE3NTk2MDg0NjMkbzEzJGcxJHQxNzU5NjA4NDg4JGozNSRsMCRoMA.."
            style={{
              height: 92,
              width: 92,
              borderRadius: 100,
            }}
          />
        </View>
        {/* end profile pic container */}

        {/* user name container */}
        <View
          style={{
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {userInfo?.first_name} {userInfo?.second_name}
          </Text>
          {/* user email */}
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              marginTop: 2,
            }}
          >
            {userInfo?.email}
          </Text>
        </View>
      </View>
      <ProfileOptions />
      {/* logout button */}
      <View
        style={{
          marginTop: 40,
        }}
      >
        <Pressable
          style={{
            marginHorizontal: 40,
            paddingVertical: 10,
            backgroundColor: colors.white,
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: colors.main,
              fontWeight: "600",
            }}
          >
            Deconnexion
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default ProfileScreen;
