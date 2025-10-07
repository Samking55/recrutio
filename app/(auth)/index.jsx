import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Vibration,
} from "react-native";
import defaultStyle from "../../assets/styles/default";
import colors from "../../assets/styles/colors";
import { TextInput } from "react-native";
import { useEffect, useState, useContext } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Loader from "../../components/loader";
import { router } from "expo-router";
import Separator from "../../components/separator";
import { useMutation, useQuery } from "@tanstack/react-query";
import logo from "../../assets/images/recrutio-logo03.jpg";
import { StatusBar } from "react-native";
import AuthApi from "../../api/authapi";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../../context/AuthContext";

function LoginFormContainer() {
  // context
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const [showPin, setShowPin] = useState(false);

  const [typedEmail, setTypedEmail] = useState("");
  const [typedPassword, setTypedPassword] = useState("");
  // the password is a code pin

  const signInMutation = useMutation({
    mutationKey: ["LoginUser"],
    mutationFn: ({ email, password }) => AuthApi.signIn({ email, password }),
  });

  const handleSignIn = () => {
    if (!typedEmail || !typedPassword) {
      return alert("Veuillez remplir tous les champs");
    }

    signInMutation.mutate({
      email: typedEmail,
      password: typedPassword,
    });
  };

  useEffect(() => {
    if (signInMutation.isError) {
      console.log(signInMutation.error);
      Vibration.vibrate();
    }

    if (signInMutation.isSuccess) {
      const data = signInMutation.data.response;
      const token = data.token;
      AuthApi.saveToken({ token }).then(() => {
        setIsAuth(true);
      });
    }
  }, [signInMutation.isError, signInMutation.isSuccess]);

  // check user loggedin
  useEffect(() => {
    AuthApi.isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });

    // if user is connected redirect to profile page
    if (isAuth) {
      router.replace("/(profile)");
    }
  });

  return (
    <>
      {signInMutation.isPending && <Loader />}
      <View style={{ marginTop: 50 }}>
        {/* error display */}
        {signInMutation.isError && (
          <View
            style={{
              marginVertical: 10,
              borderRadius: 10,
              backgroundColor: "#bf2d1d",
            }}
          >
            <Text
              style={{
                padding: 14,
                color: colors.white,
              }}
            >
              {signInMutation.error?.message}
            </Text>
          </View>
        )}

        {/* input */}
        <View style={formStyle.inputContainer}>
          <MaterialCommunityIcons
            name="email-open-outline"
            size={20}
            style={formStyle.icon}
          />
          <TextInput
            placeholder="Votre adresse email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={formStyle.input}
            onChangeText={setTypedEmail}
          />
        </View>
        <View style={formStyle.inputContainer}>
          <Feather name="lock" size={20} style={formStyle.icon} />
          <TextInput
            placeholder="Votre code pin"
            keyboardType="numeric"
            maxLength={6}
            secureTextEntry={!showPin}
            style={formStyle.input}
            onChangeText={(value) => {
              setShowPin(false);
              setTypedPassword(value);
            }}
          />
          {showPin ? (
            <Feather
              name="eye-off"
              size={20}
              color="black"
              onPress={() => setShowPin(false)}
            />
          ) : (
            <Feather
              name="eye"
              size={20}
              color="black"
              onPress={() => setShowPin(true)}
            />
          )}
        </View>

        {/* submit button */}
        <View
          style={{
            marginVertical: 20,
          }}
        >
          <Pressable
            style={{
              backgroundColor: colors.main,
              padding: 13,
              alignItems: "center",
              borderRadius: 100,
            }}
            onPress={handleSignIn}
          >
            <Text
              style={{
                color: colors.white,
                fontSize: 15,
              }}
            >
              Se connecter
            </Text>
          </Pressable>
        </View>
        {/* end submit button */}

        {/* forgotten password */}
        <View>
          <Pressable>
            <Text
              style={{
                color: colors.main,
                textAlign: "center",
              }}
            >
              Code PIN oublié ?
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
/*
Login screen
*/
function LoginScreen() {
  return (
    <>
      <StatusBar hidden />
      <View
        style={{
          height: 190,
          width: 190,
          borderRadius: 100,
          backgroundColor: colors.main,
          position: "absolute",
          top: -70,
          left: -70,
          opacity: 0.6,
        }}
      ></View>
      <View
        style={{
          height: 190,
          width: 190,
          borderRadius: 100,
          backgroundColor: colors.main,
          position: "absolute",
          bottom: -60,
          right: -80,
          opacity: 0.6,
        }}
      ></View>
      {/* logo */}
      <Image
        source={logo}
        style={{
          width: 70,
          height: 70,
          position: "absolute",
          right: 30,
          opacity: 0.7,
          borderRadius: 100,
          top: 50,
        }}
      />

      <View style={defaultStyle.container}>
        <View
          style={{
            marginTop: 170,
            paddingHorizontal: 12,
          }}
        >
          {/* title */}
          <Text style={defaultStyle.h1}>Connectez-vous</Text>

          {/* form container */}
          <LoginFormContainer />
          {/* end form container */}
          <Separator />
          {/* register option */}
          <View>
            <Pressable onPress={() => router.replace("/(auth)/sign-up")}>
              <Text
                style={{
                  color: colors.main,
                  textAlign: "center",
                }}
              >
                Creer un compte
              </Text>
            </Pressable>
          </View>

          {/* end register button */}
        </View>
      </View>
    </>
  );
}

const formStyle = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 6,
    paddingHorizontal: 7,
  },
  input: {
    height: 53,
    width: "85%",
    paddingHorizontal: 10,
  },
  icon: {
    color: colors.main,
    opacity: 0.8,
  },
});

export default LoginScreen;
