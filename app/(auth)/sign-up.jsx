import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Vibration,
  Platform,
} from "react-native";
import defaultStyle from "../../assets/styles/default";
import colors from "../../assets/styles/colors";
import { TextInput } from "react-native";
import { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Loader from "../../components/loader";
import { router } from "expo-router";
import Separator from "../../components/separator";
import logo from "../../assets/images/recrutio-logo03.jpg";
import { useMutation } from "@tanstack/react-query";
import AuthApi from "../../api/authapi";
import Ionicons from "@expo/vector-icons/Ionicons";

function SignUpFormContainer() {
  const [showPin, setShowPin] = useState(false);
  const [showConFirmationPin, setShowConFirmationPin] = useState(false);

  // typing inputs
  const [typedFirstName, setTypedFirstName] = useState("");
  const [typedSecondName, setTypedSecondName] = useState("");
  const [typedEmail, setTypedEmail] = useState("");
  const [typedPin, setTypedPin] = useState("");
  const [typedConfirmationPin, setTypedConfirmationPin] = useState("");

  // submission mutation
  const signUpMutation = useMutation({
    mutationKey: ["signUpUser"],
    mutationFn: ({
      first_name,
      second_name,
      email,
      password,
      password_confirmation,
    }) =>
      AuthApi.signUp({
        first_name,
        second_name,
        email,
        password,
        password_confirmation,
      }),
  });

  // handle submission
  const submitSignUpForm = () => {
    if (
      !typedFirstName ||
      !typedSecondName ||
      !typedEmail ||
      !typedPin ||
      !typedConfirmationPin
    ) {
      alert("Vous devez remplir tous les champs");
      Vibration.vibrate();
      return null;
    }

    // mutate form
    signUpMutation.mutate({
      first_name: typedFirstName,
      second_name: typedSecondName,
      email: typedEmail,
      password: typedPin,
      password_confirmation: typedConfirmationPin,
    });
  };

  // handle response state
  useEffect(() => {
    // handle success state
    if (signUpMutation.isSuccess) {
      console.log("Signup mutation sent a good response");
      console.log(signUpMutation.data);
    }

    // handle failed state
    if (signUpMutation.isError) {
      console.log("Signup mutation has encountered an error");
      console.log(signUpMutation.error);
    }
  }, [signUpMutation.isSuccess, signUpMutation.isError]);

  // form login state
  if (signUpMutation.isPending) return <Loader />;
  return (
    <>
      {/* form container */}
      <View style={formStyle.inputContainer}>
        <Ionicons name="person-outline" size={20} style={formStyle.icon} />
        <TextInput
          placeholder="Entrez votre nom"
          inputMode="text"
          style={formStyle.input}
          onChangeText={setTypedFirstName}
          autoCapitalize="words"
        />
      </View>
      {/* second name input */}
      <View style={formStyle.inputContainer}>
        <Ionicons name="person-outline" size={20} style={formStyle.icon} />
        <TextInput
          placeholder="Entrez votre prenom"
          inputMode="text"
          style={formStyle.input}
          onChangeText={setTypedSecondName}
          autoCapitalize="words"
        />
      </View>
      {/*email input */}
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
      {/* code pin input */}
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
            setTypedPin(value);
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

      {/* confirmation pin input */}
      <View style={formStyle.inputContainer}>
        <Feather name="lock" size={20} style={formStyle.icon} />
        <TextInput
          placeholder="Confirmez votre code pin"
          keyboardType="numeric"
          maxLength={6}
          secureTextEntry={!showConFirmationPin}
          style={formStyle.input}
          onChangeText={(value) => {
            setShowConFirmationPin(false);
            setTypedConfirmationPin(value);
          }}
        />
        {showConFirmationPin ? (
          <Feather
            name="eye-off"
            size={20}
            color="black"
            onPress={() => setShowConFirmationPin(false)}
          />
        ) : (
          <Feather
            name="eye"
            size={20}
            color="black"
            onPress={() => setShowConFirmationPin(true)}
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
          onPress={submitSignUpForm}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: 15,
            }}
          >
            Creer mon compte
          </Text>
        </Pressable>
      </View>
      {/* end submit button */}
    </>
  );
}

function SignupScreen() {
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
            marginTop: 80,
          }}
        >
          {/* title */}
          <Text
            style={{
              ...defaultStyle.h1,
              ...{
                marginVertical: 10,
              },
            }}
          >
            Creez un nouveau compte
          </Text>

          {/* form component */}
          <SignUpFormContainer />
          {/* end signup component */}
          <Separator text="Ou" />
          {/* login option */}
          <View>
            <Pressable onPress={() => router.replace("/(auth)/")}>
              <Text
                style={{
                  color: colors.main,
                  textAlign: "center",
                }}
              >
                Se connecter
              </Text>
            </Pressable>
          </View>
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

export default SignupScreen;
