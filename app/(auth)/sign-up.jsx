import { View, Text, Pressable, StyleSheet } from "react-native";
import defaultStyle from "../../assets/styles/default";
import colors from "../../assets/styles/colors";
import { TextInput } from "react-native";
import { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Loader from "../../components/loader";
import { router } from "expo-router";
import Separator from "../../components/separator";

function SignUpFormContainer() {
  const [showPin, setShowPin] = useState(false);
  const [showConFirmationPin, setShowConFirmationPin] = useState(false);

  return (
    <>
      {/* form container */}
      <View style={{ marginTop: 70 }}>
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
            onChangeText={() => {
              setShowPin(false);
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

        {/* confirmation pin inpit */}
        <View style={formStyle.inputContainer}>
          <Feather name="lock" size={20} style={formStyle.icon} />
          <TextInput
            placeholder="Confirmez votre code pin"
            keyboardType="numeric"
            maxLength={6}
            secureTextEntry={!showConFirmationPin}
            style={formStyle.input}
            onChangeText={() => {
              setShowConFirmationPin(false);
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
      </View>
    </>
  );
}

function SignupScreen() {
  const [showPin, setShowPin] = useState(false);
  const [showConFirmationPin, setShowConFirmationPin] = useState(false);

  return (
    <View style={defaultStyle.container}>
      {/* title */}
      <Text
        style={{
          ...defaultStyle.h1,
          ...{
            margin: 20,
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
