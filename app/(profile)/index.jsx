import { View, Text, Image, TouchableOpacity } from "react-native";
import colors from "@/assets/styles/colors";
import defaultStyle from "@/assets/styles/default";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import AuthContext from "@/context/AuthContext";
import { useContext, useEffect } from "react";

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
          <Text style={{ fontWeight: "bold" }}> {option.label} </Text>
          <Entypo name="chevron-right" size={20} color="black" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

function ProfileScreen() {
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuth) {
      router.replace("/(auth)"); 
    }
  }, [isAuth]);

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
            Samuel Luc
          </Text>
          {/* user role */}
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              marginTop: 2,
            }}
          >
            Employé chez lui même
          </Text>
        </View>
      </View>

      <ProfileOptions />
    </View>
  );
}

export default ProfileScreen;
