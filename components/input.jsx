import { StyleSheet, View, TextInput, Text } from "react-native";
import colors from "../assets/styles/colors";
import { useState } from "react";

function Input({
  label = "Input",
  marginTop = 0,
  marginBottom = 0,
  state = true,
  type = "default", //keyboard type possible values ={"default", "numeric", "email-address", "phone-pad"}
  updateInput = null,
  value = null
}) {

  return (
    <View
      style={[
        inputStyles.inputContainer,
        {
          marginTop: marginTop,
          marginBottom: marginBottom,
        },
      ]}
    >
      <Text style={[inputStyles.label]}> {label} </Text>
      <TextInput
        style={!state ? inputStyles.disabledInput : inputStyles.input}
        editable={state}
        keyboardType={type}
        onChangeText={updateInput}
        value={value}
      />
    </View>
  );
}

const inputStyles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1.4,
    borderColor: colors.main,
    borderRadius: 7,
  },
  label: {
    fontWeight: "500",
    top: -10,
    backgroundColor: colors.white,
    left: 24,
    textAlign: "center",
    position: "absolute",
    paddingHorizontal: 3,
    maxWidth: 170,
    overflow: "hidden",
    fontSize: 12,
  },
  input: {
    padding: 11,
    height: 48,
  },
  disabledInput: {
    padding: 11,
    height: 48,
    color: "rgb(10, 10, 10, .5)",
  },
});

export default Input;
