import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ImageBackground,
  ScrollView,
} from "react-native";
import colors from "@/assets/styles/colors";
import defaultStyle from "@/assets/styles/default";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import AuthContext from "@/context/AuthContext";
import { useContext, useEffect } from "react";
import AuthApi from "../../api/authapi";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader";
import Logo from "../../assets/images/recrutio-logo03.jpg";
import {
  UserRound,
  BriefcaseBusiness,
  FileText,
  File,
  Building2,
  LibraryBig
} from "lucide-react-native";

function ProfileOptions() {
  const options = [
    {
      id: 1,
      label: "Mes informations personnelles",
      url: "/(profile)/personal-info",
      icon: (
        <UserRound
          size={19}
          style={{
            marginRight: 10,
          }}
        />
      ),
    },
    {
      id: 2,
      label: "Mes informations professionnelles",
      url: "/(profile)/job-info",
      icon: (
        <BriefcaseBusiness
          size={19}
          style={{
            marginRight: 10,
          }}
        />
      ),
    },
    {
      id: 6,
      label: "Mes etudes & formations",
      url: "/(profile)/education",
      icon: (
        <LibraryBig
          size={19}
          style={{
            marginRight: 10,
          }}
        />
      ),
    },
    {
      id: 3,
      label: "Mes demandes d'emploi",
      url: "/(profile)/job-application",
      icon: (
        <FileText
          size={19}
          style={{
            marginRight: 10,
          }}
        />
      ),
    },
    {
      id: 4,
      label: "Mes CV",
      url: "/(profile)/resume",
      icon: (
        <File
          size={19}
          style={{
            marginRight: 10,
          }}
        />
      ),
    },
    {
      id: 5,
      label: "Mes recruteurs",
      url: "/(profile)/recrutors",
      icon: (
        <Building2
          size={19}
          style={{
            marginRight: 10,
          }}
        />
      ),
    },
    
  ];
  return (
    <View
      style={{
        padding: 13,
      }}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={{
            marginVertical: 3,
            paddingVertical: 9,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => router.navigate(option.url)}
        >
          {option?.icon}
          <Text style={{ fontWeight: "400", display: "flex" }}>
            {option.label}
          </Text>
          <Entypo
            name="chevron-right"
            size={20}
            color="black"
            style={{
              position: "absolute",
              right: 10,
            }}
          />
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

  // get user info query
  const {
    data: userInfo,
    isPending: userInfoPending,
    isSuccess: userInfoIsSuccess,
    isError: userInfoIsError,
    error: userInfoError,
  } = useQuery({
    queryKey: ["UserInfo", Date.now()],
    queryFn: AuthApi.userInfo,
    enabled: isAuth, //enable the request only if the user is auth
    retry: false,
  });

  // handle user info response state
  useEffect(() => {
    // handle success
    if (userInfoIsSuccess) {
      console.log("User is logged in");
      console.log(userInfo);
      console.log("Is auth:", isAuth);
    }

    // handle error
    if (userInfoIsError && userInfoError?.status_code === 401) {
      console.log("UserInfo is not auth");
      AuthApi.getToken().then((token) => {
        console.log(
          "Checking token in userInfo useEffect and will be displayed in the following line"
        );
        console.log(token);
      });
      AuthApi.deleteToken().then(() => {
        setIsAuth(false);
      });
    }

    // check any error
    if (userInfoIsError) {
      // console.log error for debugging
      console.log(
        "An error occured in the userInfo useEffect and it is gonna be displayed on the following line"
      );
      console.log("User auth state", isAuth);
      console.log(userInfoError);
    }
  }, [userInfoIsError, userInfoIsSuccess]);

  // signout mutation
  const signOutMutation = useMutation({
    mutationKey: ["LogoutUser"],
    mutationFn: AuthApi.signOut,
  });

  // signout mutation function
  const handleSignout = () => {
    signOutMutation.mutate();
  };

  // handle signout state
  useEffect(() => {
    if (signOutMutation.isSuccess) {
      console.log("User logged out message is");
      console.log(signOutMutation.data);
      AuthApi.deleteToken().then(() => {
        setIsAuth(false);
      });
    }

    // handle signout error
    if (signOutMutation.isError) {
      console.log("Error signing out");
      console.log(signOutMutation.error);

      // handle unauthenticated errors
      if (signOutMutation.error.status_code === 401) {
        AuthApi.deleteToken().then(() => {
          setIsAuth(false);
        });
      }
    }
  }, [signOutMutation.isError, signOutMutation.isSuccess]);

  // handle user info and pending state
  if (userInfoPending) return <Loader />;

  // display loader on signout pending
  if (signOutMutation.isPending) return <Loader />;

  return (
    <ScrollView>
      {/* background card*/}
      <ImageBackground
        source={Logo}
        style={{
          height: 230,
          filter: "brightness(.6)",
        }}
      />
      <View
        style={{
          height: 460,
          backgroundColor: colors.white,
          top: -140,
          marginHorizontal: 15,
          elevation: 6,
          borderRadius: 10,
        }}
      >
        {/* profile image  */}
        <View
          style={{
            display: "flex",
            alignItems: "center",
            paddingVertical: 13,
          }}
        >
          {userInfo?.profile_pic_url ? (
            <Image
              src={userInfo?.response?.profile_pic_url}
              style={{
                height: 90,
                width: 90,
                borderRadius: 100,
              }}
            />
          ) : (
            <Image
              source={Logo}
              style={{
                height: 90,
                width: 90,
                borderRadius: 100,
              }}
            />
          )}
        </View>
        {/* user name */}
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          {userInfo?.response?.last_name} {userInfo?.response?.first_name}
        </Text>

        {/* user email address */}
        <Text
          style={{
            textAlign: "center",
            fontSize: 13,
          }}
        >
          {userInfo?.response?.email}
        </Text>
        <ProfileOptions />
      </View>

      {/* logout button */}
      <View
        style={{
          top: -90,
        }}
      >
        <Pressable
          style={{
            marginHorizontal: 40,
            paddingVertical: 10,
            backgroundColor: colors.white,
            borderRadius: 100,
          }}
          onPress={handleSignout}
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
    </ScrollView>
  );
}

export default ProfileScreen;
